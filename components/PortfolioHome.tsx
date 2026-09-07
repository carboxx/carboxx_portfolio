import Image from 'next/image';
import HeroChat from '@/components/HeroChat';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import PortfolioMotion from '@/components/PortfolioMotion';

type Locale = 'it' | 'en';

const content = {
  it: {
    skipToContent: 'Vai al contenuto',
    nav: { experience: 'Esperienza', projects: 'Progetti', journey: 'Percorso', contact: 'Parliamone' },
    navLabel: 'Navigazione principale',
    backToTop: 'Antonio Carbone, torna all’inizio',
    career: {
      eyebrow: 'Percorso professionale e formazione',
      title: <>Esperienza, formazione<br />e ricerca.</>,
      intro: 'La formazione mi ha dato il metodo. Il lavoro mi ha insegnato a trasformarlo in decisioni, software e prodotti che devono funzionare davvero.',
      items: [
        { period: '2024 - oggi', kind: 'Lavoro', role: 'AI Engineer', place: 'Affinity', text: 'Gestisco progetti AI dai requisiti alla produzione, unendo sviluppo, scelte tecniche e coordinamento del lavoro.' },
        { period: '2020 - 2025', kind: 'Formazione', role: 'Laurea magistrale in Ingegneria Informatica', place: 'Università degli Studi di Salerno · curriculum Artificial Intelligence', text: 'Un percorso focalizzato su intelligenza artificiale, machine learning e sistemi software complessi.' },
        { period: '2025', kind: 'Tesi magistrale', role: 'Artificial Vision', place: 'Università degli Studi di Salerno', text: 'Il progetto di ricerca con cui ho concluso il percorso magistrale, concentrato sull’applicazione di tecniche di visione artificiale.' },
        { period: '2016 - 2020', kind: 'Formazione', role: 'Laurea triennale in Ingegneria Informatica', place: 'Università degli Studi di Salerno', text: 'Le fondamenta: programmazione, architetture, dati e metodo ingegneristico.' },
      ],
    },
    projects: {
      eyebrow: 'Esperienza attuale',
      title: <>AI Engineer<br />in Affinity.</>,
      period: '2024 — oggi',
      paragraphs: [
        'Dal 2024 lavoro in Affinity come AI Engineer. Progetto e sviluppo soluzioni basate su machine learning, computer vision, NLP e AI conversazionale, seguendo i progetti dall’analisi del problema e dei requisiti fino all’integrazione nei prodotti e nei processi del cliente.',
        'Nel concreto alterno ricerca e implementazione: definisco architetture, sviluppo servizi backend e interfacce, preparo prototipi, porto i componenti in produzione e coordino le attività tecniche con il team.',
      ],
      product: 'In questo contesto ho lavorato anche a SoulAI, un prodotto conversazionale di cui ho seguito progettazione tecnica, sviluppo e integrazione.',
      companyLink: 'Visita Affinity',
      companyHref: 'https://www.affinitylab.it/',
      privateEyebrow: 'Progetto privato',
      privateTitle: 'BePlanny',
      privateText: 'Nato con un collega per semplificare la gestione delle attività che lavorano su appuntamento. Ho contribuito alla visione del prodotto e allo sviluppo dell’ecosistema web e mobile; i dettagli interni restano privati.',
      privateLink: 'Visita beplanny.com',
      privateHref: 'https://www.beplanny.com/',
    },
    github: {
      title: <>Progetti<br />open source.</>,
      intro: 'Su GitHub raccolgo progetti personali e codice che posso condividere pubblicamente.',
      profile: 'profilo pubblico',
      action: 'Apri GitHub',
      repos: [
        { name: 'carboxx-smart-finance-ai-app', label: 'Open source', language: 'JavaScript', text: 'Gestione finanziaria personale con insight AI, analisi del portafoglio e interrogazione dei dati in linguaggio naturale.', href: 'https://github.com/carboxx/carboxx-smart-finance-ai-app' },
        { name: 'carboxx_portfolio', label: 'Portfolio attuale', language: 'Web', text: 'Il codice del portfolio che stai visitando: struttura bilingue, animazioni e resa responsive.', href: 'https://github.com/carboxx/carboxx_portfolio' },
      ],
    },
    journey: {
      eyebrow: 'Oltre il codice',
      title: <>Le esperienze che<br />mi hanno formato.</>,
      origin: { title: 'Lapio', kicker: 'Le radici', image: '/lapio-optimized.jpg', alt: 'Paesaggio di Lapio, in Irpinia', text: 'Il luogo da cui vengo, in Irpinia.' },
      items: [
        { title: 'StudentIngegneria', kicker: 'La comunità', image: '/studentingegneria-optimized.jpg', alt: 'Il gruppo di StudentIngegneria all’Università di Salerno', text: 'Da rappresentante e vicepresidente ho imparato a organizzare, ascoltare e prendermi responsabilità per una comunità molto più grande di me.' },
        { title: 'Consiglio di Amministrazione', kicker: 'La responsabilità', image: '/piazzadelsapere-optimized.jpg', alt: 'Il campus dell’Università degli Studi di Salerno', text: 'Dal 2021 al 2024 ho rappresentato gli studenti nel Consiglio di Amministrazione dell’Università di Salerno.' },
      ],
    },
    contact: {
      eyebrow: 'Contatti',
      title: <>Un progetto. Un ruolo.<br />Una buona idea.</>,
      lead: 'Il prossimo passo',
      copy: 'Se c’è qualcosa di concreto da costruire, migliorare o discutere, scrivimi direttamente.',
      email: 'Email',
      elsewhere: 'Altrove',
      location: 'Salerno, Italia',
      resume: 'Curriculum (EN)',
      resumeHref: '/cv_en.pdf',
      role: 'Ingegnere informatico / AI Engineer',
    },
  },
  en: {
    skipToContent: 'Skip to content',
    nav: { experience: 'Experience', projects: 'Projects', journey: 'Journey', contact: 'Let’s talk' },
    navLabel: 'Main navigation',
    backToTop: 'Antonio Carbone, back to top',
    career: {
      eyebrow: 'Professional experience and education',
      title: <>Experience, education<br />and research.</>,
      intro: 'Education gave me the method. Work taught me how to turn it into decisions, software and products that have to perform in the real world.',
      items: [
        { period: '2024 - present', kind: 'Work', role: 'AI Engineer', place: 'Affinity', text: 'I lead AI projects from requirements to production, combining development, technical decisions and team coordination.' },
        { period: '2020 - 2025', kind: 'Education', role: 'MSc in Computer Engineering', place: 'University of Salerno · Artificial Intelligence curriculum', text: 'A programme focused on artificial intelligence, machine learning and complex software systems.' },
        { period: '2025', kind: 'Master’s thesis', role: 'Artificial Vision', place: 'University of Salerno', text: 'The research project that completed my master’s degree, focused on the application of computer vision techniques.' },
        { period: '2016 - 2020', kind: 'Education', role: 'BSc in Computer Engineering', place: 'University of Salerno', text: 'The foundations: programming, computer architecture, data and engineering method.' },
      ],
    },
    projects: {
      eyebrow: 'Current experience',
      title: <>AI Engineer<br />at Affinity.</>,
      period: '2024 — present',
      paragraphs: [
        'I have worked at Affinity as an AI Engineer since 2024. I design and develop solutions involving machine learning, computer vision, NLP and conversational AI, following projects from problem and requirements analysis through integration into client products and processes.',
        'In practice, I move between research and implementation: defining architectures, developing backend services and interfaces, building prototypes, taking components into production and coordinating technical work with the team.',
      ],
      product: 'In this context, I also worked on SoulAI, a conversational product whose technical design, development and integration I helped shape.',
      companyLink: 'Visit Affinity',
      companyHref: 'https://www.affinitylab.it/',
      privateEyebrow: 'Private project',
      privateTitle: 'BePlanny',
      privateText: 'Started with a colleague to simplify operations for appointment-based businesses. I contributed to the product vision and to the web and mobile ecosystem; internal details remain private.',
      privateLink: 'Visit beplanny.com',
      privateHref: 'https://www.beplanny.com/',
    },
    github: {
      title: <>Open-source<br />projects.</>,
      intro: 'I use GitHub for personal projects and code that I can share publicly.',
      profile: 'public profile',
      action: 'Open GitHub',
      repos: [
        { name: 'carboxx-smart-finance-ai-app', label: 'Open source', language: 'JavaScript', text: 'Personal finance management with AI insights, portfolio analysis and natural-language data exploration.', href: 'https://github.com/carboxx/carboxx-smart-finance-ai-app' },
        { name: 'carboxx_portfolio', label: 'Current portfolio', language: 'Web', text: 'The code behind the portfolio you are visiting: bilingual structure, motion and responsive layout.', href: 'https://github.com/carboxx/carboxx_portfolio' },
      ],
    },
    journey: {
      eyebrow: 'Beyond the code',
      title: <>The experiences<br />that shaped me.</>,
      origin: { title: 'Lapio', kicker: 'My roots', image: '/lapio-optimized.jpg', alt: 'Landscape of Lapio in Irpinia, Italy', text: 'The place I come from, in Irpinia.' },
      items: [
        { title: 'StudentIngegneria', kicker: 'The community', image: '/studentingegneria-optimized.jpg', alt: 'The StudentIngegneria group at the University of Salerno', text: 'As a student representative and vice president, I learned to organise, listen and take responsibility for a community much larger than myself.' },
        { title: 'Board of Directors', kicker: 'Responsibility', image: '/piazzadelsapere-optimized.jpg', alt: 'The University of Salerno campus', text: 'From 2021 to 2024, I represented students on the University of Salerno Board of Directors.' },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: <>A project. A role.<br />A good idea.</>,
      lead: 'The next step',
      copy: 'If there is something concrete to build, improve or discuss, write to me directly.',
      email: 'Email',
      elsewhere: 'Elsewhere',
      location: 'Salerno, Italy',
      resume: 'Resume',
      resumeHref: '/cv_en.pdf',
      role: 'Computer Engineer / AI Engineer',
    },
  },
} as const;

export default function PortfolioHome({ locale }: { locale: Locale }) {
  const copy = content[locale];

  return (
    <main id="top">
      <a className="skip-link" href="#esperienza">{copy.skipToContent}</a>
      <PortfolioMotion />
      <HeroChat locale={locale} />

      <header className="site-nav">
        <a className="wordmark" href="#top" aria-label={copy.backToTop}>carbo<span>xx</span></a>
        <nav aria-label={copy.navLabel}>
          <a href="#esperienza">{copy.nav.experience}</a>
          <a href="#progetti">{copy.nav.projects}</a>
          <a href="#percorso">{copy.nav.journey}</a>
        </nav>
        <div className="nav-actions">
          <LanguageSwitcher locale={locale} />
          <a className="nav-contact" href="#contatti">{copy.nav.contact}</a>
        </div>
      </header>

      <section id="esperienza" className="career-section" aria-labelledby="career-title">
        <header className="career-header">
          <div><p className="overline">{copy.career.eyebrow}</p><h2 id="career-title">{copy.career.title}</h2></div>
          <p>{copy.career.intro}</p>
        </header>
        <div className="career-timeline">
          {copy.career.items.map((item, index) => (
            <article className="career-row reveal-row" key={`${item.place}-${item.period}`}>
              <div className="career-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
              <div className="career-meta"><p>{item.kind}</p><span>{item.period}</span></div>
              <div className="career-role"><h3>{item.role}</h3><p>{item.place}</p></div>
              <p className="career-copy">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="progetti" className="projects-section section-pad" aria-labelledby="projects-title">
        <div className="work-header">
          <div className="work-title"><p className="overline">{copy.projects.eyebrow}</p><h2 id="projects-title">{copy.projects.title}</h2><span>{copy.projects.period}</span></div>
          <div className="work-copy">
            {copy.projects.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p className="work-product">{copy.projects.product}</p>
            <a href={copy.projects.companyHref} target="_blank" rel="noreferrer">{copy.projects.companyLink} <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <article className="private-project reveal-row">
          <div><p>{copy.projects.privateEyebrow}</p><span>01</span></div>
          <h3>{copy.projects.privateTitle}</h3>
          <div><p>{copy.projects.privateText}</p><a href={copy.projects.privateHref} target="_blank" rel="noreferrer">{copy.projects.privateLink} <span aria-hidden="true">↗</span></a></div>
        </article>
      </section>

      <section id="github" className="github-section" aria-labelledby="github-title">
        <div className="github-shell">
          <header className="github-header">
            <div><p className="github-eyebrow"><span aria-hidden="true" /> github.com/carboxx</p><h2 id="github-title">{copy.github.title}</h2></div>
            <p className="github-intro">{copy.github.intro}</p>
          </header>
          <div className="github-repos">
            {copy.github.repos.map((repo, index) => (
              <a className="repo-row reveal-row" href={repo.href} target="_blank" rel="noreferrer" key={repo.name}>
                <span className="repo-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="repo-main"><p>{repo.label}</p><h3>{repo.name}</h3><span>{repo.text}</span></div>
                <div className="repo-language"><i aria-hidden="true" />{repo.language}</div><span className="repo-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <footer className="github-footer"><p><strong>@carboxx</strong> · {copy.github.profile}</p><a href="https://github.com/carboxx" target="_blank" rel="noreferrer">{copy.github.action} <span aria-hidden="true">↗</span></a></footer>
        </div>
      </section>

      <section id="percorso" className="journey-section" aria-labelledby="journey-title">
        <div className="journey-header">
          <div className="journey-heading"><p className="overline">{copy.journey.eyebrow}</p><h2 id="journey-title">{copy.journey.title}</h2></div>
          <article className="journey-origin">
            <div className="journey-origin-image"><Image src={copy.journey.origin.image} alt={copy.journey.origin.alt} fill sizes="(max-width: 800px) 100vw, 260px" /></div>
            <div><p>{copy.journey.origin.kicker}</p><h3>{copy.journey.origin.title}</h3><span>{copy.journey.origin.text}</span></div>
          </article>
        </div>
        <div className="journey-viewport"><div className="journey-track">
          {copy.journey.items.map((item) => (
            <article className={`journey-slide ${item.title.length > 18 ? 'journey-slide--long' : ''} ${item.title === 'StudentIngegneria' ? 'journey-slide--student' : ''}`} key={item.title}>
              <div className="journey-image"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 800px) 100vw, 60vw" /></div>
              <div className="journey-copy"><p>{item.kicker}</p><h3>{item.title}</h3><span>{item.text}</span></div>
            </article>
          ))}
        </div></div>
      </section>

      <section id="contatti" className="contact-section section-pad" aria-labelledby="contact-title">
        <div className="contact-heading">
          <div><p className="overline overline-light">{copy.contact.eyebrow}</p><h2 id="contact-title">{copy.contact.title}</h2></div>
          <div className="contact-aside"><p>{copy.contact.lead}</p><span>{copy.contact.copy}</span></div>
        </div>
        <a className="contact-mail" href="mailto:a.carbone613@gmail.com">
          <span className="contact-mail-label">{copy.contact.email}</span>
          <strong>a.carbone613@gmail.com</strong>
          <i aria-hidden="true">↗</i>
        </a>
        <div className="contact-links">
          <div><p>{copy.contact.elsewhere}</p><span>{copy.contact.location}</span></div>
          <nav aria-label={copy.contact.elsewhere}>
            <a href="https://www.linkedin.com/in/antoniocarbone97" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href="https://github.com/carboxx" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a href={copy.contact.resumeHref} target="_blank" rel="noreferrer">{copy.contact.resume} <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
        <footer><span>Antonio Carbone · {copy.contact.role}</span><span>© 2026</span></footer>
      </section>
    </main>
  );
}
