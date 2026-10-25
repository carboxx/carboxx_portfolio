# Portfolio Setup Guide

## 🚀 New Features Added

### 1. **3D Skills Knowledge Graph**
An interactive 3D visualization of technical skills with:
- 25+ technologies mapped in 3D space
- Color-coded by category (ML/AI, Backend, Frontend, DevOps, Tools)
- Hover effects and auto-rotation
- Drag to rotate, scroll to zoom

### 2. **AI-Powered RAG Chatbot**
A conversational AI assistant that:
- Answers questions about Antonio's experience and projects
- Uses RAG (Retrieval Augmented Generation) with custom knowledge base
- Powered by Groq's LLaMA 3.1 (70B) - FREE and FAST
- Floating chat widget in bottom-right corner

## 📦 Installation

1. **Install dependencies:**
   ```bash
   cd ~/Desktop/carboxx_newportfolio
   npm install
   ```

2. **Set up Groq API (for AI Chatbot):**
   - Go to https://console.groq.com
   - Sign up for a free account
   - Generate an API key
   - Create `.env.local` file:
     ```bash
     cp .env.example .env.local
     ```
   - Add your API key to `.env.local`:
     ```
     GROQ_API_KEY=your_actual_api_key_here
     ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## 🎨 Features

### 3D Skills Graph
- **Location**: New section after Skills
- **Tech Stack**: Three.js + React Three Fiber
- **Interactions**:
  - Click and drag to rotate
  - Scroll to zoom in/out
  - Hover over nodes to see effects
  - Auto-rotation enabled

### AI Chatbot
- **Trigger**: Purple floating button (bottom-right)
- **Features**:
  - RAG-powered responses
  - Knowledge base of 15+ entries about experience/projects
  - Fallback responses if no Groq API key
  - Real-time chat interface
  - Typing indicators

## 🔧 Customization

### Adding Skills to 3D Graph
Edit `/components/sections/SkillsGraph3D.tsx`:
```typescript
const skills: Skill[] = [
  {
    id: 'myskill',
    name: 'My Skill',
    category: 'ml', // ml, backend, frontend, devops, tools
    position: [x, y, z], // 3D coordinates
    connections: ['otherskill1', 'otherskill2']
  },
  // ... more skills
];
```

### Updating Chatbot Knowledge
Edit `/lib/knowledge-base.ts`:
```typescript
export const knowledgeBase = [
  {
    id: 'unique-id',
    content: 'Information about...',
    category: 'project', // personal, experience, project, skills, etc.
    keywords: ['keyword1', 'keyword2']
  },
  // ... more entries
];
```

## 🎯 Next Steps

1. **Get Groq API Key** (5 minutes, free)
2. **Install dependencies** with `npm install`
3. **Test the site** with `npm run dev`
4. **Customize** skills and knowledge base

## 🐛 Troubleshooting

**3D Graph not showing?**
- Make sure dependencies installed: `npm install three @react-three/fiber @react-three/drei`
- Check browser console for errors

**Chatbot not working?**
- Verify Groq API key in `.env.local`
- Check `/api/chat` endpoint is accessible
- Fallback responses will work even without API key

**Build errors?**
- Clear Next.js cache: `rm -rf .next`
- Reinstall: `rm -rf node_modules && npm install`

## 📝 Notes

- The chatbot works WITHOUT Groq API (uses fallback responses)
- For production, add your Groq API key for full AI capabilities
- 3D graph is fully client-side (no API needed)
- All features are mobile-responsive

---

**Built with**: Next.js 15, React 19, Three.js, Groq LLaMA 3.1, TailwindCSS
