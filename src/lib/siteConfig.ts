/**
 * ═══════════════════════════════════════════════════════
 * SITE CONFIGURATION — Edit this file to update your website
 * ═══════════════════════════════════════════════════════
 *
 * HOW TO UPDATE YOUR PHOTOS:
 * 1. Upload your photo to any image hosting (Unsplash, Imgur, Cloudinary, or your own /public folder)
 * 2. Replace the URL string below
 * 3. Rebuild: npm run build && npm start
 *
 * TO USE LOCAL PHOTOS:
 * 1. Place your image in the /public/images/ folder
 * 2. Set the URL to "/images/your-photo.jpg"
 *
 * EXAMPLE:
 *   Before: "https://images.unsplash.com/photo-123..."
 *   After:  "/images/my-travel-photo.jpg"
 */

// ─── YOUR IDENTITY ───────────────────────────────────
export const identity = {
  name: "MD. Rakibul Islam",
  tagline: "Full Stack & AI Automation Engineer",
  heroSubtitle: "Building scalable architectures, real-time distributed platforms, and enterprise AI automation workflows. Based in Chittagong, Bangladesh · Serving global teams.",
  email: "mdrakibislam7018@gmail.com",
  manifesto: "Engineering scalable distributed systems with clean architectures, robust real-time synchronization, and automated efficiency.",
};

// ─── SOCIAL LINKS ────────────────────────────────────
export const socials = {
  github: { url: "https://github.com/rak9b", label: "GitHub" },
  linkedin: { url: "https://linkedin.com/in/rak9b", label: "LinkedIn" },
  email: { url: "mailto:mdrakibislam7018@gmail.com", label: "Email" },
  portfolio: { url: "https://frontend-alpha-orcin-72.vercel.app", label: "Portfolio" },
};

// ─── HERO IMAGES ─────────────────────────────────────
export const heroImages = {
  traveler: "https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=75&fit=crop",
  engineer: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=75&fit=crop",
};

// ─── STATS ───────────────────────────────────────────
export const stats = {
  projectsShipped: 15,
  automationEfficiency: 40,
  yearsEngineering: 3,
  happyClients: 10,
};

// ─── TRAVEL DESTINATIONS ─────────────────────────────
export const destinations = [
  { img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=75&fit=crop", country: "Japan · 2024", name: "Kyoto", meta: "Temples, silence, and green tea at 6am.", readTime: "9 min read · Asia" },
  { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=75&fit=crop", country: "Portugal · 2024", name: "Lisbon", meta: "Seven hills, infinite pastéis de nata.", readTime: "7 min read · Europe" },
  { img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&q=75&fit=crop", country: "Turkey · 2023", name: "Istanbul", meta: "The city that bridges two worlds.", readTime: "11 min read · Middle East" },
  { img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&q=75&fit=crop", country: "India · 2023", name: "Mumbai", meta: "Chaos, color, and kindness.", readTime: "13 min read · Asia" },
  { img: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=500&q=75&fit=crop", country: "Morocco · 2023", name: "Marrakech", meta: "A city that devours the senses.", readTime: "8 min read · Africa" },
  { img: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=500&q=75&fit=crop", country: "Cuba · 2022", name: "Havana", meta: "Frozen in time, burning with life.", readTime: "10 min read · Americas" },
];

// ─── FEATURED TRAVEL ─────────────────────────────────
export const featuredTravel = {
  img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80&fit=crop",
  title: "Kyoto at 5am — Before the Tourists Arrive",
  country: "Japan · March 2024 · 9 min read",
  quote: "The city reveals itself differently when you are the only one looking.",
};

// ─── BOOKS ───────────────────────────────────────────
export const books = [
  { title: "Meditations", author: "Marcus Aurelius", note: "The original field notes. Every page is a mirror.", stars: "★★★★★", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&q=75&fit=crop" },
  { title: "The Remains of the Day", author: "Kazuo Ishiguro", note: "A masterclass in restraint and quiet devastation.", stars: "★★★★★", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=150&q=75&fit=crop" },
  { title: "Sapiens", author: "Yuval Noah Harari", note: "Changed how I think about everything from religion to agriculture.", stars: "★★★★☆", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=150&q=75&fit=crop" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", note: "The book that made me question every decision I've ever made.", stars: "★★★★★", cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=150&q=75&fit=crop" },
  { title: "Man's Search for Meaning", author: "Viktor Frankl", note: "Suffering is not the absence of meaning. It is the search for it.", stars: "★★★★★", cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=150&q=75&fit=crop" },
  { title: "The Alchemist", author: "Paulo Coelho", note: "Simple truths, beautifully told. A story about listening to yourself.", stars: "★★★★☆", cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&q=75&fit=crop" },
];

// ─── MOVIES ──────────────────────────────────────────
export const movies = [
  { title: "Interstellar", director: "Christopher Nolan", note: "Love is the one thing that transcends time and space.", year: "2014", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=75&fit=crop" },
  { title: "The Shawshank Redemption", director: "Frank Darabont", note: "Hope is a good thing, maybe the best of things.", year: "1994", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=75&fit=crop" },
  { title: "Inception", director: "Christopher Nolan", note: "An idea is like a virus. Resilient. Highly contagious.", year: "2010", img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=75&fit=crop" },
  { title: "The Pursuit of Happyness", director: "Gabriele Muccino", note: "Don't ever let somebody tell you, you can't do something.", year: "2006", img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&q=75&fit=crop" },
  { title: "Into the Wild", director: "Sean Penn", note: "Happiness is only real when shared.", year: "2007", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=75&fit=crop" },
  { title: "The Secret Life of Walter Mitty", director: "Ben Stiller", note: "Beautiful things don't ask for attention.", year: "2013", img: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&q=75&fit=crop" },
];

// ─── FIELD NOTES (THINKING) ──────────────────────────
export const fieldNotes = [
  { label: "Design · 8 min read", title: "Why Constraints Make Better Designers", excerpt: "The most creative work happens not in spite of limitations, but because of them. Here's what two years of side projects taught me.", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=75&fit=crop" },
  { label: "Travel · 5 min read", title: "The Discipline of Leaving Things Behind", excerpt: "After 40 countries, the only thing I've consistently traveled lighter with is expectations. A note on letting go.", img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=75&fit=crop" },
  { label: "Engineering · 12 min read", title: "The Boring Stack Is Often the Right Stack", excerpt: "Not every project needs the latest framework. A case for choosing boring, proven technology when building things that need to last.", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&q=75&fit=crop" },
  { label: "Philosophy · 6 min read", title: "On Solitude and Productive Silence", excerpt: "The best ideas come when you stop chasing them. Thoughts on the value of being alone with your mind.", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75&fit=crop" },
  { label: "Life · 4 min read", title: "The Sunday Morning Reality Check", excerpt: "How you spend your unstructured time tells you more about your values than your resume ever will.", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=75&fit=crop" },
  { label: "Building · 10 min read", title: "Ship Early, Ship Often, Ship Honestly", excerpt: "Perfectionism is fear wearing a lab coat. The difference between 'polished' and 'useful' is about two weeks of your life.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75&fit=crop" },
];

// ─── ABOUT PAGE IMAGES ───────────────────────────────
export const aboutImages = {
  traveler: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80&fit=crop",
  books: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80&fit=crop",
  code: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80&fit=crop",
  horizon: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop",
};

// ─── VERIFIED CV PROJECTS ────────────────────────────
export const projects = [
  {
    id: "localgems",
    title: "LocalGems — Tour Booking SaaS Platform",
    tagline: "Curated Travel SaaS Marketplace with Real-Time Booking & Multi-Role Dashboards",
    description: "Engineered a premium travel SaaS platform to bridge the gap between authentic local experiences and global travelers. The marketplace connects tourists with verified local guides through curated tours, real-time bookings, and comprehensive dashboards.",
    highlights: [
      "Developed multi-role dashboards (Tourist, Guide, Admin) with real-time revenue analytics and performance tracking.",
      "Implemented advanced tour filtering with real-time availability, reducing booking time by 30%.",
      "Architected a robust PostgreSQL database with Prisma ORM, ensuring 100% TypeScript type safety and data integrity."
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Redux Toolkit", "Stripe", "Framer Motion"],
    liveUrl: "https://github.com/rak9b/localgem_frontend",
    codeUrl: "https://github.com/rak9b/localgem_frontend",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80&fit=crop"
  },
  {
    id: "riderapp",
    title: "RiderApp — Urban Mobility & Ride-Hailing Platform",
    tagline: "Full-Stack Ride Dispatch System with Live GPS Tracking & Socket.io Sync",
    description: "Engineered a full-stack ride-hailing platform to address inefficient booking processes that resulted in poor user experiences and delayed rider-driver matching. The system automates ride booking and dispatch with real-time tracking, interactive maps, and multi-role dashboards.",
    highlights: [
      "Implemented flexible authentication supporting both database and in-memory storage for scalable user management.",
      "Utilized Redux state management and Socket.io for real-time synchronization across riders, drivers, and administrators.",
      "Integrated SOS emergency assistance and comprehensive ride history tracking to enhance user safety and experience."
    ],
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "Redux Toolkit", "Socket.io", "Leaflet.js", "Docker"],
    liveUrl: "https://github.com/rak9b/rider-app---frontend",
    codeUrl: "https://github.com/rak9b/rider-app---frontend",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop"
  },
  {
    id: "akademi",
    title: "Akademi — Scholarship Management Platform",
    tagline: "Centralized EdTech Scholarship Portal with Glassmorphic UI & Zod Validation",
    description: "Built a production-grade scholarship platform to address fragmented scholarship discovery and application processes that hindered student accessibility. Centralizes scholarship management with real-time tracking, multi-role dashboards, and streamlined application workflows.",
    highlights: [
      "Designed scholarship filtering with a glassmorphic UI and auto-filled applications, improving application rates by 40%.",
      "Secured user data with JWT authentication, Firebase integration, and Zod validation for robust form handling."
    ],
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Firebase", "JWT", "Zod", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://github.com/rak9b/Akademi---Scholarship-Management-System-frontend-",
    codeUrl: "https://github.com/rak9b/Akademi---Scholarship-Management-System-frontend-",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&fit=crop"
  }
];

// ─── VERIFIED WORK EXPERIENCE ────────────────────────
export const experiences = [
  {
    role: "AI Automation & Full-Stack Developer",
    company: "SimplifAI",
    location: "Canada (Remote)",
    period: "2024 — Present",
    highlights: [
      "Led end-to-end e-commerce development integrated with an AI system, boosting user engagement by 35%.",
      "Built and deployed n8n automation workflows for lead generation, CRM, and email systems, reducing manual operational work by 40%.",
      "Created automated video content pipelines that cut production time by 50%.",
      "Delivered HIPAA-compliant security protocols, secure authentication, and end-to-end data encryption.",
      "Managed the complete product lifecycle, system architecture, and team, driving revenue growth through AI-powered automation solutions."
    ],
    skills: ["AI Automation", "n8n", "LLM Pipelines", "Next.js", "HIPAA Compliance", "Node.js", "PostgreSQL"]
  },
  {
    role: "Full Stack Developer (Technical Lead)",
    company: "Imranslab",
    location: "Canada (Remote)",
    period: "2023 — 2024",
    highlights: [
      "Spearheaded the full-stack development of a comprehensive e-commerce bookstore platform using the MERN stack.",
      "Designed responsive frontend interfaces and robust system architecture, writing scalable backend code for high performance.",
      "Integrated an AI-powered chatbot to automate customer support, significantly improving user experience and response times.",
      "Led and mentored the development team as the technical lead, ensuring the timely 30% faster delivery of project milestones."
    ],
    skills: ["React", "Node.js", "Express", "MongoDB", "AI Chatbot", "Team Leadership", "Agile"]
  }
];

// ─── EDUCATION ───────────────────────────────────────
export const education = {
  degree: "B.Sc. in Computer Science & Engineering",
  institution: "University of the People",
  location: "Pasadena, California, USA (Online)",
  focus: "Algorithms, Distributed Systems, Software Engineering & AI"
};

// ─── SKILLS CATEGORIES ───────────────────────────────
export const skillsCategories = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "Redux Toolkit", "RTK Query", "Framer Motion"]
  },
  {
    category: "Backend & Distributed Systems",
    items: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Prisma ORM", "RESTful APIs", "Socket.io", "JWT Authentication"]
  },
  {
    category: "AI & Automation",
    items: ["LLM Integration", "n8n Automation", "Video Content Pipelines", "Automated CRM Systems", "Prompt Engineering"]
  },
  {
    category: "Tools & DevOps",
    items: ["Git", "Docker", "Vercel", "Firebase", "Stripe", "Postman", "Vite", "Netlify"]
  }
];

// ─── TECH STACK BADGES ───────────────────────────────
export const techStack = ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "MongoDB", "Docker", "Socket.io", "n8n"];
