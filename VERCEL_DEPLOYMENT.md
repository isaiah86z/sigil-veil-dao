# Vercel Deployment Guide for Sigil Veil DAO

This guide provides step-by-step instructions for deploying the Sigil Veil DAO application to Vercel.

## Prerequisites

- GitHub account with access to the `isaiah86z/sigil-veil-dao` repository
- Vercel account (free tier available)
- Environment variables ready

## Step-by-Step Deployment

### Step 1: Access Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project" on the dashboard

### Step 2: Import GitHub Repository

1. In the "Import Git Repository" section, search for `isaiah86z/sigil-veil-dao`
2. Click "Import" next to the repository
3. Vercel will automatically detect it's a Vite React project

### Step 3: Configure Project Settings

1. **Project Name**: `sigil-veil-dao` (or your preferred name)
2. **Framework Preset**: Vite (should be auto-detected)
3. **Root Directory**: `./` (default)
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `dist` (default for Vite)
6. **Install Command**: `npm install` (default)

### Step 4: Environment Variables Configuration

Click "Environment Variables" and add the following variables:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_VERIFIER_ADDRESS=0x0000000000000000000000000000000000000000
```

**Important**: Replace the contract addresses with your actual deployed contract addresses after deployment.

### Step 5: Advanced Configuration (Optional)

If you need custom build settings, create a `vercel.json` file in the root directory:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Step 6: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Vercel will provide you with a deployment URL (e.g., `https://sigil-veil-dao.vercel.app`)

### Step 7: Custom Domain (Optional)

1. Go to your project dashboard in Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Post-Deployment Configuration

### Update Contract Addresses

After deploying your smart contracts to Sepolia:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_CONTRACT_ADDRESS` with your deployed contract address
3. Update `NEXT_PUBLIC_VERIFIER_ADDRESS` with your verifier address
4. Redeploy the application

### Verify Deployment

1. Visit your deployed URL
2. Connect a wallet (MetaMask, Rainbow, etc.)
3. Switch to Sepolia network
4. Test the basic functionality

## Build Configuration Details

### Vite Configuration

The project uses Vite with the following key configurations:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
})
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Troubleshooting

### Common Issues

1. **Build Fails**: Check that all dependencies are properly installed
2. **Environment Variables Not Working**: Ensure variables start with `NEXT_PUBLIC_`
3. **Wallet Connection Issues**: Verify WalletConnect Project ID is correct
4. **Network Issues**: Ensure users are on Sepolia testnet

### Build Logs

If deployment fails:
1. Check the build logs in Vercel dashboard
2. Look for specific error messages
3. Common issues include missing dependencies or TypeScript errors

### Performance Optimization

1. **Bundle Analysis**: Use `npm run build` locally to check bundle size
2. **Image Optimization**: Ensure images are optimized for web
3. **Code Splitting**: Vite automatically handles code splitting

## Monitoring and Analytics

### Vercel Analytics

1. Enable Vercel Analytics in project settings
2. Monitor performance metrics
3. Track user interactions

### Error Tracking

Consider integrating error tracking services:
- Sentry
- LogRocket
- Bugsnag

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to Git
2. **HTTPS**: Vercel automatically provides HTTPS
3. **CORS**: Configure CORS for API calls if needed
4. **Rate Limiting**: Consider implementing rate limiting for API calls

## Continuous Deployment

Vercel automatically deploys when you push to the main branch:

1. Push changes to GitHub
2. Vercel detects changes
3. Automatic deployment starts
4. New version goes live

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)

## Deployment Checklist

- [ ] GitHub repository is accessible
- [ ] Environment variables are configured
- [ ] Build command is correct
- [ ] Output directory is set to `dist`
- [ ] Custom domain is configured (if needed)
- [ ] Contract addresses are updated
- [ ] Application is tested on deployed URL
- [ ] Wallet connection works
- [ ] Network switching works
- [ ] Basic functionality is verified

---

**Note**: This deployment guide assumes you have already deployed your smart contracts to the Sepolia testnet. Make sure to update the contract addresses in the environment variables after deployment.
