type KnowledgeItem = {
  id: string;
  content: string;
  category: string;
  keywords: string[];
};

// Only public or CV-backed information belongs here. Private project details stay out.
export const knowledgeBase: KnowledgeItem[] = [
  {
    id: 'about',
    content: 'Antonio Carbone è un Ingegnere Informatico e AI Engineer con base a Salerno. Lavora tra intelligenza artificiale applicata, sviluppo software e progettazione di prodotto.',
    category: 'personal',
    keywords: ['antonio', 'chi', 'profilo', 'about', 'ingegnere', 'engineer'],
  },
  {
    id: 'current-role',
    content: 'Dal 2024 Antonio lavora come AI Engineer in Affinity srl. Segue soluzioni AI dall’analisi del problema alla prototipazione, allo sviluppo e all’integrazione nei processi reali.',
    category: 'experience',
    keywords: ['affinity', 'lavoro', 'esperienza', 'ruolo', 'current'],
  },
  {
    id: 'internship',
    content: 'Nel 2020, durante il tirocinio presso Garofalo & Partners, Antonio ha sviluppato un sistema AI per classificare le email in ingresso, indirizzarle alle persone corrette e archiviarle nel CRM.',
    category: 'experience',
    keywords: ['garofalo', 'tirocinio', 'email', 'crm', 'classificazione'],
  },
  {
    id: 'education',
    content: 'Antonio ha conseguito la laurea triennale in Ingegneria Informatica nel 2020 e la laurea magistrale in Ingegneria Informatica, curriculum Artificial Intelligence, nel 2025 presso l’Università degli Studi di Salerno.',
    category: 'education',
    keywords: ['laurea', 'università', 'unisa', 'formazione', 'magistrale', 'triennale'],
  },
  {
    id: 'soul-ai',
    content: 'SoulAI è un prodotto conversazionale a cui Antonio ha lavorato nel contesto del suo ruolo in Affinity, contribuendo alla progettazione tecnica, allo sviluppo e all’integrazione del sistema.',
    category: 'project',
    keywords: ['soul', 'affinity', 'prodotto', 'conversazionale'],
  },
  {
    id: 'beplanny',
    content: 'BePlanny è un’iniziativa imprenditoriale privata nata con un collega per semplificare il lavoro delle attività che gestiscono servizi su appuntamento. Antonio ha contribuito alla visione, alla progettazione del prodotto e allo sviluppo dell’ecosistema web e mobile. I dettagli interni restano riservati.',
    category: 'project',
    keywords: ['beplanny', 'prodotto', 'appuntamenti', 'business', 'privato'],
  },
  {
    id: 'smart-finance',
    content: 'Smart Finance AI è un progetto pubblico di Antonio per riunire spese, patrimonio e investimenti in una dashboard e interrogare i propri dati finanziari tramite un assistente AI. Il repository è disponibile sul suo profilo GitHub.',
    category: 'project',
    keywords: ['finance', 'finanza', 'github', 'dashboard', 'investimenti', 'assistente'],
  },
  {
    id: 'leadership',
    content: 'Antonio è stato vicepresidente di StudentIngegneria e rappresentante degli studenti. Dal 2021 al 2024 ha fatto parte del Consiglio di Amministrazione dell’Università degli Studi di Salerno.',
    category: 'experience',
    keywords: ['studentingegneria', 'consiglio', 'amministrazione', 'rappresentanza', 'leadership'],
  },
  {
    id: 'skills',
    content: 'Le aree di lavoro di Antonio comprendono machine learning, deep learning, NLP, sistemi conversazionali, sviluppo backend e frontend e integrazione end-to-end di prodotti software basati su AI.',
    category: 'skills',
    keywords: ['competenze', 'skill', 'machine learning', 'nlp', 'backend', 'frontend'],
  },
  {
    id: 'contact',
    content: 'Antonio può essere contattato via email all’indirizzo a.carbone613@gmail.com. I suoi profili pubblici sono github.com/carboxx e linkedin.com/in/antoniocarbone97.',
    category: 'contact',
    keywords: ['contatto', 'email', 'github', 'linkedin', 'scrivere'],
  },
];

export function searchKnowledge(query: string): string[] {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.replace(/[^a-zà-ù0-9-]/gi, ''))
    .filter((word) => word.length > 2);

  return knowledgeBase
    .map((item) => {
      const haystack = `${item.content} ${item.keywords.join(' ')}`.toLowerCase();
      const score = words.reduce((total, word) => total + (haystack.includes(word) ? 1 : 0), 0);
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item }) => item.content);
}
