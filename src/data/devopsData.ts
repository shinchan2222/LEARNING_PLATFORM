// DEVops — Software Services Data Layer

export const COMPANY = {
  name: 'DEVops',
  tagline: 'We Build Software That Powers Your Business',
  description: 'Full-service software company specializing in custom software, websites, mobile apps, UI/UX design, cloud solutions, and API development.',
  email: 'hello@devops-solutions.com',
  phone: '+1 (800) 123-4567',
  location: 'New York, NY — Serving Clients Worldwide',
  founded: '2019',
};

export const SERVICES = [
  {
    id: 'custom-software',
    icon: 'Code2',
    title: 'Custom Software Development',
    shortDesc: 'Tailored solutions built for your exact business needs.',
    description:
      'From enterprise resource planning (ERP) and customer relationship management (CRM) systems to full-scale SaaS platforms — we architect, develop, and maintain software that scales with your organization.',
    features: [
      'ERP & CRM Systems',
      'SaaS Platform Development',
      'Business Process Automation',
      'Legacy System Modernization',
      'Third-Party Integrations',
    ],
    color: '#0B63E5',
    lightColor: '#EFF6FF',
  },
  {
    id: 'website-development',
    icon: 'Globe',
    title: 'Website Development',
    shortDesc: 'Stunning websites that convert visitors into customers.',
    description:
      'We design and build pixel-perfect, fast-loading websites — from corporate portals and e-commerce storefronts to high-converting landing pages and dynamic web applications.',
    features: [
      'Corporate & Portfolio Websites',
      'E-Commerce & Online Stores',
      'High-Converting Landing Pages',
      'CMS Integrations (WordPress, Strapi)',
      'Performance & SEO Optimization',
    ],
    color: '#7C3AED',
    lightColor: '#F5F3FF',
  },
  {
    id: 'mobile-apps',
    icon: 'Smartphone',
    title: 'Mobile App Development',
    shortDesc: 'iOS, Android & cross-platform apps users love.',
    description:
      'We build intuitive, high-performance mobile applications for iOS and Android using React Native and Flutter, delivering a native feel with shared codebase efficiency.',
    features: [
      'iOS & Android Native Apps',
      'React Native & Flutter',
      'App Store Optimization',
      'Push Notifications & Offline Mode',
      'Payment Gateway Integration',
    ],
    color: '#059669',
    lightColor: '#ECFDF5',
  },
  {
    id: 'ui-ux-design',
    icon: 'Palette',
    title: 'UI/UX Design',
    shortDesc: 'Interfaces designed for delight and conversion.',
    description:
      'Our design team creates wireframes, interactive prototypes, and complete design systems that are visually compelling, user-tested, and aligned with your brand identity.',
    features: [
      'User Research & Personas',
      'Wireframing & Prototyping',
      'Design System Creation',
      'Figma & Adobe XD Deliverables',
      'Accessibility (WCAG 2.1) Compliance',
    ],
    color: '#DC2626',
    lightColor: '#FEF2F2',
  },
  {
    id: 'cloud-devops',
    icon: 'Cloud',
    title: 'Cloud & DevOps',
    shortDesc: 'Scalable cloud infrastructure and CI/CD automation.',
    description:
      'We set up, manage, and optimize cloud infrastructure on AWS, Azure, and GCP. Our DevOps engineers implement automated CI/CD pipelines, containerization with Docker and Kubernetes, and 24/7 monitoring.',
    features: [
      'AWS, Azure & GCP Setup',
      'Docker & Kubernetes Orchestration',
      'CI/CD Pipeline Automation',
      'Infrastructure as Code (Terraform)',
      '24/7 Monitoring & Auto-Scaling',
    ],
    color: '#F59E0B',
    lightColor: '#FFFBEB',
  },
  {
    id: 'api-backend',
    icon: 'Server',
    title: 'API & Backend Development',
    shortDesc: 'Robust, secure APIs powering your digital products.',
    description:
      'From RESTful APIs to GraphQL endpoints and event-driven microservices — we architect and build the backend infrastructure that connects your products, partners, and data.',
    features: [
      'REST API & GraphQL Development',
      'Microservices Architecture',
      'Database Design & Optimization',
      'Authentication & Security (OAuth, JWT)',
      'Third-Party API Integrations',
    ],
    color: '#0891B2',
    lightColor: '#ECFEFF',
  },
];

export const WHY_US = [
  {
    icon: 'Zap',
    title: 'Fast Delivery',
    desc: 'Agile sprints and lean processes ensure your project ships on time, every time — without cutting corners on quality.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Quality Guaranteed',
    desc: 'Rigorous QA testing, code reviews, and performance benchmarks baked into every project deliverable.',
  },
  {
    icon: 'Headphones',
    title: '24/7 Support',
    desc: 'Dedicated post-launch support and maintenance plans so your software is always running at its best.',
  },
  {
    icon: 'TrendingUp',
    title: 'Agile & Scalable',
    desc: 'Architecture designed from day one to scale as your business grows — no expensive rewrites down the road.',
  },
];

export const TECH_TABS = [
  {
    label: 'Frontend',
    techs: [
      { name: 'React', icon: '⚛️' },
      { name: 'Next.js', icon: '▲' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'Vue.js', icon: '💚' },
      { name: 'Angular', icon: '🔴' },
      { name: 'Framer Motion', icon: '🌀' },
      { name: 'Three.js', icon: '🌐' },
    ],
  },
  {
    label: 'Backend',
    techs: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'Python', icon: '🐍' },
      { name: 'Django', icon: '🎸' },
      { name: 'FastAPI', icon: '⚡' },
      { name: 'Go', icon: '🐹' },
      { name: 'GraphQL', icon: '🔗' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'MongoDB', icon: '🍃' },
    ],
  },
  {
    label: 'Mobile',
    techs: [
      { name: 'React Native', icon: '📱' },
      { name: 'Flutter', icon: '💙' },
      { name: 'Swift (iOS)', icon: '🍎' },
      { name: 'Kotlin (Android)', icon: '🤖' },
      { name: 'Expo', icon: '🚀' },
      { name: 'Firebase', icon: '🔥' },
      { name: 'App Store', icon: '📦' },
      { name: 'Play Store', icon: '🎮' },
    ],
  },
  {
    label: 'Cloud',
    techs: [
      { name: 'AWS', icon: '☁️' },
      { name: 'Azure', icon: '🔵' },
      { name: 'Google Cloud', icon: '🌈' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Kubernetes', icon: '⚙️' },
      { name: 'Terraform', icon: '🏗️' },
      { name: 'GitHub Actions', icon: '🔄' },
      { name: 'Vercel / Netlify', icon: '🚀' },
    ],
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Planning',
    desc: 'We deep-dive into your requirements, goals, and constraints. Detailed project scope, timeline, and tech architecture are defined before a single line of code is written.',
    icon: 'Search',
  },
  {
    step: '02',
    title: 'Design & Prototype',
    desc: 'Our designers create wireframes and interactive prototypes in Figma. You get to see and experience the product before development begins — saving time and budget.',
    icon: 'Palette',
  },
  {
    step: '03',
    title: 'Development & Testing',
    desc: 'Our engineers build in agile 2-week sprints with continuous demos. Automated testing and QA reviews happen at every stage to catch issues early.',
    icon: 'Code2',
  },
  {
    step: '04',
    title: 'Delivery & Support',
    desc: 'We deploy your product with CI/CD pipelines, monitor performance post-launch, and provide ongoing support and iteration plans for long-term success.',
    icon: 'Rocket',
  },
];

export const PORTFOLIO = [
  {
    title: 'RetailFlow ERP',
    category: 'Enterprise Software',
    description:
      'A fully custom ERP platform for a retail chain managing 50+ stores — real-time inventory, staff payroll, supplier management, and analytics dashboard.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    color: '#0B63E5',
  },
  {
    title: 'MedConnect App',
    category: 'Mobile Application',
    description:
      'A telemedicine React Native app connecting 80,000+ patients with certified doctors for video consultations, prescriptions, and appointment management.',
    tech: ['React Native', 'Firebase', 'Node.js', 'Stripe'],
    color: '#059669',
  },
  {
    title: 'LaunchPad SaaS',
    category: 'Web Platform',
    description:
      'A multi-tenant B2B SaaS platform for startup accelerators to manage cohorts, mentor sessions, milestone tracking, and investor communications.',
    tech: ['Next.js', 'Python', 'MongoDB', 'GCP'],
    color: '#7C3AED',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "DEVops delivered our e-commerce platform 2 weeks ahead of schedule. The code quality is exceptional and the team's communication throughout was outstanding.",
    name: 'Sarah Mitchell',
    role: 'CEO, StyleVault Inc.',
    initials: 'SM',
    rating: 5,
    color: '#0B63E5',
  },
  {
    quote:
      "We hired DEVops to rebuild our legacy CRM and the result blew us away. Performance improved by 300% and our sales team's productivity went through the roof.",
    name: 'James Okafor',
    role: 'CTO, Apex Financial',
    initials: 'JO',
    rating: 5,
    color: '#7C3AED',
  },
  {
    quote:
      "Our mobile app went from concept to App Store in 10 weeks. The design was stunning and users gave us 4.9 stars on launch day. Couldn't recommend DEVops more.",
    name: 'Priya Sharma',
    role: 'Founder, HealthBridge',
    initials: 'PS',
    rating: 5,
    color: '#059669',
  },
];

export const STATS = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '150+', label: 'Happy Clients' },
  { value: '6+', label: 'Years Experience' },
  { value: '24/7', label: 'Support Available' },
];
