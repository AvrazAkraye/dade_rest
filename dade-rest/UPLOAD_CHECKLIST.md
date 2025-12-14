# Upload Checklist for DADE REST

## Files & Folders to Upload

### ✅ Source Code
- [ ] `src/` folder (entire directory)
  - [ ] `src/app/` - All pages and API routes
  - [ ] `src/components/` - React components
  - [ ] `src/lib/` - Utilities and database

### ✅ Static Files
- [ ] `public/` folder (entire directory)
  - [ ] `public/images/` - All 94 product images
  - [ ] `public/favicon.ico` and other assets

### ✅ Configuration Files
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `next.config.ts`
- [ ] `tsconfig.json`
- [ ] `postcss.config.mjs`
- [ ] `eslint.config.mjs`

### ✅ Documentation
- [ ] `DEPLOYMENT.md` - Deployment guide
- [ ] `README.md` - Project info

### ❌ DO NOT Upload
- [ ] `node_modules/` - Install on server
- [ ] `.next/` - Build on server
- [ ] `.git/` - Not needed
- [ ] `scripts/` - Development only
- [ ] `*.html` files in root - Development only
- [ ] `menu-data.json` - Development only
- [ ] `restaurant.db` - Creates automatically

## Server Setup Steps

1. **Upload all files** from the checklist above
2. **SSH into server** and navigate to project directory
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Build the project:**
   ```bash
   npm run build
   ```
5. **Start the server:**
   ```bash
   npm start
   ```
   Or use PM2:
   ```bash
   pm2 start npm --name "dade-rest" -- start
   ```

## Verify Installation

After starting, check:
- [ ] Server running on port 3000
- [ ] Home page loads: `http://yourdomain.com/`
- [ ] Menu page loads: `http://yourdomain.com/menu`
- [ ] Images display correctly
- [ ] Cart functionality works
- [ ] Admin panel accessible: `http://yourdomain.com/admin`

## File Sizes Reference

- `src/` folder: ~50 KB
- `public/images/` folder: ~15-20 MB (94 images)
- `package.json`: ~1 KB
- Total to upload: ~20-25 MB

## Important Notes

- Database will be created automatically on first run
- All 94 menu items are pre-loaded
- Images are served from `public/images/`
- Cart data stored in browser localStorage
- No external API dependencies

## Support Files

- `DEPLOYMENT.md` - Detailed deployment instructions
- `package.json` - Lists all dependencies
- `next.config.ts` - Next.js configuration
