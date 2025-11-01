# Vercel Deployment Guide for M Square Lighting

## 🚀 Quick Deployment Steps

### 1. Prepare Repository
```bash
# Commit all changes
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the configuration

### 3. Configure Environment Variables
In Vercel Dashboard > Settings > Environment Variables, add:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@msquarelighting.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@msquarelighting.com
```

### 4. Custom Domain Setup
1. **Domain**: msquarelighting.com (purchase from Namecheap/GoDaddy)
2. **Vercel Setup**:
   - Go to Vercel Dashboard > Settings > Domains
   - Add "msquarelighting.com" and "www.msquarelighting.com"
   - Copy the DNS records provided by Vercel
3. **DNS Configuration**:
   - Add A record: @ → 76.76.19.61
   - Add CNAME record: www → cname.vercel-dns.com
4. **SSL**: Automatic HTTPS certificate (free)

## 📁 File Structure Changes Made

```
m-square-lighting-website/
├── api/                    # NEW: Serverless functions
│   ├── contact.js         # Contact form API
│   ├── health.js          # Health check API
│   └── package.json       # API dependencies
├── client/                # Frontend (unchanged)
├── server/                # Keep for local development
├── vercel.json           # NEW: Vercel configuration
├── .env.example          # NEW: Environment template
└── VERCEL_DEPLOYMENT.md  # NEW: This guide
```

## 🔧 What Changed

### ✅ Added Files:
- `vercel.json` - Vercel configuration
- `api/contact.js` - Serverless contact form
- `api/health.js` - Serverless health check
- `api/package.json` - API dependencies
- `.env.example` - Environment template

### ✅ Modified Files:
- `client/src/utils/api.js` - Updated API URLs
- `package.json` - Added Vercel build script
- `client/package.json` - Added Vercel build script

### ✅ Kept Unchanged:
- All React components and pages
- Styling and assets
- Server folder (for local development)

## 🌐 URLs After Deployment

- **Production**: `https://msquarelighting.com`
- **Vercel URL**: `https://m-square-lighting-website.vercel.app` (backup)
- **API Health**: `https://msquarelighting.com/api/health`
- **Contact API**: `https://msquarelighting.com/api/contact`

## 🔍 Testing Deployment

1. Visit your Vercel URL
2. Test contact form submission
3. Check API health endpoint
4. Verify all pages load correctly

## 📧 Email Setup

### Gmail Configuration:
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use App Password in EMAIL_PASSWORD

### Custom SMTP:
Use your hosting provider's SMTP settings

## 🚨 Troubleshooting

### Build Fails:
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify environment variables

### API Not Working:
- Check environment variables in Vercel
- Verify email credentials
- Check function logs in Vercel dashboard

### Contact Form Issues:
- Test API endpoint directly
- Check CORS settings
- Verify email configuration

## 📊 Monitoring

- **Vercel Analytics**: Built-in traffic monitoring
- **Function Logs**: Check API function execution
- **Performance**: Monitor Core Web Vitals

## 💰 Costs

- **Hobby Plan**: Free (perfect for starting)
- **Pro Plan**: $20/month (for custom domains + more)
- **Email**: Use Gmail (free) or Google Workspace ($6/month)

## 🎯 Next Steps After Deployment

1. **Custom Domain**: Add msquarelighting.com
2. **Google Analytics**: Add tracking code
3. **Google Search Console**: Submit sitemap
4. **Google My Business**: Create local listing
5. **AdSense**: Apply for ad revenue
6. **Marketing**: Start Google Ads campaign

Your M Square Lighting website is now ready for Vercel deployment! 🚀
