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
  name: "Your Name",
  tagline: "Traveler · Thinker · Engineer",
  heroSubtitle: "Currently somewhere between airport terminals and interesting ideas. Building things. Reading books. Moving forward.",
  email: "hello@yoursite.com",
  manifesto: "I don’t have hobbies — I have obsessions that occasionally produce something useful.",
};

// ─── SOCIAL LINKS ────────────────────────────────────
export const socials = {
  github: { url: "https://github.com/rak9b", label: "The Lab" },
  instagram: { url: "https://instagram.com", label: "Dispatches" },
  linkedin: { url: "https://linkedin.com", label: "The Industry" },
  twitter: { url: "https://x.com", label: "Signals" },
};

// ─── HERO IMAGES ─────────────────────────────────────
export const heroImages = {
  traveler: "https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=75&fit=crop",
  engineer: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=75&fit=crop",
};

// ─── STATS ───────────────────────────────────────────
export const stats = {
  countries: 43,
  books: 127,
  projects: 21,
  yearsEngineering: 6,
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

// ─── TECH STACK BADGES ───────────────────────────────
export const techStack = ["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Docker", "AWS", "Figma", "GSAP"];
