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
  '🧠 How do your AI agents & RAG work?',
  '📱 Can you build cross-platform mobile apps?',
  '☁️ What cloud & DevOps stacks do you support?',
  '💰 How much does a custom project cost?',
  '📞 How do I get in touch or request a quote?',
];

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // 1. Greetings & Identity
  {
    id: 'greetings',
    title: 'Hello & Welcome',
    keywords: ['hello', 'hi', 'hey', 'greetings', 'morning', 'afternoon', 'evening', 'who are you', 'what is this', 'help'],
    patterns: [
      /^(hi|hello|hey|hola|greetings)/i,
      /who are you/i,
      /what is wellbit/i,
      /what can you do/i,
    ],
    answer:
      `Hello! I am the **Wellbit AI Navigator** ✦.\n\nI can help you explore our engineering capabilities, custom software services, enterprise AI solutions, cloud infrastructure, and direct you to the right project tools or consultation channels.\n\nWhat are you planning to build or optimize today?`,
    routes: [
      { label: 'Explore Core Services', href: '/#services-overview' },
      { label: 'Request a Project Quote', href: '/downloads/request-quote' },
      { label: 'Contact Engineering Team', href: '/contact' },
    ],
    followUps: [
      'What services does Wellbit offer?',
      'How does Wellbit handle AI solutions?',
      'How do I request a quote?',
    ],
  },

  // 2. Services Overview
  {
    id: 'services-overview',
    title: 'Core Engineering Services',
    keywords: ['services', 'offer', 'capabilities', 'what do you do', 'solutions', 'disciplines', 'work'],
    patterns: [
      /what (services|solutions|capabilities) (do you|does wellbit) (offer|have|provide)/i,
      /core services/i,
      /all services/i,
    ],
    answer:
      `Wellbit provides full-spectrum digital product engineering across four key disciplines:\n\n1. **Custom Software & Distributed Systems**: High-concurrency backend services, event-driven architectures (Kafka), and robust APIs.\n2. **Mobile & Web App Development**: High-performance iOS/Android apps (React Native, Flutter) and progressive web apps (Next.js, Astro).\n3. **Cloud Infrastructure & DevOps**: Immutable IaC (Terraform), Kubernetes multi-region clusters, and automated CI/CD pipelines.\n4. **Enterprise AI & Autonomous Agents**: Deterministic multi-agent workflows, private enterprise RAG, and document intelligence.`,
    routes: [
      { label: 'Custom Software Engineering', href: '/services/software-development' },
      { label: 'Mobile & Web Development', href: '/services/app-development' },
      { label: 'Cloud Infrastructure & SRE', href: '/services/cloud-devops' },
      { label: 'Enterprise AI & Automation', href: '/solutions' },
    ],
    followUps: [
      'Tell me about custom software development',
      'What mobile frameworks do you use?',
      'How do you deploy cloud infrastructure?',
    ],
  },

  // 3. Custom Software & Backend Development
  {
    id: 'software-dev',
    title: 'Custom Software & Distributed Systems',
    keywords: ['software', 'backend', 'microservices', 'distributed', 'api', 'kafka', 'go', 'golang', 'node', 'fastapi', 'database', 'postgres'],
    patterns: [
      /software( development)?/i,
      /backend/i,
      /microservice/i,
      /distributed system/i,
      /api integration/i,
      /kafka/i,
    ],
    answer:
      `Our **Custom Software & Distributed Systems** practice specializes in:\n\n- **Resilient Microservices**: Built in Go, Node.js, and Python/FastAPI designed for 100k+ ops/sec throughput.\n- **Event-Driven Streaming**: Real-time event streaming with Apache Kafka, RabbitMQ, and Redis.\n- **Optimized Persistence**: Distributed SQL/NoSQL architectures with PostgreSQL, pgvector, and MongoDB Atlas with sub-110ms p99 latencies.\n- **Zero Vendor Lock-In**: Clean modular code architectures with 100% client intellectual property ownership.`,
    routes: [
      { label: 'Explore Software Engineering', href: '/services/software-development' },
      { label: 'Request Architecture Blueprint', href: '/downloads/request-quote' },
    ],
    followUps: [
      'What databases do you support?',
      'How do you manage client code ownership?',
      'Can you migrate legacy systems?',
    ],
  },

  // 4. Mobile & Web App Development
  {
    id: 'app-dev',
    title: 'Mobile & Web App Development',
    keywords: ['mobile', 'app', 'ios', 'android', 'react native', 'flutter', 'swift', 'kotlin', 'pwa', 'frontend', 'nextjs', 'web app'],
    patterns: [
      /mobile (app|application)/i,
      /app development/i,
      /ios/i,
      /android/i,
      /react native/i,
      /flutter/i,
      /web (app|application)/i,
    ],
    answer:
      `Our **Mobile & Web App Engineering** delivers native-grade experiences for iOS, Android, and modern browsers:\n\n- **Cross-Platform & Native**: Built with React Native, Flutter, Swift, and Kotlin achieving fluid 60 FPS performance.\n- **Offline-First Synchronization**: Local database caching (WatermelonDB / SQLite) with seamless background cloud sync.\n- **Modern Full-Stack Web**: High-speed web applications with Next.js, React, Tailwind CSS, and Astro.\n- **Hardware & Sensor Integration**: Biometrics, Bluetooth BLE, push notifications, and GPS tracking.`,
    routes: [
      { label: 'Explore App Development', href: '/services/app-development' },
      { label: 'Start an App Project', href: '/contact' },
    ],
    followUps: [
      'Should I choose Flutter or React Native?',
      'How fast can we build an MVP?',
      'Do you help publish to the App Store & Google Play?',
    ],
  },

  // 5. Cloud Infrastructure & DevOps (SRE)
  {
    id: 'cloud-devops',
    title: 'Cloud Infrastructure & DevOps',
    keywords: ['cloud', 'devops', 'sre', 'aws', 'gcp', 'kubernetes', 'k8s', 'docker', 'terraform', 'ci/cd', 'infrastructure', 'uptime', 'monitoring'],
    patterns: [
      /cloud( infrastructure)?/i,
      /devops/i,
      /sre/i,
      /kubernetes|k8s/i,
      /terraform/i,
      /ci[\/\s]?cd/i,
      /aws|gcp|azure/i,
    ],
    answer:
      `Our **Cloud Infrastructure & DevOps (SRE)** practice provides automated, production-grade cloud environments:\n\n- **Infrastructure as Code (IaC)**: Deterministic, immutable environments codified in Terraform and Terragrunt.\n- **Container Orchestration**: Multi-region Kubernetes (EKS, GKE) with automated autoscaling and self-healing.\n- **Zero-Downtime CI/CD**: Blue-green and canary automated pipelines via GitHub Actions and ArgoCD.\n- **Site Reliability & Observability**: Real-time telemetry using Prometheus, Grafana, OpenTelemetry, and 99.99% uptime SLAs.`,
    routes: [
      { label: 'Explore Cloud & DevOps', href: '/services/cloud-devops' },
      { label: 'Schedule Cloud Audit', href: '/contact' },
    ],
    followUps: [
      'Do you support both AWS and GCP?',
      'How do you ensure zero-downtime deployments?',
      'What is your uptime guarantee?',
    ],
  },

  // 6. Enterprise AI & Autonomous Workflows
  {
    id: 'ai-solutions',
    title: 'Enterprise AI & Autonomous Agents',
    keywords: ['ai', 'artificial intelligence', 'agent', 'agents', 'rag', 'llm', 'langchain', 'openai', 'claude', 'gemini', 'vector', 'automation', 'neural'],
    patterns: [
      /ai( solutions| agents)?/i,
      /artificial intelligence/i,
      /autonomous agent/i,
      /rag|retrieval augmented/i,
      /llm|large language model/i,
      /document intelligence/i,
    ],
    answer:
      `Wellbit engineers deterministic, enterprise-grade AI systems that integrate directly into your operational pipelines:\n\n- **Multi-Agent Task Workflows**: Autonomous task loops designed with strict human-in-the-loop verification guardrails.\n- **Private Enterprise RAG**: Semantic retrieval over your private contracts, knowledge bases, and documentation with zero public model training.\n- **Vector Search & Embeddings**: Scalable semantic indices built on pgvector, Pinecone, and Qdrant.\n- **Custom LLM Fine-Tuning**: Structured output pipelines powered by Claude, OpenAI, and Google Gemini models.`,
    routes: [
      { label: 'Explore Enterprise AI Solutions', href: '/solutions' },
      { label: 'View AI Automation Blueprints', href: '/solutions#ai-workflows' },
      { label: 'Schedule AI Strategy Call', href: '/contact' },
    ],
    followUps: [
      'Is our proprietary data safe with RAG?',
      'What AI models do you use?',
      'Can AI agents automate internal back-office workflows?',
    ],
  },

  // 7. Pricing, Cost & Quote Inquiries
  {
    id: 'pricing-quote',
    title: 'Pricing & Project Quotes',
    keywords: ['pricing', 'price', 'cost', 'quote', 'estimate', 'budget', 'rate', 'hire', 'contract', 'fee', 'how much'],
    patterns: [
      /how much (does it cost|is it)/i,
      /pricing|cost|rates|quote/i,
      /get a quote/i,
      /request a quote/i,
      /hiring model/i,
      /project budget/i,
    ],
    answer:
      `We offer flexible engagement models tailored to your project scope and organizational phase:\n\n1. **Fixed-Scope Milestones**: Ideal for defined MVPs, architecture builds, and targeted project deliverables.\n2. **Dedicated Engineering Pods**: Dedicated squads (architects, full-stack engineers, DevOps) embedded on a monthly sprint retainer.\n3. **Architecture & SRE Consultations**: Targeted audits, security assessments, and infrastructure modernization.\n\nYou can submit your technical scope via our interactive quote request tool to receive a comprehensive roadmap and estimate within 24-48 business hours.`,
    routes: [
      { label: 'Request a Project Quote', href: '/downloads/request-quote' },
      { label: 'Book Discovery Consultation', href: '/contact' },
    ],
    followUps: [
      'How fast do you respond to quote requests?',
      'Can you work with startup budgets?',
      'Do you offer free initial technical discovery?',
    ],
  },

  // 8. Contact, Phone & Email
  {
    id: 'contact',
    title: 'Contact Information & Inquiries',
    keywords: ['contact', 'email', 'phone', 'call', 'reach', 'address', 'location', 'office', 'talk', 'whatsapp', 'inquiry'],
    patterns: [
      /how (can|do) i (contact|reach|call|email) you/i,
      /contact info(rmation)?/i,
      /phone number/i,
      /email address/i,
      /office location/i,
    ],
    answer:
      `We would love to discuss your technical goals! Here are direct ways to connect with Wellbit Technologies:\n\n- 📧 **Direct Email**: [m.hasanmzp@gmail.com](mailto:m.hasanmzp@gmail.com)\n- 📞 **Direct Phone**: [+91 8948626497](tel:+918948626497)\n- 🌐 **Project Inquiry Form**: Available 24/7 on our Contact Page.\n- ⏱️ **Turnaround Time**: Initial responses delivered within 4 business hours.`,
    routes: [
      { label: 'Go to Contact Page', href: '/contact' },
      { label: 'Fill Quote Request Form', href: '/downloads/request-quote' },
    ],
    followUps: [
      'Where is Wellbit located?',
      'Do you work with international clients?',
      'Can we sign an NDA first?',
    ],
  },

  // 9. About Wellbit & Company Details
  {
    id: 'about-company',
    title: 'About Wellbit Technologies',
    keywords: ['about', 'company', 'who is wellbit', 'story', 'mission', 'founded', 'team', 'values', 'why wellbit'],
    patterns: [
      /about( wellbit)?/i,
      /who is wellbit/i,
      /company overview/i,
      /why choose wellbit/i,
      /where are you located/i,
    ],
    answer:
      `**Wellbit Technologies** is an enterprise technology solutions partner headquartered in India and serving clients worldwide.\n\n- **Our Mission**: To engineer high-availability software foundations, autonomous AI systems, and scalable cloud platforms that compound business velocity.\n- **Our Motto**: *"Engineering Intelligence. Building Possibilities."*\n- **Engineering Culture**: We prioritize clean code architectures, transparent communication, zero proprietary lock-in, and production-tested scalability.`,
    routes: [
      { label: 'Read Company Story', href: '/about' },
      { label: 'View Capabilities Brochure', href: '/downloads/core-capabilities' },
    ],
    followUps: [
      'What is your client code ownership policy?',
      'What industries do you serve?',
      'How does Wellbit compare to standard agencies?',
    ],
  },

  // 10. Privacy, Data Protection & Client IP Ownership
  {
    id: 'privacy-security',
    title: 'Data Security, NDAs & Code Ownership',
    keywords: ['privacy', 'security', 'nda', 'ip', 'intellectual property', 'ownership', 'gdpr', 'confidentiality', 'contract', 'code ownership'],
    patterns: [
      /code ownership/i,
      /who owns the code/i,
      /nda|non-disclosure/i,
      /privacy policy/i,
      /security|data protection/i,
      /do you train ai on my data/i,
    ],
    answer:
      `We adhere to strict institutional data governance and intellectual property standards:\n\n- **100% Client Code & IP Ownership**: All source code, assets, and repositories created during your project belong exclusively to you.\n- **Zero AI Training on Your Data**: We never use client proprietary code, databases, or documents to train or tune public foundation models.\n- **Standard Bilateral NDAs**: We execute comprehensive non-disclosure agreements prior to technical discovery.\n- **Institutional Security**: TLS 1.3 transit encryption, AES-256 database encryption at rest, and strict zero-trust credential access.`,
    routes: [
      { label: 'Review Privacy Policy', href: '/privacy-policy' },
      { label: 'Contact Legal / Request NDA', href: '/contact' },
    ],
    followUps: [
      'How do you secure cloud environments?',
      'Do you comply with GDPR and DPDP?',
      'Can we host on our own cloud infrastructure?',
    ],
  },

  // 11. Technology Stack
  {
    id: 'tech-stack',
    title: 'Supported Technology Stacks',
    keywords: ['tech stack', 'technologies', 'languages', 'frameworks', 'tools', 'python', 'go', 'react', 'flutter', 'next', 'node', 'docker', 'kubernetes'],
    patterns: [
      /tech(nology)? stack/i,
      /what (technologies|languages|frameworks) do you use/i,
      /supported technologies/i,
    ],
    answer:
      `Our engineering team specializes in battle-tested, modern technology stacks:\n\n- **Backend**: Go (Golang), Node.js, TypeScript, Python, FastAPI, gRPC.\n- **Frontend & Mobile**: React, Next.js, Astro, React Native, Flutter, Swift, Kotlin, Tailwind CSS.\n- **Data & Streaming**: PostgreSQL, Apache Kafka, MongoDB, Redis, pgvector, Elasticsearch.\n- **Cloud & Orchestration**: AWS, Google Cloud (GCP), Kubernetes (EKS/GKE), Docker, Terraform, ArgoCD, Prometheus.`,
    routes: [
      { label: 'Explore Interactive Tech Matrix', href: '/#tech-stack' },
      { label: 'Discuss Custom Stack', href: '/contact' },
    ],
    followUps: [
      'Can you work with existing legacy codebases?',
      'Do you do microservices migration?',
      'What is your backend framework of choice?',
    ],
  },

  // 12. Support & Architecture Blueprints
  {
    id: 'support-resources',
    title: 'Technical Resources & Blueprints',
    keywords: ['blueprint', 'blueprints', 'documentation', 'knowledge base', 'whitepaper', 'articles', 'support', 'resources'],
    patterns: [
      /blueprints?/i,
      /whitepapers?/i,
      /knowledge base/i,
      /documentation/i,
      /articles/i,
    ],
    answer:
      `We publish in-depth architectural blueprints and technical reference guides for engineering teams:\n\n- **Architecture Blueprints**: Reference patterns for microservices, event streaming, and hybrid cloud.\n- **Whitepapers & Guides**: Deep-dives into enterprise RAG architectures and zero-downtime deployment pipelines.\n- **Knowledge Base**: Curated troubleshooting, benchmarks, and API implementation standards.`,
    routes: [
      { label: 'Architecture Blueprints', href: '/support/architecture-blueprints' },
      { label: 'Technical Whitepapers', href: '/support/whitepapers' },
      { label: 'Knowledge Base', href: '/support/knowledge-base' },
    ],
    followUps: [
      'How do I download the blueprints?',
      'Can I request a custom architecture design?',
    ],
  },
];

// Fallback intelligent response when query is outside predefined topics
export const FALLBACK_RESPONSE = {
  answer:
    `I don't have exact documentation on that specific query, but Wellbit's engineering team handles end-to-end custom software development, mobile & web applications, cloud infrastructure (SRE), and enterprise AI systems.\n\nWould you like to speak directly with an engineering lead or explore our primary service capabilities?`,
  routes: [
    { label: 'Contact Engineering Team', href: '/contact' },
    { label: 'Request a Project Quote', href: '/downloads/request-quote' },
    { label: 'Explore All Services', href: '/#services-overview' },
  ],
  followUps: [
    'What services does Wellbit offer?',
    'How do I request a quote?',
    'What technology stacks do you support?',
  ],
};

// Matcher Algorithm
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
      answer: "Please ask any question about Wellbit's software engineering services, AI solutions, cloud infrastructure, or pricing!",
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

  // 2. Keyword & Token Weight Scoring
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
      // Exact keyword match
      if (trimmed.includes(lowerKeyword)) {
        score += lowerKeyword.length > 5 ? 5 : 3;
      }
      // Token overlap
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
  if (bestEntry && highestScore >= 3) {
    return {
      answer: bestEntry.answer,
      routes: bestEntry.routes,
      followUps: bestEntry.followUps,
      matchedTitle: bestEntry.title,
    };
  }

  return FALLBACK_RESPONSE;
}
