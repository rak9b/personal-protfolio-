# Personal Portfolio & Matchmaking Portal

A world-class personal website built with **Next.js 16**, featuring an interactive 3D hero, a password-protected matchmaking questionnaire, and a beautiful dark design system.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **3D Interactive Hero** | Wireframe icosahedron with floating particles (React Three Fiber) |
| **Google Authentication** | Sign in with Google to access the matchmaking questionnaire |
| **10-Step Questionnaire** | Deep personality survey with encrypted data storage (AES-256) |
| **Progressive Blur Gate** | Site blurs after 90s if questionnaire isn't completed |
| **Guided Onboarding Tour** | 5-step interactive walkthrough for new visitors |
| **Dark/Light Theme** | Smooth toggle with localStorage persistence |
| **Framer Motion Animations** | Scroll reveals, page transitions, clip-path effects |
| **9 Beautiful Pages** | Home, Travel, Books, Movies, Thinking, About, Contact, Connect, Questionnaire |

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/rak9b/personal-protfolio-.git
cd personal-protfolio-

# 2. Install dependencies
npm install

# 3. Set up environment variables (see below)
cp .env.example .env.local

# 4. Run development server
npm run dev

# 5. Build for production
npm run build && npm start
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB (for storing questionnaire responses)
MONGODB_URI=mongodb://localhost:27017/matchmaking

# AES-256 Encryption Key (32 characters for encrypting form data)
ENCRYPTION_KEY=ch4ng3th1sk3y_32bytes_s3cur3_k3y!

# NextAuth Configuration
NEXTAUTH_SECRET=generate-a-random-string-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Credentials (REQUIRED for Google login)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## 📸 How to Update Photos

All images are managed from a single config file:

**`src/lib/siteConfig.ts`**

### Option 1: Use Unsplash URLs (default)
Images are currently sourced from Unsplash. Just replace any URL:
```ts
// Before
img: "https://images.unsplash.com/photo-123...",
// After
img: "https://images.unsplash.com/photo-456...",
```

### Option 2: Use Your Own Photos
1. Place your images in the `/public/images/` folder
2. Reference them with a leading slash:
```ts
// Local photo
img: "/images/my-travel-photo.jpg",
```

### Option 3: Use Any Image Host
Upload to Cloudinary, Imgur, or any CDN and paste the URL:
```ts
img: "https://res.cloudinary.com/your-cloud/image/upload/v123/photo.jpg",
```

After changing any photos, rebuild:
```bash
npm run build && npm start
```

---

## 🔑 Setting Up Google Login

### Step 1: Create Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth 2.0 Client ID**
5. Select **Web application**
6. Add these Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### Step 2: Add Credentials to .env.local
```env
GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-secret-here
```

### Step 3: Generate NextAuth Secret
```bash
openssl rand -base64 32
```
Paste the output as `NEXTAUTH_SECRET` in your .env.local.

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home (3D hero + split panel + stats)
│   ├── travel/             # Dispatches (travel destinations)
│   ├── books/              # Archives (book reviews)
│   ├── movies/             # Reels (film recommendations)
│   ├── thinking/           # Field Notes (essays)
│   ├── about/              # Origin (4-chapter story)
│   ├── contact/            # Contact info + socials
│   ├── connect/            # Google Sign-In gate
│   ├── questionnaire/      # 10-step encrypted form
│   └── api/auth/           # NextAuth API routes
├── components/
│   ├── 3d/                 # HeroScene (Three.js)
│   ├── layout/             # Navigation + Footer
│   ├── providers/          # AuthProvider (NextAuth)
│   └── ui/                 # FormGate, GuidedTour, ThemeToggle, Reveal, Counter
└── lib/
    ├── siteConfig.ts       # ⭐ EDIT THIS FILE to update photos & content
    ├── db/                 # MongoDB connection + submission model
    └── utils/              # Encryption + class utilities
```

---

## 🎨 Customization

Edit `src/lib/siteConfig.ts` to customize:
- **Your Name & Identity** (`identity` object)
- **Social Links** (`socials` object)
- **Hero Images** (`heroImages` object)
- **Stats** (`stats` object)
- **Travel Destinations** (`destinations` array)
- **Books** (`books` array)
- **Movies** (`movies` array)
- **Field Notes** (`fieldNotes` array)
- **About Page Images** (`aboutImages` object)
- **Tech Stack** (`techStack` array)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router + Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + CSS Variables |
| 3D Graphics | React Three Fiber + Three.js |
| Animation | Framer Motion |
| Auth | NextAuth.js + Google Provider |
| Database | MongoDB (Mongoose) |
| Encryption | AES-256-CBC (Node.js crypto) |

---

## 🚀 Deploy

### Vercel (Recommended)
```bash
npx vercel
```
Add all environment variables in the Vercel dashboard.

### Self-Hosted
```bash
npm run build
npm start    # Runs on port 3000
```

---

## 📄 License

MIT © 2026
