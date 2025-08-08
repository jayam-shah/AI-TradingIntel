# Deploying StockSense AI to Netlify

This guide will help you deploy your StockSense AI application to Netlify with a custom domain.

## Prerequisites

1. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket
2. **PostgreSQL Database**: Set up a PostgreSQL database (recommend Neon, Supabase, or Railway)
3. **API Keys**:
   - Alpha Vantage API key (free tier available)
   - News API key (free tier available)
   - OpenAI API key (for AI analysis)

## Step-by-Step Deployment

### 1. Prepare Your Database

Choose one of these PostgreSQL providers:

**Option A: Neon (Recommended)**
1. Go to [neon.tech](https://neon.tech)
2. Create a free account and new project
3. Copy your connection string

**Option B: Supabase**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your database URL from Settings > Database

**Option C: Railway**
1. Go to [railway.app](https://railway.app)
2. Create a PostgreSQL database
3. Copy the connection string

### 2. Get Your API Keys

**Alpha Vantage (Stock Data)**
1. Visit [alphavantage.co](https://www.alphavantage.co/support/#api-key)
2. Get your free API key
3. Free tier: 500 requests/day

**News API (Market News)**
1. Visit [newsapi.org](https://newsapi.org/register)
2. Register for a free account
3. Free tier: 1000 requests/month

**OpenAI (AI Analysis)**
1. Visit [platform.openai.com](https://platform.openai.com/api-keys)
2. Create an API key
3. Add billing information (pay-per-use)

### 3. Deploy to Netlify

**Step 1: Connect Repository**
1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "New site from Git"
3. Connect your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository

**Step 2: Configure Build Settings**
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Functions directory**: `netlify/functions`

**Step 3: Set Environment Variables**
Go to Site settings > Environment variables and add:

```
DATABASE_URL=postgresql://username:password@host:port/database
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
NEWS_API_KEY=your_news_api_key
OPENAI_API_KEY=sk-your_openai_key
JWT_SECRET=your_random_jwt_secret_key
NODE_ENV=production
```

**Step 4: Deploy**
1. Click "Deploy site"
2. Wait for build to complete
3. Your app will be live at `random-name.netlify.app`

### 4. Set Up Database Schema

After deployment, you need to initialize your database:

1. In your Netlify dashboard, go to Functions
2. Find the `api` function and test it with: `/.netlify/functions/api/health`
3. The database tables will be created automatically on first run

### 5. Custom Domain (Optional)

**Using Netlify Domain**
- Your site will have a URL like `your-app-name.netlify.app`
- You can change the subdomain in Site settings > Domain management

**Using Your Own Domain**
1. In Site settings > Domain management
2. Click "Add custom domain"
3. Enter your domain name
4. Follow DNS configuration instructions
5. Netlify will provide free SSL certificate

### 6. Performance Optimization

**Enable Asset Optimization**
1. Go to Site settings > Build & deploy
2. Enable "Asset optimization"
3. Turn on CSS, JS, and image optimization

**Configure Caching**
The app is already configured with proper caching headers for optimal performance.

## Troubleshooting

### Common Issues

**Build Fails**
- Check that all environment variables are set
- Verify your API keys are valid
- Check the deploy log for specific errors

**Database Connection Issues**
- Verify your `DATABASE_URL` is correct
- Make sure your database allows connections from Netlify IPs
- Check that your database is running

**API Rate Limits**
- Alpha Vantage: 500 requests/day on free tier
- News API: 1000 requests/month on free tier
- Consider upgrading if you hit limits

**Environment Variables Not Working**
- Make sure variables are set in Netlify dashboard
- Redeploy after adding new variables
- Variables starting with `VITE_` are for frontend only

### Support

If you encounter issues:
1. Check Netlify's deploy logs
2. Review your environment variables
3. Test API endpoints individually
4. Check database connectivity

## Security Notes

- Never commit API keys to your repository
- Use strong JWT secrets (32+ random characters)
- Enable 2FA on all service accounts
- Regularly rotate API keys
- Monitor usage to detect unusual activity

## Monitoring

**Netlify Analytics**
- Enable in Site settings > Analytics
- Monitor traffic and performance

**Database Monitoring**
- Most providers offer built-in monitoring
- Set up alerts for connection limits
- Monitor query performance

Your StockSense AI app is now completely independent and running on Netlify with your own domain!