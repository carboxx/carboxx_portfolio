import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledge } from '@/lib/knowledge-base';

export const runtime = 'edge';

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
      // Fallback response if no API key
      return NextResponse.json({
        response: getFallbackResponse(message, relevantContext),
      });
    }

    // Build prompt with RAG context
    const systemPrompt = `You are Antonio Carbone's AI assistant. Answer questions about Antonio's experience, projects, and skills based on the provided context. Be professional, concise, and enthusiastic. Always speak in first person as if you ARE Antonio.

Context from knowledge base:
${relevantContext.join('\n\n')}`;

    const userPrompt = message;

    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile', // Fast and accurate
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.';

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
    return "I'm not sure about that. Could you ask me about my AI projects, technical skills, or professional experience?";
  }

  // Simple pattern matching for common questions
  if (lowerMessage.includes('who') || lowerMessage.includes('about')) {
    return "I'm Antonio Carbone, an AI Engineer with over 4 years of experience in Machine Learning and Deep Learning. I specialize in building intelligent systems that solve real-world business problems. Would you like to know more about my projects or technical skills?";
  }

  if (lowerMessage.includes('project')) {
    return `I've worked on several exciting AI projects! For example, I built an Email AI Classifier that achieved 94% accuracy, a Computer Vision system for industrial quality control, and an LLM-powered chatbot serving 1000+ users. Which project would you like to know more about?`;
  }

  if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
    return "My main skills include PyTorch, TensorFlow, Computer Vision (YOLO, OpenCV), NLP (BERT, Transformers), LangChain for RAG systems, and backend development with FastAPI and Python. I also work with React/Next.js for frontend and deploy on AWS with Docker/Kubernetes.";
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
    return "You can reach me at a.carbone613@gmail.com. I'm also active on GitHub (github.com/carboxx) and LinkedIn (linkedin.com/in/antoniocarbone97). I'm always open to discussing AI projects and collaboration opportunities!";
  }

  // Return first relevant context piece
  return context[0] + "\n\nWould you like to know more about this or anything else?";
}
