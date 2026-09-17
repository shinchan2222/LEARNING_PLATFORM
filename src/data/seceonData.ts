export interface NavItem {
  name: string;
  href: string;
  badge?: string;
  description?: string;
}

export interface NavDropdown {
  title: string;
  columns: {
    category: string;
    items: NavItem[];
  }[];
}

export const SECEON_NAVIGATION: {
  label: string;
  hasDropdown: boolean;
  dropdown?: NavDropdown;
  href?: string;
}[] = [
  {
    label: 'Platform',
    hasDropdown: true,
    dropdown: {
      title: 'Seceon Open Threat Management (OTM) Platform',
      columns: [
        {
          category: 'Core AI Platforms',
          items: [
            { name: 'OTM Platform Overview', href: '#platform', description: 'Unified open threat management architecture' },
            { name: 'aiSIEM™', href: '#products', badge: 'Core', description: 'Next-Gen SIEM with streaming behavioral AI analytics' },
            { name: 'aiXDR™-PMAX', href: '#products', badge: 'Popular', description: 'Extended detection & response across cloud, network, and endpoints' },
            { name: 'aiSIEM CGuard™', href: '#products', badge: 'Cloud', description: 'Cloud-native zero-friction automated containment' },
            { name: 'SERA AI™', href: '#products', badge: 'Agentic', description: 'Seceon Autonomous Remediation and Investigation Agent' },
          ]
        },
        {
          category: 'Security Posture & Compliance',
          items: [
            { name: 'aiTRiSM360™', href: '#modules', badge: 'New', description: 'AI Trust, Risk & Security Management dashboard' },
            { name: 'aiCompliance CMX360™', href: '#modules', description: 'Continuous PCI-DSS, HIPAA, GDPR, NIST compliance tracking' },
            { name: 'aiBAS360™', href: '#modules', description: 'Breach & Attack Simulation with real-world adversary playbooks' },
            { name: 'aiSecurity Score360™', href: '#modules', description: 'Continuous posture score & dynamic risk assessment' },
            { name: 'aiSecurity BI360™', href: '#modules', description: 'Cybersecurity executive intelligence & BI telemetry' },
          ]
        },
        {
          category: 'Specialized Defense',
          items: [
            { name: 'aiSecOT360™', href: '#modules', description: 'OT & IoT industrial infrastructure defense' },
            { name: 'aiSecurity Email360™', href: '#modules', description: 'In-line AI email security & credential phishing defense' },
            { name: 'aiSecurity UID Guard360™', href: '#modules', description: 'Identity, privileged user & credential abuse shield' },
            { name: 'aiDAST360™', href: '#modules', description: 'Automated Dynamic Application Security Testing' },
            { name: 'SecROI360™ Calculator', href: '#roi-calculator', badge: 'Tool', description: 'Quantify your operational savings and TCO reduction' },
          ]
        }
      ]
    }
  },
  {
    label: 'Solutions',
    hasDropdown: true,
    dropdown: {
      title: 'Tailored Cybersecurity Solutions',
      columns: [
        {
          category: 'Threat Defense Use Cases',
          items: [
            { name: 'Advanced Threat Detection', href: '#use-cases', description: 'Detect zero-days and multi-stage APTs in real time' },
            { name: 'Ransomware Detection & Kill', href: '#use-cases', description: 'Stop encryption and lateral propagation in under 90s' },
            { name: 'Insider & Credential Breaches', href: '#use-cases', description: 'Identify abnormal user behavior & compromised accounts' },
            { name: 'Bruteforce & Password Spray', href: '#use-cases', description: 'Automated dynamic host and IP blocklisting' },
            { name: 'Cloud & SaaS Security', href: '#use-cases', description: 'Multi-cloud AWS, Azure, GCP & M365 telemetry' },
            { name: 'Data Exfiltration Defense', href: '#use-cases', description: 'Prevent intellectual property theft and unauthorized egress' },
          ]
        },
        {
          category: 'Partner-Led Services',
          items: [
            { name: 'Advisory & Strategy Services', href: '#services', description: 'CISO-level roadmap and security posture design' },
            { name: 'Attack Surface Monitoring', href: '#services', description: 'Continuous discovery of external exposed assets' },
            { name: 'Breach Attack Simulation (BAS)', href: '#services', description: 'Continuous validation against MITRE ATT&CK techniques' },
            { name: 'Incident Response & Forensics', href: '#services', description: '24/7 emergency containment and root-cause analysis' },
            { name: 'Red Teaming & Penetration Testing', href: '#services', description: 'Real-world adversary simulation and validation' },
            { name: 'Vulnerability Lifecycle Management', href: '#services', description: 'Prioritized risk-based remediation playbooks' },
          ]
        }
      ]
    }
  },
  {
    label: 'Industries',
    hasDropdown: true,
    dropdown: {
      title: 'Industry-Specific Cyber Defense',
      columns: [
        {
          category: 'Regulated Sectors',
          items: [
            { name: 'Financial Services & Banking', href: '#industries', description: 'GLBA, PCI-DSS, fraud detection & swift wire defense' },
            { name: 'Healthcare & Life Sciences', href: '#industries', description: 'HIPAA compliance, patient data & IoMT security' },
            { name: 'Government & Public Sector', href: '#industries', description: 'NIST 800-53, CMMC, sovereign cloud defense' },
            { name: 'Education & Higher Ed', href: '#industries', description: 'Campus networks, student privacy & ransomware immunity' },
          ]
        },
        {
          category: 'Critical Infrastructure & Enterprise',
          items: [
            { name: 'Energy & Utilities', href: '#industries', description: 'SCADA, ICS, NERC CIP critical infrastructure safety' },
            { name: 'Manufacturing & Supply Chain', href: '#industries', description: 'Zero Trust factory floor & operational uptime' },
            { name: 'Telecommunications', href: '#industries', description: 'High-throughput carrier grade log and flow analysis' },
            { name: 'Retail & E-Commerce', href: '#industries', description: 'POS protection, payment gateway & shopper data shield' },
          ]
        }
      ]
    }
  },
  {
    label: 'Why Seceon',
    hasDropdown: false,
    href: '#why-seceon'
  },
  {
    label: 'Partners',
    hasDropdown: true,
    dropdown: {
      title: 'Seceon Partner Ecosystem',
      columns: [
        {
          category: 'Service Providers',
          items: [
            { name: 'MSP Partner Program', href: '#partners', description: 'Turnkey path from IT service provider to managed security' },
            { name: 'MSSP Partner Program', href: '#partners', badge: 'High Margin', description: 'Multi-tenant SOC architecture with sub-minute onboarding' },
            { name: 'Technology Alliances', href: '#partners', description: 'Integrated ecosystem with 350+ data connectors' },
          ]
        },
        {
          category: 'Partner Portals',
          items: [
            { name: 'Partner Portal Login', href: 'https://partners.seceon.com/support/login', description: 'Access deal registration, collateral & NFR licenses' },
            { name: 'SOC Support Login', href: 'https://support.seceon.com/support/login', description: '24/7 escalation engineers & knowledge base' },
            { name: 'CGuard Portal Login', href: 'https://cguard.seceon.ai/', description: 'Cloud-native SaaS admin console' },
          ]
        }
      ]
    }
  },
  {
    label: 'Company',
    hasDropdown: true,
    dropdown: {
      title: 'About Seceon Inc.',
      columns: [
        {
          category: 'Organization',
          items: [
            { name: 'About Company', href: '#about', description: 'Pioneers in streaming AI-driven cybersecurity' },
            { name: 'Leadership Team', href: '#leadership', description: 'Meet Chandra Shekhar Pandey and our cybersecurity pioneers' },
            { name: 'Careers & Culture', href: '#careers', badge: 'Hiring', description: 'Build the next generation of autonomous defense' },
            { name: 'Industry Awards', href: '#awards', description: '75+ awards including Gartner Voice of Customer' },
          ]
        },
        {
          category: 'News & Media',
          items: [
            { name: 'Press Releases', href: '#news', description: 'Company milestones and platform announcements' },
            { name: 'Webinars & Technical Demos', href: '#webinars', description: 'Live attack containment demonstrations' },
            { name: 'Threat Research Advisories', href: '#research', description: 'Zero-day teardowns and threat actor tracking' },
            { name: 'Upcoming Events', href: '#events', description: 'Meet the Seceon team worldwide at RSA, Black Hat & GISEC' },
          ]
        }
      ]
    }
  },
  {
    label: 'Resources',
    hasDropdown: false,
    href: '#resources'
  }
];

export const SECEON_STATS = [
  { value: '90s', label: 'Active Attack Containment', subtitle: 'Autonomous AI response without human lag' },
  { value: '500+', label: 'Active MSSP Partners', subtitle: 'Delivering 24/7 SOC services worldwide' },
  { value: '50+ Trillion', label: 'Daily Events & Flows Ingested', subtitle: 'Real-time streaming correlation engine' },
  { value: '9,800+', label: 'Protected Customers', subtitle: 'Across 42 countries and all major sectors' },
  { value: '95%', label: 'Alert Fatigue Reduction', subtitle: 'Correlated composite threats, not isolated noise' },
  { value: '75+', label: 'Cybersecurity Awards', subtitle: 'Gartner, Cyber Defense Magazine & CRN recognized' },
];

export const TICKER_ITEMS = [
  '⚡ Our AI Kills Active Attacks in 90 Seconds',
  '🛡️ 9,800+ Customers. One Unified Platform.',
  '🎯 95% Fewer Alerts. 100% Real Threats. Zero Black Box.',
  '⏱️ 30-Day POV - See Threats & Security Posture in 24 Hours.',
  '🔒 No Sales Pitch. No Pressure. Just Run It and Compare.',
  '🌐 One Platform Replaces Your Entire Security Stack.',
  '🏆 Gartner® Peer Insights™ Voice of the Customer for SIEM 2026',
  '🚀 Multi-Tenant Architecture Built for High-Margin MSSPs',
];

export const OTM_CAPABILITIES = [
  {
    id: 'posture',
    title: 'Security Posture & Asset Management',
    desc: 'Continuously discover, fingerprint, and monitor all IT, OT, IoT, cloud, and remote assets with automated risk scoring.',
    icon: 'ShieldCheck',
    category: 'Posture'
  },
  {
    id: 'analytics',
    title: 'Analytics & Compliance Reporting',
    desc: 'Automated compliance mapping for PCI-DSS 4.0, HIPAA, GDPR, ISO 27001, CMMC, and NIST 800-53 with 1-click audit reports.',
    icon: 'FileText',
    category: 'Governance'
  },
  {
    id: 'container',
    title: 'Container & Database Security',
    desc: 'Deep inspection into Docker/Kubernetes container runtimes, microservices, and database query anomalies to block data theft.',
    icon: 'Database',
    category: 'Infrastructure'
  },
  {
    id: 'visibility',
    title: 'Comprehensive Visibility',
    desc: 'Single-pane telemetry unifying network flows (NetFlow/sFlow/IPFIX), raw logs, endpoint activities, and cloud API audits.',
    icon: 'Eye',
    category: 'Visibility'
  },
  {
    id: 'intel',
    title: 'Threat Intelligence / Threat Hunting',
    desc: 'Dynamic bi-directional integration with Open Threat Intelligence (OTI™), dynamic feeds, and automated MITRE ATT&CK hunting.',
    icon: 'Crosshair',
    category: 'Detection'
  },
  {
    id: 'ndr',
    title: 'Network Detection & Response (NDR)',
    desc: 'Streaming behavioral telemetry to detect lateral movement, command & control (C2) beaconing, and encrypted malicious traffic.',
    icon: 'Activity',
    category: 'Network'
  },
  {
    id: 'ids',
    title: 'Intrusion Detection System (IDS)',
    desc: 'Signature and anomaly-based intrusion defense detecting malicious exploits, port scans, and zero-day reconnaissance in real time.',
    icon: 'AlertTriangle',
    category: 'Network'
  },
  {
    id: 'ueba',
    title: 'User & Entity Behavior Analytics (UEBA)',
    desc: 'Dynamic baseline models for every user, service account, and host to identify abnormal privilege escalation and credential stuffing.',
    icon: 'Users',
    category: 'Identity'
  },
  {
    id: 'netsec',
    title: 'Comprehensive Network Security',
    desc: 'Full East-West and North-South perimeter security monitoring with automated quarantine of rogue endpoints and suspicious hosts.',
    icon: 'Network',
    category: 'Network'
  },
  {
    id: 'cloud',
    title: 'Cloud & SaaS Security',
    desc: 'Native ingestion and posture governance across AWS, Microsoft Azure, Google Cloud Platform, Microsoft 365, and Google Workspace.',
    icon: 'Cloud',
    category: 'Cloud'
  },
  {
    id: 'forensics',
    title: 'Forensic Analysis & Root Cause',
    desc: 'Complete timeline reconstruction of every security incident with raw packet-level and event-level evidence for swift remediation.',
    icon: 'Search',
    category: 'Response'
  },
  {
    id: 'ngsiem',
    title: 'Next-Gen SIEM (aiSIEM™)',
    desc: 'Streaming AI engine that eliminates rule-tuning nightmare and aggregates petabytes of log data with zero index bloat.',
    icon: 'Server',
    category: 'Platform'
  },
  {
    id: 'soar',
    title: 'Automated SOAR Playbooks',
    desc: 'Automate incident containment across firewalls, Active Directory, EDR agents, and cloud firewalls without coding scripts.',
    icon: 'Zap',
    category: 'Response'
  },
  {
    id: 'edr',
    title: 'Endpoint Detection & Response (EDR)',
    desc: 'Lightweight universal agent providing real-time process monitoring, memory injection detection, and instant process termination.',
    icon: 'Laptop',
    category: 'Endpoint'
  },
  {
    id: 'containment',
    title: 'Real-Time Threat Containment',
    desc: 'Neutralizes active breaches in under 90 seconds by severing malicious connections, locking compromised accounts, and isolating hosts.',
    icon: 'Lock',
    category: 'Containment'
  },
  {
    id: 'dynamic',
    title: 'Dynamic Threat Adaptation',
    desc: 'Continuous machine learning updates threat models autonomously as attacker behaviors and infrastructure evolve over time.',
    icon: 'RefreshCw',
    category: 'AI Engine'
  }
];

export const EXPLORATION_MODULES = [
  {
    id: '01',
    code: 'aiTRiSM',
    name: 'aiTRiSM360™',
    subtitle: 'AI Trust, Risk & Security Management',
    desc: 'Govern, monitor, and protect enterprise AI systems and LLM traffic. Flags unapproved generative AI apps, prevents corporate data leaks into AI prompts, and enforces strict corporate AI usage policies.',
    tag: 'ACTIVE MONITORING',
    color: '#5A9955',
    features: [
      'Discovers shadow AI tools across enterprise networks',
      'Monitors GitHub Copilot, ChatGPT, Claude, and Gemini sessions',
      'Enforces granular prompt DLP and data leakage prevention',
      'Real-time risk scoring for autonomous AI agents & models'
    ],
    liveMetrics: {
      aiSessions: '14,290 / hr',
      shadowAiBlocked: '99.4%',
      riskScore: 'Low (98/100)'
    }
  },
  {
    id: '02',
    code: 'aiBAS360',
    name: 'aiBAS360™',
    subtitle: 'Breach & Attack Simulation',
    desc: 'Continuously validates your defensive controls against real-world adversary playbooks. Simulates ransomware attacks, privilege escalation, and lateral movement without impacting production operations.',
    tag: 'CONTINUOUS VALIDATION',
    color: '#037fff',
    features: [
      'Automated MITRE ATT&CK matrix validation',
      'Non-disruptive adversary emulation in production',
      'Identifies security gaps before real attackers find them',
      'Provides actionable mitigation instructions for security teams'
    ],
    liveMetrics: {
      scenariosTested: '1,420+',
      gapDetectionRate: '99.8%',
      dwellTimeSavings: '4.5 hrs'
    }
  },
  {
    id: '03',
    code: 'CMX360',
    name: 'aiCompliance CMX360™',
    subtitle: 'Continuous Compliance & Audit Automation',
    desc: 'Transforms periodic painful compliance audits into continuous, real-time posture assurance. Automatically maps security telemetry to PCI-DSS 4.0, HIPAA, GDPR, ISO 27001, SOC 2, and NIST frameworks.',
    tag: 'CONTINUOUS ASSURANCE',
    color: '#10b981',
    features: [
      'Automated real-time evidence collection for auditors',
      'Instant drill-down compliance violation dashboards',
      'Out-of-the-box compliance executive & auditor reports',
      'Zero manual spreadsheet tracking required'
    ],
    liveMetrics: {
      frameworksCovered: '18 Standards',
      auditPrepReduction: '85%',
      complianceScore: '99.2%'
    }
  },
  {
    id: '04',
    code: 'email ai',
    name: 'aiSecurity Email360™',
    subtitle: 'In-line AI Email & Credential Protection',
    desc: 'Stops sophisticated phishing, business email compromise (BEC), and zero-day malicious attachments before they reach user inboxes by inspecting email headers, body semantics, and embedded hyperlinks.',
    tag: 'ZERO PHISHING',
    color: '#f59e0b',
    features: [
      'Natural language processing (NLP) to detect impersonation',
      'Dynamic sandboxing of suspicious attachments & QR codes',
      '1-click automated inbox purge across entire organization',
      'Seamless API integration with Microsoft 365 & Google Workspace'
    ],
    liveMetrics: {
      emailsScanned: '2.4M / day',
      phishingCaught: '99.9%',
      falsePositiveRate: '< 0.01%'
    }
  },
  {
    id: '05',
    code: 'SecROI',
    name: 'SecROI360™',
    subtitle: 'Security Investment & ROI Quantifier',
    desc: 'Demonstrates tangible monetary savings and operational efficiency gains of replacing multiple disjointed point solutions with Seceons unified OTM platform. Delivers 60-70% lower TCO.',
    tag: 'PROVEN SAVINGS',
    color: '#8b5cf6',
    features: [
      'Replaces separate SIEM, SOAR, EDR, NDR, and UEBA licenses',
      'Eliminates costly per-gigabyte log ingestion penalties',
      'Reduces required tier-1 SOC analyst headcount overhead',
      'Delivers positive payback within 90 days of deployment'
    ],
    liveMetrics: {
      averageCostSavings: '65%',
      analystHoursSaved: '32 hrs / wk',
      roiPayback: '3.2 Months'
    }
  }
];

export const COMPARISON_DATA = [
  {
    feature: 'Threat Detection Speed',
    seceon: 'Under 90 Seconds (Real-Time AI Stream)',
    legacy: 'Hours or Days (Batch queries & scheduled searches)',
    winner: true
  },
  {
    feature: 'Automated Containment (SOAR)',
    seceon: 'Built-in autonomous containment out-of-the-box',
    legacy: 'Requires expensive separate SOAR product & custom scripts',
    winner: true
  },
  {
    feature: 'Pricing Model',
    seceon: 'Predictable per-device / per-user (Unlimited logs)',
    legacy: 'Per-GB or Per-EPS data tax that penalizes log collection',
    winner: true
  },
  {
    feature: 'Deployment & Time-to-Value',
    seceon: 'Hours (Automated AI self-baselining)',
    legacy: '3 to 6 Months of custom rule configuration & consulting',
    winner: true
  },
  {
    feature: 'Multi-Tenancy for MSSPs',
    seceon: 'Native hierarchical multi-tenant architecture',
    legacy: 'Separate instances required or clunky domain separation',
    winner: true
  },
  {
    feature: 'Alert Fatigue & False Positives',
    seceon: '95% reduction via multi-stage behavioral correlation',
    legacy: 'Thousands of uncorrelated noisy alerts daily',
    winner: true
  },
  {
    feature: 'Compliance Mapping',
    seceon: '1-click continuous reports (PCI, HIPAA, NIST, CMMC)',
    legacy: 'Manual configuration & expensive third-party plugins',
    winner: true
  }
];

export const TESTIMONIALS = [
  {
    quote: "Seceon’s aiSIEM platform powers our 24x7 SOC and aiXDR360 Services, offering proactive defense to safeguard clients from attacks. Their innovation ensures efficient detection, response, and continuous security service value.",
    author: "Keith Johnson",
    title: "Executive VP",
    company: "Obviam",
    location: "United States"
  },
  {
    quote: "Leveraging Seceon’s aiMSSP solution, we are now processing more than 700 million events per day with less than one percent rate of false positives and have increased the efficiency of our IT and SOC personnel by 77%.",
    author: "Grigori Milis",
    title: "Chief Information Officer",
    company: "Richard Fleishman and Associates",
    location: "United States"
  },
  {
    quote: "With Seceon’s innovative approach, we gain quick visibility and control over attack surfaces, remote offices, IoT, and OT networks, enabling real-time threat detection across endpoints and infrastructure.",
    author: "Bithal Bharadwaj",
    title: "Chief Executive Officer",
    company: "Gramax",
    location: "India & Middle East"
  },
  {
    quote: "Great solution backed by a great team. Seceon has been responsive and listens to the needs of our customers. Customer service is there for us when we have questions or need clarification on threat intelligence.",
    author: "Manish Tiwari",
    title: "Senior VP & Global CISO",
    company: "Bharti Airtel",
    location: "Global"
  },
  {
    quote: "We are pleased to continue our work with Seceon to offer businesses in the SADC region access to effective cybersecurity solutions by making AI-driven security technology more accessible.",
    author: "Mark Van Vuuren",
    title: "Product Director",
    company: "Corr-Serve",
    location: "South Africa"
  }
];

export const AWARDS_LIST = [
  { title: "Gartner® Peer Insights™", subtitle: "Voice of the Customer for SIEM 2026", org: "Gartner" },
  { title: "Global InfoSec Awards", subtitle: "Best AI-Driven Cybersecurity Platform", org: "Cyber Defense Magazine" },
  { title: "CRN Security 100", subtitle: "Top 20 SIEM and XDR Innovators", org: "The Channel Company" },
  { title: "Black Unicorn Winner", subtitle: "Top 10 Cyber Defense Companies", org: "Cyber Defense Awards" },
  { title: "Cybersecurity Excellence", subtitle: "Gold Winner in Autonomous SOC", org: "Cybersecurity Awards" },
  { title: "MSSP Alert Top 250", subtitle: "Preferred Platform for MSSP Enablement", org: "MSSP Alert" },
];

export const INDUSTRIES_DATA = [
  {
    name: 'Financial & Banking',
    icon: 'Landmark',
    desc: 'Protect against wire fraud, ransomware extortion, and account takeovers while maintaining seamless compliance with GLBA, PCI-DSS 4.0, and SOX.',
    stats: '100% Audit Readiness',
    keyThreat: 'Credential stuffing & ATM/SWIFT network anomalies'
  },
  {
    name: 'Healthcare & Life Sciences',
    icon: 'HeartPulse',
    desc: 'Shield electronic health records (EHR/EMR), clinical medical devices (IoMT), and hospital networks against ransomware disruption with HIPAA compliance.',
    stats: 'Zero Patient Care Downtime',
    keyThreat: 'Medical device vulnerabilities & ransomware double-extortion'
  },
  {
    name: 'Manufacturing & Industrial',
    icon: 'Factory',
    desc: 'Unify operational technology (OT), SCADA systems, programmable logic controllers (PLCs), and enterprise IT networks under a single AI defense posture.',
    stats: '99.999% Plant Uptime',
    keyThreat: 'Stuxnet-style supply chain exploits & industrial sabotage'
  },
  {
    name: 'Government & Public Sector',
    icon: 'Building2',
    desc: 'Fortify municipal, state, and federal networks against state-sponsored advanced persistent threats (APTs) with NIST 800-53 and CMMC alignment.',
    stats: 'FedRAMP & CMMC Aligned',
    keyThreat: 'Nation-state cyber espionage & civic infrastructure disruption'
  },
  {
    name: 'Education & Universities',
    icon: 'GraduationCap',
    desc: 'Defend massive open campus Wi-Fi networks, research laboratories, and student privacy records without impeding academic collaboration.',
    stats: 'Sub-90s Threat Isolation',
    keyThreat: 'Phishing campaigns & distributed denial-of-service (DDoS)'
  },
  {
    name: 'Retail & E-Commerce',
    icon: 'ShoppingBag',
    desc: 'Safeguard credit card processing points of sale (POS), digital payment gateways, and cloud customer portals during peak holiday traffic surges.',
    stats: 'PCI-DSS 4.0 Verified',
    keyThreat: 'Magecart formjacking & payment token exfiltration'
  }
];

export const CONTACT_LOCATIONS = {
  headquarters: {
    country: 'United States',
    address: '238 Littleton Road, Suite #200, Westford, MA 01886, USA',
    phone: '+1 (978)-923-0040',
    email: 'info@seceon.com',
    hours: '24/7 Global SOC Support'
  },
  indiaOffices: [
    {
      city: 'Pune Development Center',
      address: 'Pride Silicon Plaza, Senapati Bapat Road, Pune, Maharashtra 411016, India'
    },
    {
      city: 'Noida R&D Hub',
      address: 'Sector 62, Electronic City, Noida, Uttar Pradesh 201301, India'
    }
  ]
};
