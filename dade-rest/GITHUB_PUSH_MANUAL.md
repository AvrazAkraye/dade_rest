# Push to GitHub - Manual Steps

Since Git is not installed on this system, follow these steps on your local computer:

## Prerequisites
- Git installed on your computer: https://git-scm.com/download/win
- GitHub account created: https://github.com/signup

## Steps to Push Your Code

### 1. Open Command Prompt or PowerShell
- Press `Win + R`
- Type `cmd` or `powershell`
- Navigate to your project folder:
  ```
  cd "C:\Users\NIPEAL\Desktop\dade rest\dade-rest"
  ```

### 2. Initialize Git Repository
```bash
git init
```

### 3. Add All Files
```bash
git add .
```

### 4. Create First Commit
```bash
git commit -m "Initial commit - DADE REST restaurant menu"
```

### 5. Rename Branch to Main
```bash
git branch -M main
```

### 6. Add Remote Repository
Replace `avrazxp2-ui` with your GitHub username:
```bash
git remote add origin https://github.com/avrazxp2-ui/dade-rest.git
```

### 7. Push to GitHub
```bash
git push -u origin main
```

You may be prompted to login to GitHub. Use your GitHub credentials.

---

## After Pushing

Once your code is on GitHub:

1. Go to https://vercel.com/signup
2. Click "Continue with GitHub"
3. Authorize Vercel
4. Click "Import Project"
5. Select "dade-rest" repository
6. Click "Import"
7. Click "Deploy"
8. Wait 2-3 minutes
9. Your app is live! 🎉

---

## Troubleshooting

### "Git is not recognized"
- Install Git: https://git-scm.com/download/win
- Restart your computer after installation

### "Permission denied"
- Make sure you're logged into GitHub
- Check your GitHub credentials

### "Repository already exists"
- Delete the `.git` folder in your project
- Start from Step 2 again

---

## Commands Summary

```bash
cd "C:\Users\NIPEAL\Desktop\dade rest\dade-rest"
git init
git add .
git commit -m "Initial commit - DADE REST restaurant menu"
git branch -M main
git remote add origin https://github.com/avrazxp2-ui/dade-rest.git
git push -u origin main
```

Copy and paste these commands one by one into your terminal.

---

## Need Help?

1. Make sure Git is installed
2. Make sure you're in the correct folder
3. Make sure your GitHub credentials are correct
4. Check GitHub status: https://www.githubstatus.com/

Good luck! 🚀
