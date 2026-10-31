import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledge } from '@/lib/knowledge-base';

const MAX_REQUEST_BYTES = 16_384;
const MAX_MESSAGE_LENGTH = 1_200;
const GROQ_TIMEOUT_MS = 15_000;

export async function POST(req: NextRequest) {
  try {
    const contentLength = Number(req.headers.get('content-length'));
    if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ error: 'Request is too large' }, { status: 413 });
    }

    const reader = req.body?.getReader();
    if (!reader) {
      return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
    }

    const chunks: Uint8Array[] = [];
    let bodyBytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      bodyBytes += value.byteLength;
      if (bodyBytes > MAX_REQUEST_BYTES) {
        await reader.cancel().catch(() => {});
        return NextResponse.json({ error: 'Request is too large' }, { status: 413 });
      }

      chunks.push(value);
    }

    const bodyBytesBuffer = new Uint8Array(bodyBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bodyBytesBuffer.set(chunk, offset);
      offset += chunk.byteLength;
    }

    let body: unknown;
    try {
      body = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bodyBytesBuffer));
    } catch {
      return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 });
    }

    const message =
      body && typeof body === 'object' && !Array.isArray(body) && 'message' in body
        ? body.message
        : undefined;

    if (typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer` },
        { status: 413 }
      );
    }

    // Search knowledge base for relevant context
    const relevantContext = searchKnowledge(message);

    // Groq API configuration
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      console.log('No GROQ_API_KEY found, using fallback');
      // Fallback response if no API key
      return NextResponse.json({
        response: getFallbackResponse(message, relevantContext),
      });
    }

    // Keep answers grounded in the small, verified knowledge base.
    const limitedContext = relevantContext.slice(0, 3);
    const systemPrompt = `Sei l'assistente del portfolio di Antonio Carbone. Rispondi in italiano, in modo professionale e conciso, usando esclusivamente il contesto fornito. Parla di Antonio in terza persona. Se un dato non è presente, dichiaralo chiaramente: non inventare progetti, numeri, clienti, tecnologie o risultati.

Contesto dalla knowledge base:
${limitedContext.join('\n\n')}`;

    const userPrompt = message;

    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 400,
      }),
      signal: AbortSignal.timeout(GROQ_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error('Groq API request failed with status:', response.status);
      return NextResponse.json({
        response: getFallbackResponse(message, relevantContext),
      });
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: unknown } }[];
    };
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (typeof assistantMessage !== 'string' || !assistantMessage.trim()) {
      return NextResponse.json({
        response: getFallbackResponse(message, relevantContext),
      });
    }

    return NextResponse.json({
      response: assistantMessage,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again.' },
      { status: 500 }
    );
  }
}

// Fallback response when Groq API is not available
function getFallbackResponse(message: string, context: string[]): string {
  const lowerMessage = message.toLowerCase();

  if (context.length === 0) {
    return "Non ho informazioni verificate per rispondere con precisione. Puoi chiedermi del percorso, dell’esperienza o dei progetti pubblicati da Antonio.";
  }

  // Simple pattern matching for common questions
  if (lowerMessage.includes('chi') || lowerMessage.includes('about') || lowerMessage.includes('sei')) {
    return "Antonio Carbone è un Ingegnere Informatico e AI Engineer. Lavora tra intelligenza artificiale applicata, sviluppo software e progettazione di prodotto.";
  }

  if (lowerMessage.includes('progetto') || lowerMessage.includes('project')) {
    return "I lavori presentati sono SoulAI, sviluppato nel contesto del lavoro in Affinity; BePlanny, iniziativa privata nata con un collega; e Smart Finance AI, progetto open source disponibile su GitHub.";
  }

  if (lowerMessage.includes('skill') || lowerMessage.includes('competenz') || lowerMessage.includes('tecnolog')) {
    return "Antonio lavora su machine learning, deep learning, NLP e sistemi conversazionali, insieme allo sviluppo backend e frontend necessario per integrarli in prodotti completi.";
  }

  if (lowerMessage.includes('contatt') || lowerMessage.includes('email') || lowerMessage.includes('contact')) {
    return "Puoi contattare Antonio all’indirizzo a.carbone613@gmail.com oppure tramite LinkedIn: linkedin.com/in/antoniocarbone97.";
  }

  // Return first relevant context piece
  return context[0];
}
