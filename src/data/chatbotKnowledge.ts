export interface RouteAction {
  label: string;
  href: string;
  badge?: string;
}

export interface KnowledgeEntry {
  id: string;
  title: string;
  keywords: string[];
  patterns: RegExp[];
  answer: string;
  routes?: RouteAction[];
  followUps?: string[];
}

export const STARTER_PROMPTS = [
  '🚀 What services does Wellbit offer?',
  '📱 How do you build mobile & web apps?',
  '🧠 How do your AI agents & RAG work?',
  '💰 How much does a project cost?',
  '🔒 Who owns the code & IP?',
  '📞 How can I talk to your team?',
];

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // 1. Warm Greetings & Introduction
  {
    id: 'greetings',
    title: 'Hello & Welcome',
    keywords: ['hello', 'hi', 'hey', 'greetings', 'morning', 'afternoon', 'evening', 'who are you', 'what is your name', 'what are you', 'help'],
    patterns: [
      /^(hi|hello|hey|hola|greetings|good\s*(morning|afternoon|evening))/i,
      /who are you/i,
      /what('s| is) your name/i,
      /what can you do/i,
      /what is nova/i,
    ],
    answer:
      `Hey there! 👋 I'm **Nova**, your engineering copilot at Wellbit.\n\nI can answer questions about our software development, mobile & web apps, cloud infrastructure, and enterprise AI solutions—or connect you directly with our team for estimates and consultations.\n\nWhat are you planning to build or optimize?`,
    routes: [
      { label: 'Explore Core Services', href: '/#services-overview' },
      { label: 'Request a Project Quote', href: '/downloads/request-quote' },
      { label: 'Talk to Our Team', href: '/contact' },
    ],
    followUps: [
      'What services does Wellbit offer?',
      'How much does a project cost?',
      'How do I talk to an engineer?',
    ],
  },

  // 2. Polite pleasantries (thanks, cool, bye)
  {
    id: 'pleasantries',
    title: 'Thanks & Goodbye',
    keywords: ['thank', 'thanks', 'appreciate', 'awesome', 'cool', 'great', 'perfect', 'bye', 'goodbye', 'see you'],
    patterns: [
      /^(thanks|thank you|thx|awesome|cool|great|perfect|nice)/i,
      /^(bye|goodbye|see ya|cya)/i,
    ],
    answer:
      `You're very welcome! 😊 If any other questions come up about your project or architecture, I'm always right here.\n\nReady to get started? Feel free to reach out to our engineering leads directly!`,
    routes: [
      { label: 'Start a Project Conversation', href: '/contact' },
      { label: 'Get an Estimate', href: '/downloads/request-quote' },
    ],
    followUps: [
      'What services does Wellbit offer?',
      'How do I contact Wellbit?',
    ],
  },

  // 3. Core Services Overview
  {
    id: 'services-overview',
    title: 'Core Engineering Services',
    keywords: ['services', 'offer', 'capabilities', 'what do you do', 'solutions', 'disciplines', 'work', 'what can you build', 'portfolio'],
    patterns: [
      /what (services|solutions|capabilities) (do you|does wellbit) (offer|have|provide|do)/i,
      /what can (you|wellbit) build/i,
      /what do you do/i,
      /core services/i,
      /all services/i,
    ],
    answer:
      `We engineer end-to-end digital systems across four primary disciplines:\n\n- ⚡ **Custom Software & Microservices**: Scalable backend architectures, distributed event streaming (Kafka), and resilient high-throughput APIs.\n- 📱 **Mobile & Web Apps**: Native-performance iOS & Android apps (React Native, Flutter) and progressive web apps (Next.js, Astro).\n- ☁️ **Cloud Infrastructure & DevOps**: Infrastructure as Code (Terraform), Kubernetes cluster orchestration, and zero-downtime CI/CD pipelines.\n- 🧠 **Enterprise AI & Autonomous Agents**: Production-tested multi-agent workflows, private enterprise RAG retrieval, and document intelligence.\n\nWhich of these areas are you most interested in?`,
    routes: [
      { label: 'Custom Software Development', href: '/services/software-development' },
      { label: 'Mobile & Web Apps', href: '/services/app-development' },
      { label: 'Cloud Infrastructure & DevOps', href: '/services/cloud-devops' },
      { label: 'Enterprise AI Solutions', href: '/solutions' },
    ],
    followUps: [
      'Tell me about custom software development',
      'What mobile frameworks do you use?',
      'How do your AI solutions work?',
    ],
  },

  // 4. Custom Software & Backend Development
  {
    id: 'software-dev',
    title: 'Custom Software & Distributed Systems',
    keywords: ['software', 'backend', 'microservices', 'distributed', 'api', 'apis', 'kafka', 'go', 'golang', 'node', 'fastapi', 'database', 'postgres', 'backend development', 'custom software'],
    patterns: [
      /software( development)?/i,
      /backend( engineering| development)?/i,
      /microservice/i,
      /distributed system/i,
      /api( integration| development)?/i,
      /kafka|redis|postgres/i,
    ],
    answer:
      `Yes! Custom backend and distributed systems engineering is one of our deepest specialties.\n\nHere is how we build:\n- **High-Throughput Backends**: Written in Go, Node.js, and Python (FastAPI), engineered to handle 100k+ ops/sec with sub-110ms latency.\n- **Event Streaming & Real-Time Data**: Reliable asynchronous messaging using Apache Kafka, RabbitMQ, and Redis.\n- **Resilient Persistence**: Optimized SQL & NoSQL data layers (PostgreSQL, MongoDB, pgvector) with automated backups and read-replicas.\n- **Clean Architecture**: Decoupled, modular codebases with automated unit/integration tests and zero vendor lock-in.`,
    routes: [
      { label: 'Explore Software Engineering', href: '/services/software-development' },
      { label: 'Request Technical Blueprint', href: '/downloads/request-quote' },
    ],
    followUps: [
      'Can you migrate a legacy system?',
      'What databases do you support?',
      'How do you manage client code ownership?',
    ],
  },

  // 5. Mobile & Web App Development
  {
    id: 'app-dev',
    title: 'Mobile & Web App Development',
    keywords: ['mobile', 'app', 'apps', 'ios', 'android', 'iphone', 'react native', 'flutter', 'swift', 'kotlin', 'pwa', 'frontend', 'nextjs', 'web app', 'mobile app', 'website'],
    patterns: [
      /mobile (app|application|development)/i,
      /build (an? )?(app|mobile app|website)/i,
      /app development/i,
      /ios|android|iphone/i,
      /react native|flutter/i,
      /web (app|application)/i,
    ],
    answer:
      `We build fluid, responsive apps for mobile (iOS & Android) and the web:\n\n- **Cross-Platform Excellence**: Using React Native and Flutter, giving you 60 FPS native feel with a single shared codebase (saving 40% on build and maintenance costs).\n- **Native iOS & Android**: Swift and Kotlin for hardware-intensive features, background geofencing, or BLE accessories.\n- **Modern Full-Stack Web**: High-speed Next.js, React, and Astro applications optimized for Core Web Vitals and lightning-fast page loads.\n- **Offline-First Synchronization**: Local caching (WatermelonDB / SQLite) so your users can work smoothly without internet, auto-syncing when back online.`,
    routes: [
      { label: 'Explore App Development', href: '/services/app-development' },
      { label: 'Get an App Estimate', href: '/downloads/request-quote' },
      { label: 'Discuss Your App Idea', href: '/contact' },
    ],
    followUps: [
      'Should I choose Flutter or React Native?',
      'How long does an MVP take to build?',
      'Do you help launch on App Store & Google Play?',
    ],
  },

  // 6. Cloud Infrastructure & DevOps (SRE)
  {
    id: 'cloud-devops',
    title: 'Cloud Infrastructure & DevOps',
    keywords: ['cloud', 'devops', 'sre', 'aws', 'gcp', 'azure', 'kubernetes', 'k8s', 'docker', 'terraform', 'ci/cd', 'infrastructure', 'uptime', 'monitoring', 'hosting', 'server', 'deploy'],
    patterns: [
      /cloud( infrastructure)?/i,
      /devops/i,
      /sre/i,
      /kubernetes|k8s/i,
      /terraform|docker/i,
      /ci[\/\s]?cd/i,
      /aws|gcp|azure/i,
      /server|hosting|deployment/i,
    ],
    answer:
      `Our Cloud & DevOps (SRE) practice ensures your infrastructure is automated, resilient, and cost-effective:\n\n- **Infrastructure as Code (IaC)**: Deterministic, version-controlled cloud environments codified with Terraform and Terragrunt.\n- **Kubernetes & Containers**: Production-grade EKS and GKE clusters with automated horizontal pod autoscaling and self-healing.\n- **Zero-Downtime Deployments**: Blue-green and canary release pipelines using GitHub Actions and ArgoCD.\n- **99.99% Reliability**: 24/7 observability and alerting with Prometheus, Grafana, and OpenTelemetry to catch issues before your customers do.`,
    routes: [
      { label: 'Explore Cloud & DevOps', href: '/services/cloud-devops' },
      { label: 'Book a Cloud Infrastructure Audit', href: '/contact' },
    ],
    followUps: [
      'Do you support both AWS and GCP?',
      'Can you help lower our monthly cloud bill?',
      'How do you manage zero-downtime releases?',
    ],
  },

  // 7. Enterprise AI & Autonomous Workflows
  {
    id: 'ai-solutions',
    title: 'Enterprise AI & Autonomous Agents',
    keywords: ['ai', 'artificial intelligence', 'agent', 'agents', 'rag', 'llm', 'langchain', 'openai', 'claude', 'gemini', 'vector', 'automation', 'neural', 'chatgpt', 'machine learning'],
    patterns: [
      /ai( solutions| agents| workflows)?/i,
      /artificial intelligence/i,
      /autonomous agent/i,
      /rag|retrieval augmented/i,
      /llm|large language model/i,
      /document intelligence/i,
      /chatgpt|claude|openai/i,
      /automate (operations|tasks|workflows)/i,
    ],
    answer:
      `We engineer practical, enterprise-grade AI systems that automate real business operations—with deterministic outcomes and strict guardrails:\n\n- **Autonomous AI Agents**: Multi-agent task loops that research, parse unstructured data, verify against business rules, and execute workflows with human oversight.\n- **Private Enterprise RAG**: Intelligent search and question-answering over your proprietary documents, contracts, and internal databases—with zero hallucination drift.\n- **Absolute Privacy**: Your proprietary data is never used to train public foundation models.\n- **Integrations**: Seamless connections with your existing ERP, CRM, Slack, databases, and APIs.`,
    routes: [
      { label: 'Explore Enterprise AI Solutions', href: '/solutions' },
      { label: 'See AI Workflow Architecture', href: '/solutions#ai-workflows' },
      { label: 'Book an AI Consultation', href: '/contact' },
    ],
    followUps: [
      'Is our proprietary data safe with RAG?',
      'What AI models do you support?',
      'Can AI agents automate internal back-office tasks?',
    ],
  },

  // 8. Pricing, Cost & Quote Inquiries
  {
    id: 'pricing-quote',
    title: 'Pricing & Project Quotes',
    keywords: ['pricing', 'price', 'cost', 'quote', 'estimate', 'budget', 'rate', 'rates', 'hire', 'contract', 'fee', 'how much', 'expensive', 'charges', 'billing'],
    patterns: [
      /how much (does it cost|do you charge|is it)/i,
      /pricing|cost|rates|quote/i,
      /get a quote/i,
      /request a quote/i,
      /hiring model|engagement model/i,
      /project budget/i,
      /hourly rate/i,
    ],
    answer:
      `We believe in transparent, value-driven pricing with no surprise charges. We support three primary engagement models:\n\n1. **Fixed-Price Milestones**: Best for well-defined MVPs, specific feature builds, or architecture deliverables. You know the exact cost and timeline upfront.\n2. **Dedicated Engineering Pods**: An embedded, dedicated squad (e.g. senior architects, full-stack engineers, DevOps) working in bi-weekly sprints on a monthly retainer.\n3. **Consulting & Architecture Audits**: Targeted technical reviews, code audits, or cloud optimizations.\n\nEvery project is unique—tell us what you're building, and we'll send you an honest technical breakdown and estimate within 24-48 business hours!`,
    routes: [
      { label: 'Request a Project Quote', href: '/downloads/request-quote' },
      { label: 'Schedule Discovery Call', href: '/contact' },
    ],
    followUps: [
      'How fast do you respond to quote requests?',
      'Do you offer free initial technical discovery?',
      'Can you work with startup budgets?',
    ],
  },

  // 9. Project Process & Getting Started
  {
    id: 'process-getting-started',
    title: 'How We Work & Engagement Process',
    keywords: ['process', 'how do you work', 'how to start', 'steps', 'getting started', 'onboarding', 'kickoff', 'workflow', 'methodology'],
    patterns: [
      /how (do you|does wellbit) work/i,
      /how (can|do) (we|i) (get started|start)/i,
      /what is (your|the) process/i,
      /project kickoff/i,
    ],
    answer:
      `Starting a project with Wellbit is straightforward and collaborative:\n\n1. **Discovery & Alignment**: A 30-minute initial conversation to understand your business objectives, tech stack, and timeline constraints.\n2. **Architecture Roadmap & Proposal**: We outline technical blueprints, scope milestones, team composition, and an upfront estimate.\n3. **Sprint Kickoff**: We establish shared communication (Slack/Teams), CI/CD environments, and sprint boards within days.\n4. **Continuous Delivery**: Bi-weekly demo releases, complete source code transparency, and regular architecture syncs.`,
    routes: [
      { label: 'Book Initial Discovery Call', href: '/contact' },
      { label: 'Submit Your Project Scope', href: '/downloads/request-quote' },
    ],
    followUps: [
      'How long does an MVP take to build?',
      'Do we sign an NDA first?',
      'Who owns the code during development?',
    ],
  },

  // 10. Project Timelines & MVP Duration
  {
    id: 'timeline-duration',
    title: 'Project Timelines & Speed',
    keywords: ['timeline', 'duration', 'how long', 'how fast', 'time', 'deadline', 'turnaround', 'mvp timeline', 'schedule'],
    patterns: [
      /how long (does|will) (it|a project|an mvp) take/i,
      /how fast can (you|we) (build|deliver|launch)/i,
      /timeline|turnaround/i,
      /mvp timeline/i,
    ],
    answer:
      `Our timelines depend on the scope, but here are typical benchmarks based on past projects:\n\n- ⚡ **Rapid MVPs**: 4 to 8 weeks from kickoff to production release (ideal for startups and new product initiatives).\n- 🚀 **Full-Featured Mobile/Web Platforms**: 2 to 4 months for complete multi-platform solutions with auth, payments, and dashboards.\n- 🧠 **Enterprise AI / Custom Microservices**: 3 to 6 weeks for targeted RAG retrieval or agent workflow pilots.\n\nWe provide milestone dates and sprint breakdowns before starting so you always know what to expect.`,
    routes: [
      { label: 'Discuss Your Target Launch Date', href: '/contact' },
      { label: 'Request Timeline Estimate', href: '/downloads/request-quote' },
    ],
    followUps: [
      'What services does Wellbit offer?',
      'How much does an MVP cost?',
    ],
  },

  // 11. Contact, Phone, Email & Meeting
  {
    id: 'contact-details',
    title: 'Contact Information & Consultations',
    keywords: ['contact', 'email', 'phone', 'call', 'reach', 'address', 'location', 'office', 'talk', 'whatsapp', 'inquiry', 'meeting', 'speak', 'touch'],
    patterns: [
      /how (can|do) i (contact|reach|call|email|talk to) you/i,
      /contact (info|details|page)/i,
      /phone number/i,
      /email address/i,
      /can we (have a )?(call|meeting|chat)/i,
      /where is your office/i,
    ],
    answer:
      `We'd love to chat! You can reach our engineering leads directly through any of these channels:\n\n- 📧 **Direct Email**: [m.hasanmzp@gmail.com](mailto:m.hasanmzp@gmail.com)\n- 📞 **Direct Phone**: [+91 8948626497](tel:+918948626497)\n- 📝 **Online Project Inquiry**: Available 24/7 on our Contact Page.\n\nWe typically respond within **2 to 4 business hours** to schedule a video discovery call.`,
    routes: [
      { label: 'Go to Contact Page', href: '/contact' },
      { label: 'Request a Project Quote', href: '/downloads/request-quote' },
    ],
    followUps: [
      'Where is Wellbit located?',
      'Can we sign an NDA first?',
      'Do you work with international clients?',
    ],
  },

  // 12. Location, Global Clients & Timezones
  {
    id: 'location-clients',
    title: 'Locations & Global Collaboration',
    keywords: ['location', 'where are you', 'country', 'city', 'india', 'remote', 'timezone', 'international', 'clients', 'usa', 'europe', 'uk'],
    patterns: [
      /where (are you|is wellbit) (located|based)/i,
      /do you work with (international|us|uk|overseas) clients/i,
      /what timezone/i,
    ],
    answer:
      `Wellbit Technologies is headquartered in India and partners with ambitious companies globally—including clients across North America, Europe, the Middle East, and Asia-Pacific.\n\n- **Timezone Overlap**: We maintain dedicated overlapping working hours with US (EST/PST), European (GMT/CET), and Asian timezones for real-time collaboration.\n- **Communication**: Fast, asynchronous communication via Slack, Teams, GitHub, and weekly video syncs.\n- **Contracts & Invoicing**: Standard international service agreements with secure multi-currency invoicing.`,
    routes: [
      { label: 'Read About Our Company', href: '/about' },
      { label: 'Schedule an Intro Call', href: '/contact' },
    ],
    followUps: [
      'How do we communicate during a project?',
      'What is your client code ownership policy?',
    ],
  },

  // 13. Privacy, IP & Client Code Ownership
  {
    id: 'privacy-ownership',
    title: 'Code Ownership, NDAs & Data Security',
    keywords: ['privacy', 'security', 'nda', 'ip', 'intellectual property', 'ownership', 'gdpr', 'confidentiality', 'contract', 'code ownership', 'who owns the code', 'vendor lock-in'],
    patterns: [
      /who owns the code/i,
      /code ownership/i,
      /intellectual property/i,
      /nda|non-disclosure/i,
      /privacy policy/i,
      /data (security|protection)/i,
      /do you train ai on (my|our) data/i,
    ],
    answer:
      `Your intellectual property and privacy are completely protected at Wellbit:\n\n- 🛡️ **100% Client Code & IP Ownership**: Every line of code, design asset, and architecture blueprint built for your project belongs exclusively to you. No royalties, no vendor lock-in.\n- 🔒 **Mutual NDAs**: We execute comprehensive non-disclosure agreements before reviewing proprietary systems or project specs.\n- 🚫 **Zero AI Training on Your Data**: We never use client proprietary code, documents, or data to train public AI foundation models.\n- 🏢 **Enterprise Security**: Strict zero-trust credential access, encrypted repositories, and full compliance with international data privacy standards.`,
    routes: [
      { label: 'Read Privacy Policy', href: '/privacy-policy' },
      { label: 'Request Mutual NDA', href: '/contact' },
    ],
    followUps: [
      'How do you handle source code transfer?',
      'Can we host on our own private cloud?',
    ],
  },

  // 14. Technology Stack Specifics
  {
    id: 'tech-stack',
    title: 'Supported Technology Stacks',
    keywords: ['tech stack', 'technologies', 'languages', 'frameworks', 'tools', 'python', 'go', 'golang', 'react', 'flutter', 'next', 'node', 'docker', 'kubernetes', 'typescript'],
    patterns: [
      /tech(nology)? stack/i,
      /what (technologies|languages|frameworks|tools) (do you|does wellbit) use/i,
      /do you (work with|support|use) (react|flutter|python|go|node|nextjs|aws)/i,
    ],
    answer:
      `We focus on modern, production-proven technologies that ensure high performance and maintainability:\n\n- **Backend**: Go (Golang), Node.js / TypeScript, Python (FastAPI, Django), gRPC.\n- **Frontend & Mobile**: React, Next.js, Astro, React Native, Flutter, Tailwind CSS.\n- **Databases & Streaming**: PostgreSQL, pgvector, Apache Kafka, MongoDB Atlas, Redis.\n- **Cloud & DevOps**: AWS, Google Cloud (GCP), Kubernetes, Docker, Terraform, Prometheus, GitHub Actions.\n- **AI & Automation**: LangChain, LlamaIndex, OpenAI, Anthropic Claude, Google Gemini.`,
    routes: [
      { label: 'Explore Interactive Tech Matrix', href: '/#tech-stack' },
      { label: 'Discuss Your Preferred Stack', href: '/contact' },
    ],
    followUps: [
      'Can you work with our existing stack?',
      'Do you build with Go or Node.js?',
      'Can you help with microservices migration?',
    ],
  },

  // 15. About Wellbit & Company Story
  {
    id: 'about-wellbit',
    title: 'About Wellbit Technologies',
    keywords: ['about', 'company', 'who is wellbit', 'story', 'mission', 'founded', 'team', 'values', 'why wellbit'],
    patterns: [
      /about( wellbit)?/i,
      /who is wellbit/i,
      /what is wellbit/i,
      /why (should i|choose) wellbit/i,
    ],
    answer:
      `**Wellbit Technologies** is an enterprise technology solutions partner dedicated to high-impact software engineering:\n\n- **Motto**: *"Engineering Intelligence. Building Possibilities."*\n- **What Sets Us Apart**: We're not an outsourced body shop. We act as genuine engineering partners—bringing senior architecture rigor, zero vendor lock-in, and modern AI capabilities to every product we touch.\n- **Leadership**: Founded by veteran software architects who value engineering craftsmanship, transparent communication, and measurable client ROI.`,
    routes: [
      { label: 'Read Our Story', href: '/about' },
      { label: 'View Capabilities Guide', href: '/downloads/core-capabilities' },
      { label: 'Contact Leadership', href: '/contact' },
    ],
    followUps: [
      'What services does Wellbit offer?',
      'How do you compare to other agencies?',
    ],
  },

  // 16. Dedicated Developers / Team Augmentation
  {
    id: 'team-augmentation',
    title: 'Hire Dedicated Engineers or Pods',
    keywords: ['hire', 'dedicated team', 'developers', 'engineers', 'staff augmentation', 'team augmentation', 'outsource', 'pod'],
    patterns: [
      /can (i|we) hire (developers|engineers|a team)/i,
      /dedicated (team|engineers|developers|pod)/i,
      /staff augmentation/i,
    ],
    answer:
      `Yes, absolutely! We offer **Dedicated Engineering Pods** that integrate directly into your workflow:\n\n- **Custom Team Composition**: Senior Full-Stack Developers, Cloud/DevOps Engineers, and AI Specialists selected specifically for your tech stack.\n- **Seamless Integration**: Your engineers work in your Slack, join your standups, and push code directly to your GitHub/GitLab repositories.\n- **Flexible Scaling**: Scale your pod up or down with 30-day flexibility.\n- **Vetted Senior Talent**: Every engineer is thoroughly tested on algorithmic design, system architecture, and clear communication.`,
    routes: [
      { label: 'Request Dedicated Engineers', href: '/contact' },
      { label: 'Get a Team Rate Card', href: '/downloads/request-quote' },
    ],
    followUps: [
      'How fast can a dedicated team start?',
      'What are your monthly rates?',
    ],
  },
];

// Fallback intelligent response when query is outside predefined topics
export const FALLBACK_RESPONSE = {
  answer:
    `That's a great question! While I don't have that exact detail in my immediate docs, Wellbit's engineering team specializes in custom software, mobile apps, cloud DevOps, and enterprise AI.\n\nWould you like me to connect you directly with one of our engineering leads, or can I point you toward one of our core services?`,
  routes: [
    { label: 'Talk to an Engineering Lead', href: '/contact' },
    { label: 'Request a Project Quote', href: '/downloads/request-quote' },
    { label: 'Explore Our Core Services', href: '/#services-overview' },
  ],
  followUps: [
    'What services does Wellbit offer?',
    'How much does a project cost?',
    'How can I contact your team?',
  ],
};

// Matcher Algorithm with enhanced synonym and semantic scoring
export function findBestAnswer(query: string): {
  answer: string;
  routes?: RouteAction[];
  followUps?: string[];
  matchedTitle?: string;
} {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return {
      ...FALLBACK_RESPONSE,
      answer: "Hey! What would you like to know about Wellbit? Ask me about our custom software, mobile apps, cloud infrastructure, AI solutions, or project pricing!",
    };
  }

  // 1. Direct Regex Pattern Matching (Highest Precision)
  for (const entry of KNOWLEDGE_BASE) {
    for (const pattern of entry.patterns) {
      if (pattern.test(trimmed)) {
        return {
          answer: entry.answer,
          routes: entry.routes,
          followUps: entry.followUps,
          matchedTitle: entry.title,
        };
      }
    }
  }

  // 2. Tokenize and Keyword Weight Scoring
  const cleanTokens = trimmed
    .replace(/[^\w\s]/gi, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2);

  let bestEntry: KnowledgeEntry | null = null;
  let highestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;

    for (const keyword of entry.keywords) {
      const lowerKeyword = keyword.toLowerCase();

      // Exact substring match
      if (trimmed === lowerKeyword) {
        score += 10;
      } else if (trimmed.includes(lowerKeyword)) {
        score += lowerKeyword.length > 4 ? 6 : 4;
      }

      // Token match
      for (const token of cleanTokens) {
        if (lowerKeyword === token) {
          score += 4;
        } else if (lowerKeyword.includes(token) || token.includes(lowerKeyword)) {
          score += 1.5;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestEntry = entry;
    }
  }

  // Acceptance threshold for keyword matching
  if (bestEntry && highestScore >= 3.5) {
    return {
      answer: bestEntry.answer,
      routes: bestEntry.routes,
      followUps: bestEntry.followUps,
      matchedTitle: bestEntry.title,
    };
  }

  return FALLBACK_RESPONSE;
}
