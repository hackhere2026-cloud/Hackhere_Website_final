// src/data/hackhereData.js
// Centralized content & data store for HackHere Digital Community Platform

export const HACKHERE_BRAND = {
  name: "HACKHERE",
  tagline: "Where Builders Meet Opportunity.",
  altTagline: "Learn. Build. Connect. Grow.",
  missionShort: "A technology and innovation community that creates opportunities for students, developers, creators, innovators, mentors, speakers, and organizations to learn, build, collaborate, compete, and connect.",
  officialEmail: "community@hackhere.org",
  contactPhone: "+91 98765 43210",
  socials: {
    github: "https://github.com/hackhere",
    linkedin: "https://linkedin.com/company/hackhere",
    twitter: "https://twitter.com/hackhere",
    discord: "https://discord.gg/hackhere",
    telegram: "https://t.me/hackhere_community",
    instagram: "https://instagram.com/hackhere_community"
  }
};

export const IMPACT_STATS = [
  { value: "500+", label: "Community Members", description: "Students, developers, creators & aspiring innovators growing together." },
  { value: "10+", label: "Events & Initiatives", description: "Hackathons, workshops, sessions and community-led experiences." },
  { value: "100+", label: "Student Builders", description: "Students who have participated, collaborated and built alongside the community." },
  { value: "20+", label: "Mentors & Industry Connects", description: "Professionals, founders and experienced builders sharing knowledge and guidance." }
];

export const FOUR_PILLARS = [
  {
    id: "learn",
    title: "LEARN",
    subtitle: "Acquire real practical skills",
    description: "Learn through intensive bootcamps, technical masterclasses, workshops, and expert-led sessions designed beyond theoretical syllabi.",
    icon: "BookOpen",
    color: "#0061FE",
    tags: ["Bootcamps", "Workshops", "Tech Sessions", "Webinars"]
  },
  {
    id: "build",
    title: "BUILD",
    subtitle: "Turn ideas into working code",
    description: "Turn knowledge into real, deployable projects through 24-48hr hackathons, weekly coding challenges, and collaborative open-source sprints.",
    icon: "Code",
    color: "#FF5018",
    tags: ["Hackathons", "Challenges", "Live Sprints", "Open Source"]
  },
  {
    id: "connect",
    title: "CONNECT",
    subtitle: "Find your co-builders & mentors",
    description: "Meet passionate peers, senior engineers, tech startup founders, mentors, and organizational sponsors in a supportive builder culture.",
    icon: "Users",
    color: "#00C6F7",
    tags: ["Networking", "Mentorship", "Meetups", "Industry Talks"]
  },
  {
    id: "grow",
    title: "GROW",
    subtitle: "Unlock real opportunities",
    description: "Build confidence, create an impressive portfolio of shipped products, earn recognized badges, and discover pathways to internships & roles.",
    icon: "TrendingUp",
    color: "#CCFF00",
    tags: ["Portfolios", "Certificates", "Internships", "Leadership"]
  }
];

export const HACKHERE_PILLARS = FOUR_PILLARS;

// =========================================================================
// MOMENTS FROM HACKHERE DATA
// =========================================================================
export const MOMENTS_FROM_HACKHERE = [
  {
    title: "AIVENTRA 2025 Grand Finale",
    category: "Hackathon Sprints",
    subtitle: "AIVENTRA 2025 Grand Finale",
    image: "/aiventra/aiventra-4.jpg",
    location: "Bangalore Hub"
  },
  {
    title: "Midnight Systems Architecture Review",
    category: "Mentor Checkpoints",
    subtitle: "Midnight Systems Architecture Review",
    image: "/vortexa/vortexa-3.jpg",
    location: "VORTEXA 2025"
  },
  {
    title: "Live Prototype Demos on Stage",
    category: "Finalist Pitches",
    subtitle: "Live Prototype Demos on Stage",
    image: "/aiventra/aiventra-9.jpg",
    location: "Auditorium"
  },
  {
    title: "Hands-on Generative AI Masterclass",
    category: "Technical Workshops",
    subtitle: "Hands-on Generative AI Masterclass",
    image: "/aiventra/aiventra-5.jpg",
    location: "Campus Hub"
  },
  {
    title: "Collaborative Hardware & IoT Hacking",
    category: "Makerspace Sprints",
    subtitle: "Collaborative Hardware & IoT Hacking",
    image: "/vortexa/vortexa-9.jpg",
    location: "Lab Track"
  }
];

// =========================================================================
// EVENTS DATA STORE (AIVENTRA, VORTEXA, NEXORA, HACK TO HIRE, BOOTCAMPS)
// =========================================================================
export const eventsData = [
  {
    id: "aiventra",
    title: "AIVENTRA 2025",
    tagline: "FinTech Innovation & Agentic Financial Infrastructure",
    category: "completed",
    type: "Hackathon",
    date: "May 09 - 11, 2025",
    location: "Chennai, India",
    status: "Completed",
    heroImage: "/aiventra/aiventra-4.jpg",
    description: "An intensive FinTech innovation hackathon bringing together builders to construct real-time banking pipelines, automated risk triage, and agentic workflows.",
    aboutLong: "AIVENTRA 2025 united 200+ participants in Chennai. Round 1 featured an online shortlist across AI, Cyber, and Blockchain domains, followed by Round 2 where the top 50 shortlisted teams competed live at the final hackathon in Chennai.",
    prizePool: "₹12,000",
    track: "FinTech",
    participants: "200+",
    rounds: [
      { round: "Round 1", description: "Online shortlist based on domain (AI, Cyber, Blockchain, etc.)" },
      { round: "Round 2", description: "Top 50 teams participate at final Hackathon at Chennai venue" }
    ],
    stats: [
      { label: "Participants", value: "200+" },
      { label: "Finalist Teams", value: "Top 50" },
      { label: "Prize Pool", value: "₹12,000 (12K)" },
      { label: "Primary Track", value: "FinTech" },
      { label: "Venue", value: "Chennai" }
    ],
    tracks: [
      {
        title: "FinTech & Real-Time Banking",
        desc: "Autonomous payment rails, algorithmic fraud detection, and instant UPI settlement telemetry."
      },
      {
        title: "AI & Autonomous Agents in Finance",
        desc: "Automated underwriting, compliance triage bots, and conversational wealth management agents."
      },
      {
        title: "Cyber Security & Data Privacy",
        desc: "Zero-knowledge proofs for financial identities and automated threat defense meshes."
      },
      {
        title: "Blockchain & Digital Assets",
        desc: "Decentralized liquidity protocols, smart contract escrows, and verifiable token standards."
      }
    ],
    prizes: [
      { title: "First Place Overall (Grand Champion)", amount: "₹12,000", badge: "Gold Champion" },
      { title: "Top 50 Finalist Distinction", amount: "Certificates & Swag", badge: "Finalist" }
    ],
    agenda: [
      { time: "Round 1", title: "Online Domain Shortlisting", desc: "Teams submit domain proposals across AI, Cyber, and Blockchain." },
      { time: "Finals - Day 1 09:00 AM", title: "Grand Check-in & Keynote", desc: "Top 50 teams arrive at Chennai venue and receive problem brief." },
      { time: "Finals - Day 1 12:00 PM", title: "Hacking Sprint Begins", desc: "Live code repositories created and 24-hour sprint begins." },
      { time: "Finals - Day 1 07:00 PM", title: "Mentor Checkpoint #1", desc: "FinTech architecture review with domain industry mentors." },
      { time: "Finals - Day 2 09:00 AM", title: "Code Freeze & Submissions", desc: "Git commit freeze and live deployment validation." },
      { time: "Finals - Day 2 11:30 AM", title: "Final Stage Pitches", desc: "Top finalist live presentations before judging panel." },
      { time: "Finals - Day 2 03:00 PM", title: "Awards Ceremony", desc: "Cash prize distribution of ₹12,000 and credential issuance." }
    ],
    chiefGuests: [
      { name: "Arjun Mehta", title: "Principal AI Scientist", company: "FinTech Systems", image: "/founders/guru-prakash.jpeg" },
      { name: "Priya Sundaram", title: "VP of Engineering", company: "CloudScale Infra", image: "/founders/rithika-s.jpeg" }
    ],
    sponsors: [
      { name: "Elyon", tier: "Title Sponsor", logo: "Elyon", color: "#3ECF8E" },
      { name: "Journi", tier: "Gold Sponsor", logo: "Journi", color: "#FFFFFF" },
      { name: "Maestrominds", tier: "Silver Sponsor", logo: "Maestrominds", color: "#FF6C37" },
      { name: "Featherless AI", tier: "AI Partner", logo: "Featherless AI", color: "#61C8D4" },
      { name: "Medo", tier: "Health Partner", logo: "Medo", color: "#00C6F7" }
    ],
    gallery: [
      "/aiventra/aiventra-1.jpg",
      "/aiventra/aiventra-2.jpg",
      "/aiventra/aiventra-3.jpg",
      "/aiventra/aiventra-4.jpg",
      "/aiventra/aiventra-5.jpg",
      "/aiventra/aiventra-6.jpg",
      "/aiventra/aiventra-7.jpg",
      "/aiventra/aiventra-8.jpg",
      "/aiventra/aiventra-9.jpg",
      "/aiventra/aiventra-10.jpg"
    ],
    winnerProjectIds: ["medpulse-ai", "aegis-guard"]
  },
  {
    id: "vortexa",
    title: "VORTEXA 2025",
    tagline: "MedTech Innovation & High-Throughput Healthcare Systems",
    category: "completed",
    type: "Hackathon",
    date: "June 20 - 21, 2025",
    location: "Chennai, India",
    status: "Completed",
    heroImage: "/vortexa/vortexa-3.jpg",
    description: "Specialized MedTech hackathon focused on medical diagnostics, IoT telemetry systems, and patient healthcare platforms.",
    aboutLong: "VORTEXA 2025 gathered 150+ participants in Chennai. Round 1 consisted of an online shortlist based on domains including AI, Cyber, and Blockchain. Round 2 brought the top 50 teams together for the intense final hackathon in Chennai.",
    prizePool: "₹15,000",
    track: "MedTech",
    participants: "150+",
    rounds: [
      { round: "Round 1", description: "Online shortlist based on domain (AI, Cyber, Blockchain, etc.)" },
      { round: "Round 2", description: "Top 50 teams participate at final Hackathon at Chennai venue" }
    ],
    stats: [
      { label: "Participants", value: "150+" },
      { label: "Finalist Teams", value: "Top 50" },
      { label: "Prize Pool", value: "₹15,000 (15K)" },
      { label: "Primary Track", value: "MedTech" },
      { label: "Venue", value: "Chennai" }
    ],
    tracks: [
      {
        title: "MedTech & Clinical Diagnostics",
        desc: "Diagnostic triage tools, automated medical image classifiers, and patient vitals telemetry."
      },
      {
        title: "Healthcare IoT & Telemetry",
        desc: "Low-latency sensor logging, edge medical device controllers, and offline clinic synchronization."
      },
      {
        title: "Secure Medical Data & Zero Trust",
        desc: "Cryptographic medical record vaults, HIPAA compliant data sharing, and patient identity meshes."
      },
      {
        title: "AI Medical Assistants",
        desc: "Vernacular voice consultation notes, multilingual triage summarizers, and pharmacy workflows."
      }
    ],
    prizes: [
      { title: "Grand Champion (First Place)", amount: "₹15,000", badge: "Grand Winner" },
      { title: "Top 50 Finalist Honors", amount: "Certificates & Medals", badge: "Finalist" }
    ],
    agenda: [
      { time: "Round 1", title: "Domain Abstract Submission", desc: "Online project submission and technical shortlisting." },
      { time: "Finals - Day 1 09:30 AM", title: "Chennai On-Site Kickoff", desc: "Top 50 squads check in and begin physical prototyping." },
      { time: "Finals - Day 1 02:00 PM", title: "Hardware & IoT Lab Sprint", desc: "Integrating clinical sensor hardware with web backends." },
      { time: "Finals - Day 1 08:00 PM", title: "Midnight Architecture Review", desc: "1-on-1 mentor guidance on latency and compliance." },
      { time: "Finals - Day 2 10:00 AM", title: "Final Prototype Submissions", desc: "Submitting GitHub repos and demo video recordings." },
      { time: "Finals - Day 2 01:30 PM", title: "Stage Demos & Jury Deliberation", desc: "Live stage presentations with real medical telemetry demos." },
      { time: "Finals - Day 2 04:30 PM", title: "Grand Awards Ceremony", desc: "Awarding ₹15,000 cash prize to the champions." }
    ],
    chiefGuests: [
      { name: "Suresh Balakrishnan", title: "Head of Infrastructure", company: "MedTech Systems", image: "/founders/ezhil-kk.jpeg" },
      { name: "Elena Rostova", title: "Biotech Systems Lead", company: "EdgeGrid Labs", image: "/founders/Shubaashree.jpeg" }
    ],
    sponsors: [
      { name: "Elyon", tier: "Title Sponsor", logo: "Elyon", color: "#3ECF8E" },
      { name: "Journi", tier: "Gold Sponsor", logo: "Journi", color: "#FFFFFF" },
      { name: "Crystel", tier: "Tech Sponsor", logo: "Crystel", color: "#00C6F7" },
      { name: "Balveontech", tier: "Systems Sponsor", logo: "Balveontech", color: "#FF9900" },
      { name: "Honeycrib", tier: "Community Sponsor", logo: "Honeycrib", color: "#61C8D4" }
    ],
    gallery: [
      "/vortexa/vortexa-1.jpg",
      "/vortexa/vortexa-2.jpg",
      "/vortexa/vortexa-3.jpg",
      "/vortexa/vortexa-4.jpg",
      "/vortexa/vortexa-5.jpg",
      "/vortexa/vortexa-6.jpg",
      "/vortexa/vortexa-7.jpg",
      "/vortexa/vortexa-8.jpg",
      "/vortexa/vortexa-9.jpg",
      "/vortexa/vortexa-10.jpg",
      "/vortexa/vortexa-11.jpg"
    ],
    winnerProjectIds: ["campusflow", "nexus-ide"]
  },
  {
    id: "nexora",
    title: "NEXORA Hackathon 2026",
    tagline: "MedTech & Cyber Defense Innovation Tournament",
    category: "upcoming-hackathon",
    type: "Hackathon",
    date: "October 10 - 12, 2026",
    location: "Coimbatore, India",
    status: "Registration Open",
    heroImage: "/vortexa/vortexa-7.jpg",
    description: "Grand in-person tournament bringing together 600+ builders to create breakthrough MedTech and Cyber Defense solutions directly at the Coimbatore venue.",
    aboutLong: "NEXORA 2026 is HackHere's flagship in-person hackathon held directly at the venue in Coimbatore. Featuring 600+ participants, a single direct round, ₹30,000 in cash prizes, and strong industry backing from Rezylens, Elro Tech, Hashgraph Association, Upto Skills, and Featherless AI.",
    prizePool: "₹30,000",
    track: "MedTech & Cyber",
    participants: "600+",
    rounds: [
      { round: "1 Round Direct", description: "1 round direct at venue (Coimbatore)" }
    ],
    stats: [
      { label: "Participants", value: "600+" },
      { label: "Tournament Format", value: "1 Round Direct" },
      { label: "Prize Pool", value: "₹30,000 (30K)" },
      { label: "Tracks", value: "MedTech & Cyber" },
      { label: "Venue", value: "Coimbatore" }
    ],
    tracks: [
      {
        title: "MedTech Innovations",
        desc: "Real-time clinical triage engines, hospital equipment telemetry, and patient monitoring software."
      },
      {
        title: "Cyber Security & Threat Defense",
        desc: "Zero-trust identity systems, automated vulnerability patching bots, and cryptographic protocols."
      },
      {
        title: "Hedera & Web3 Distributed Ledger",
        desc: "Decentralized consensus verification, tokenized credential vaults, and immutable audit trails."
      },
      {
        title: "Open Frontier AI & IoT",
        desc: "Autonomous edge systems, computer vision monitoring, and high-performance embedded software."
      }
    ],
    prizes: [
      { title: "Grand Champion (First Place)", amount: "₹30,000", badge: "National Title" },
      { title: "Track Innovator Distinction", amount: "Grants & Swag", badge: "Track Prize" }
    ],
    agenda: [
      { time: "Day 1 - 09:00 AM", title: "On-Site Check-In at Coimbatore", desc: "600+ participants arrive at the Coimbatore venue for badge collection." },
      { time: "Day 1 - 10:30 AM", title: "Challenge Brief & Sponsor Unlocks", desc: "Live release of MedTech and Cyber problem statements." },
      { time: "Day 1 - 11:30 AM", title: "Direct Hacking Sprint", desc: "Teams commence direct prototyping in dedicated lab tracks." },
      { time: "Day 1 - 07:00 PM", title: "Technical Mentor Checkpoints", desc: "1-on-1 breakout guidance with domain security and healthcare specialists." },
      { time: "Day 2 - 10:00 AM", title: "Mid-Sprint Stress Testing", desc: "Live code validation and security vulnerability scans." },
      { time: "Day 3 - 09:00 AM", title: "Final Code Freeze & PR Uploads", desc: "Submission deadline and automated test harness execution." },
      { time: "Day 3 - 02:00 PM", title: "Grand Finals & Live Awards", desc: "Top stage presentations and ₹30,000 grand prize award." }
    ],
    chiefGuests: [
      { name: "Dr. K. Senthil Nathan", title: "Principal AI Scientist", company: "Cognitive Labs", image: "/founders/guru-prakash.jpeg" },
      { name: "Ananya Iyer", title: "Principal Product Architect", company: "Figma Community Advocate", image: "/founders/rithika-s.jpeg" }
    ],
    sponsors: [
      { name: "Rezylens", tier: "Title Sponsor", logo: "Rezylens", color: "#4285F4" },
      { name: "Elro Tech", tier: "Innovation Partner", logo: "Elro Tech", color: "#3ECF8E" },
      { name: "Hashgraph Association", tier: "Web3 Partner", logo: "Hashgraph Association", color: "#D97706" },
      { name: "Upto Skills", tier: "Career Partner", logo: "Upto Skills", color: "#00C6F7" },
      { name: "Featherless AI", tier: "Compute Partner", logo: "Featherless AI", color: "#61C8D4" }
    ],
    gallery: [
      "/vortexa/vortexa-7.jpg",
      "/vortexa/vortexa-8.jpg",
      "/aiventra/aiventra-1.jpg",
      "/aiventra/aiventra-4.jpg"
    ],
    winnerProjectIds: []
  },
  {
    id: "hack-to-hire",
    title: "Hack To Hire Hackathon",
    tagline: "Direct-to-Employment Builder Sprint with Partner Tech Teams",
    category: "upcoming-hackathon",
    type: "Hackathon",
    date: "November 20 - 22, 2026",
    location: "Hybrid Cohort (Campus Hubs + Remote)",
    status: "Registration Open",
    heroImage: "/aiventra/aiventra-1.jpg",
    description: "Direct-to-employment builder sprint where top projects gain instant interview rounds and hiring fast-tracks with sponsoring startups and fast-growing tech teams.",
    aboutLong: "Tired of generic DSA quiz screens? 'Hack To Hire' bypasses resume filters. Sponsoring engineering teams assign real product backlog features and architectural challenges. Top performers receive instant job and paid internship offers upon code review.",
    prizePool: "₹2,00,000",
    track: "Production Engineering & AI",
    participants: "400+",
    stats: [
      { label: "Partner Companies", value: "12 Hiring Teams" },
      { label: "Direct Offers", value: "35+ Roles" },
      { label: "Min. Stipend", value: "₹45k/mo" },
      { label: "Prize Grant", value: "₹2,00,000" }
    ],
    tracks: [
      {
        title: "Full Stack Production Engineering",
        desc: "Building authenticated, high-performance web applications with automated testing and CI/CD pipelines."
      },
      {
        title: "AI & Data Systems Engineering",
        desc: "Constructing data ingestion queues, vector database embedding search, and fine-tuning pipelines."
      },
      {
        title: "Mobile & Cross-Platform Systems",
        desc: "Offline-first React Native / Flutter apps with smooth 60fps micro-interactions and native bridge integration."
      }
    ],
    prizes: [
      { title: "First Place Overall + Fast-Track Offer", amount: "₹1,00,000", badge: "Champion" },
      { title: "Runner Up + Interview Fast-Track", amount: "₹60,000", badge: "Silver" },
      { title: "Best Clean Architecture Award", amount: "₹40,000", badge: "Architecture" }
    ],
    agenda: [
      { time: "Day 1 - 09:30 AM", title: "Hiring Partner Challenge Pitches", desc: "CTOs and engineering leads present their company problem statements." },
      { time: "Day 1 - 11:00 AM", title: "Sprint Commences", desc: "Teams branch company starter repos and implement features." },
      { time: "Day 1 - 05:00 PM", title: "CTO Code Checkpoint", desc: "Hiring managers inspect Git commits and PR hygiene." },
      { time: "Day 2 - 02:00 PM", title: "Mid-Sprint Architecture Review", desc: "1-on-1 code reviews with prospective engineering managers." },
      { time: "Day 3 - 10:00 AM", title: "Final PR Submission", desc: "Pull request freeze with complete test coverage reports." },
      { time: "Day 3 - 01:30 PM", title: "Technical Defense & Pitch", desc: "10-minute technical defense with hiring managers." },
      { time: "Day 3 - 05:00 PM", title: "Offer Letters & Awards Ceremony", desc: "Announcement of prize winners and direct employment offers." }
    ],
    chiefGuests: [
      { name: "Rohit Verma", title: "Head of Engineering", company: "CloudScale Systems", image: "/founders/guru-prakash.jpeg" },
      { name: "Meera Chandran", title: "Director of Talent", company: "Nexus Startups", image: "/founders/Shubaashree.jpeg" }
    ],
    sponsors: [
      { name: "Zeta Tech", tier: "Hiring Partner", logo: "Zeta", color: "#10B981" },
      { name: "Krypton Cloud", tier: "Hiring Partner", logo: "Krypton", color: "#6366F1" }
    ],
    gallery: [
      "/aiventra/aiventra-1.jpg",
      "/aiventra/aiventra-2.jpg",
      "/aiventra/aiventra-3.jpg"
    ],
    winnerProjectIds: []
  },
  {
    id: "bootcamp-hedera-web3",
    title: "Hedera Distributed Ledger & Web3 Engineering Bootcamp",
    tagline: "4-Week Intensive Cohort powered by Hedera & Hashgraph Association",
    category: "upcoming-bootcamp",
    type: "Bootcamp",
    date: "November 05 - December 03, 2026",
    location: "Hybrid Virtual & Campus Labs",
    status: "Registration Open",
    heroImage: "/aiventra/aiventra-5.jpg",
    description: "4-week hands-on intensive cohort where participants build, deploy, and scale production-grade decentralized applications on Hedera Hashgraph.",
    aboutLong: "Designed by Hedera and HackHere for engineers ready to master distributed ledger technologies. Covers Hedera Consensus Service (HCS), Hedera Token Service (HTS), Smart Contracts 2.0 on EVM, decentralized identity, and token economics.",
    stats: [
      { label: "Cohort Seats", value: "120 Seats" },
      { label: "Live Hours", value: "32 Hours" },
      { label: "Partner", value: "Hedera" },
      { label: "Mentorship", value: "Weekly 1-on-1" }
    ],
    tracks: [
      { title: "Week 1: Hedera Architecture & Consensus Service", desc: "Hashgraph consensus algorithm, HCS topic creation, and transaction ordering." },
      { title: "Week 2: Hedera Token Service (HTS) & Assets", desc: "Minting fungible and non-fungible tokens, custom fee schedules, and atomic swaps." },
      { title: "Week 3: EVM Smart Contracts on Hedera", desc: "Solidity contract deployment, JSON-RPC relays, and Web3 SDK integration." },
      { title: "Week 4: Capstone DApp Demo Day", desc: "Live production deployment, security audits, and presentation before Hedera judges." }
    ],
    prizes: [
      { title: "Hedera Capstone Grant", amount: "₹50,000", badge: "Hedera Grant" },
      { title: "Hedera Developer Certifications", amount: "Certified Web3 Builder", badge: "Credential" }
    ],
    agenda: [
      { time: "Week 1", title: "Foundations of Hedera Hashgraph", desc: "Consensus mechanisms, accounts, and SDKs." },
      { time: "Week 2", title: "Tokenization & Decentralized Asset Rails", desc: "Building tokenized economies with native speed." },
      { time: "Week 3", title: "Smart Contract Integrations", desc: "Deploying high-throughput EVM contracts." },
      { time: "Week 4", title: "Demo Day & Ecosystem Grants", desc: "Presenting projects to Web3 ecosystem judges." }
    ],
    chiefGuests: [
      { name: "Rohit Verma", title: "Web3 Engineering Lead", company: "Hashgraph Association", image: "/founders/guru-prakash.jpeg" }
    ],
    sponsors: [
      { name: "Hedera", tier: "Title Partner", logo: "Hedera", color: "#3ECF8E" },
      { name: "Hashgraph Association", tier: "Ecosystem Partner", logo: "Hashgraph Association", color: "#FFFFFF" }
    ],
    gallery: [
      "/aiventra/aiventra-5.jpg",
      "/aiventra/aiventra-6.jpg"
    ],
    winnerProjectIds: []
  },
  {
    id: "bootcamp-agentic-ai",
    title: "Agentic AI & LLM Systems Engineering",
    tagline: "Construct Multi-Step Reasoning Agents with Real API Tool Use",
    category: "upcoming-bootcamp",
    type: "Bootcamp",
    date: "December 10, 2026 - January 14, 2027",
    location: "Virtual Global Masterclass Cohort",
    status: "Registration Open",
    heroImage: "/vortexa/vortexa-1.jpg",
    description: "6-week advanced masterclass cohort diving into LangGraph, tool-calling agents, retrieval augmented generation with hybrid search, and evaluation harness engineering.",
    aboutLong: "Learn to build autonomous software agents that don't just chat, but execute actions across real tools, databases, and third-party APIs with verified safety boundaries and low latency.",
    stats: [
      { label: "Duration", value: "6 Weeks" },
      { label: "Cohort Cap", value: "80 Engineers" },
      { label: "Live Sprints", value: "12 Sprints" },
      { label: "Compute", value: "Featherless AI Credits" }
    ],
    tracks: [
      { title: "Agent Cognitive Architecture", desc: "ReAct patterns, memory buffers, and stateful graph execution." },
      { title: "RAG & Vector Retrieval Systems", desc: "Hybrid BM25 + dense embedding indexing, re-ranking models, and chunking." },
      { title: "Evaluations & Guardrails", desc: "Automated test suites for non-deterministic AI outputs and toxicity filtering." }
    ],
    prizes: [
      { title: "Best Autonomous Tool Agent Grant", amount: "₹50,000", badge: "Grand Project" }
    ],
    agenda: [
      { time: "Week 1-2", title: "Foundations of Stateful Graph Agents", desc: "Building deterministic loops around probabilistic models." },
      { time: "Week 3-4", title: "Enterprise RAG & Hybrid Vector Search", desc: "Ingesting complex multimodal datasets." },
      { time: "Week 5-6", title: "Autonomous Swarms & Production Hardening", desc: "Multi-agent coordination and SLA benchmarks." }
    ],
    chiefGuests: [
      { name: "Dr. K. Senthil Nathan", title: "Principal AI Scientist", company: "Cognitive Labs", image: "/founders/guru-prakash.jpeg" }
    ],
    sponsors: [
      { name: "Featherless AI", tier: "Compute Partner", logo: "Featherless AI", color: "#D97706" }
    ],
    gallery: [
      "/vortexa/vortexa-1.jpg",
      "/vortexa/vortexa-2.jpg"
    ],
    winnerProjectIds: []
  }
];

export const SAMPLE_EVENTS = eventsData;
export const FEATURED_EVENT = eventsData.find(e => e.id === "nexora") || eventsData[0];

// =========================================================================
// PROJECTS DATA STORE (Exactly 4 Projects & 2-3 Categories)
// Categories: "AI & Healthcare", "Distributed Systems", "Developer Tools"
// =========================================================================
export const projectCategories = [
  "All",
  "AI & Healthcare",
  "Distributed Systems",
  "Developer Tools"
];

export const projectsData = [
  {
    id: "medpulse-ai",
    name: "MedPulse AI",
    tagline: "Real-time multilingual triage assistance for rural healthcare workers",
    category: "AI & Healthcare",
    event: "AIVENTRA 2025",
    eventId: "aiventra",
    track: "FinTech & AI",
    venue: "Chennai",
    problem: "Primary healthcare clinics face doctor shortages and language barriers during patient intake. Nurses spend 40% of their time manually transcribing notes in regional dialects.",
    solution: "An offline-first voice AI mobile system that converts vernacular patient speech into structured ICD-10 medical summaries and flags urgent symptoms in under 800ms.",
    impact: [
      "Piloted across 3 community health clinics in Tamil Nadu and Karnataka",
      "Over 1,400+ patient triage intakes processed with 98.4% diagnostic accuracy",
      "Reduced average emergency intake waiting time by 65%",
      "Winner — 1st Place Overall at AIVENTRA 2025 (₹12,000 Prize Winner)"
    ],
    techStack: ["React Native", "FastAPI", "Whisper Small", "Gemini 1.5 API", "SQLite"],
    team: [
      { name: "Aravind Raman", role: "AI & ML Engineer", avatar: "/founders/guru-prakash.jpeg" },
      { name: "Divya Krishnan", role: "Mobile Lead", avatar: "/founders/rithika-s.jpeg" },
      { name: "Siddharth Rao", role: "Systems & Backend", avatar: "/founders/ezhil-kk.jpeg" }
    ],
    demoUrl: "https://medpulse-demo.hackhere.org",
    githubUrl: "https://github.com/hackhere/medpulse-ai",
    screenshots: [
      "/aiventra/aiventra-4.jpg",
      "/aiventra/aiventra-1.jpg"
    ]
  },
  {
    id: "campusflow",
    name: "CampusFlow",
    tagline: "Decentralized peer-to-peer equipment sharing & makerspace manager",
    category: "Distributed Systems",
    event: "VORTEXA 2025",
    eventId: "vortexa",
    track: "MedTech & IoT",
    venue: "Chennai",
    problem: "Colleges struggle with underutilized lab hardware, microcontrollers, 3D printers, and sensors scattered across departments without transparent tracking.",
    solution: "A smart inventory booking and peer loan platform featuring QR verification, automated return escrow, and real-time maintenance logging with optimistic concurrency controls.",
    impact: [
      "Adopted by 2 university makerspaces with 1,200+ monthly equipment loans",
      "Zero reported loss of hardware components over a 6-month trial period",
      "Grand Winner — 1st Place at VORTEXA 2025 (₹15,000 Prize Winner)",
      "Featured in university research symposium"
    ],
    techStack: ["Next.js App Router", "Supabase PostgreSQL", "TailwindCSS", "QR Scanner", "Redis Upstash"],
    team: [
      { name: "Rahul Sunder", role: "Frontend Architect", avatar: "/founders/ezhil-kk.jpeg" },
      { name: "Preeti Balan", role: "Product Designer", avatar: "/founders/Shubaashree.jpeg" },
      { name: "Varun Nair", role: "Database Engineer", avatar: "/founders/guru-prakash.jpeg" }
    ],
    demoUrl: "https://campusflow.hackhere.org",
    githubUrl: "https://github.com/hackhere/campusflow",
    screenshots: [
      "/vortexa/vortexa-3.jpg",
      "/vortexa/vortexa-9.jpg"
    ]
  },
  {
    id: "aegis-guard",
    name: "AegisGuard AI",
    tagline: "Autonomous zero-day dependency vulnerability detector & patch synthesizer",
    category: "Developer Tools",
    event: "AIVENTRA 2025",
    eventId: "aiventra",
    track: "Cyber & AI",
    venue: "Chennai",
    problem: "Software repositories suffer from supply-chain attack vulnerabilities hidden deep within transitive dependencies, often unpatched for months.",
    solution: "A continuous AST analyzer and LLM sandbox that scans dependency trees, generates isolated repro test cases, and automatically creates verified pull requests fixing security holes.",
    impact: [
      "Scanned 400+ public student and open-source repositories during AIVENTRA demo",
      "Synthesized 65 valid security patch PRs with passing automated test suites",
      "Best AI Agent Track Winner at AIVENTRA 2025"
    ],
    techStack: ["TypeScript", "LangGraph", "Tree-sitter AST", "Docker Sandboxes", "GitHub API"],
    team: [
      { name: "Manoj Swaminathan", role: "Security Researcher", avatar: "/founders/guru-prakash.jpeg" },
      { name: "Harini V.", role: "LLM Systems Engineer", avatar: "/founders/rithika-s.jpeg" }
    ],
    demoUrl: "https://aegisguard.hackhere.org",
    githubUrl: "https://github.com/hackhere/aegisguard-ai",
    screenshots: [
      "/aiventra/aiventra-7.jpg",
      "/aiventra/aiventra-2.jpg"
    ]
  },
  {
    id: "nexus-ide",
    name: "NexusCloud IDE",
    tagline: "WebGPU-accelerated collaborative in-browser cloud workspace with micro-sandboxes",
    category: "Developer Tools",
    event: "VORTEXA 2025",
    eventId: "vortexa",
    track: "Cloud & DevTools",
    venue: "Chennai",
    problem: "Student developers on low-spec hardware struggle to run heavy Node.js and Python microservice environments locally, limiting hackathon participation.",
    solution: "An ultra-lightweight WebAssembly code editor that spins up remote micro-VM sandboxes in under 400ms, streaming terminal I/O over binary WebSockets with real-time multi-cursor collaboration.",
    impact: [
      "Enabled 350+ hackathon participants with low-end Chromebooks to build full-stack apps",
      "Sub-30ms typing latency across global WebSocket edge nodes",
      "Runner-Up at VORTEXA 2025 (₹15,000 Tournament Finalist)"
    ],
    techStack: ["React", "Monaco Editor", "WebAssembly", "Rust Firecracker microVM", "WebSockets"],
    team: [
      { name: "Nikhil Menon", role: "Systems Lead", avatar: "/founders/ezhil-kk.jpeg" },
      { name: "Sneha Pillai", role: "Frontend & WebGPU", avatar: "/founders/Shubaashree.jpeg" }
    ],
    demoUrl: "https://nexuside.hackhere.org",
    githubUrl: "https://github.com/hackhere/nexus-cloud-ide",
    screenshots: [
      "/vortexa/vortexa-1.jpg",
      "/vortexa/vortexa-7.jpg"
    ]
  }
];

export const BUILT_AT_HACKHERE_PROJECTS = projectsData.map(p => ({
  ...p,
  technologies: p.techStack,
  outcome: p.impact[p.impact.length - 1] || "Shipped at HackHere",
  github: p.githubUrl,
  demo: p.demoUrl
}));

// =========================================================================
// FOUNDERS DATA STORE (Exactly 4 Founders with Attached Photos)
// =========================================================================
export const communityFounders = [
  {
    id: "01",
    slot: "FOUNDER 01",
    name: "Ezhil KK",
    role: "Founder / Co-Founder",
    image: "/founders/ezhil-kk.jpeg",
    linkedin: "https://linkedin.com"
  },
  {
    id: "02",
    slot: "FOUNDER 02",
    name: "Guru Prakash",
    role: "Founder / Co-Founder",
    image: "/founders/guru-prakash.jpeg",
    linkedin: "https://linkedin.com"
  },
  {
    id: "03",
    slot: "FOUNDER 03",
    name: "Rithika S",
    role: "Founder / Co-Founder",
    image: "/founders/rithika-s.jpeg",
    linkedin: "https://linkedin.com"
  },
  {
    id: "04",
    slot: "FOUNDER 04",
    name: "Shubaashree",
    role: "Founder / Co-Founder",
    image: "/founders/Shubaashree.jpeg",
    linkedin: "https://linkedin.com"
  }
];

export const foundingTeamData = communityFounders.map(f => ({
  name: f.name,
  role: f.role,
  bio: `Core Founder of HackHere shaping ecosystem operations, builder hackathons, and community growth.`,
  image: f.image,
  links: {
    linkedin: f.linkedin,
    github: "https://github.com",
    twitter: "https://twitter.com"
  }
}));

// =========================================================================
// TEAM DATA STORE (Exactly 2 Photos per Squad Team)
// =========================================================================
export const communityTeams = {
  design: [
    {
      id: "design-01",
      name: "Ananya Iyer",
      role: "Creative & Design Lead",
      image: "/founders/rithika-s.jpeg",
      linkedin: "https://linkedin.com"
    },
    {
      id: "design-02",
      name: "Pooja Sundaram",
      role: "UI/UX & Motion Designer",
      image: "/founders/Shubaashree.jpeg",
      linkedin: "https://linkedin.com"
    }
  ],
  tech: [
    {
      id: "tech-01",
      name: "Siddharth Rao",
      role: "Lead Platform Engineer",
      image: "/founders/ezhil-kk.jpeg",
      linkedin: "https://linkedin.com"
    },
    {
      id: "tech-02",
      name: "Guru Prakash",
      role: "Full Stack & Cloud Systems",
      image: "/founders/guru-prakash.jpeg",
      linkedin: "https://linkedin.com"
    }
  ],
  media: [
    {
      id: "media-01",
      name: "Aditi Sharma",
      role: "Head of Media & Content",
      image: "/founders/rithika-s.jpeg",
      linkedin: "https://linkedin.com"
    },
    {
      id: "media-02",
      name: "Naveen Raj",
      role: "Cinematographer & Stream Lead",
      image: "/founders/ezhil-kk.jpeg",
      linkedin: "https://linkedin.com"
    }
  ],
  volunteers: [
    {
      id: "volunteer-01",
      name: "Sneha Reddy",
      role: "Campus Ambassador Lead",
      image: "/founders/Shubaashree.jpeg",
      linkedin: "https://linkedin.com"
    },
    {
      id: "volunteer-02",
      name: "Arun Prakash",
      role: "Operations Coordinator",
      image: "/founders/guru-prakash.jpeg",
      linkedin: "https://linkedin.com"
    }
  ]
};

export const teamMembersByCategory = {
  "DESIGN TEAM": communityTeams.design,
  "TECH TEAM": communityTeams.tech,
  "MEDIA TEAM": communityTeams.media,
  "VOLUNTEERS": communityTeams.volunteers
};

export const TEAM_MEMBERS = Object.values(teamMembersByCategory).flat();

// =========================================================================
// SPONSORS & COLLABORATORS DATA STORE
// =========================================================================
export const sponsorsByTier = {
  platinum: [
    { name: "Elyon", tier: "Platinum Partner" },
    { name: "Journi", tier: "Platinum Partner" },
    { name: "MaestroMinds", tier: "Platinum Partner" },
    { name: "Featherless AI", tier: "Platinum Partner" }
  ],
  gold: [
    { name: "Rezylens", tier: "Gold Partner" },
    { name: "Elro Tech", tier: "Gold Partner" },
    { name: "Hashgraph Association", tier: "Gold Partner" },
    { name: "Upto Skills", tier: "Gold Partner" }
  ],
  silver: [
    { name: "Medo", tier: "Silver Partner" },
    { name: "Crystel", tier: "Silver Partner" },
    { name: "Balveontech", tier: "Silver Partner" },
    { name: "Honeycrib", tier: "Silver Partner" }
  ],
  venue: [
    { name: "SNS Institutions (Coimbatore)", tier: "Venue Partner" },
    { name: "Chennai Tech Hub", tier: "Venue Partner" }
  ],
  title: [
    { name: "Elyon", tier: "Title Partner" },
    { name: "Journi", tier: "Title Partner" },
    { name: "MaestroMinds", tier: "Title Partner" },
    { name: "Featherless AI", tier: "Title Partner" }
  ],
  community: [
    { name: "Rezylens", tier: "Community Partner" },
    { name: "Elro Tech", tier: "Community Partner" },
    { name: "Hashgraph Association", tier: "Community Partner" },
    { name: "Upto Skills", tier: "Community Partner" },
    { name: "Honeycrib", tier: "Community Partner" }
  ]
};

export const partnersData = sponsorsByTier;
export const PARTNER_COLLEGES_AND_ORGS = sponsorsByTier.community;

// =========================================================================
// PROGRAMS OVERVIEW DATA STORE
// EXACT 6 CATEGORIES: Hackathon, Bootcamp, Tech Talk, Coding Events, Webinar, Tech Workshops
// =========================================================================
export const PROGRAMS_LIST = [
  {
    id: "hackathons",
    slug: "hackathons",
    title: "Hackathon",
    tagline: "Collaborative Problem-Solving Under the Clock",
    description: "Intense, high-energy 24 to 48-hour sprints solving real-world domain challenges across FinTech, MedTech, and Cyber Defense.",
    features: [
      "Curated industry tracks & domain statements",
      "Live 1-on-1 mentorship checkpoints with senior engineers",
      "Transparent judging by engineering leaders & venture scouts",
      "Cash prizes, cloud credits & verifiable digital credentials"
    ],
    mode: "Online & In-Person Venue",
    duration: "24 - 48 Hours",
    audience: "Students, Developers, Designers, Problem Solvers",
    badge: "Flagship",
    color: "#FF5018"
  },
  {
    id: "bootcamps",
    slug: "bootcamps",
    title: "Bootcamp",
    tagline: "Structured Project-Based Multi-Week Learning",
    description: "Intensive multi-week cohorts (like our Hedera Web3 & Full-Stack Bootcamps) designed to take learners from zero to production architecture.",
    features: [
      "Week-by-week production curriculum with live mentors",
      "Hands-on starter repos & architecture reviews",
      "Capstone project deployed live to production",
      "Direct pathway to ecosystem grants and internships"
    ],
    mode: "Hybrid / Cohort-based",
    duration: "4 - 8 Weeks",
    audience: "Beginners to Intermediate Builders",
    badge: "Cohort",
    color: "#0061FE"
  },
  {
    id: "tech-talks",
    slug: "tech-talks",
    title: "Tech Talk",
    tagline: "Fireside Insights from Engineering Leaders",
    description: "Deep-dive tech talks exploring system architecture, generative AI infrastructure, distributed ledgers, and scaling engineering careers.",
    features: [
      "Sessions with Principal Engineers & Startup CTOs",
      "Interactive architecture teardowns & live Q&A",
      "Community recordings & slide deck archives",
      "Networking breakout channels"
    ],
    mode: "Live Stream / In-Person",
    duration: "60 - 90 Minutes",
    audience: "All developers & curious engineering minds",
    badge: "Insights",
    color: "#61C8D4"
  },
  {
    id: "coding-events",
    slug: "coding-events",
    title: "Coding Events",
    tagline: "Fast-Paced Algorithmic & Bug Sprints",
    description: "Weekly algorithmic challenges, speed debugging battles, and UI component build sprints with automated leaderboard scoring.",
    features: [
      "Real-time test suite evaluation & leaderboard",
      "Sharpen core logic, data structures, and edge case handling",
      "Fast feedback & peer code comparisons",
      "Points and badges awarded to builder profiles"
    ],
    mode: "Online Coding Platform",
    duration: "1 - 3 Hours",
    audience: "Competitive programmers & software engineers",
    badge: "Competitive",
    color: "#CCFF00"
  },
  {
    id: "webinars",
    slug: "webinars",
    title: "Webinar",
    tagline: "Interactive Virtual Learning Masterclasses",
    description: "Online masterclasses breaking down emerging frameworks, cloud technologies, AI agent tool calling, and full-stack DevOps pipelines.",
    features: [
      "Step-by-step hands-on demonstrations",
      "Downloadable starter code & cheatsheets",
      "Direct audience Q&A with instructor",
      "Verifiable digital badge of participation"
    ],
    mode: "Virtual Interactive Stream",
    duration: "90 Minutes",
    audience: "Students & developers looking to upskill quickly",
    badge: "Knowledge",
    color: "#00C6F7"
  },
  {
    id: "tech-workshops",
    slug: "tech-workshops",
    title: "Tech Workshops",
    tagline: "Hands-on Practical Labs & Hardware Sprints",
    description: "On-ground and virtual practical workshops where attendees code alongside instructors to deploy microservices, IoT telemetry, and AI models.",
    features: [
      "100% hands-on live coding with starter repositories",
      "Hardware kits & sensor breadboards provided in lab tracks",
      "Direct guidance from experienced lab instructors",
      "Immediate deployed output by end of workshop"
    ],
    mode: "Campus Labs & Hybrid",
    duration: "3 - 5 Hours",
    audience: "Hands-on builders seeking targeted practical mastery",
    badge: "Hands-on",
    color: "#9B0032"
  }
];

export const PROGRAM_FILTER_CATEGORIES = [
  "All",
  "Hackathon",
  "Bootcamp",
  "Tech Talk",
  "Coding Events",
  "Webinar",
  "Tech Workshops"
];

// =========================================================================
// COMMUNITY STORIES & TESTIMONIALS
// =========================================================================
export const COMMUNITY_STORIES = [
  {
    id: "story-1",
    quote: "HackHere wasn't just a weekend competition for me. The 1-on-1 mentorship we got during AIVENTRA completely restructured our backend architecture. We went from a student hobby project to a deployed product piloted in real clinics.",
    author: "Aravind Raman",
    role: "Full-Stack Developer & AIVENTRA Winner",
    affiliation: "Anna University, Chennai",
    program: "AIVENTRA 2025"
  },
  {
    id: "story-2",
    quote: "Mentoring at HackHere is energizing. The questions students ask are practical and grounded in real-world problems. Watching teams evolve an abstract concept into a working prototype in 36 hours is inspiring.",
    author: "Deepa Krishnan",
    role: "Senior Engineering Lead",
    affiliation: "Zoho Corporation",
    program: "HackHere Mentor Network"
  },
  {
    id: "story-3",
    quote: "As a first-time hackathon participant at VORTEXA, the structured workshops gave me the confidence to contribute IoT integrations to our team. Today I lead our campus tech chapter and mentor new builders.",
    author: "Pooja Sundaram",
    role: "Product Designer & Community Lead",
    affiliation: "SSN College of Engineering",
    program: "VORTEXA 2025"
  }
];

// =========================================================================
// MENTORS & SPEAKERS DIRECTORY
// =========================================================================
export const MENTORS_AND_SPEAKERS = [
  {
    id: "m-1",
    name: "Dr. K. Senthil Nathan",
    role: "Principal AI Scientist",
    organization: "Cognitive Labs",
    expertise: ["Generative AI", "Computer Vision", "MLOps"],
    avatar: "/founders/guru-prakash.jpeg"
  },
  {
    id: "m-2",
    name: "Rohit Verma",
    role: "Head of Engineering",
    organization: "CloudScale Systems",
    expertise: ["Cloud Native", "Kubernetes", "Distributed Systems"],
    avatar: "/founders/ezhil-kk.jpeg"
  },
  {
    id: "m-3",
    name: "Ananya Iyer",
    role: "Senior Product Designer",
    organization: "Figma Community Advocate",
    expertise: ["Design Systems", "UX Research", "Micro-Interactions"],
    avatar: "/founders/rithika-s.jpeg"
  },
  {
    id: "m-4",
    name: "Shubaashree",
    role: "Staff Software Engineer",
    organization: "FinTech Global",
    expertise: ["Full Stack", "System Architecture", "PostgreSQL"],
    avatar: "/founders/Shubaashree.jpeg"
  }
];

// =========================================================================
// ARCHETYPES & ROLES
// =========================================================================
export const ARCHETYPES_DATA = [
  {
    role: "Students",
    tagline: "Break free from theoretical boundaries.",
    whatYouDo: "Learn modern frameworks, participate in 24-48hr hackathons, collaborate with peers across institutions, and build a verifiable portfolio.",
    benefits: ["Free access to developer workshops", "Team matchmaking for sprints", "Direct 1-on-1 mentor guidance", "Verifiable digital credentials"]
  },
  {
    role: "Developers",
    tagline: "Ship production-grade code under real constraints.",
    whatYouDo: "Tackle ambitious problem statements, test new APIs and cloud architectures, compete for prize grants, and find technical co-founders.",
    benefits: ["High-energy weekend sprints", "Access to cloud compute credits", "Technical review from senior leads", "Open source project incubation"]
  },
  {
    role: "Designers",
    tagline: "Shape products that people actually love to use.",
    whatYouDo: "Craft user interfaces, interaction design systems, and product narratives alongside rapid engineering teams.",
    benefits: ["Real-time developer collaboration", "Portfolio-ready shipped products", "Design system prototyping", "Product UX judging exposure"]
  },
  {
    role: "Innovators & Founders",
    tagline: "Test breakthrough concepts in 48 hours.",
    whatYouDo: "Validate Minimum Viable Products, gather immediate technical feedback from mentors, and recruit skilled founding engineers.",
    benefits: ["Rapid prototype validation", "Talent discovery and recruiting", "Incubation partner network", "Angel & grant exposure"]
  },
  {
    role: "Mentors & Speakers",
    tagline: "Elevate the next wave of engineering talent.",
    whatYouDo: "Guide student squads through architecture roadblocks, deliver masterclasses on cutting-edge topics, and judge hackathon tracks.",
    benefits: ["Ecosystem thought leadership", "Featured profile in community hub", "Direct engagement with top 5% talent", "Community contribution awards"]
  },
  {
    role: "Organizations",
    tagline: "Engage top builder talent and fuel innovation.",
    whatYouDo: "Sponsor flagship events, present domain challenge statements, showcase developer tooling APIs, and recruit high-performing builders.",
    benefits: ["Accelerated hiring pipelines", "High-touch campus visibility", "API & developer tools adoption", "Co-created masterclasses"]
  }
];

// =========================================================================
// FAQ DATA STORE
// =========================================================================
export const FAQ_DATA = {
  general: [
    {
      q: "What is HackHere?",
      a: "HackHere is a technology and innovation community ecosystem. We organize hackathons, bootcamps, workshops, webinars, coding challenges, and community meetups to bridge the gap between classroom theory and real-world practical building."
    },
    {
      q: "Who can join HackHere?",
      a: "HackHere is open to students, self-taught developers, designers, product builders, researchers, mentors, speakers, and industry organizations. Anyone eager to learn, build, collaborate, or guide is welcome."
    },
    {
      q: "Is HackHere only for experienced developers?",
      a: "Not at all! We host dedicated beginner tracks, introductory workshops, and structured bootcamps designed to guide first-time builders from zero to their first deployed project."
    },
    {
      q: "Are HackHere events free to attend?",
      a: "The vast majority of our community events, workshops, webinars, and hackathons are completely free of cost for participants."
    }
  ],
  events: [
    {
      q: "How do I register for an event?",
      a: "Browse the Events page, select the event you are interested in, and click 'Register Now'. If you have a HackHere account, your registration is instantly confirmed in your dashboard."
    },
    {
      q: "Are events conducted online or in-person?",
      a: "We organize both virtual events (accessible globally) and in-person campus meetups and hackathons across regional hubs including Chennai and Coimbatore."
    },
    {
      q: "Can I participate in hackathons as a team?",
      a: "Yes! Teams typically range from 2 to 4 members. If you don't have a team yet, our Discord community and pre-hackathon mixer sessions will help you find teammates."
    },
    {
      q: "Do participants receive certificates?",
      a: "Yes, verified digital certificates of completion and participation with unique verification IDs are issued to eligible participants."
    }
  ],
  mentorship: [
    {
      q: "How can I become a mentor or speaker?",
      a: "Head to our 'Get Started' page and choose the 'Mentor' or 'Speaker' pathway to submit a brief profile of your domain expertise. Our community team reviews submissions and coordinates speaking and mentoring slots."
    },
    {
      q: "What is expected of HackHere mentors?",
      a: "Mentors participate in checkpoint reviews during hackathons, conduct technical workshops, review code architecture, and provide constructive feedback to student teams."
    }
  ],
  organizations: [
    {
      q: "How can my company or institution partner with HackHere?",
      a: "Organizations can sponsor flagship hackathons (like AIVENTRA, VORTEXA, NEXORA), provide custom real-world problem statements, mentor talent, conduct specialized tech masterclasses, or recruit top performers. Visit our Collaborate page or reach out to community@hackhere.org."
    },
    {
      q: "Can colleges host a HackHere chapter on campus?",
      a: "Yes! We support campus ambassador programs and student developer clubs with workshop curriculums, speaker connections, and hackathon organization support."
    }
  ]
};
