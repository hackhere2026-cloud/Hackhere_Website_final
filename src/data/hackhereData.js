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
  { value: "1000+", label: "Community Members", description: "Students, developers, creators & aspiring innovators growing together." },
  { value: "3+", label: "Events & Initiatives", description: "Hackathons, workshops, sessions and community-led experiences." },
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
    title: "AIVENTRA 2026",
    tagline: "CODE. BUILD. GET HIRED. — The Ultimate AI Hackathon",
    category: "completed",
    type: "Hackathon",
    date: "May 9–10, 2026",
    location: "Intro Works, Nandambakkam, Chennai",
    status: "Completed",
    heroImage: "/aiventra/aiven.png",
    description: "AIventra 2026 is the ultimate AI Hackathon presented by HackHere at Intro Works, Nandambakkam, Chennai. Code, build, and compete across AI, Cyber Security, Blockchain, and DevOps for a ₹1,00,000 prize pool.",
    aboutLong: "AIventra 2026 united 200+ ambitious builders at Intro Works, Nandambakkam, Chennai. Round 1 launched with online PPT submissions across Artificial Intelligence, Cyber Security, BlockChain, and DevOps. Round 2 brought top squads together for an intense 24-hour hackathon, featuring live mentorship, jury reviews by HR & engineering leads from Cognizant, PwC, and Chris Byte, and a ₹1,00,000 prize pool with internship offers.",
    prizePool: "₹1,00,000",
    track: "Artificial Intelligence",
    participants: "200+",
    venueFull: "Intro Works, No 1/2a, Dharmambal Palanippan Complex, First Floor, Mount Poonamallee Rd, near A2B Restaurant, Ramapuram, Nandambakkam, Chennai, Tamil Nadu 600089",
    venueMapUrl: "https://www.google.com/maps/dir//Intro+Works,+No+1%2F2a,+Dharmambal+Palanippan+Complex,+First+Floor,+Mount+Poonamallee+Rd,+near+A2B+Restaturant,+Ramapuram,+Nandambakkam,+Chennai,+Tamil+Nadu+600089/@13.0102989,80.1855184,16.06z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a5267b38adfa399:0x6724527c851b9110!2m2!1d80.1920722!2d13.0145396?entry=ttu&g_ep=EgoyMDI2MDQyMS4wIKXMDSoASAFQAw%3D%3D",
    rounds: [
      { round: "Round 1: Launch (PPT Submission)", date: "18 Apr 2026 – 3 May 2026", description: "Online screening — Open Innovation pitch evaluating Creativity, Feasibility, Innovation, and Impact." },
      { round: "Round 2: Build & Pitch (Hackathon Day)", date: "May 9–10, 2026", description: "24-Hour Onsite Hackathon at Intro Works, Nandambakkam. Ideation -> 24hr Prototyping -> Final Pitch to Jury panel." }
    ],
    stats: [
      { label: "Prize Pool", value: "₹1,00,000" },
      { label: "Duration", value: "24 Hours" },
      { label: "Mode", value: "Hybrid" },
      { label: "Venue", value: "Chennai" },
      { label: "Participants", value: "200+" }
    ],
    tracks: [
      {
        title: "Artificial Intelligence",
        desc: "Build intelligent systems that learn, adapt, and transform industries."
      },
      {
        title: "Cyber Security",
        desc: "Defend digital frontiers with innovative security solutions and threat detection."
      },
      {
        title: "BlockChain",
        desc: "Build decentralized applications and trustless systems for the future."
      },
      {
        title: "DevOps",
        desc: "Automate, integrate, and deploy — streamline the software lifecycle."
      }
    ],
    prizes: [
      { title: "Grand Prize Pool", amount: "₹1,00,000", badge: "Grand Winner" },
      { title: "Internship Opportunities", amount: "Partner Company Offers", badge: "Career Fast-Track" },
      { title: "Goodies & Swag", amount: "Exclusive Merch & Certificates", badge: "All Participants" }
    ],
    agenda: [
      { time: "Round 1 (Apr 18 - May 3)", title: "Launch & Online Abstract Submissions", desc: "PPT Submission & Online screening evaluating creativity, feasibility, innovation, and impact." },
      { time: "May 9 09:00 AM", title: "Venue Check-in & Keynote", desc: "Squads arrive at Intro Works, Nandambakkam, Chennai, check in and receive problem brief." },
      { time: "May 9 10:00 AM", title: "Ideation & Architecture Sprint", desc: "Deep dive into challenge domains (AI, Cyber, Blockchain, DevOps) with mentor guidance." },
      { time: "May 9 12:00 PM", title: "24-Hour Hacking Sprint Commences", desc: "Live code prototyping at venue with continuous technical mentorship." },
      { time: "May 9 07:00 PM", title: "Mentor Checkpoint & Review", desc: "Interactive guidance from industry experts and senior developers." },
      { time: "May 10 09:00 AM", title: "Code Freeze & Submission", desc: "Final repository commit freeze and project demo submission." },
      { time: "May 10 11:30 AM", title: "Final Stage Pitch & Jury Evaluation", desc: "Present to judges on Innovation, Execution, Impact, and Presentation." },
      { time: "May 10 03:00 PM", title: "Awards Ceremony & Networking", desc: "Distribution of ₹1,00,000 Prize Pool, trophies, swag, and partner internship offers." }
    ],
    chiefGuests: [
      { name: "Antony", title: "Software Engineer", company: "Chris Byte Solutions (Former Intern at Prism Software Solutions)", image: "/images/antony.jpeg" },
      { name: "Gokul", title: "Executive HR", company: "Cognizant", image: "/images/gokul.jpeg" },
      { name: "Yuva Sri", title: "Software Developer", company: "PwC (Former Intern at Zoho)", image: "/images/yuvasri.jpeg" }
    ],
    organizers: [
      { name: "EZHIL KK", role: "Sponsor & Communication Lead", image: "/images/ezhil.jpg.jpeg", linkedin: "https://www.linkedin.com/in/kk-ezhil-6a31a6235/" },
      { name: "K GURU PRAKASH", role: "Developer Team Lead", image: "/images/guru.jpg.jpeg", linkedin: "https://www.linkedin.com/in/k-guru-prakash-9a4184337/" },
      { name: "RITHIKA S", role: "Social Media & Content Lead", image: "/images/rithika.jpg.jpeg", linkedin: "https://www.linkedin.com/in/rithika-somasundaram/" },
      { name: "SHUBAASHREE S", role: "Outreach & Content Lead", image: "/images/shubaashree.jpg.jpeg", linkedin: "https://www.linkedin.com/in/shubaashreesureshbabu" }
    ],
    sponsors: [
      { name: "Elyon Clothing", tier: "Powered By", logo: "Elyon Clothing", color: "#3ECF8E", image: "/images/sponsors/elyon.jpeg" },
      { name: "Maestrominds", tier: "Powered By", logo: "Maestrominds", color: "#FF6C37", image: "/images/sponsors/maestrominds.png" },
      { name: "Featherless AI", tier: "Powered By", logo: "Featherless AI", color: "#61C8D4", image: "/images/sponsors/featherlessai.jpeg" },
      { name: "MeDo", tier: "Official Sponsor", logo: "MeDo", color: "#00C6F7", image: "/images/sponsors/medo.png" },
      { name: "Journi", tier: "Official Sponsor", logo: "Journi", color: "#FFFFFF", image: "/images/sponsors/journi.jpeg" }
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
    winnerProjectIds: []
  },
  {
    id: "vortexa",
    title: "VORTEXA 2026",
    tagline: "INNOVATE. ITERATE. CREATE. — The Ultimate Hackathon by HackHere",
    category: "completed",
    type: "Hackathon",
    date: "June 20–21, 2026",
    location: "Intro Works, Nandambakkam, Chennai",
    status: "Completed",
    heroImage: "/vortexa/vortexa_banner.webp",
    description: "VORTEXA 2026 is the inaugural 24-hour gauntlet presented by HackHere at Intro Works, Nandambakkam, Chennai. Code, build, and compete across AI, Cyber Security, Blockchain, and Emerging Technologies for a ₹25,000 prize pool.",
    aboutLong: "VORTEXA is HackHere's inaugural 24-hour gauntlet at Intro Works, Nandambakkam, Chennai. Centered around AI, Cyber Security, Blockchain, and cross-domain engineering, this is where ideas are violently iterated upon until only the strongest survive. Featuring live mentorship, jury reviews from Cognizant, PwC, and Cristel, and a ₹25,000 prize pool with direct recruitment fast-tracks.",
    prizePool: "₹25,000",
    track: "Artificial Intelligence & Emerging Tech",
    participants: "180–200+",
    venueFull: "Intro Works, No 1/2a, Dharmambal Palanippan Complex, First Floor, Mount Poonamallee Rd, near A2B Restaurant, Ramapuram, Nandambakkam, Chennai, Tamil Nadu 600089",
    venueMapUrl: "https://www.google.com/maps/dir//Intro+Works,+No+1%2F2a,+Dharmambal+Palanippan+Complex,+First+Floor,+Mount+Poonamallee+Rd,+near+A2B+Restaturant,+Ramapuram,+Nandambakkam,+Chennai,+Tamil+Nadu+600089/@13.0102989,80.1855184,16.06z",
    registrationUrl: "https://unstop.com/hackathons/vertexa-hackhere-1686997",
    websiteUrl: "https://vortexa-hack-here.vercel.app/",
    ctaLink: "https://vortexa-hack-here.vercel.app/",
    rounds: [
      { round: "Phase 1: Launch (Online Abstract)", date: "May 11 – Jun 14, 2026", description: "Online screening — Abstract submission focusing on core domains. Shortlisted on Innovation, Feasibility, Technical Approach, and Real-World Impact." },
      { round: "Phase 2: Ideation & Shortlist", date: "June 15 – June 18, 2026", description: "Deep dive into challenge domains. Top 50 teams are selected for the physical 24-hour grand finale." },
      { round: "Phase 3: 24-Hour Onsite Build", date: "June 20–21, 2026", description: "Build working prototype at Intro Works venue over a continuous 24-hour period with direct mentorship support." },
      { round: "Phase 4: Stage Pitch & Jury Evaluation", date: "June 21, 2026", description: "Present prototype to expert judges from Cognizant, PwC, and Cristel on Innovation, Execution, Impact, and Presentation." }
    ],
    stats: [
      { label: "Prize Pool", value: "₹25,000" },
      { label: "Duration", value: "24 Hours" },
      { label: "Mode", value: "Hybrid" },
      { label: "Venue", value: "Chennai" },
      { label: "Participants", value: "180-200" }
    ],
    tracks: [
      {
        title: "Artificial Intelligence",
        desc: "Build intelligent systems that learn, adapt, and transform industries."
      },
      {
        title: "Cyber Security",
        desc: "Defend digital frontiers with innovative security solutions and threat detection."
      },
      {
        title: "Blockchain",
        desc: "Build decentralized applications and trustless systems for the future."
      },
      {
        title: "Emerging Technologies",
        desc: "Harness emerging tech, DevOps automations, or cross-domain integrations to disrupt the status quo."
      }
    ],
    prizes: [
      { title: "Grand Prize Pool", amount: "₹25,000", badge: "Grand Winner" },
      { title: "Career Tracks & Internships", amount: "Partner Recruitment Fast-Track", badge: "Career Fast-Track" },
      { title: "Goodies & Swag", amount: "National Certificates & Exclusive Merch", badge: "All Participants" }
    ],
    agenda: [
      { time: "Phase 1 (May 11 - Jun 14)", title: "Launch & Online Abstract Screening", desc: "Idea / Abstract submission evaluated on Innovation, Feasibility, Technical Approach, and Real-World Impact." },
      { time: "June 20 09:00 AM", title: "Venue Check-in & Keynote Briefing", desc: "Squads arrive at Intro Works, Nandambakkam, Chennai, check in and receive problem briefs." },
      { time: "June 20 10:00 AM", title: "Ideation & Architecture Sprint", desc: "Deep dive into challenge domains (AI, Cyber, Blockchain, Emerging Tech) with mentor guidance." },
      { time: "June 20 12:00 PM", title: "24-Hour Hacking Sprint Commences", desc: "Live code prototyping at venue with continuous technical mentorship." },
      { time: "June 20 08:00 PM", title: "Midnight Mentor Checkpoint", desc: "Interactive guidance from industry experts and senior developers." },
      { time: "June 21 09:00 AM", title: "Code Freeze & Demo Submission", desc: "Final repository commit freeze and video demo submissions." },
      { time: "June 21 11:30 AM", title: "Final Stage Pitch & Jury Evaluation", desc: "Present to judges on Innovation, Execution, Impact, and Presentation." },
      { time: "June 21 03:00 PM", title: "Grand Awards Ceremony & Networking", desc: "Distribution of ₹25,000 Prize Pool, trophies, swag, and partner internship offers." }
    ],
    chiefGuests: [
      { name: "ANTONY", title: "Software Engineer", company: "Chris Byte Solutions (Former Intern at Prism Software Solutions)", image: "/images/antony.jpeg" },
      { name: "DEEPA KIRUBAKARAN", title: "Finance Team Lead", company: "Cognizant", image: "/images/deepa.jpeg" },
      { name: "SIVAPARANJOTHI T", title: "Founder & CEO", company: "Cristel", image: "/images/sivaparanjothi.jpeg" }
    ],
    organizers: [
      { name: "SHUBAASHREE S", role: "Outreach & Content Lead", image: "/images/shubaashree.jpg.jpeg", linkedin: "https://www.linkedin.com/in/shubaashreesureshbabu" },
      { name: "RITHIKA S", role: "Social Media & Content Lead", image: "/images/rithika.jpg.jpeg", linkedin: "https://www.linkedin.com/in/rithika-somasundaram/" },
      { name: "EZHIL KK", role: "Sponsor & Communication Lead", image: "/images/ezhil.jpg.jpeg", linkedin: "https://www.linkedin.com/in/kk-ezhil-6a31a6235/" },
      { name: "K GURU PRAKASH", role: "Developer Team Lead", image: "/images/guru.jpg.jpeg", linkedin: "https://www.linkedin.com/in/k-guru-prakash-9a4184337/" }
    ],
    sponsors: [
      { name: "FeatherlessAI", tier: "Official Partner", logo: "FeatherlessAI", color: "#61C8D4", image: "/images/sponsors/featherlessai.jpeg" },
      { name: "Cristel", tier: "Intern Partner", logo: "Cristel", color: "#00C6F7", image: "/images/sponsors/intern1.jpeg" },
      { name: "BalvionTech", tier: "Intern Partner", logo: "BalvionTech", color: "#4A90E2", image: "/images/sponsors/intern_2.jpeg" },
      { name: "Technobility", tier: "Intern Partner", logo: "Technobility", color: "#00F0FF" },
      { name: "Journi", tier: "Travel Partner", logo: "Journi", color: "#FFFFFF", image: "/images/sponsors/jorni.jpeg" },
      { name: "Elyon Clothing", tier: "Merchandise Partner", logo: "Elyon Clothing", color: "#3ECF8E", image: "/images/sponsors/elyon.jpeg" }
    ],
    gallery: [
      "/vortexa/vortexa-1.jpg",
      "/vortexa/vortexa-2.jpg",
      "/vortexa/vortexa-3.jpg",
      "/vortexa/vortexa-4.jpg",
      "/vortexa/vortexa-5.jpg",
      "/vortexa/vortexa-6.jpg?v=2",
      "/vortexa/vortexa-7.jpg",
      "/vortexa/vortexa-8.jpg",
      "/vortexa/vortexa-9.jpg",
      "/vortexa/vortexa-10.jpg",
      "/vortexa/vortexa-11.jpg"
    ],
    winnerProjectIds: [],
    hideWinningProjects: true
  },
  {
    id: "quantexa",
    title: "QUANTEXA 2026",
    tagline: "Decoding Risks. Engineering Solutions. — Think Quantum • Shape The Future",
    category: "upcoming-hackathon",
    type: "Hackathon",
    date: "September 19–20, 2026",
    location: "SNS IHUB, Coimbatore",
    status: "Registration Open",
    heroImage: "/quantexa/quantexa_banner.webp",
    description: "QUANTEXA 2026 is HackHere's premier 24-hour offline hackathon hosted at SNS IHUB, Coimbatore. Compete across Quantum Technology and Finance Technology domains to decode systemic risk, engineer deep-tech algorithms, and compete for ₹30,000 cash prizes, direct corporate internships, and Hedera certifications.",
    aboutLong: "QUANTEXA 2026 is a 24-hour hackathon crucible presented by HackHere at SNS IHUB, Coimbatore. Focused on Quantum Technology (quantum computing, cryptography, decision intelligence) and Finance Technology (risk scoring, automated compliance, financial telemetry), builders engage in a non-stop build sprint with continuous mentorship, compute credits from Featherless AI, Hedera Web3 certifications, and jury evaluations from top industry CISOs and HR leaders.",
    prizePool: "₹30,000",
    track: "Quantum & Finance Technology",
    participants: "180–200+",
    venueFull: "SNS IHUB, SNS College of Technology Campus, Sathy Main Road, Coimbatore, Tamil Nadu 641035",
    venueMapUrl: "https://maps.app.goo.gl/5Qv5T9LsVeL58uxd8",
    registrationUrl: "https://unstop.com/hackathons/quantexa-hackhere-1745790",
    websiteUrl: "https://quantexa.hackhere.in/",
    ctaLink: "https://quantexa.hackhere.in/",
    rounds: [
      { round: "Phase 1: Launch & Registration", date: "Registration Open on Unstop", description: "Direct entry registration — Register your team of 1–4 participants on Unstop to secure your slot for the 24-hour offline grand finale." },
      { round: "Phase 2: Preparation & Ideation", date: "September 1 – September 18, 2026", description: "Explore challenge domains, review technical documentation, refine your architecture, and prepare for the physical build sprint." },
      { round: "Phase 3: 24-Hour Offline Sprint", date: "September 19 – September 20, 2026", description: "Build your working prototype live at SNS IHUB, Coimbatore over a continuous 24-hour period. Problem statements provided on the spot." },
      { round: "Phase 4: Pitch & Grand Finale Awards", date: "September 20, 2026", description: "Present your working prototype live to our jury panel and chief guests to compete for ₹30K cash prizes, internships & certifications." }
    ],
    stats: [
      { label: "Sprint Duration", value: "24 Hours" },
      { label: "Prize Pool", value: "₹30,000" },
      { label: "Domains", value: "Quantum & FinTech" },
      { label: "Venue", value: "SNS IHUB, Coimbatore" },
      { label: "Participants", value: "180–200+" }
    ],
    tracks: [
      {
        title: "Quantum Technology",
        desc: "Quantum Computing, Quantum Information Processing & Decision Intelligence — Build quantum-inspired algorithms, quantum cryptography, decision intelligence frameworks, and deep tech quantum simulations."
      },
      {
        title: "Finance Technology",
        desc: "FinTech Innovation & Risk Telemetry — Build automated financial risk scoring, fraud detection algorithms, algorithmic trading tools, and secure decentralized financial telemetry."
      }
    ],
    prizes: [
      { title: "Grand Cash Prize Pool", amount: "₹30,000", badge: "Main Pool" },
      { title: "Direct Internship Offers", amount: "Partner Companies", badge: "Career Fast-Track" },
      { title: "Hedera Web3 Certification", amount: "Official Developer Badges", badge: "Blockchain Credential" },
      { title: "Featherless AI Credits", amount: "$325 AI Credits & Inference", badge: "AI Computing" },
      { title: "Technical Blockchain Bootcamp", amount: "Web3 Architecture & Dev", badge: "Training Access" },
      { title: "Physical Participation Certificate", amount: "Official Hardcopy", badge: "All Participants" }
    ],
    agenda: [
      { time: "Sept 19 - 09:00 AM", title: "Venue Check-in & Lab Allocation", desc: "Arrival at SNS IHUB, Coimbatore. Squad verification, badge distribution, and terminal provisioning." },
      { time: "Sept 19 - 10:00 AM", title: "Keynote & Problem Briefing", desc: "Official launch keynote, reveal of Quantum and FinTech problem statements, and evaluation criteria overview." },
      { time: "Sept 19 - 11:00 AM", title: "24-Hour Non-Stop Sprint Begins", desc: "Hacking begins! Teams commence prototype development with on-demand access to mentors and Featherless AI compute." },
      { time: "Sept 19 - 04:00 PM", title: "Architecture Review 1", desc: "Mentors conduct first checkpoint review on solution feasibility and technical approach." },
      { time: "Sept 19 - 09:00 PM", title: "Midnight Review & Code Audit", desc: "1-on-1 technical feedback checkpoints with senior architects, CISOs, and domain evaluators." },
      { time: "Sept 20 - 08:00 AM", title: "Final Sprint & Demo Prep", desc: "Testing, containerization, slide preparation, and final commit freeze preparations." },
      { time: "Sept 20 - 11:00 AM", title: "Code Freeze & Submission", desc: "Final repository commit freeze and Unstop project submission." },
      { time: "Sept 20 - 01:00 PM", title: "Grand Stage Pitch & Jury Evaluation", desc: "Teams pitch live prototypes before the expert jury panel evaluated on Innovation, Execution, Impact, and Presentation." },
      { time: "Sept 20 - 04:00 PM", title: "Awards Ceremony & Internship Distribution", desc: "Announcement of winners, ₹30,000 prize distribution, Hedera Web3 certifications, and partner internship handovers." }
    ],
    chiefGuests: [
      { name: "Reinard Abhishek J", title: "HR", company: "ELRO Tech", image: "/juries/jury_3.jpeg" },
      { name: "Antony", title: "Software Engineer", company: "Chris Byte Solutions (Former Intern at Prism Software Solutions)", image: "/images/antony.jpeg" },
      { name: "Yuva Sri", title: "Software Developer", company: "PwC (Former Intern at Zoho)", image: "/images/yuvasri.jpeg" }
    ],
    organizers: [
      { name: "Ezhil K K", role: "CEO", image: "/images/ezhil.jpg.jpeg", linkedin: "https://www.linkedin.com/in/ezhilkathirvelan/" },
      { name: "K Guru Prakash", role: "CTO", image: "/images/guru.jpg.jpeg", linkedin: "https://www.linkedin.com/in/k-guru-prakash-9a4184337/" },
      { name: "Rithika S", role: "COO", image: "/images/rithika.jpg.jpeg", linkedin: "https://www.linkedin.com/in/rithika-somasundaram/" },
      { name: "Shubaashree S", role: "CMO", image: "/images/shubaashree.jpg.jpeg", linkedin: "https://www.linkedin.com/in/shubaashreesureshbabu/" }
    ],
    sponsors: [
      { name: "Featherless AI", tier: "AI Compute Partner", logo: "Featherless AI", color: "#61C8D4", image: "/images/sponsors/featherlessai.jpeg" },
      { name: "ELRO Tech", tier: "Corporate Partner", logo: "ELRO Tech", color: "#D4A843", image: "/images/sponsors/elro.jpeg" },
      { name: "LeSuccess", tier: "Ecosystem Partner", logo: "LeSuccess", color: "#FF6C37", image: "/images/sponsors/lesuccess.png" },
      { name: "DELYON", tier: "Partner Sponsor", logo: "DELYON", color: "#3ECF8E", image: "/images/sponsors/delyon.png" },
      { name: "ELYON Clothing", tier: "Merchandise Partner", logo: "ELYON", color: "#3ECF8E", image: "/images/sponsors/elyon.jpeg" },
      { name: "HackHere", tier: "Presenting Partner", logo: "HackHere", color: "#FF2D5D", image: "/images/sponsors/hackhere.png" }
    ],
    gallery: [],
    winnerProjectIds: [],
    hideWinningProjects: true
  },
  {
    id: "nexora",
    title: "NEXORA 2026",
    tagline: "BEYOND LIMITS. BEYOND IMAGINATION. — The Flagship AI, Cyber & Blockchain Hackathon",
    category: "completed",
    type: "Hackathon",
    date: "August 22–23, 2026",
    location: "SNS IHUB, Coimbatore",
    status: "Completed",
    heroImage: "/nexora/nexora_banner.webp",
    description: "NEXORA 2026 is HackHere's flagship in-person 24-hour hackathon held at SNS IHUB, Coimbatore. 600+ builders competed across Artificial Intelligence, Cyber Security, Blockchain, and DevOps for a ₹30,000 prize pool, Hedera certifications, and internship opportunities.",
    aboutLong: "NEXORA is HackHere's high-octane 24-hour hackathon at SNS IHUB, Coimbatore. Focused on Artificial Intelligence, Cyber Security, Blockchain, and DevOps, builders pushed the boundaries of innovation with real-world problem statements, continuous technical mentorship, live security reviews, and jury evaluations by industry leaders from Rezilyens LLC, ELRO Tech, and Pronoia IMF.",
    prizePool: "₹30,000",
    track: "Artificial Intelligence & Cyber Security",
    participants: "600+",
    venueFull: "SNS IHUB, SNS College of Technology Campus, Sathy Main Road, Coimbatore, Tamil Nadu 641035",
    venueMapUrl: "https://maps.app.goo.gl/5Qv5T9LsVeL58uxd8",
    registrationUrl: "https://unstop.com/hackathons/nexora-hackhere-1727929",
    websiteUrl: "https://nexora-phi-ten.vercel.app/",
    ctaLink: "https://nexora-phi-ten.vercel.app/",
    rounds: [
      { round: "Phase 1: Launch & Registration", date: "Registration on Unstop", description: "Direct entry registration on Unstop for 1–4 member squads to secure slots for the 24-hour offline grand finale at SNS IHUB, Coimbatore." },
      { round: "Phase 2: Preparation & Ideation", date: "August 13 – August 21, 2026", description: "Explore challenge domains, review technical problem statements, refine architecture, and prepare for the physical build sprint." },
      { round: "Phase 3: 24H Offline Build Sprint", date: "August 22 – August 23, 2026", description: "Build working prototype live at SNS IHUB, Coimbatore over a continuous 24-hour period with problem statements released on the spot." },
      { round: "Phase 4: Pitch & Grand Finale Awards", date: "August 23, 2026", description: "Present working prototype live to jury panel and chief guests to compete for ₹30K cash prizes, internships & Hedera certifications." }
    ],
    stats: [
      { label: "Prize Pool", value: "₹30,000" },
      { label: "Duration", value: "24 Hours" },
      { label: "Mode", value: "Hybrid" },
      { label: "Venue", value: "Coimbatore" },
      { label: "Participants", value: "600+" }
    ],
    tracks: [
      {
        title: "Artificial Intelligence",
        desc: "Build intelligent systems that learn, adapt, and transform industries."
      },
      {
        title: "Cyber Security",
        desc: "Defend digital frontiers with innovative security solutions and threat detection."
      },
      {
        title: "BlockChain",
        desc: "Build decentralized applications and trustless systems for the future."
      },
      {
        title: "DevOps",
        desc: "Automate, integrate, and deploy — streamline the software lifecycle."
      }
    ],
    prizes: [
      { title: "Grand Champion (First Place)", amount: "₹30,000 Pool + Bounties", badge: "Grand Winner" },
      { title: "Internships & Certifications", amount: "Partner Company Offers & Hedera Certifications", badge: "Career Fast-Track" },
      { title: "Goodies & Swag", amount: "National Certificates & Exclusive Merch", badge: "All Participants" }
    ],
    agenda: [
      { time: "Phase 1 (Aug 1 - Aug 20)", title: "Launch & Registration on Unstop", desc: "Online registrations and team formation for 1-4 member squads." },
      { time: "August 22 09:00 AM", title: "Venue Check-in & Keynote", desc: "600+ builders arrive at SNS IHUB, Coimbatore, check in, and receive on-the-spot problem brief." },
      { time: "August 22 10:30 AM", title: "Ideation & Architecture Sprint", desc: "Teams deep-dive into challenge domains (AI, Cyber, Blockchain, DevOps) with mentor checkpoints." },
      { time: "August 22 12:00 PM", title: "24-Hour Hacking Sprint Commences", desc: "Live prototype development at venue with continuous technical mentorship." },
      { time: "August 22 08:00 PM", title: "Midnight Security & ML Checkpoint", desc: "1-on-1 breakout guidance with industry specialists on latency, compliance, and smart contracts." },
      { time: "August 23 09:00 AM", title: "Code Freeze & PR Uploads", desc: "Final repository commit freeze and live demo project submission." },
      { time: "August 23 11:30 AM", title: "Stage Demos & Jury Deliberation", desc: "Present working prototypes to jury panel on Innovation, Execution, Impact, and Presentation." },
      { time: "August 23 03:30 PM", title: "Grand Awards & Certificate Distribution", desc: "Awarding ₹30,000 cash prizes, partner internship letters, and Hedera certifications." }
    ],
    chiefGuests: [
      { name: "Dr. Kaushik Hatti, PhD", title: "CISO & Chief Data Scientist", company: "Rezilyens LLC", image: "/images/juries/kaushik.jpeg" },
      { name: "Reinard Abhishek J", title: "HR", company: "ELRO Tech", image: "/images/juries/jury_3.jpeg" },
      { name: "Subhashini S", title: "HR & Insurance Trainer", company: "Pronoia IMF", image: "/images/juries/jury_4.jpeg" }
    ],
    organizers: [
      { name: "EZHIL K K", role: "CEO", image: "/images/ezhil.jpg.jpeg", linkedin: "https://www.linkedin.com/in/ezhilkathirvelan/" },
      { name: "K GURU PRAKASH", role: "CTO", image: "/images/guru.jpg.jpeg", linkedin: "https://www.linkedin.com/in/k-guru-prakash-9a4184337/" },
      { name: "RITHIKA S", role: "COO", image: "/images/rithika.jpg.jpeg", linkedin: "https://www.linkedin.com/in/rithika-somasundaram/" },
      { name: "SHUBAASHREE S", role: "CMO", image: "/images/shubaashree.jpg.jpeg", linkedin: "https://www.linkedin.com/in/shubaashreesureshbabu/" }
    ],
    sponsors: [
      { name: "Rezilyens LLC", tier: "Title Partner", logo: "Rezilyens LLC", color: "#4285F4" },
      { name: "ELRO Tech", tier: "Innovation Partner", logo: "ELRO Tech", color: "#3ECF8E" },
      { name: "Hashgraph Association", tier: "Web3 Partner", logo: "Hashgraph Association", color: "#D97706" },
      { name: "Upto Skills", tier: "Career Partner", logo: "Upto Skills", color: "#00C6F7", image: "/images/sponsors/uptoskills.webp" },
      { name: "Featherless AI", tier: "Compute Partner", logo: "Featherless AI", color: "#61C8D4", image: "/images/sponsors/featherlessai.jpeg" },
      { name: "Elyon Clothing", tier: "Merchandise Partner", logo: "Elyon Clothing", color: "#3ECF8E", image: "/images/sponsors/elyon.jpeg" },
      { name: "Journi", tier: "Travel Partner", logo: "Journi", color: "#FFFFFF", image: "/images/sponsors/jorni.jpeg" }
    ],
    gallery: [
      "/nexora/gallery/nexora-1.jpg",
      "/nexora/gallery/nexora-2.jpg",
      "/nexora/gallery/nexora-3.jpg",
      "/nexora/gallery/nexora-4.jpg",
      "/nexora/gallery/nexora-5.jpg",
      "/nexora/gallery/nexora-6.jpg",
      "/nexora/gallery/nexora-7.jpg",
      "/nexora/gallery/nexora-8.jpg",
      "/nexora/gallery/nexora-9.jpg",
      "/nexora/gallery/nexora-10.jpg",
      "/nexora/gallery/nexora-11.jpg"
    ],
    winnerProjectIds: [],
    hideWinningProjects: true
  },
  {
    id: "hack-the-cloud",
    title: "HACK THE CLOUD 2026",
    tagline: "Build. Deploy. Get Hired. — The Premier 24-Hour Cloud Hackathon",
    category: "upcoming-hackathon",
    type: "Hackathon",
    date: "Dates To Be Announced",
    location: "Bengaluru, India (Venue TBA)",
    status: "Details Locked",
    isLocked: true,
    heroImage: "/hack-the-cloud/htc_banner.webp",
    registrationUrl: "",
    description: "HACK THE CLOUD 2026 is HackHere's upcoming 24-hour cloud hackathon in Bengaluru. Centered around the theme 'Build. Deploy. Get Hired.', builders will architect, deploy, and scale production systems under the direct mentorship of partner tech teams. Official dates, venue, challenge problem statements, and registration timelines are currently locked and will be unveiled soon.",
    aboutLong: "HACK THE CLOUD 2026 is an upcoming 24-hour builder sprint by HackHere in Bengaluru. Focused on cloud infrastructure, DevOps, distributed systems, and real-world deployment, builders will design and ship scalable architectures. All official dates, venue details, problem statements, jury panel, and prize grants are currently locked and pending final announcement.",
    prizePool: "To Be Announced",
    track: "Cloud & DevOps Engineering",
    participants: "To Be Announced",
    venueFull: "Bengaluru, Karnataka, India (Venue Coordinates To Be Unlocked)",
    venueMapUrl: "",
    stats: [
      { label: "Sprint Duration", value: "24 Hours" },
      { label: "Prize Pool", value: "Locked Slot 🔒" },
      { label: "Challenge Focus", value: "Cloud & DevOps" },
      { label: "Host City", value: "Bengaluru" },
      { label: "Status", value: "Locked" }
    ],
    tracks: [
      {
        title: "Cloud Infrastructure & Scalability (Locked)",
        desc: "Challenge domain scope, problem statements, and technical requirements are currently locked pending official reveal.",
        isLocked: true,
        status: "LOCKED DOMAIN"
      },
      {
        title: "DevOps, CI/CD & Automation (Locked)",
        desc: "Challenge domain scope, problem statements, and technical requirements are currently locked pending official reveal.",
        isLocked: true,
        status: "LOCKED DOMAIN"
      },
      {
        title: "Resilient Systems & Cloud Security (Locked)",
        desc: "Challenge domain scope, problem statements, and technical requirements are currently locked pending official reveal.",
        isLocked: true,
        status: "LOCKED DOMAIN"
      }
    ],
    prizes: [
      { title: "Grand Champion Cash Pool", amount: "Locked Slot 🔒", badge: "Revealing Soon" },
      { title: "Direct Hiring & Internship Offers", amount: "Partner Roles 🔒", badge: "Fast-Track" },
      { title: "Cloud Infrastructure Credits & Swag", amount: "Partner Grants 🔒", badge: "All Participants" }
    ],
    agenda: [
      { time: "Phase 1", title: "Portal Launch & Unstop Registration", desc: "Official launch announcement and team registration opening on Unstop (Unlocking Soon)." },
      { time: "Phase 2", title: "Challenge Problem Statements Release", desc: "Official release of cloud infrastructure & DevOps challenge problem statements." },
      { time: "Phase 3", title: "24-Hour Offline Grand Finale Sprint", desc: "24-hour non-stop prototyping sprint at premier tech venue in Bengaluru." },
      { time: "Phase 4", title: "Stage Pitches & Hiring Offer Letters", desc: "Live prototype demonstration to hiring managers and CTOs followed by direct employment offers." }
    ],
    chiefGuests: [
      { name: "Position Locked", title: "Senior Cloud Architect & Chief Evaluator", company: "To Be Revealed Soon", image: "/images/hackhere-logo.jpeg", isLocked: true },
      { name: "Position Locked", title: "Director of Engineering & Hiring Lead", company: "To Be Revealed Soon", image: "/images/hackhere-logo.jpeg", isLocked: true },
      { name: "Position Locked", title: "Principal DevOps & Infrastructure Lead", company: "To Be Revealed Soon", image: "/images/hackhere-logo.jpeg", isLocked: true }
    ],
    organizers: [
      { name: "Ezhil K K", role: "CEO", image: "/images/ezhil.jpg.jpeg", linkedin: "https://www.linkedin.com/in/ezhilkathirvelan/" },
      { name: "K Guru Prakash", role: "CTO", image: "/images/guru.jpg.jpeg", linkedin: "https://www.linkedin.com/in/k-guru-prakash-9a4184337/" },
      { name: "Rithika S", role: "COO", image: "/images/rithika.jpg.jpeg", linkedin: "https://www.linkedin.com/in/rithika-somasundaram/" },
      { name: "Shubaashree S", role: "CMO", image: "/images/shubaashree.jpg.jpeg", linkedin: "https://www.linkedin.com/in/shubaashreesureshbabu/" }
    ],
    sponsors: [
      { name: "Maestrominds", tier: "Powered By", logo: "Maestrominds", color: "#FF6C37", image: "/images/sponsors/maestrominds.png" },
      { name: "Partner Slot Locked", tier: "Cloud Infrastructure Partner", logo: "Locked", color: "#61C8D4", isLocked: true },
      { name: "Partner Slot Locked", tier: "Hiring & Talent Partner", logo: "Locked", color: "#61C8D4", isLocked: true },
      { name: "HackHere", tier: "Presenting Partner", logo: "HackHere", color: "#FF2D5D", image: "/images/sponsors/hackhere.png" }
    ],
    gallery: [],
    winnerProjectIds: [],
    hideWinningProjects: true
  },
  {
    id: "bootcamp-hedera-web3",
    title: "Hedera × Hashgraph Association Bootcamp",
    tagline: "“Learn Beyond the Hackathon.” — 3-Day Blockchain & Enterprise Web3 Bootcamp",
    category: "bootcamp",
    type: "Bootcamp",
    date: "August 31 – September 2, 2026",
    location: "Virtual Interactive Cohort & Labs",
    status: "Completed",
    heroImage: "/bootcamp/hedera_bootcamp_banner.webp",
    description: "A 3-day enterprise Web3 and blockchain learning program conducted from 31 August to 2 September 2026, providing participants with hands-on exposure to blockchain fundamentals, Hedera Hashgraph, smart contracts, decentralized applications, and real-world Web3 use cases, alongside access to free Hedera blockchain certification.",
    aboutLong: "Positioned around the guiding principle “Learn Beyond the Hackathon,” this 3-day bootcamp extended HackHere’s programs beyond hackathons into structured Web3 education and professional blockchain credentials. Led by Mohamed Aziz ben Ismaïl (Web3 Specialist & Hedera Education Program Trainer, Dar Blockchain), the program was engineered to introduce participants to Distributed Ledger Technology (DLT), Hedera Hashgraph consensus architecture, verifiable digital records, EVM-compatible smart contracts, decentralized identity (DID), Hedera Token Service (HTS), and Hedera Consensus Service (HCS).\n\nThe curriculum covered foundational topics through advanced enterprise implementations — contrasting DLT with traditional databases, analyzing tokenomics, token creation, ESG reporting, and Real-World Asset (RWA) tokenization. The future-technology modules explored AI data provenance, DePIN (Decentralized Physical Infrastructure Networks), and autonomous AI agents. Connected directly with the NEXORA ecosystem, eligible registered participants received free access to the Hedera Certified Foundation (HCF) learning and certification pathway, bridging theoretical understanding with production-grade blockchain development.",
    stats: [
      { label: "Program Duration", value: "3 Days" },
      { label: "Core Technology", value: "Hedera / Web3" },
      { label: "Certification", value: "Hedera HCF" },
      { label: "Ecosystem Partner", value: "Hashgraph Assoc." },
      { label: "Cohort Status", value: "Completed" }
    ],
    tracks: [
      {
        title: "Domain 01: DLT & Consensus Architecture",
        desc: "Blockchain fundamentals, distributed ledgers versus traditional databases, types and limitations of DLT, Hedera Hashgraph consensus algorithm, verifiable immutable records, HBAR tokenomics, and high-throughput transaction finality."
      },
      {
        title: "Domain 02: Smart Contracts & Digital Identity",
        desc: "EVM-compatible Solidity smart contract development, native tokenization with Hedera Token Service (HTS), Decentralized Identity (DID), secure digital records, and decentralized application (dApp) interaction workflows."
      },
      {
        title: "Domain 03: Enterprise Web3, Certification & Ecosystem",
        desc: "Real-World Asset (RWA) tokenization, ESG reporting, Stablecoin Studio, AI data provenance, DePIN (Decentralized Physical Infrastructure Networks), autonomous AI agents, and comprehensive preparation for the Hedera Certified Foundation (HCF) assessment."
      }
    ],
    prizes: [
      {
        title: "Hedera Certified Foundation (HCF)",
        amount: "Official Credential",
        badge: "Free Certification Pathway"
      },
      {
        title: "Hedera Certified Developer Associate (HCDA)",
        amount: "Advanced Dev Pathway",
        badge: "Architecture & SDKs"
      },
      {
        title: "NEXORA Ecosystem Builder Access",
        amount: "Exclusive Web3 Benefits",
        badge: "Hashgraph Association"
      }
    ],
    agenda: [
      {
        time: "Day 1 — August 31, 2026",
        title: "DLT Foundations & Hedera Hashgraph Consensus",
        desc: "Introduction to Distributed Ledger Technology vs traditional databases; Hashgraph consensus algorithm; Hedera network architecture, HBAR tokenomics, and setting up a Hedera developer portal account."
      },
      {
        time: "Day 2 — September 01, 2026",
        title: "Hedera Token Service (HTS) & Smart Contracts",
        desc: "Hands-on EVM-compatible smart contracts with Solidity; token creation, minting, burning, and transfers using HTS; Hedera Consensus Service (HCS) for audit trails; Decentralized Identity (DID)."
      },
      {
        time: "Day 3 — September 02, 2026",
        title: "Enterprise Web3, RWA, DePIN & Certification Prep",
        desc: "Real-World Asset (RWA) tokenization, ESG telemetry, Stablecoin Studio, AI data provenance, DePIN networks, and a deep-dive walkthrough of the Hedera Certified Foundation (HCF) assessment modules."
      }
    ],
    chiefGuests: [
      {
        name: "Mohamed Aziz ben Ismaïl",
        title: "Web3 Specialist & Hedera Education Program Trainer",
        company: "Dar Blockchain / Hedera Program",
        image: "/juries/aziz.jpeg"
      }
    ],
    organizers: [
      { name: "Ezhil K K", role: "CEO", image: "/images/ezhil.jpg.jpeg", linkedin: "https://www.linkedin.com/in/ezhil-k-k-2139b4288/" },
      { name: "K Guru Prakash", role: "CTO", image: "/founders/guru-prakash.jpeg", linkedin: "https://www.linkedin.com/in/guru-prakash-k-42031a290/" },
      { name: "Rithika S", role: "COO", image: "/images/rithika.jpg.jpeg", linkedin: "https://www.linkedin.com/in/rithika-somasundaram/" },
      { name: "Shubaashree S", role: "CMO", image: "/images/shubaashree.jpg.jpeg", linkedin: "https://www.linkedin.com/in/shubaashreesureshbabu/" }
    ],
    sponsors: [
      {
        name: "The Hashgraph Association",
        tier: "Blockchain Learning & Web3 Ecosystem Partner",
        logo: "Hashgraph Association",
        color: "#00EBB4",
        image: "/images/sponsors/hashgraph_association.png"
      },
      {
        name: "Hedera",
        tier: "Platform & DLT Network Partner",
        logo: "Hedera",
        color: "#222222",
        image: "/images/sponsors/hedera.png"
      },
      {
        name: "4Hacks",
        tier: "Program & Community Partner",
        logo: "4Hacks",
        color: "#61C8D4",
        image: "/images/sponsors/4hacks.png"
      },
      {
        name: "Dar Blockchain",
        tier: "Web3 Training Partner",
        logo: "Dar Blockchain",
        color: "#FF6C37",
        image: "/images/sponsors/dar_blockchain.png"
      },
      {
        name: "HackHere",
        tier: "Host & Developer Ecosystem",
        logo: "HackHere",
        color: "#FF2D5D",
        image: "/images/sponsors/hackhere.png"
      }
    ],
    gallery: [],
    winnerProjectIds: [],
    hideWinningProjects: true
  }
];

export const SAMPLE_EVENTS = eventsData;
export const FEATURED_EVENT = eventsData.find(e => e.id === "quantexa") || eventsData.find(e => e.category === "upcoming-hackathon") || eventsData[0];

// =========================================================================
// PROJECTS DATA STORE (Exactly 4 Projects & 2-3 Categories)
// Categories: "AI & Healthcare", "Distributed Systems", "Developer Tools"
// =========================================================================
export const projectCategories = [
  "All",
  "AI & EdTech",
  "AI & Healthcare",
  "Developer Tools"
];

export const projectsData = [
  {
    id: "evaledge",
    name: "EvalEdge",
    tagline: "AI-powered secure examination, intelligent grading & proctoring platform",
    category: "AI & EdTech",
    event: "HACKHERE PRODUCT 2026",
    badge: "HACKHERE PRODUCT 2026",
    topRightBadge: "AI • EDTECH",
    status: "AI • EDTECH",
    isProduct: true,
    eventId: null,
    track: "AI & Academic Integrity",
    venue: "Chennai / Global",
    problem: "Colleges, universities, training institutes, and recruiters often rely on fragmented tools for conducting online examinations, monitoring candidates, grading answers, and reviewing academic-integrity violations.",
    solution: "EvalEdge brings the complete examination workflow into one platform — exam creation, secure student verification, live camera & microphone monitoring, AI-assisted descriptive evaluation, automatic objective grading, incident tracking, and evidence-backed integrity reports.",
    highlightBox: "✦ One platform for secure examinations, AI-assisted evaluation, real-time proctoring & integrity reporting.",
    impact: [
      "✦ One platform for secure examinations, AI-assisted evaluation, real-time proctoring & integrity reporting.",
      "Replaces 4+ fragmented tools (forms, video calls, manual grading, integrity audits) with a unified assessment pipeline",
      "Continuous multi-modal proctoring with sub-second incident logging and configurable termination policies",
      "Evidence-backed integrity receipts providing 100% auditability for every submitted test session"
    ],
    techStack: [
      "AI Proctoring",
      "OpenAI",
      "Camera & Mic Monitoring",
      "Auto-Grading",
      "Incident Detection",
      "Integrity Receipt"
    ],
    caseStudy: {
      whatItDoes: "Teachers can create and publish MCQ, True/False, and descriptive examinations while monitoring candidates through a live proctoring dashboard. Students complete identity and camera/microphone verification before entering a controlled fullscreen examination environment with auto-save and timers.",
      integrityEngine: "EvalEdge detects tab switching, focus loss, fullscreen exits, screenshot or restricted-keyboard attempts, eye movement patterns, and unusual audio activity. Incidents are logged as evidence, with configurable warnings and examination termination rules.",
      intelligentEvaluation: "Objective questions are automatically evaluated, while descriptive responses can be assessed using AI and subsequently reviewed by faculty before final results are published.",
      integrityReceipt: "Every examination produces an evidence-based integrity record containing candidate activity, detected incidents, timestamps, warnings, and examination status—giving institutions a clearer audit trail for examination decisions."
    },
    team: [
      { name: "Ezhil KK", role: "Product Architecture", avatar: "/founders/ezhil-kk.jpeg" },
      { name: "Guru Prakash", role: "AI Systems & Proctoring", avatar: "/founders/guru-prakash.jpeg" },
      { name: "Rithika S", role: "Frontend & Evaluation UX", avatar: "/founders/rithika-s.jpeg" },
      { name: "Shubaashree", role: "Security & Integrity Engine", avatar: "/founders/Shubaashree.jpeg" }
    ],
    demoUrl: "https://evaledge.hackhere.in",
    githubUrl: null,
    screenshots: [
      "/evaledge/evaledge-dashboard.jpg",
      "/evaledge/evaledge-receipt.jpg"
    ]
  },
  {
    id: "medpulse-ai",
    name: "MedPulse AI",
    tagline: "Real-time multilingual triage assistance for rural healthcare workers",
    category: "AI & Healthcare",
    event: "AIVENTRA 2025",
    badge: "AIVENTRA 2025",
    topRightBadge: "VERIFIED AWARDEE",
    status: "Verified Awardee",
    eventId: "aiventra",
    track: "FinTech & AI",
    venue: "Chennai",
    problem: "Primary healthcare clinics face doctor shortages and language barriers during patient intake. Nurses spend 40% of their time manually transcribing notes in regional dialects.",
    solution: "An offline-first voice AI mobile system that converts vernacular patient speech into structured ICD-10 medical summaries and flags urgent symptoms in under 800ms.",
    highlightBox: "+ Piloted across 3 community health clinics in Tamil Nadu and Karnataka",
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
    id: "nexus-ide",
    name: "NexusCloud IDE",
    tagline: "WebGPU-accelerated collaborative in-browser cloud workspace with micro-sandboxes",
    category: "Developer Tools",
    event: "VORTEXA 2025",
    badge: "VORTEXA 2025",
    topRightBadge: "VERIFIED AWARDEE",
    status: "Verified Awardee",
    eventId: "vortexa",
    track: "Cloud & DevTools",
    venue: "Chennai",
    problem: "Student developers on low-spec hardware struggle to run heavy Node.js and Python microservice environments locally, limiting hackathon participation.",
    solution: "An ultra-lightweight WebAssembly code editor that spins up remote micro-VM sandboxes in under 400ms, streaming terminal I/O over binary WebSockets with real-time multi-cursor collaboration.",
    highlightBox: "+ Enabled 350+ hackathon participants with low-end Chromebooks to build full-stack apps",
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
  tech: [
    {
      id: "tech-01",
      name: "MUGESH BABU",
      image: ""
    },
    {
      id: "tech-02",
      name: "HARI PRASANTH",
      image: ""
    },
    {
      id: "tech-03",
      name: "THARUN K V",
      image: ""
    },
    {
      id: "tech-04",
      name: "P MAGESH",
      image: ""
    }
  ],
  design: [
    {
      id: "design-01",
      name: "ELAKIYA",
      image: ""
    },
    {
      id: "design-02",
      name: "BHARATH",
      image: ""
    },
    {
      id: "design-03",
      name: "NISHANTH",
      image: ""
    },
    {
      id: "design-04",
      name: "SREE SAHANA",
      image: ""
    }
  ],
  fieldWork: [
    {
      id: "field-01",
      name: "HARI PRIYAN",
      image: ""
    },
    {
      id: "field-02",
      name: "PRADEEP",
      image: ""
    },
    {
      id: "field-03",
      name: "SIDDARTH",
      image: ""
    }
  ],
  media: [],
  volunteers: []
};

export const teamMembersByCategory = {
  "TECHNICAL TEAM": communityTeams.tech,
  "DESIGN TEAM": communityTeams.design,
  "FIELD WORK TEAM": communityTeams.fieldWork
};

export const TEAM_MEMBERS = [
  ...communityTeams.tech,
  ...communityTeams.design,
  ...communityTeams.fieldWork
];

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
// 5 CATEGORIES: Hackathons, Bootcamps, Tech Talks, Webinars, Tech Workshops
// =========================================================================
export const PROGRAMS_LIST = [
  {
    id: "hackathons",
    slug: "hackathons",
    title: "Hackathon",
    tagline: "Build Under Pressure. Solve Real Problems.",
    description: "National-level innovation hackathons that bring students, developers and problem-solvers together to build practical solutions across emerging technology domains.",
    features: [
      "Industry-relevant domains and problem statements",
      "Mentor interactions and structured evaluation checkpoints",
      "Evaluation by industry professionals and technical experts",
      "Cash prizes, internships, technology credits and partner opportunities"
    ],
    mode: "Offline / Hybrid",
    duration: "24 Hours",
    audience: "Students • Developers • Designers • Innovators",
    badge: "Flagship",
    color: "#FF5018"
  },
  {
    id: "bootcamps",
    slug: "bootcamps",
    title: "Technology Bootcamps",
    tagline: "Structured Learning. Practical Mastery.",
    description: "Intensive learning programs focused on specific technologies and industry domains through guided sessions, hands-on exercises, mentorship and certification opportunities.",
    features: [
      "Structured technology learning pathway",
      "Hands-on guided sessions",
      "Industry or ecosystem expert interaction",
      "Certification opportunities where provided by partners"
    ],
    mode: "Online / In-Person / Hybrid",
    duration: "1–3 Days",
    audience: "Students • Developers • Emerging Technology Enthusiasts",
    badge: "Intensive",
    color: "#FF2D5D"
  },
  {
    id: "tech-talks",
    slug: "tech-talks",
    title: "Tech Talk",
    tagline: "Learn Directly from Industry Practitioners",
    description: "Focused sessions where technology professionals, founders and domain experts share practical insights into emerging technologies, engineering practices, careers and industry trends.",
    features: [
      "Sessions with engineers, founders and domain specialists",
      "Real-world technology and career discussions",
      "Interactive Q&A",
      "Community and professional networking opportunities"
    ],
    mode: "Online / In-Person",
    duration: "60–90 Minutes",
    audience: "All developers & curious engineering minds",
    badge: "Insights",
    color: "#61C8D4"
  },
  {
    id: "webinars",
    slug: "webinars",
    title: "Webinar",
    tagline: "Accessible Learning. Anywhere.",
    description: "Interactive online learning sessions designed to introduce students to emerging technologies, technical concepts, tools and career opportunities.",
    features: [
      "Concept-driven demonstrations",
      "Practical examples and learning resources",
      "Live participant Q&A",
      "Participation certificates where applicable"
    ],
    mode: "Online",
    duration: "60–90 Minutes",
    audience: "Students & developers looking to upskill quickly",
    badge: "Knowledge",
    color: "#00C6F7"
  },
  {
    id: "tech-workshops",
    slug: "tech-workshops",
    title: "Tech Workshops",
    tagline: "Learn by Building",
    description: "Practical instructor-led sessions where participants work directly with modern tools, technologies and development environments to turn concepts into working outcomes.",
    features: [
      "Guided hands-on implementation",
      "Practical exercises and starter resources",
      "Direct mentor/instructor support",
      "Working technical outcome by the end of the session"
    ],
    mode: "In-Person / Hybrid",
    duration: "2–5 Hours",
    audience: "Hands-on builders seeking targeted practical mastery",
    badge: "Hands-on",
    color: "#9B0032"
  }
];

export const PROGRAM_FILTER_CATEGORIES = [
  "All",
  "Hackathons",
  "Bootcamps",
  "Workshops",
  "Tech Talks",
  "Webinars"
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
