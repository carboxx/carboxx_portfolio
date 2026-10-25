import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledge } from '@/lib/knowledge-base';

// export const runtime = 'edge'; // Commentato per compatibilità con Groq

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
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
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API error details:', errorData);
      throw new Error(`Groq API error: ${response.statusText} - ${errorData}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || 'Mi scuso, ma non sono riuscito a generare una risposta. Riprova per favore.';

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
