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
  '🎨 Do you do UI/UX design or only code?',
  '📞 How can I schedule a discovery call?',
];

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // 1. Warm Greetings & Introduction
  {
    id: 'greetings',
    title: 'Hello & Welcome',
    keywords: ['hello', 'hi', 'hey', 'greetings', 'morning', 'afternoon', 'evening', 'yo', 'hola', 'sup'],
    patterns: [
      /^(hi|hello|hey|hola|greetings|yo|sup|good\s*(morning|afternoon|evening))/i,
    ],
    answer:
      `Hey there! 👋 I'm **Nova**, your engineering copilot at Wellbit.\n\nWhether you're exploring custom software development, mobile & web apps, cloud infrastructure, or enterprise AI, I'm here to give you exact, helpful answers and guide you to the right place.\n\nWhat are you planning to build or improve today?`,
    routes: [
      { label: 'Explore Core Services', href: '/#services-overview' },
      { label: 'Request a Project Quote', href: '/downloads/request-quote' },
      { label: 'Talk to an Engineer', href: '/contact' },
    ],
    followUps: [
      'What services does Wellbit offer?',
      'How much does a project cost?',
      'Can you build an MVP for my startup?',
    ],
  },

  // 2. Persona, Bot or Human
  {
    id: 'persona_bot',
    title: 'Who is Nova (AI vs Human)',
    keywords: ['who are you', 'are you human', 'are you a bot', 'are you real', 'who made you', 'who built you', 'what are you', 'what is nova'],
    patterns: [
      /who are you/i,
      /are you (a )?(human|bot|ai|robot|person|real)/i,
      /who (made|built|created) you/i,
      /what('s| is) your name/i,
      /what is nova/i,
    ],
    answer:
      `I am **Nova** ✦, an interactive AI architectural assistant built by the engineering team at Wellbit Technologies!\n\nWhile I am an AI trained on all of Wellbit's capabilities, architectures, and pricing models, I work hand-in-hand with our real human engineering leads and software architects. If you'd like to speak with a human lead directly, we can hop on a video call anytime!`,
    routes: [
      { label: 'Schedule a Call with a Human Lead', href: '/contact' },
      { label: 'Read About Wellbit', href: '/about' },
    ],
    followUps: [
      'How can I schedule a call?',
      'What services does Wellbit offer?',
    ],
  },

  // 3. Casual Smalltalk & Humor
  {
    id: 'casual_smalltalk',
    title: 'Friendly Smalltalk & Joke',
    keywords: ['how are you', 'hows it going', 'whats up', 'how do you do', 'tell me a joke', 'joke', 'funny', 'are you happy'],
    patterns: [
      /how are you/i,
      /how('s| is) it going/i,
      /what('s| is) up/i,
      /tell me a joke/i,
      /make me laugh/i,
    ],
    answer:
      `I'm doing fantastic, thank you for asking! 😊 Ready to help turn ambitious ideas into clean, scalable software.\n\n*Here's a quick one for you:* Why do software engineers prefer dark mode?\nBecause light attracts bugs! 🐛\n\nHow can I help you with your software or AI project today?`,
    routes: [
      { label: 'Explore What We Build', href: '/#services-overview' },
      { label: 'Start a Project Conversation', href: '/contact' },
    ],
    followUps: [
      'What services does Wellbit offer?',
      'Can you build mobile apps?',
    ],
  },

  // 4. Polite Pleasantries
  {
    id: 'pleasantries',
    title: 'Thanks & Goodbyes',
    keywords: ['thank', 'thanks', 'appreciate', 'awesome', 'cool', 'great', 'perfect', 'bye', 'goodbye', 'see you', 'nice', 'helpful'],
    patterns: [
      /^(thanks|thank you|thx|awesome|cool|great|perfect|nice|appreciate)/i,
      /^(bye|goodbye|see ya|cya|take care)/i,
    ],
    answer:
      `You're very welcome! 😊 Glad I could help. If any other questions come up about architectures, timelines, or quotes, I'm always right here.\n\nWhenever you're ready to take the next step, our engineering team would love to connect!`,
    routes: [
      { label: 'Schedule Discovery Call', href: '/contact' },
      { label: 'Request a Project Quote', href: '/downloads/request-quote' },
    ],
    followUps: [
      'What services does Wellbit offer?',
      'How do I contact Wellbit?',
    ],
  },

  // 5. Core Services Overview
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

  // 6. Startup & MVP Acceleration
  {
    id: 'mvp_startup',
    title: 'Startups & Fast MVP Development',
    keywords: ['mvp', 'startup', 'founder', 'early stage', 'prototype', 'idea', 'poc', 'proof of concept', 'build an mvp', 'launch fast'],
    patterns: [
      /build (an? )?mvp/i,
      /startup/i,
      /founder/i,
      /proof of concept|poc/i,
      /prototype/i,
      /i have an idea/i,
    ],
    answer:
      `We love working with startups and early-stage founders! 🚀\n\nHere is how we help you launch fast without compromising quality:\n- **Rapid 4 to 8-Week MVP Delivery**: We strip away unnecessary complexity to ship your core value proposition to initial users fast.\n- **Production-Ready Foundation**: Unlike disposable prototypes, our MVPs are built on clean architectures (e.g. Go, Node, React Native, PostgreSQL) that can scale to 100k+ users without needing a complete rewrite.\n- **Full IP Ownership**: You own 100% of the code, designs, and database from Day 1—ready for investor due diligence.\n- **Investor Demo Ready**: Polished UI, fast response times, and automated deployment pipelines.`,
    routes: [
      { label: 'Get an MVP Estimate', href: '/downloads/request-quote' },
      { label: 'Book Founder Discovery Call', href: '/contact' },
    ],
    followUps: [
      'How much does an MVP cost?',
      'Do you do UI/UX design too?',
      'Can you help with post-launch iterations?',
    ],
  },

  // 7. UI/UX Design & Figma
  {
    id: 'ui_ux_figma',
    title: 'UI/UX Design & Figma Prototyping',
    keywords: ['figma', 'ui', 'ux', 'design', 'designer', 'wireframe', 'prototype', 'mockup', 'adobe xd', 'sketch', 'styling', 'branding', 'do you design'],
    patterns: [
      /do you (do|provide|offer) (ui|ux|design)/i,
      /figma/i,
      /ui[\/\s]?ux/i,
      /i (already )?have (a )?design/i,
      /wireframes?|mockups?/i,
    ],
    answer:
      `Yes, absolutely! We handle both ends of the product lifecycle:\n\n- **If you already have Figma / Adobe XD designs**: Our frontend engineers translate your designs into pixel-perfect, 60 FPS responsive code with clean semantic HTML and Tailwind CSS.\n- **If you need design from scratch**: Our product designers create modern design systems, user flows, interactive Figma prototypes, and sleek modern UI tailored to your brand identity before writing a single line of code.`,
    routes: [
      { label: 'Explore Web & Mobile Engineering', href: '/services/app-development' },
      { label: 'Share Your Figma Link for Review', href: '/contact' },
    ],
    followUps: [
      'Can you review my existing Figma designs?',
      'What mobile frameworks do you use?',
    ],
  },

  // 8. Custom Software & Backend Engineering
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
      `Custom backend and distributed systems engineering is one of our deepest specialties:\n\n- **High-Throughput Backends**: Written in Go, Node.js, and Python (FastAPI), engineered to handle 100k+ ops/sec with sub-110ms latency.\n- **Event Streaming & Real-Time Data**: Reliable asynchronous messaging using Apache Kafka, RabbitMQ, and Redis.\n- **Optimized Persistence**: Distributed SQL & NoSQL data layers (PostgreSQL, MongoDB, pgvector) with automated backups and read-replicas.\n- **Clean Architecture**: Decoupled, modular codebases with automated unit/integration tests and zero vendor lock-in.`,
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

  // 9. Mobile App Development
  {
    id: 'app-dev',
    title: 'Mobile App Development (iOS & Android)',
    keywords: ['mobile', 'app', 'apps', 'ios', 'android', 'iphone', 'react native', 'flutter', 'swift', 'kotlin', 'app store', 'play store', 'mobile app'],
    patterns: [
      /mobile (app|application|development)/i,
      /build (an? )?(app|mobile app)/i,
      /app development/i,
      /ios|android|iphone/i,
      /react native|flutter/i,
      /app store|google play/i,
    ],
    answer:
      `We build fluid, responsive apps for mobile (iOS & Android):\n\n- **Cross-Platform Excellence**: Using React Native and Flutter, giving you 60 FPS native feel with a single shared codebase (saving 40% on build and maintenance costs).\n- **Native iOS & Android**: Swift and Kotlin for hardware-intensive features, background geofencing, or BLE accessories.\n- **Offline-First Synchronization**: Local caching (WatermelonDB / SQLite) so your users can work smoothly without internet, auto-syncing when back online.\n- **Store Deployment**: We handle the entire App Store and Google Play submission and approval process for you.`,
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

  // 10. Web Apps, SaaS & PWAs
  {
    id: 'web_apps_saas',
    title: 'Web Apps, SaaS Platforms & PWAs',
    keywords: ['web', 'website', 'web app', 'saas', 'nextjs', 'react', 'astro', 'pwa', 'frontend', 'dashboard', 'portal', 'subscription platform'],
    patterns: [
      /web (app|application|development)/i,
      /build (a )?(website|web app|saas|portal|dashboard)/i,
      /saas/i,
      /next[\s-]?js/i,
      /pwa|progressive web app/i,
    ],
    answer:
      `We engineer high-performance web applications and multi-tenant SaaS platforms:\n\n- **Modern Full-Stack Frameworks**: Next.js, React, Astro, and Tailwind CSS delivering sub-second page loads and top Core Web Vitals.\n- **SaaS Architecture**: Multi-tenancy, user authentication (OAuth, SSO, JWT), role-based permissions (RBAC), and recurring subscription billing (Stripe).\n- **Progressive Web Apps (PWAs)**: Installable web apps with offline service workers and push notifications.\n- **Administrative Dashboards**: Rich real-time analytical dashboards, data tables, filtering, and CSV/PDF reporting.`,
    routes: [
      { label: 'Explore Web Engineering', href: '/services/app-development' },
      { label: 'Request SaaS Architecture Estimate', href: '/downloads/request-quote' },
    ],
    followUps: [
      'Can you integrate Stripe or payment gateways?',
      'Do you support multi-tenant databases?',
      'How fast will the website load?',
    ],
  },

  // 11. Payment Gateways & Subscriptions
  {
    id: 'payments_stripe',
    title: 'Payment Gateways & Subscription Billing',
    keywords: ['stripe', 'payment', 'payments', 'razorpay', 'paypal', 'apple pay', 'google pay', 'checkout', 'billing', 'subscription', 'invoice', 'credit card'],
    patterns: [
      /payment( gateway| processing| integration)?/i,
      /stripe|razorpay|paypal/i,
      /subscription billing|recurring payments/i,
      /checkout/i,
    ],
    answer:
      `Yes! We have extensive experience integrating secure, PCI-compliant payment gateways:\n\n- **Global Gateways**: Stripe (Payments, Billing, Subscriptions, Connect for marketplaces), PayPal, and Apple/Google Pay.\n- **Regional Gateways**: Razorpay, Cashfree, and UPI for Indian and APAC markets.\n- **Subscription Engines**: Recurring billing, tier upgrades/downgrades, automated invoice receipts, pro-rata calculations, and webhook failure retries.\n- **Security**: Zero raw card data touches your servers—tokenized transactions compliant with PCI-DSS standards.`,
    routes: [
      { label: 'Discuss Payment Integration', href: '/contact' },
      { label: 'Request Project Quote', href: '/downloads/request-quote' },
    ],
    followUps: [
      'Can you build a marketplace with vendor payouts?',
      'How do you handle subscription renewals?',
    ],
  },

  // 12. eCommerce & Custom Marketplaces
  {
    id: 'ecommerce_marketplace',
    title: 'eCommerce & Custom Marketplaces',
    keywords: ['ecommerce', 'e-commerce', 'shop', 'store', 'marketplace', 'multi vendor', 'shopping cart', 'catalog', 'shopify', 'woocommerce'],
    patterns: [
      /e[\s-]?commerce/i,
      /online (store|shop)/i,
      /marketplace|multi[\s-]?vendor/i,
      /shopping cart/i,
    ],
    answer:
      `We build custom, high-conversion eCommerce platforms and multi-sided marketplaces:\n\n- **Custom vs Headless**: High-speed custom web/mobile storefronts powered by headless APIs or custom microservices.\n- **Multi-Vendor Marketplaces**: Vendor onboarding, commission splits, inventory management, and automated Stripe Connect payouts (like Airbnb or Amazon).\n- **High Concurrency**: Engineered to easily handle flash sales, high traffic spikes, and inventory locking without race conditions.`,
    routes: [
      { label: 'Explore App & Web Solutions', href: '/services/app-development' },
      { label: 'Request Marketplace Estimate', href: '/downloads/request-quote' },
    ],
    followUps: [
      'Can you build an app like Uber or Airbnb?',
      'How do vendor payouts work?',
    ],
  },

  // 13. Clone Apps (Uber, Airbnb, etc.)
  {
    id: 'clone_apps',
    title: 'On-Demand & Marketplace Apps (Like Uber/Airbnb)',
    keywords: ['uber', 'airbnb', 'instagram', 'tinder', 'clone', 'like uber', 'like airbnb', 'on demand', 'delivery app', 'booking app'],
    patterns: [
      /like (uber|airbnb|instagram|doordash|swiggy|zomato)/i,
      /on[\s-]?demand app/i,
      /booking (app|platform)/i,
    ],
    answer:
      `Yes! We build custom on-demand and marketplace platforms inspired by models like Uber, Airbnb, or DoorDash—custom-engineered from the ground up for your specific business niche:\n\n- **Live GPS & Real-Time Tracking**: WebSockets and MQTT for live vehicle, courier, or order location mapping.\n- **Multi-Role Portals**: Dedicated interfaces for customers, service providers/drivers, and administrative staff.\n- **Automated Dispatch & Matching**: Geo-hashing algorithms to automatically match nearest available providers.\n- **In-App Chat & Notifications**: Push notifications, SMS OTP, and instant messaging.`,
    routes: [
      { label: 'Discuss Your On-Demand App', href: '/contact' },
      { label: 'Request Custom Quote', href: '/downloads/request-quote' },
    ],
    followUps: [
      'How long does a marketplace app take?',
      'How much does a custom on-demand app cost?',
    ],
  },

  // 14. Cloud Infrastructure & DevOps (SRE)
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

  // 15. Enterprise AI & Autonomous Workflows
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

  // 16. Legacy Modernization & Bug Fixing
  {
    id: 'legacy_modernization',
    title: 'Legacy Modernization & Code Refactoring',
    keywords: ['legacy', 'refactor', 'slow', 'bugs', 'buggy', 'rewrite', 'fix website', 'fix app', 'optimize', 'performance', 'broken code', 'audit'],
    patterns: [
      /legacy (system|codebase|app)/i,
      /refactor/i,
      /my (app|website) is (slow|buggy|broken)/i,
      /code audit/i,
      /modernize/i,
    ],
    answer:
      `Yes, we specialize in modernizing existing systems without causing downtime or disrupting ongoing operations:\n\n- **Comprehensive Code & Architecture Audit**: We profile your backend, database queries, and frontend assets to pinpoint bottlenecks.\n- **Incremental Strangler Fig Migrations**: We replace legacy monolith components piece-by-piece with modern, high-speed microservices.\n- **Database Optimization**: Indexing, query tuning, connection pooling, and caching (Redis) to turn 5-second queries into 50ms responses.\n- **Security Hardening**: Patching outdated dependencies, resolving vulnerabilities, and upgrading outdated framework versions.`,
    routes: [
      { label: 'Book a Technical Audit', href: '/contact' },
      { label: 'Explore Custom Software', href: '/services/software-development' },
    ],
    followUps: [
      'Can you audit our codebase under an NDA?',
      'How do you avoid downtime during migration?',
    ],
  },

  // 17. QA, Testing & Code Quality
  {
    id: 'qa_testing',
    title: 'QA Testing & Code Reliability',
    keywords: ['qa', 'testing', 'quality', 'test', 'unit test', 'integration test', 'bugs', 'cypress', 'playwright', 'code review', 'reliability'],
    patterns: [
      /how do you test/i,
      /quality assurance|qa/i,
      /automated testing/i,
      /unit testing/i,
    ],
    answer:
      `Quality and reliability are baked into our delivery process from Day 1:\n\n- **Automated Test Suites**: Comprehensive unit, integration, and end-to-end tests (using Jest, PyTest, Go Test, Cypress, Playwright).\n- **Mandatory Peer Code Reviews**: Every pull request requires review from senior architects before merging.\n- **CI/CD Quality Gates**: Automated linting, security vulnerability scanning, and test validation on every commit.\n- **Staging Verification**: Every release is deployed to isolated staging environments for thorough user-acceptance testing before touching production.`,
    routes: [
      { label: 'Read About Our Engineering Standards', href: '/about' },
      { label: 'Request Architecture Blueprint', href: '/support/architecture-blueprints' },
    ],
    followUps: [
      'Do you offer post-launch support and bug warranties?',
      'Who owns the code?',
    ],
  },

  // 18. Post-Launch Maintenance & Support
  {
    id: 'maintenance_support',
    title: 'Post-Launch Support & Maintenance',
    keywords: ['maintenance', 'support', 'warranty', 'post launch', 'after launch', 'sla', 'ongoing support', 'update', 'bug fix', 'retainer'],
    patterns: [
      /after launch/i,
      /post[\s-]?launch/i,
      /maintenance( plan| contract)?/i,
      /support( agreement| plan)?/i,
      /warranty/i,
    ],
    answer:
      `We don't disappear after shipping! We offer structured post-launch support to ensure your product remains healthy:\n\n- **30-Day Launch Warranty**: Free bug-fixing warranty after initial release to guarantee production stability.\n- **Ongoing Maintenance Retainers**: Proactive OS/framework upgrades, third-party API changes, security patches, and cloud monitoring.\n- **Feature Iteration Pods**: Seamless transition into sprint-based feature expansion as your user base grows.\n- **Guaranteed Response SLAs**: Priority support with direct engineering emergency contacts.`,
    routes: [
      { label: 'Discuss Maintenance Options', href: '/contact' },
      { label: 'Request a Project Quote', href: '/downloads/request-quote' },
    ],
    followUps: [
      'What are your monthly support rates?',
      'Can we hire dedicated engineers?',
    ],
  },

  // 19. Pricing, Cost & Quote Inquiries
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

  // 20. Payment Terms & Milestone Schedules
  {
    id: 'payment_terms',
    title: 'Payment Terms & Milestone Structure',
    keywords: ['payment terms', 'milestone payments', 'upfront', 'deposit', 'escrow', 'payment schedule', 'how do we pay', 'invoicing'],
    patterns: [
      /how (do|does) payment(s)? work/i,
      /payment (terms|schedule|structure)/i,
      /do (i|we) pay (all )?upfront/i,
      /milestones?/i,
    ],
    answer:
      `No, we never demand 100% upfront payment! We use fair, milestone-based schedules linked to tangible deliverables:\n\n- **Fixed-Scope Projects**: Typically structured into milestones (e.g. 30% kickoff deposit, 40% mid-project milestone review, 30% upon final acceptance & production deployment).\n- **Dedicated Pods**: Invoiced bi-weekly or monthly on verified sprint deliverables.\n- **Currency & Invoicing**: Secure international wire transfer, credit card via Stripe, or bank transfer in USD, EUR, GBP, or INR.`,
    routes: [
      { label: 'Discuss Project Engagement Terms', href: '/contact' },
      { label: 'Request a Quote', href: '/downloads/request-quote' },
    ],
    followUps: [
      'Who owns the code during development?',
      'Can we sign an NDA first?',
    ],
  },

  // 21. Discounts & Budget Negotiation
  {
    id: 'discounts_budget',
    title: 'Discounts & Flexible Scoping',
    keywords: ['discount', 'cheap', 'cheaper', 'negotiate', 'tight budget', 'lower price', 'can you reduce', 'deal'],
    patterns: [
      /can (i|we) get a discount/i,
      /is (the )?price negotiable/i,
      /(tight|limited|low) budget/i,
      /can you do it cheaper/i,
    ],
    answer:
      `While our rates reflect senior engineering craftsmanship, we are very flexible with **scope tailoring**:\n\n- **Phase 1 MVP Trimming**: If budget is constrained, we help you identify the 20% of features that deliver 80% of the business impact to launch within your budget.\n- **Long-Term Retainer Discounts**: We offer favorable tiered rate reductions for long-term dedicated engineering commitments (6+ months).\n- **Open Source & Equity Models**: For select high-potential startups, we consider custom commercial structures.\n\nTell us your target budget—we'll be honest about what can be built reliably!`,
    routes: [
      { label: 'Share Your Target Budget', href: '/contact' },
      { label: 'Request Custom Proposal', href: '/downloads/request-quote' },
    ],
    followUps: [
      'How much does a basic MVP cost?',
      'How do we schedule a discovery call?',
    ],
  },

  // 22. Guidance for Non-Technical Founders
  {
    id: 'non_technical_founders',
    title: 'Guidance for Non-Technical Founders',
    keywords: ['non technical', 'not technical', 'dont know coding', 'no technical background', 'first time founder', 'help me understand', 'guide me'],
    patterns: [
      /not (very )?technical/i,
      /non[\s-]?technical/i,
      /i don(')?t know (how to code|anything about tech)/i,
      /i don(')?t know what tech stack/i,
    ],
    answer:
      `You are in the right place! Many of our most successful clients are business domain experts without technical backgrounds:\n\n- **Plain English Architecture**: We explain technical trade-offs in clear business terms (speed, cost, scalability) with zero confusing jargon.\n- **Technical Decision Partnership**: We help you select the ideal databases, cloud providers, and frameworks so you avoid costly mistakes.\n- **Product Roadmap Definition**: We help structure your feature ideas into clear visual user stories and wireframes.\n- **Full Transparency**: You get regular video walkthroughs and staging demos at every sprint.`,
    routes: [
      { label: 'Book a Plain-English Discovery Call', href: '/contact' },
      { label: 'Submit Your Idea for Review', href: '/downloads/request-quote' },
    ],
    followUps: [
      'How do you handle client code ownership?',
      'Can you build an MVP for my startup?',
    ],
  },

  // 23. Why Wellbit vs Freelancers (Upwork/Fiverr)
  {
    id: 'agency_vs_freelancers',
    title: 'Why Wellbit vs Freelancers (Upwork / Fiverr)',
    keywords: ['upwork', 'fiverr', 'freelancer', 'freelancers', 'why wellbit', 'why choose you', 'better than freelance', 'agency vs freelancer'],
    patterns: [
      /why (should i )?choose (wellbit|you)/i,
      /vs (freelance|freelancers|upwork|fiverr)/i,
      /better than (a )?freelancer/i,
    ],
    answer:
      `Great question! Working with individual freelancers often leads to ghosting, inconsistent code standards, and no architectural continuity. Here is why partnering with Wellbit is different:\n\n- 🏗️ **Institutional Reliability**: You get a cohesive squad backed by senior system architects, code reviewers, and DevOps engineers—not a lone coder.\n- 🛡️ **Accountability & Warranties**: Legally binding international contracts, mutual NDAs, milestone deliverables, and post-launch bug warranties.\n- ⚡ **Zero Vendor Lock-In**: We write modular, well-documented code adhering to enterprise standards so any future engineer can pick it up effortlessly.\n- 🚀 **Full-Stack Competence**: Seamless coordination between frontend, backend, cloud infra, and AI specialists under one roof.`,
    routes: [
      { label: 'Learn More About Wellbit', href: '/about' },
      { label: 'Start a Project Conversation', href: '/contact' },
    ],
    followUps: [
      'Who owns the code?',
      'What is your project timeline?',
    ],
  },

  // 24. Project Timelines & Speed
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

  // 25. Project Process & Getting Started
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

  // 26. Meetings, Zoom, Google Meet & Scheduling
  {
    id: 'meeting_scheduling',
    title: 'Meetings & Video Consultations',
    keywords: ['meeting', 'zoom', 'google meet', 'call', 'schedule', 'talk', 'video call', 'demo', 'calendar', 'book call'],
    patterns: [
      /can we (have|schedule|book|do) a (call|meeting|zoom|google meet)/i,
      /schedule (a )?(call|meeting|consultation)/i,
      /video call/i,
      /calendar/i,
    ],
    answer:
      `Yes, absolutely! We'd be thrilled to hop on a video call (Zoom or Google Meet) to discuss your vision:\n\n- **Discovery Call Focus**: We discuss your project goals, technical requirements, potential architectures, and rough timelines.\n- **No Sales Pressure**: You talk directly with engineering leadership who understand code and system architecture.\n\nSend a quick note via our contact form or email us at **m.hasanmzp@gmail.com**, and we'll reply with calendar booking links within a few hours!`,
    routes: [
      { label: 'Schedule a Meeting', href: '/contact' },
      { label: 'Request a Written Estimate', href: '/downloads/request-quote' },
    ],
    followUps: [
      'What timezone do you operate in?',
      'Can we sign an NDA before the call?',
    ],
  },

  // 27. Contact, Phone & Email
  {
    id: 'contact-details',
    title: 'Contact Information & Inquiries',
    keywords: ['contact', 'email', 'phone', 'call', 'reach', 'address', 'location', 'office', 'talk', 'whatsapp', 'inquiry', 'phone number', 'email address'],
    patterns: [
      /how (can|do) i (contact|reach|call|email|talk to) you/i,
      /contact (info|details|page)/i,
      /phone number/i,
      /email address/i,
      /whatsapp/i,
    ],
    answer:
      `You can reach our engineering leads directly through any of these channels:\n\n- 📧 **Direct Email**: [m.hasanmzp@gmail.com](mailto:m.hasanmzp@gmail.com)\n- 📞 **Direct Phone / WhatsApp**: [+91 8948626497](tel:+918948626497)\n- 📝 **Online Project Inquiry**: Available 24/7 on our Contact Page.\n\nWe typically respond within **2 to 4 business hours**!`,
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

  // 28. Location & Timezone Overlap
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

  // 29. Code Ownership, IP & NDAs
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

  // 30. Technology Stack
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

  // 31. About Wellbit & Company Story
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

  // 32. Dedicated Developers / Team Augmentation
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

  // 33. Careers & Hiring
  {
    id: 'careers_jobs',
    title: 'Careers & Working at Wellbit',
    keywords: ['careers', 'jobs', 'hiring', 'internship', 'developer job', 'work with you', 'apply', 'career', 'openings'],
    patterns: [
      /are you hiring/i,
      /careers?|jobs?|openings?/i,
      /work at wellbit/i,
      /internship/i,
    ],
    answer:
      `We're always on the lookout for talented software engineers, DevOps specialists, and AI researchers who take pride in high-craft code!\n\nIf you're passionate about Go, Python, React Native, Kubernetes, or autonomous AI systems, send your resume, GitHub profile, and a note about what you love building to **m.hasanmzp@gmail.com**.`,
    routes: [
      { label: 'Send Resume via Contact Form', href: '/contact' },
      { label: 'Explore Engineering Disciplines', href: '/#services-overview' },
    ],
    followUps: [
      'What technologies do you use?',
      'What is Wellbit\'s mission?',
    ],
  },
];

// Fallback intelligent response when query is outside predefined topics
export const FALLBACK_RESPONSE = {
  answer:
    `That's an interesting question! While I'm specialized in Wellbit's software engineering, mobile apps, cloud infrastructure, and enterprise AI, our engineering leads can discuss custom requirements in detail.\n\nWould you like me to connect you with an engineering lead, or can I point you toward one of our core services?`,
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

// Synonym mapping to normalize user intent before matching
const SYNONYMS: Record<string, string[]> = {
  figma: ['ui', 'ux', 'design', 'mockup', 'wireframe'],
  design: ['ui', 'ux', 'figma', 'prototype', 'mockup'],
  mvp: ['startup', 'prototype', 'idea', 'founder', 'fast launch'],
  stripe: ['payment', 'billing', 'subscription', 'checkout', 'razorpay'],
  payment: ['stripe', 'billing', 'checkout', 'razorpay', 'paypal'],
  saas: ['subscription', 'web app', 'portal', 'dashboard'],
  ecommerce: ['shop', 'store', 'marketplace', 'cart'],
  zoom: ['call', 'meeting', 'meet', 'schedule', 'consultation'],
  meeting: ['zoom', 'call', 'calendar', 'schedule', 'talk'],
  discount: ['negotiate', 'budget', 'cheaper', 'price'],
  upwork: ['freelancer', 'agency', 'fiverr'],
  maintenance: ['support', 'sla', 'post launch', 'warranty', 'bug fix'],
  uber: ['airbnb', 'clone', 'on demand', 'delivery app'],
};

// Matcher Algorithm with synonym expansion and fuzzy stem scoring
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

  // 2. Tokenize and Synonym Expansion
  const cleanTokens = trimmed
    .replace(/[^\w\s]/gi, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2);

  const expandedTokens = new Set<string>(cleanTokens);
  for (const token of cleanTokens) {
    if (SYNONYMS[token]) {
      SYNONYMS[token].forEach(syn => expandedTokens.add(syn));
    }
  }

  let bestEntry: KnowledgeEntry | null = null;
  let highestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;

    for (const keyword of entry.keywords) {
      const lowerKeyword = keyword.toLowerCase();

      // Exact substring match in query
      if (trimmed === lowerKeyword) {
        score += 12;
      } else if (trimmed.includes(lowerKeyword)) {
        score += lowerKeyword.length > 4 ? 6 : 4;
      }

      // Check expanded tokens
      for (const token of expandedTokens) {
        if (lowerKeyword === token) {
          score += 5;
        } else if (lowerKeyword.includes(token) || token.includes(lowerKeyword)) {
          score += 2;
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
