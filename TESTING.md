# 🧪 Testing Documentation

## Overview
This document outlines the testing strategy, setup, and best practices for the Digital Twin Portfolio project.

---

## Testing Stack

### Frontend
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **@testing-library/user-event** - User interaction simulation
- **MSW** (Mock Service Worker) - API mocking

### Backend
- **Jest** - Unit testing framework
- **Supertest** - HTTP assertion library
- **@faker-js/faker** - Test data generation

---

## Setup

### Install Dependencies
```bash
# Frontend
cd frontend
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Backend
cd backend
npm install --save-dev jest supertest @types/jest @types/supertest
```

### Jest Configuration

#### Frontend (jest.config.js)
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],
};
```

#### Backend (jest.config.js)
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

---

## Frontend Testing Examples

### Component Test
```typescript
// components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click Me');
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### API Hook Test
```typescript
// hooks/useBlogs.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { useBlogs } from './useBlogs';

describe('useBlogs Hook', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches blogs successfully', async () => {
    const mockBlogs = [
      { id: '1', title: 'Blog 1', content: 'Content 1' },
    ];
    
    fetchMock.mockResponseOnce(JSON.stringify(mockBlogs));

    const { result } = renderHook(() => useBlogs());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toEqual(mockBlogs);
  });
});
```

---

## Backend Testing Examples

### API Endpoint Test
```typescript
// routes/chatbot.test.ts
import request from 'supertest';
import app from '../index';

describe('POST /api/chatbot/chat', () => {
  it('should return AI response for valid input', async () => {
    const response = await request(app)
      .post('/api/chatbot/chat')
      .send({ message: 'What are your skills?' })
      .expect(200);
    
    expect(response.body).toHaveProperty('reply');
    expect(response.body.reply).toBeTruthy();
  });

  it('should return 400 for empty message', async () => {
    await request(app)
      .post('/api/chatbot/chat')
      .send({ message: '' })
      .expect(400);
  });

  it('should handle rate limiting', async () => {
    // Make 11 requests (rate limit is 10/min)
    for (let i = 0; i < 11; i++) {
      await request(app)
        .post('/api/chatbot/chat')
        .send({ message: 'Test' });
    }

    await request(app)
      .post('/api/chatbot/chat')
      .send({ message: 'Test' })
      .expect(429); // Too Many Requests
  });
});
```

### Authentication Test
```typescript
// routes/auth.test.ts
import request from 'supertest';
import app from '../index';

describe('Authentication', () => {
  it('should login admin with correct credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@portfolio.com',
        password: 'admin123',
      })
      .expect(200);

    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.email).toBe('admin@portfolio.com');
  });

  it('should reject invalid credentials', async () => {
    await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@portfolio.com',
        password: 'wrongpassword',
      })
      .expect(401);
  });
});
```

### Database Test (with Prisma)
```typescript
// services/blog.test.ts
import { PrismaClient } from '@prisma/client';
import { createBlog, getBlogBySlug } from './blog.service';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.blog.deleteMany();
  await prisma.$disconnect();
});

describe('Blog Service', () => {
  it('should create a new blog', async () => {
    const blogData = {
      title: 'Test Blog',
      slug: 'test-blog',
      content: 'Test content',
      published: true,
    };

    const blog = await createBlog(blogData);
    expect(blog.title).toBe('Test Blog');
    expect(blog.slug).toBe('test-blog');
  });

  it('should retrieve blog by slug', async () => {
    const blog = await getBlogBySlug('test-blog');
    expect(blog).toBeTruthy();
    expect(blog?.title).toBe('Test Blog');
  });
});
```

---

## Running Tests

### Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- Button.test.tsx
```

### Coverage Reports
```bash
# Generate coverage report
npm run test:coverage

# View in browser
open coverage/lcov-report/index.html
```

---

## Test Data Management

### Factories (Using faker)
```typescript
// test/factories/user.factory.ts
import { faker } from '@faker-js/faker';

export const userFactory = () => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  password: faker.internet.password(),
  createdAt: faker.date.past(),
});

export const blogFactory = () => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  slug: faker.lorem.slug(),
  content: faker.lorem.paragraphs(3),
  published: faker.datatype.boolean(),
  createdAt: faker.date.past(),
});
```

---

## Continuous Integration

### GitHub Actions Workflow
```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## Best Practices

1. **Test Isolation**: Each test should be independent
2. **Descriptive Names**: Use clear, descriptive test names
3. **AAA Pattern**: Arrange, Act, Assert
4. **Mock External Dependencies**: Avoid real API calls in tests
5. **Test Edge Cases**: Cover error scenarios, not just happy paths
6. **Keep Tests Fast**: Unit tests should run in milliseconds
7. **Coverage Goals**: Aim for 80%+ coverage on critical paths

---

## Coverage Threshold

Maintain minimum coverage of:
- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

---

**Last Updated**: 2025-12-29
