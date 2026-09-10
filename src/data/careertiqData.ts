export interface Program {
  slug: string;
  domain: string;
  badgeColor: string;
  accentBg: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  format: string;
  highlights: string[];
  targetRoles: string[];
  toolsCovered: string[];
  curriculum: {
    moduleNumber: string;
    title: string;
    topics: string[];
  }[];
}

export interface Partner {
  name: string;
  category: string;
  logoText: string;
  badge: string;
}

export interface BlogPost {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  speaker: string;
  speakerRole: string;
  mode: string;
  spotsLeft: number;
}

export const CAREERTIQ_PROGRAMS: Program[] = [
  {
    slug: 'deep-tech',
    domain: 'DeepTech',
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    accentBg: 'from-blue-600 to-indigo-700',
    title: 'Advanced DeepTech & AI Engineering Program',
    tagline: 'Master Artificial Intelligence, Machine Learning, Data Analytics, and Cloud-Native Cybersecurity.',
    description: 'An industry-calibrated flagship program preparing software engineers and graduates for top-tier roles in AI/ML, large language models, enterprise data platforms, and threat defense architecture.',
    duration: '24 Weeks (Full-time & Weekend batches)',
    format: 'Live Instructor-led + Industry Capstone Labs',
    highlights: [
      'Production-grade Generative AI & Fine-tuning LLMs',
      'Distributed Data Pipelines with Spark & Kafka',
      'Defensive & Offensive Cloud Security Auditing',
      'Guaranteed Corporate Placement Drives'
    ],
    targetRoles: [
      'AI / Machine Learning Engineer',
      'Data Analytics Consultant',
      'Cybersecurity Operations Analyst',
      'MLOps & Cloud Infrastructure Architect'
    ],
    toolsCovered: [
      'Python', 'PyTorch', 'TensorFlow', 'Apache Spark', 'Docker', 'Kubernetes', 'AWS', 'Splunk', 'LangChain'
    ],
    curriculum: [
      {
        moduleNumber: '01',
        title: 'Core Foundations & High-Performance Python for Engineers',
        topics: [
          'Advanced data structures, complexity algorithms, and memory management',
          'Vectorized computation with NumPy, Pandas, and SciPy',
          'Relational query optimization with PostgreSQL and distributed storage'
        ]
      },
      {
        moduleNumber: '02',
        title: 'Machine Learning, Deep Neural Networks & MLOps Pipelines',
        topics: [
          'Supervised & unsupervised learning architectures and feature engineering',
          'Convolutional Networks, Transformers, and PyTorch deep models',
          'Containerized deployment with Docker, MLflow, and Kubernetes clusters'
        ]
      },
      {
        moduleNumber: '03',
        title: 'Generative AI, LLM Fine-Tuning & Vector Databases',
        topics: [
          'Retrieval-Augmented Generation (RAG) architecture and semantic search',
          'Quantization (LoRA, QLoRA) and open-source model alignment',
          'Vector stores with Milvus, Pinecone, and LangChain orchestration'
        ]
      },
      {
        moduleNumber: '04',
        title: 'Cloud Security Architecture & SOC Defenses',
        topics: [
          'Zero-trust network architecture, IAM policies, and VPC configuration',
          'SIEM telemetry, Splunk log analysis, and incident response runbooks',
          'Industry Capstone: Production deployment & security audit defense'
        ]
      }
    ]
  },
  {
    slug: 'fin-tech',
    domain: 'FinTech',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    accentBg: 'from-amber-600 to-orange-700',
    title: 'FinTech, Algorithmic Trading & Blockchain Systems',
    tagline: 'Engineer high-frequency trading platforms, decentralized finance smart contracts, and modern WealthTech solutions.',
    description: 'Transform your financial and tech acumen. Learn how modern fintech unicorns architect high-volume payment rails, automated algorithmic trading engines, credit risk models, and blockchain protocols.',
    duration: '20 Weeks (Interactive Hybrid)',
    format: 'Live Market Sandboxes + Corporate Mentorship',
    highlights: [
      'High-Frequency & Algorithmic Strategy Backtesting',
      'Decentralized Finance (DeFi) & EVM Smart Contract Development',
      'Unified Payment Interface (UPI) & Open Banking APIs',
      'Quantitative Risk Modeling & Basel Regulatory Compliance'
    ],
    targetRoles: [
      'FinTech Systems Engineer',
      'Quantitative Trading Analyst',
      'Blockchain Protocol Developer',
      'Risk & Compliance Product Manager'
    ],
    toolsCovered: [
      'Python', 'Solidity', 'Web3.js', 'PostgreSQL', 'Redis', 'Kafka', 'TradingView PineScript', 'Hardhat', 'Docker'
    ],
    curriculum: [
      {
        moduleNumber: '01',
        title: 'Financial Markets, Banking Architecture & Payment Rails',
        topics: [
          'Core banking systems, ledger consistency, and double-entry book balancing',
          'Payment gateways, ISO 20022 messaging, and real-time settlement rails',
          'PCI-DSS compliance and financial data security protocols'
        ]
      },
      {
        moduleNumber: '02',
        title: 'Algorithmic Trading & Quantitative Portfolio Modeling',
        topics: [
          'Time-series statistical arbitrage, momentum, and mean-reversion strategies',
          'Order book mechanics, market depth, and WebSocket tick data feeds',
          'Backtesting with vectorbt and live broker API execution'
        ]
      },
      {
        moduleNumber: '03',
        title: 'Blockchain Protocols, Smart Contracts & Tokenomics',
        topics: [
          'Ethereum Virtual Machine (EVM), Solidity syntax, and gas optimization',
          'ERC-20, ERC-721 token standards, and lending protocol architectures',
          'Security audits with Slither and fuzz testing frameworks'
        ]
      },
      {
        moduleNumber: '04',
        title: 'WealthTech, Neo-Banking & Alternative Credit Scoring',
        topics: [
          'Robo-advisory algorithms and mean-variance portfolio optimization',
          'Machine learning for fraud detection and credit score generation',
          'Capstone: End-to-end algorithmic portfolio management dashboard'
        ]
      }
    ]
  },
  {
    slug: 'media-tech',
    domain: 'MediaTech',
    badgeColor: 'text-teal-700 bg-teal-50 border-teal-200',
    accentBg: 'from-teal-600 to-emerald-700',
    title: 'MediaTech, Product UI/UX & Digital Brand Growth',
    tagline: 'Design irresistible digital user experiences, 3D motion systems, and high-conversion creative product engines.',
    description: 'Bridge the gap between design engineering and business conversion. Master world-class UI/UX design systems, interactive 3D visual communication, VFX motion, and data-backed digital acquisition growth.',
    duration: '18 Weeks (Design Studio Cohort)',
    format: 'Figma Design Sprints + Live Portfolio Reviews',
    highlights: [
      'Enterprise Design Systems & Design Tokens in Figma',
      'Motion Design, 3D Assets & Interactive Web Experiences',
      'Data-Driven UX Research & Usability Testing Lab',
      'Professional Dribbble / Behance / LinkedIn Portfolio Build'
    ],
    targetRoles: [
      'Product Designer (UI/UX)',
      'Design Systems Engineer',
      'Creative Technologist / Visual Designer',
      'Growth & Conversion Experience Strategist'
    ],
    toolsCovered: [
      'Figma', 'Framer', 'Spline 3D', 'Adobe After Effects', 'Adobe Illustrator', 'Mixpanel', 'Storybook', 'Tailwind CSS'
    ],
    curriculum: [
      {
        moduleNumber: '01',
        title: 'User-Centric Research, Information Architecture & Wireframing',
        topics: [
          'Qualitative user interviewing, empathy mapping, and persona mapping',
          'Information architecture, card sorting, and navigation tree design',
          'Low-fidelity rapid wireframing and user journey validation'
        ]
      },
      {
        moduleNumber: '02',
        title: 'Advanced Figma Mastery & Scalable Design Systems',
        topics: [
          'Component variants, auto-layout mastery, and interactive prototyping',
          'Design tokens, color semantics, typography scales, and accessibility (WCAG)',
          'Handoff workflows with engineering teams and Storybook integration'
        ]
      },
      {
        moduleNumber: '03',
        title: 'Interactive 3D, Micro-Interactions & Motion Design',
        topics: [
          'Spline 3D scene creation and embeddable WebGL interactive assets',
          'Figma smart animate, micro-interactions, and visual feedback cues',
          'Motion choreography for onboarding flows and empty states'
        ]
      },
      {
        moduleNumber: '04',
        title: 'Conversion UX, Product Metrics & Live Launch',
        topics: [
          'A/B testing, funnel analysis, and behavioral heatmaps with Hotjar',
          'Creating a world-class case study for global design agencies',
          'Capstone: Complete SaaS mobile & desktop design system launch'
        ]
      }
    ]
  },
  {
    slug: 'international-languages',
    domain: 'International Languages',
    badgeColor: 'text-purple-700 bg-purple-50 border-purple-200',
    accentBg: 'from-purple-600 to-indigo-700',
    title: 'Global Corporate Languages: Japanese, German & French',
    tagline: 'Unlock international career pathways with native corporate language proficiency and certification readiness.',
    description: 'Designed specifically for engineers, consultants, and business graduates looking to work in Tokyo, Berlin, Paris, or international enterprise headquarters. Includes JLPT (N5-N3), Goethe-Zertifikat (A1-B2), and DELF prep.',
    duration: '24 Weeks (Immersion Track)',
    format: 'Live Native Speaker Sessions + Cultural Workshops',
    highlights: [
      'Native certified trainers with business corporate curriculum',
      'Dedicated preparation for JLPT N5/N4/N3 & Goethe-Zertifikat',
      'Cross-border interview coaching and bilateral work visa guidance',
      'Technical communication and engineering documentation in target languages'
    ],
    targetRoles: [
      'Bilingual Software Engineer (Tokyo / Germany / Europe)',
      'International Business Development Consultant',
      'Cross-Border Technical Project Manager',
      'Global Localization & Translation Specialist'
    ],
    toolsCovered: [
      'JLPT Prep Suite', 'Goethe Zertifikat', 'Anki Spaced Repetition', 'Duolingo Corporate', 'Bilingual Tech Lexicon'
    ],
    curriculum: [
      {
        moduleNumber: '01',
        title: 'Phonetics, Foundational Scripts & Everyday Conversation',
        topics: [
          'Script mastery (Hiragana, Katakana, Kanji basics / German Umlauts & cases)',
          'Phonetic pronunciation drills and conversational introductions',
          'Essential vocabulary for workplace greetings and campus life'
        ]
      },
      {
        moduleNumber: '02',
        title: 'Grammar Structures & Technical Corporate Vocabulary',
        topics: [
          'Intermediate sentence patterns, formal business honorifics (Keigo / Sie)',
          'Engineering and software technical vocabulary in target language',
          'Reading comprehension of technical project briefs and requirements'
        ]
      },
      {
        moduleNumber: '03',
        title: 'Listening Comprehension, Dialogues & Workplace Etiquette',
        topics: [
          'Real-time meeting simulation and telephone corporate etiquette',
          'Business writing: Drafting professional emails, proposals, and responses',
          'Cultural navigation for working in multinational corporate environments'
        ]
      },
      {
        moduleNumber: '04',
        title: 'Exam Simulation, Interview Drill & Certification Readiness',
        topics: [
          'Full-length timed mock tests matching official certification patterns',
          '1-on-1 mock international job interviews with native corporate mentors',
          'Capstone: Bilingual technical presentation and portfolio review'
        ]
      }
    ]
  }
];

export const CAREERTIQ_PARTNERS: Partner[] = [
  { name: 'IBM', category: 'Tech Partner', logoText: 'IBM Cloud', badge: 'AI Ecosystem' },
  { name: 'Fortinet', category: 'Security Network', logoText: 'FORTINET', badge: 'Cybersecurity' },
  { name: 'AWS Academy', category: 'Cloud Infrastructure', logoText: 'AWS ACADEMY', badge: 'Cloud' },
  { name: 'NASSCOM', category: 'Skill Council', logoText: 'NASSCOM FutureSkills', badge: 'Accreditation' },
  { name: 'Red Hat', category: 'Enterprise Linux', logoText: 'Red Hat', badge: 'Open Source' },
  { name: 'Google Cloud Partner', category: 'Cloud Platform', logoText: 'Google Cloud', badge: 'Data' },
  { name: 'PSG Tech', category: 'Academic Partner', logoText: 'PSG Tech', badge: 'Campus MoU' },
  { name: 'CIT Coimbatore', category: 'Academic Partner', logoText: 'CIT Coimbatore', badge: 'Hiring' }
];

export const CAREERTIQ_BLOGS: BlogPost[] = [
  {
    slug: 'future-of-generative-ai-in-enterprise',
    category: 'DeepTech',
    date: 'Sep 04, 2026',
    readTime: '5 min read',
    title: 'How Enterprise Software Teams Are Deploying Local LLMs and Vector RAG in 2026',
    excerpt: 'Explore the architectural shift from public API endpoints to private on-premise model weights with quantization and zero-data-leakage vector databases.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Vigneshwaran K, AI Research Lead'
  },
  {
    slug: 'fintech-trends-algorithmic-trading-india',
    category: 'FinTech',
    date: 'Aug 28, 2026',
    readTime: '6 min read',
    title: 'The Rise of Low-Latency Microservices in Retail Algorithmic Trading Systems',
    excerpt: 'From tick-to-trade latency in microseconds to WebSocket streams, understand what modern FinTech engineering teams look for when hiring junior developers.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    author: 'Karthik Raja, Head of FinTech Practice'
  },
  {
    slug: 'ui-ux-design-systems-ai-era',
    category: 'MediaTech',
    date: 'Aug 20, 2026',
    readTime: '4 min read',
    title: 'Beyond Pretty Buttons: Why Design Systems Engineering Is the Highest-Paying UX Skill',
    excerpt: 'How leading design teams bridge Figma and React Storybook with automated token management, accessibility audits, and design code generation.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
    author: 'Sneha Mohan, Product Design Mentor'
  }
];

export const CAREERTIQ_EVENTS: EventItem[] = [
  {
    id: 'evt-01',
    title: 'Deep Dive: Building Enterprise RAG Applications with DeepSeek & LangChain',
    category: 'DeepTech Masterclass',
    date: 'Saturday, Sep 19, 2026',
    time: '6:00 PM – 7:30 PM IST',
    speaker: 'Arun Balaji',
    speakerRole: 'Principal AI Architect, Ex-Thoughtworks',
    mode: 'Live Zoom Masterclass (Free)',
    spotsLeft: 34
  },
  {
    id: 'evt-02',
    title: 'Algorithmic Trading & High-Frequency Backtesting Bootcamp',
    category: 'FinTech Workshop',
    date: 'Sunday, Sep 20, 2026',
    time: '11:00 AM – 1:00 PM IST',
    speaker: 'Vikram Sundaram',
    speakerRole: 'Quant Trader & Portfolio Manager',
    mode: 'Interactive Hands-on Lab',
    spotsLeft: 19
  },
  {
    id: 'evt-03',
    title: 'From Wireframes to Production: Building Scalable Design Systems in Figma',
    category: 'MediaTech Workshop',
    date: 'Wednesday, Sep 23, 2026',
    time: '7:00 PM – 8:30 PM IST',
    speaker: 'Divya Nair',
    speakerRole: 'Lead UI/UX Designer, Razorpay',
    mode: 'Design Sprint (Free RSVP)',
    spotsLeft: 42
  }
];

export const CAREERTIQ_LEGAL: Record<string, { title: string; lastUpdated: string; content: string[] }> = {
  terms: {
    title: 'Terms & Conditions',
    lastUpdated: 'August 15, 2026',
    content: [
      'Welcome to CareerTiQ (CareerTiQ Solutions Pvt Ltd). By accessing our website, platform, and enrolling in our educational skilling cohorts, you acknowledge and agree to comply with the terms and conditions set forth herein.',
      'Our programs are structured skilling, corporate training, and industry mentorship bootcamps designed to elevate technical competencies. Placement assistance and interview drives are subject to the student fulfilling attendance, milestone evaluations, and capstone requirements.',
      'All curriculum content, video lecture recordings, assignments, and proprietary code repositories remain the intellectual property of CareerTiQ Solutions Pvt Ltd. Unauthorized copying, distribution, or commercial reuse is strictly prohibited under international copyright laws.',
      'Users agree to provide true, accurate, and current information when submitting forms for inquiries, enrollment, and event RSVPs.'
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'August 15, 2026',
    content: [
      'CareerTiQ Solutions Pvt Ltd values your privacy. This policy outlines how we collect, store, and process your personal and academic information when you interact with our web platform and programs.',
      'Information We Collect: Name, email address, contact phone number, academic qualification, college/university, resume details, and project deliverables submitted for course completion.',
      'Usage of Data: We use your data strictly to facilitate curriculum access, process admissions, coordinate mentorship sessions, share relevant workshop notifications, and connect qualified candidates with verified hiring partners.',
      'Data Protection: We maintain 256-bit SSL encryption across all data channels and never sell, rent, or trade your personal data with third-party advertising brokers.'
    ]
  },
  refund: {
    title: 'Return & Refund Policy',
    lastUpdated: 'July 10, 2026',
    content: [
      'We stand behind the quality of our corporate skilling and graduate bootcamps. Our refund policy ensures transparency for all prospective students and corporate cohorts.',
      'Cancellations requested within 7 calendar days prior to the official cohort commencement date are eligible for a 100% full tuition refund, minus nominal payment gateway processing charges.',
      'Once a cohort has commenced and live interactive classes or proprietary curriculum materials have been accessed, refund requests are evaluated on a case-by-case basis by our academic review board.',
      'To request a refund or cohort deferral, students must email admissions@careertiq.com with their registered email, payment invoice number, and written rationale.'
    ]
  },
  whistleblower: {
    title: 'Whistleblower & Ethical Conduct Policy',
    lastUpdated: 'June 01, 2026',
    content: [
      'CareerTiQ is committed to conducting its operations with highest standards of academic integrity, corporate ethics, and equal opportunity.',
      'This Whistleblower Policy provides a safe, confidential, and protected mechanism for students, faculty mentors, employees, and corporate partners to report any instances of malpractice, harassment, financial misconduct, or ethical violations.',
      'All reports are treated with strict confidentiality and investigated directly by the Office of Ethics and Board of Directors. Retaliation against any individual reporting in good faith is strictly prohibited.',
      'Direct whistleblower disclosures can be submitted anonymously to ethics@careertiq.com or addressed in writing to the Board of Directors, CareerTiQ Solutions Pvt Ltd, Coimbatore, Tamil Nadu, India.'
    ]
  }
};
