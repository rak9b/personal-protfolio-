# 🛡️ Security Documentation

## Overview
This document outlines the security measures, best practices, and configurations implemented in the Digital Twin Portfolio project.

---

## Authentication & Authorization

### JWT Implementation
```typescript
// backend/src/middleware/auth.ts
import jwt from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: '7d', algorithm: 'HS256' }
  );
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

### Password Hashing
```typescript
import bcrypt from 'bcryptjs';

// Hash password before storing
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Verify password during login
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
```

---

## Input Validation with Zod

### Schema Definitions
```typescript
// backend/src/schemas/blog.schema.ts
import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(5).max(200),
  content: z.string().min(50),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  published: z.boolean().default(false),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});
```

### Validation Middleware
```typescript
export const validate = (schema: z.Schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors,
        });
      }
      next(error);
    }
  };
};

// Usage
app.post('/api/blogs', validate(createBlogSchema), createBlogHandler);
```

---

## Security Headers (Helmet.js)

### Configuration
```typescript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", process.env.FRONTEND_URL],
      fontSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  referrerPolicy: { policy: 'no-referrer' },
  noSniff: true,
  xssFilter: true,
}));
```

---

## CORS Configuration

```typescript
import cors from 'cors';

const corsOptions = {
  origin: function (origin, callback) {
    const whitelist = [
      'http://localhost:3002',
      'https://frontend-alpha-orcin-72.vercel.app',
      process.env.FRONTEND_URL,
    ];
    
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
```

---

## Rate Limiting

### Implementation
```typescript
import rateLimit from 'express-rate-limit';

// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests from this IP, please try again later',
});

// Strict limit for authentication
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 login attempts
  skipSuccessfulRequests: true,
});

// Chatbot endpoint limit
const chatbotLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
});

app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/chatbot/chat', chatbotLimiter);
```

---

## XSS Protection

### Frontend (DOMPurify)
```typescript
import DOMPurify from 'dompurify';

// Sanitize rich text content before rendering
export const sanitizeHTML = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
};

// Usage in component
<div dangerouslySetInnerHTML={{ __html: sanitizeHTML(blog.content) }} />
```

---

## SQL/NoSQL Injection Prevention

### Prisma ORM (Parameterized Queries)
```typescript
// ✅ SAFE: Prisma automatically parameterizes
const blogs = await prisma.blog.findMany({
  where: {
    title: {
      contains: searchTerm, // Automatically escaped
    },
  },
});

// ❌ UNSAFE: Raw queries without parameterization
// NEVER DO THIS:
// const blogs = await prisma.$queryRaw`SELECT * FROM Blog WHERE title = '${searchTerm}'`;
```

---

## Environment Variables Security

### Secure Storage
```bash
# .env (NEVER commit this file)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/db
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
```

### Validation
```typescript
// backend/src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('5001'),
  JWT_SECRET: z.string().min(32),
  MONGODB_URI: z.string().url(),
  OPENAI_API_KEY: z.string().startsWith('sk-'),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

export const env = envSchema.parse(process.env);
```

---

## Security Audit Logging

```typescript
// backend/src/middleware/audit.ts
import winston from 'winston';

const auditLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'audit.log' }),
  ],
});

export const logSecurityEvent = (event: string, data: any) => {
  auditLogger.info({
    timestamp: new Date().toISOString(),
    event,
    ...data,
  });
};

// Log failed login attempts
logSecurityEvent('LOGIN_FAILED', {
  email: req.body.email,
  ip: req.ip,
  userAgent: req.headers['user-agent'],
});
```

---

## HTTPS Enforcement

### Production Configuration
```typescript
// Redirect HTTP to HTTPS in production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});
```

---

## Security Checklist

### Pre-Deployment
- [ ] All environment variables are properly set
- [ ] JWT_SECRET is at least 32 characters
- [ ] Rate limiting is configured
- [ ] CORS whitelist is properly configured
- [ ] Security headers (Helmet.js) are active
- [ ] Input validation is implemented for all endpoints
- [ ] Error messages don't leak sensitive information
- [ ] HTTPS is enforced in production
- [ ] Logging is configured for security events

### Regular Maintenance
- [ ] Review and rotate JWT secrets quarterly
- [ ] Update dependencies monthly (npm audit)
- [ ] Monitor failed login attempts
- [ ] Review CORS whitelist quarterly
- [ ] Audit user permissions monthly
- [ ] Check for outdated packages with security vulnerabilities

---

## Vulnerability Scanning

```bash
# Check for known vulnerabilities
npm audit

# Fix automatically fixable issues
npm audit fix

# Generate detailed report
npm audit --json > audit-report.json
```

---

## Incident Response

### Security Breach Protocol
1. **Immediate**: Revoke all active JWT tokens
2. **Within 1 hour**: Rotate all API keys and secrets
3. **Within 24 hours**: Notify affected users
4. **Within 1 week**: Publish incident report

### Emergency Contacts
- Primary: security@portfolio.com
- Backup: admin@portfolio.com

---

## Compliance

### GDPR
- ✅ Data minimization implemented
- ✅ User consent required for data collection
- ✅ Right to data deletion supported
- ✅ Data retention policy documented

### OWASP Top 10 Protection
- ✅ A01: Broken Access Control - JWT + RBAC
- ✅ A02: Cryptographic Failures - bcrypt for passwords
- ✅ A03: Injection - Prisma ORM parameterization
- ✅ A04: Insecure Design - Security-first architecture
- ✅ A05: Security Misconfiguration - Helmet.js headers
- ✅ A06: Vulnerable Components - Automated npm audit
- ✅ A07: Authentication Failures - Rate limiting + strong passwords
- ✅ A08: Software Integrity - Lock files committed
- ✅ A09: Logging Failures - Winston structured logging
- ✅ A10: SSRF - Strict URL validation

---

**Last Updated**: 2025-12-29  
**Next Review**: 2025-03-29
