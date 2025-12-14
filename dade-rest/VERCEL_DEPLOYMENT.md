# Deploy DADE REST to Vercel

## Quick Start (5 minutes)

### Option 1: Deploy via GitHub (Recommended)

1. **Create GitHub Account** (if you don't have one)
   - Go to https://github.com/signup

2. **Create a New Repository**
   - Click "New" → Name it "dade-rest"
   - Don't initialize with README
   - Click "Create repository"

3. **Push Code to GitHub**
   ```bash
   cd dade-rest
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/dade-rest.git
   git push -u origin main
   ```

4. **Deploy to Vercel**
   - Go to https://vercel.com/signup
   - Sign up with GitHub
   - Click "Import Project"
   - Select your "dade-rest" repository
   - Click "Import"
   - Click "Deploy"
   - Wait 2-3 minutes...
   - Your app is live! 🎉

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd dade-rest
   vercel
   ```

3. **Follow prompts:**
   - Link to Vercel account
   - Select project name
   - Confirm settings
   - Wait for deployment

---

## After Deployment

### Your Live URL
- Vercel will give you a URL like: `https://dade-rest.vercel.app`
- Share this link to test the app

### Features That Work
- ✅ Menu browsing
- ✅ Cart functionality
- ✅ Admin panel
- ✅ Contact page
- ✅ All images
- ✅ Responsive design

### Database Note
- SQLite database creates automatically on first request
- Data persists during the deployment
- Cart uses browser localStorage (works on Vercel)

---

## Troubleshooting

### Build Fails
- Check `npm run build` works locally first
- Ensure all files are committed to Git

### Images Not Loading
- Verify `public/images/` folder is in Git
- Check file permissions

### Database Issues
- Vercel uses ephemeral storage
- Database resets on redeploy
- This is fine for testing

---

## Environment Variables (Optional)

If you need to add environment variables:

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add variables as needed

---

## Custom Domain (Optional)

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Domains
4. Add your custom domain
5. Follow DNS instructions

---

## Monitoring

- View logs: Vercel Dashboard → Deployments → View Logs
- Check analytics: Vercel Dashboard → Analytics
- Monitor performance: Vercel Dashboard → Performance

---

## Redeploy

To redeploy after making changes:

```bash
git add .
git commit -m "Update message"
git push origin main
```

Vercel automatically redeploys on push!

---

## Rollback

If something breaks:
1. Go to Vercel Dashboard
2. Deployments tab
3. Click previous deployment
4. Click "Promote to Production"

---

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Help: https://docs.github.com

---

## Next Steps

1. Create GitHub account
2. Push code to GitHub
3. Connect to Vercel
4. Deploy
5. Share your live URL!

Your DADE REST menu will be live in minutes! 🚀
