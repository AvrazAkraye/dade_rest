# DADE REST - Deployment Guide

## Files to Upload to Server

### Essential Files & Folders:
1. **src/** - All source code
2. **public/** - Static files and images
3. **package.json** - Dependencies
4. **package-lock.json** - Dependency lock file
5. **next.config.ts** - Next.js configuration
6. **tsconfig.json** - TypeScript configuration
7. **postcss.config.mjs** - PostCSS configuration
8. **eslint.config.mjs** - ESLint configuration
9. **.env.local** (create on server) - Environment variables

### DO NOT Upload:
- `node_modules/` - Will be installed on server
- `.next/` - Will be generated on server
- `.git/` - Not needed on production
- `scripts/` - Only for development
- `full-menu.html`, `menu-utf8.html`, `restaurant-data.html` - Development files
- `menu-data.json` - Development file
- `restaurant.db` - Will be created on server

## Server Setup Instructions

### 1. Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- A web server (Nginx/Apache) or use Node.js directly

### 2. Upload Files
Upload all files from the "Essential Files & Folders" list to your server directory.

### 3. Install Dependencies
```bash
cd /path/to/dade-rest
npm install
```

### 4. Create Environment File
Create `.env.local` file:
```
# .env.local
NODE_ENV=production
```

### 5. Build for Production
```bash
npm run build
```

### 6. Start the Server
```bash
npm start
```

The app will run on `http://localhost:3000`

### 7. Configure Web Server (Optional - for Nginx)
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 8. Use PM2 for Process Management (Recommended)
```bash
npm install -g pm2
pm2 start npm --name "dade-rest" -- start
pm2 save
pm2 startup
```

## Database
- SQLite database (`restaurant.db`) is automatically created on first run
- All menu data is pre-populated
- Images are stored in `public/images/`

## Features
- ✅ Full menu with 94 items
- ✅ 10 categories
- ✅ Shopping cart with localStorage
- ✅ Responsive design
- ✅ Arabic language support
- ✅ Admin panel for menu management
- ✅ Contact page
- ✅ Local image storage

## Troubleshooting

### Port Already in Use
Change port in package.json start script or use:
```bash
PORT=3001 npm start
```

### Database Issues
Delete `restaurant.db` and restart - it will be recreated with all data.

### Images Not Loading
Ensure `public/images/` folder is uploaded with all image files.

## Support
For issues, check:
1. Node.js version compatibility
2. All files are uploaded
3. Dependencies are installed
4. Database file has write permissions
