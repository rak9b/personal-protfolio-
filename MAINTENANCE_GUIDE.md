# 🛠️ Portfolio Maintenance & Growth Guide

<div align="center">

![Maintenance Banner](https://img.shields.io/badge/Maintenance-Pro--Standard-success?style=for-the-badge&logo=gear)

**Your guide to keeping the "Digital Twin" portfolio in its elite state.**

</div>

---

## 🔄 **Automatic Deployment (CI/CD)**

Your project is configured for **high-velocity delivery** using Vercel and Render.

| Layer | Platform | Deployment Trigger |
|-------|----------|-------------------|
| **Frontend** | [Vercel](https://vercel.com) | `git push` to `main` branch |
| **Backend** | [Render](https://render.com) | `git push` to `main` branch |

### **The 3-Step Update Flow**
1. **Sync**: Ensure your local code is up to date (`git pull`).
2. **Commit**: Stage and commit your changes (`git commit -m "feat: new project"`).
3. **Deploy**: Push to GitHub (`git push origin main`). Your live site will update automatically within minutes.

---

## 🧠 **Content Management (The "Brain" File)**

Most of your professional data is centralized for easy updates without touching complex components.

### **File Location**: `frontend/src/constants/data.ts`

Open this file to update:
- **Profile**: Change your location, email, or social links.
- **Skills**: Add new technologies or cybersecurity certifications.
- **Projects**: Add new work with colors, links, and descriptions.
- **Experience**: Manage your internship and leadership records.

---

## 🤖 **AI Chatbot Training**

To update what your **Digital Twin** knows about you:

1.  Navigate to `backend/src/routes/chatbot.ts`.
2.  Locate the `PORTFOLIO_CONTEXT` constant.
3.  Inject new technical scenarios, projects, or personal vision details.
4.  Push to GitHub. The AI immediately adopts its new knowledge!

---

## 👨‍💼 **Administrative CMS**

Use the dedicated **Admin Dashboard** for frequent dynamic updates:
- **URL**: `https://your-portfolio.com/dashboard`
- **Features**: Write blog posts, manage live testimonials, and upload new resumes.

---

## 🛡️ **Elite Performance Rules**

1.  **Environment Security**: Never commit `.env` files. Ensure secrets are set in the Vercel/Render dashboard.
2.  **Asset Optimization**: Use the `next/image` component. Always aim for WebP or SVG for maximum performance.
3.  **Code Integrity**: Run `npm run lint` before pushing to ensure no type errors enter production.

---

<div align="center">

**Stay Visionary. Keep Building.** 🚀

</div>
