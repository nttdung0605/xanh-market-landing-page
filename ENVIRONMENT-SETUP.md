# Environment Variables Setup

## Quick Fix
The API configuration is currently hardcoded to `http://localhost:3000`. You can change this directly in `src/lib/api-config.ts` if needed.

## Using Environment Variables (Optional)

If you want to use environment variables for different environments (development, staging, production), follow these steps:

### 1. Create Environment File
Create a `.env` file in your project root (same level as `package.json`):

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 2. Update API Configuration
In `src/lib/api-config.ts`, replace the hardcoded URL:

```typescript
// Replace this line:
export const API_BASE_URL = 'http://localhost:3000';

// With this:
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
```

### 3. Restart Development Server
After making changes to environment variables, restart your development server:

```bash
npm run dev
```

## Important Notes

1. **VITE_ Prefix**: All environment variables in Vite must start with `VITE_` to be accessible in the client-side code.

2. **Security**: Only put non-sensitive information in environment variables that start with `VITE_` as they will be exposed to the client-side code.

3. **Git Ignore**: Make sure your `.env` file is in `.gitignore` to avoid committing sensitive information.

## Different Environments

You can create different environment files:
- `.env.development` - for development
- `.env.staging` - for staging  
- `.env.production` - for production

## Troubleshooting

If you're getting "process is not defined" errors:
1. Make sure you're using `import.meta.env` instead of `process.env`
2. Restart your development server
3. Clear your browser cache
4. Make sure the environment variable starts with `VITE_`