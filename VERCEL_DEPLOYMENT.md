# Vercel Deployment Guide for Sigil Veil DAO

This guide provides step-by-step instructions for deploying the Sigil Veil DAO application to Vercel.

## Prerequisites

- GitHub account with access to the `isaiah86z/sigil-veil-dao` repository
- Vercel account (free tier available)
- Domain name (optional, for custom domain setup)

## Step-by-Step Deployment Process

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
5. **Output Directory**: `dist` (default)
6. **Install Command**: `npm install` (default)

### Step 4: Set Environment Variables

Click "Environment Variables" and add the following variables:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_API_KEY
NEXT_PUBLIC_CONTRACT_ADDRESS=
NEXT_PUBLIC_FHEVM_NETWORK_URL=https://api.testnet.fhenix.zone
```

**Important Notes:**
- Replace `NEXT_PUBLIC_CONTRACT_ADDRESS` with your deployed contract address once available
- All environment variables starting with `NEXT_PUBLIC_` are exposed to the client-side
- Keep sensitive keys secure and never commit them to the repository

### Step 5: Deploy the Application

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-5 minutes)
3. Vercel will provide you with a deployment URL (e.g., `https://sigil-veil-dao.vercel.app`)

### Step 6: Verify Deployment

1. Visit the provided deployment URL
2. Test the following features:
   - Wallet connection (RainbowKit)
   - Network switching to Sepolia
   - UI responsiveness
   - All navigation tabs

### Step 7: Configure Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Click "Add Domain"
3. Enter your custom domain (e.g., `sigil-veil-dao.com`)
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (can take up to 24 hours)

## Post-Deployment Configuration

### Smart Contract Integration

1. **Deploy Contract**: Deploy the `SigilVeilDAO.sol` contract to Sepolia testnet
2. **Update Environment**: Add the contract address to Vercel environment variables
3. **Redeploy**: Trigger a new deployment to pick up the contract address

### Performance Optimization

1. **Enable Analytics**: Go to "Analytics" tab in Vercel dashboard
2. **Configure Caching**: Set up appropriate cache headers for static assets
3. **Monitor Performance**: Use Vercel's built-in performance monitoring

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check environment variables are set correctly
   - Verify all dependencies are in `package.json`
   - Check build logs in Vercel dashboard

2. **Wallet Connection Issues**:
   - Verify WalletConnect Project ID is correct
   - Check network configuration
   - Ensure RPC URLs are accessible

3. **Contract Interaction Issues**:
   - Verify contract address is set
   - Check contract is deployed on correct network
   - Ensure user has sufficient ETH for gas fees

### Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)

## Security Considerations

1. **Environment Variables**: Never expose sensitive keys in client-side code
2. **HTTPS**: Vercel automatically provides HTTPS certificates
3. **CORS**: Configure CORS settings if needed for API calls
4. **Rate Limiting**: Consider implementing rate limiting for public endpoints

## Monitoring and Maintenance

1. **Uptime Monitoring**: Set up uptime monitoring for your domain
2. **Error Tracking**: Integrate error tracking services (Sentry, etc.)
3. **Performance Monitoring**: Monitor Core Web Vitals
4. **Regular Updates**: Keep dependencies updated for security patches

## Cost Considerations

- **Vercel Free Tier**: Includes 100GB bandwidth, 100 serverless function executions
- **Pro Tier**: $20/month for increased limits and advanced features
- **Custom Domain**: Free with any Vercel plan

## Next Steps

1. Set up automated deployments from main branch
2. Configure staging environment for testing
3. Implement CI/CD pipeline for contract deployments
4. Add monitoring and alerting systems
5. Plan for scaling as user base grows

---

**Deployment URL**: Your application will be available at `https://sigil-veil-dao.vercel.app` (or your custom domain)

**Support**: For deployment issues, check Vercel's documentation or contact support through the Vercel dashboard.