# 📊 Monitoring & Logging Documentation

## Overview
This document outlines monitoring, logging, and observability practices for the Digital Twin Portfolio project.

---

## Health Checks

### Health Check Endpoints

#### Basic Health Check
```typescript
// backend/src/routes/health.ts
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});
```

#### Readiness Probe
```typescript
app.get('/api/ready', async (req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Check external services
    const aiServiceHealthy = await checkAIService();
    
    if (aiServiceHealthy) {
      res.status(200).json({ status: 'ready' });
    } else {
      res.status(503).json({ status: 'not ready', reason: 'AI service unavailable' });
    }
  } catch (error) {
    res.status(503).json({ status: 'not ready', reason: 'database unavailable' });
  }
});
```

#### Liveness Probe
```typescript
app.get('/api/live', (req, res) => {
  res.status(200).json({
    status: 'alive',
    pid: process.pid,
    memory: process.memoryUsage(),
  });
});
```

---

## Structured Logging

### Winston Configuration
```typescript
// backend/src/config/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'portfolio-api',
    environment: process.env.NODE_ENV,
  },
  transports: [
    // Write all logs to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // Write error logs to file
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    // Write all logs to file
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});

export default logger;
```

### Usage Examples
```typescript
import logger from './config/logger';

// Info logging
logger.info('User logged in', {
  userId: user.id,
  email: user.email,
  ip: req.ip,
});

// Error logging
logger.error('Failed to create blog', {
  error: err.message,
  stack: err.stack,
  userId: req.user.id,
});

// Warning logging
logger.warn('Rate limit approaching', {
  ip: req.ip,
  endpoint: req.path,
  requestCount: count,
});

// Debug logging (dev only)
logger.debug('Database query executed', {
  query: 'SELECT * FROM blogs',
  duration: 45,
});
```

---

## Error Tracking

### Sentry Integration

#### Setup
```bash
npm install @sentry/node @sentry/tracing
```

#### Configuration
```typescript
// backend/src/config/sentry.ts
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
    new Tracing.Integrations.Prisma({ client: prisma }),
  ],
});

// Request handler must be the first middleware
app.use(Sentry.Handlers.requestHandler());

// Tracing handler
app.use(Sentry.Handlers.tracingHandler());

// Error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());
```

#### Manual Error Capture
```typescript
try {
  await someRiskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      section: 'blog-creation',
    },
    extra: {
      userId: req.user.id,
      blogData: req.body,
    },
  });
  throw error;
}
```

---

## Performance Monitoring

### Response Time Tracking
```typescript
// backend/src/middleware/metrics.ts
import responseTime from 'response-time';

app.use(responseTime((req, res, time) => {
  logger.info('Request completed', {
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
    responseTime: `${time}ms`,
  });
  
  // Alert on slow requests
  if (time > 1000) {
    logger.warn('Slow request detected', {
      method: req.method,
      url: req.url,
      responseTime: `${time}ms`,
    });
  }
}));
```

### Memory Usage Monitoring
```typescript
// Check memory usage periodically
setInterval(() => {
  const usage = process.memoryUsage();
  const usageInMB = {
    rss: Math.round(usage.rss / 1024 / 1024),
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024),
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024),
    external: Math.round(usage.external / 1024 / 1024),
  };

  logger.debug('Memory usage', usageInMB);

  // Alert if memory usage is high
  if (usageInMB.heapUsed > 500) {
    logger.warn('High memory usage detected', usageInMB);
  }
}, 60000); // Every minute
```

---

## Log Rotation

### Configuration (using winston-daily-rotate-file)
```bash
npm install winston-daily-rotate-file
```

```typescript
import DailyRotateFile from 'winston-daily-rotate-file';

const rotateTransport = new DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d', // Keep logs for 7 days
});

logger.add(rotateTransport);
```

---

## Alerting

### Email Alerts for Critical Errors
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.ALERT_EMAIL,
    pass: process.env.ALERT_EMAIL_PASSWORD,
  },
});

export const sendAlert = async (error: Error, context: any) => {
  if (process.env.NODE_ENV !== 'production') return;

  await transporter.sendMail({
    from: process.env.ALERT_EMAIL,
    to: 'admin@portfolio.com',
    subject: `🚨 Critical Error: ${error.message}`,
    html: `
      <h2>Critical Error Detected</h2>
      <p><strong>Message:</strong> ${error.message}</p>
      <p><strong>Stack:</strong> <pre>${error.stack}</pre></p>
      <p><strong>Context:</strong> ${JSON.stringify(context, null, 2)}</p>
      <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
    `,
  });
};

// Usage
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err });
  sendAlert(err, { url: req.url, method: req.method });
  res.status(500).json({ error: 'Internal server error' });
});
```

---

## Metrics & Analytics

### Custom Metrics Tracking
```typescript
const metrics = {
  totalRequests: 0,
  failedRequests: 0,
  averageResponseTime: 0,
  activeConnections: 0,
};

app.use((req, res, next) => {
  metrics.totalRequests++;
  metrics.activeConnections++;

  res.on('finish', () => {
    metrics.activeConnections--;
    if (res.statusCode >= 400) {
      metrics.failedRequests++;
    }
  });

  next();
});

// Expose metrics endpoint (protect in production)
app.get('/api/metrics', (req, res) => {
  res.json({
    ...metrics,
    errorRate: (metrics.failedRequests / metrics.totalRequests) * 100,
    uptime: process.uptime(),
  });
});
```

---

## Database Query Logging

### Prisma Query Logging
```typescript
// backend/src/config/prisma.ts
import { PrismaClient } from '@prisma/client';
import logger from './logger';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

prisma.$on('query', (e) => {
  logger.debug('Database query', {
    query: e.query,
    params: e.params,
    duration: `${e.duration}ms`,
  });

  // Alert on slow queries
  if (e.duration > 1000) {
    logger.warn('Slow database query detected', {
      query: e.query,
      duration: `${e.duration}ms`,
    });
  }
});

prisma.$on('error', (e) => {
  logger.error('Database error', { message: e.message });
});

export default prisma;
```

---

## Log Aggregation

### Recommended Services
1. **Papertrail** - Cloud-hosted log management
2. **Loggly** - Real-time log analysis
3. **Datadog** - Full-stack observability
4. **New Relic** - Application performance monitoring

### Example: Papertrail Integration
```typescript
import { Papertrail } from 'winston-papertrail';

const papertrailTransport = new Papertrail({
  host: 'logs.papertrailapp.com',
  port: process.env.PAPERTRAIL_PORT,
  hostname: 'portfolio-api',
});

logger.add(papertrailTransport);
```

---

## Monitoring Dashboard

### Key Metrics to Monitor
1. **Response Time**: Average API response time
2. **Error Rate**: Percentage of failed requests
3. **Uptime**: Server availability percentage
4. **Memory Usage**: Heap and RSS memory
5. **Database Connections**: Active and idle connections
6. **AI API Usage**: Number of AI requests and costs

### Sample Dashboard (Grafana)
```yaml
# Example prometheus metrics
up{job="portfolio-api"} 1
http_requests_total{method="GET",status="200"} 1523
http_request_duration_seconds{method="POST",path="/api/chatbot/chat"} 0.45
```

---

## Best Practices

1. **Use Structured Logging**: Always log in JSON format
2. **Include Context**: Add relevant metadata to all logs
3. **Set Appropriate Log Levels**: Debug < Info < Warn < Error
4. **Redact Sensitive Data**: Never log passwords or tokens
5. **Monitor Continuously**: Set up automated alerts
6. **Review Logs Regularly**: Weekly log review for patterns
7. **Test Logging**: Ensure logs are captured in all environments

---

## Emergency Procedures

### High Error Rate
1. Check `/api/health` and `/api/ready` endpoints
2. Review recent error logs
3. Check external service status (AI APIs, DB)
4. Scale up if load-related

### Memory Leak
1. Check `/api/live` for memory usage
2. Review recent code changes
3. Restart service if necessary
4. Investigate with heap snapshots

### Slow Performance
1. Check response time metrics
2. Identify slow database queries
3. Review AI API latency
4. Enable caching if appropriate

---

**Last Updated**: 2025-12-29  
**Next Review**: 2025-03-29
