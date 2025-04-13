# UI Development and Deployment Guide

## Project Structure
```
plus1-mvp/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main landing page
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── text-rotate.tsx   # Text rotation component
│   │   │   └── parallax-floating.tsx # Parallax effect component
│   │   └── ...
│   └── hooks/
│       └── use-mouse-position-ref.ts # Custom mouse tracking hook
├── public/                       # Static assets
├── .cursor/                      # Cursor IDE configuration
│   └── mcp.json                 # MCP configuration for UI components
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## Development Setup

1. **Initial Setup**
```bash
# Clone the repository
git clone <repository-url>
cd plus1-mvp

# Install dependencies
npm install

# Install required packages
npm install framer-motion
```

2. **Configure 21st Dev Components**
```bash
# Create .cursor directory and MCP configuration
mkdir .cursor
```

Add to `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "@21st-dev/magic": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "@21st-dev/magic@latest",
        "API_KEY=\"your-api-key-here\""
      ]
    }
  }
}
```

3. **Component Implementation**

When implementing new UI components:
- Place reusable components in `src/components/ui/`
- Custom hooks go in `src/hooks/`
- Always use "use client" directive for client-side components
- Follow the established component structure:
  ```typescript
  "use client"
  
  import { necessary, imports } from 'packages'
  
  interface ComponentProps {
    // Define clear interfaces
  }
  
  export function Component({ props }: ComponentProps) {
    // Implementation
  }
  ```

## Best Practices

1. **Component Organization**
- Keep components modular and reusable
- Use TypeScript interfaces for prop definitions
- Implement proper error boundaries
- Add JSDoc comments for complex functions

2. **Styling**
- Use Tailwind CSS classes consistently
- Create custom utility classes in globals.css
- Follow mobile-first responsive design
- Maintain consistent spacing and typography

3. **Performance**
- Implement proper code splitting
- Optimize images and assets
- Use proper loading states
- Implement proper caching strategies

## Deployment Preparation

1. **Pre-Deployment Requirements**
- Node.js 18.x or later
- Git
- GitHub account
- Vercel account (recommended for Next.js deployment)
- Environment variables ready for production

2. **Build Optimization**
```bash
# Clean previous builds
rm -rf .next

# Install dependencies in clean state
npm ci

# Run production build
npm run build

# Test production build locally
npm run start
```

3. **Environment Setup**
Create `.env.production`:
```env
# Required Environment Variables
NEXT_PUBLIC_APP_URL=https://your-production-domain.com
NODE_ENV=production

# Analytics and Monitoring (if using)
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
SENTRY_DSN=your-sentry-dsn

# API Keys and Services (if using)
NEXT_PUBLIC_API_KEY=your-api-key
DATABASE_URL=your-database-url
```

4. **Deployment Platforms**
Choose one:

a) **Vercel (Recommended)**
- Connect GitHub repository to Vercel
- Configure environment variables in Vercel dashboard
- Enable automatic deployments
- Set up preview deployments for PRs

b) **Manual VPS/Server**
- Set up Nginx/Apache
- Configure SSL certificates
- Set up PM2 for process management
- Configure reverse proxy

5. **GitHub Actions Setup**
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
        run: |
          # Add deployment steps here
          echo "Deploying to production..."
```

6. **Deployment Checklist**
Pre-Deploy:
- [ ] Run all tests (`npm run test`)
- [ ] Run linting (`npm run lint`)
- [ ] Check TypeScript errors (`npm run type-check`)
- [ ] Verify all environment variables are set
- [ ] Test responsive design across devices
- [ ] Optimize images and assets
- [ ] Run lighthouse audit
- [ ] Check console for errors
- [ ] Verify API endpoints
- [ ] Test all interactive features

Post-Deploy:
- [ ] Verify SSL certificate
- [ ] Check security headers
- [ ] Test production environment
- [ ] Verify analytics integration
- [ ] Check error tracking
- [ ] Monitor initial performance
- [ ] Verify SEO meta tags
- [ ] Test social media previews
- [ ] Check robots.txt and sitemap
- [ ] Verify backup systems

7. **Monitoring Setup**
- Set up error tracking with Sentry
  ```bash
  npm install @sentry/nextjs
  ```
- Configure performance monitoring
- Set up logging system
- Configure alerts for:
  - Error rates
  - Performance degradation
  - API failures
  - Server health

8. **Rollback Plan**
- Keep previous deployment version
- Document rollback procedures
- Test rollback process
- Set up automated rollback triggers

## CI/CD Setup

1. **GitHub Actions**
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
      # Add deployment steps
```

2. **Monitoring**
- Set up error tracking (e.g., Sentry)
- Implement logging
- Set up performance monitoring
- Configure alerts

## Troubleshooting

Common issues and solutions:
1. **Hydration Errors**
   - Ensure consistent rendering between server and client
   - Use proper "use client" directives
   - Check for undefined window/document usage

2. **Build Errors**
   - Verify all dependencies are installed
   - Check for TypeScript errors
   - Verify file paths and imports

3. **Performance Issues**
   - Implement proper code splitting
   - Optimize images and assets
   - Use proper caching strategies
   - Monitor bundle size

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [21st Dev Components](https://21st.dev/docs) 