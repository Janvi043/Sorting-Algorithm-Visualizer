# Deployment Guide: GitHub + Vercel

This guide will walk you through pushing your code to GitHub and deploying it on Vercel.

## Prerequisites

- Git installed on your computer
- GitHub account (create one at [github.com](https://github.com))
- Vercel account (create one at [vercel.com](https://vercel.com))

---

## Step 1: Initialize Git Repository

Open your terminal/command prompt in the project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create your first commit
git commit -m "Initial commit: Sorting Algorithm Visualizer"
```

---

## Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `sorting-viz` (or any name you prefer)
   - **Description**: "Sorting Algorithm Visualizer with animated bars"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

---

## Step 3: Push Code to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/sorting-viz.git

# Rename branch to main (if needed)
git branch -M main

# Push code to GitHub
git push -u origin main
```

**Note**: If you're using SSH instead of HTTPS, use:
```bash
git remote add origin git@github.com:YOUR_USERNAME/sorting-viz.git
```

---

## Step 4: Deploy to Vercel

### Option A: Deploy via Vercel Website (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in (you can use GitHub to sign in)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository:
   - Find your `sorting-viz` repository
   - Click **"Import"**
4. Configure project:
   - **Framework Preset**: Vercel will auto-detect Next.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)
5. Click **"Deploy"**
6. Wait 1-2 minutes for deployment to complete
7. Your app will be live at a URL like: `https://sorting-viz-xyz.vercel.app`

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from your project directory:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No**
   - Project name? (Press Enter for default)
   - Directory? (Press Enter for `./`)
   - Override settings? **No**

5. For production deployment:
```bash
vercel --prod
```

---

## Step 5: Automatic Deployments (Optional)

Vercel automatically deploys when you push to GitHub:

- **Production**: Deploys when you push to `main` branch
- **Preview**: Creates preview deployments for pull requests

No additional setup needed! Every time you push code to GitHub, Vercel will automatically redeploy.

---

## Troubleshooting

### Git Issues

**If you get "fatal: remote origin already exists":**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/sorting-viz.git
```

**If you need to update your code:**
```bash
git add .
git commit -m "Your commit message"
git push
```

### Vercel Deployment Issues

**Build fails?**
- Check that `package.json` has all dependencies
- Ensure Node.js version is 18+ (Vercel uses this by default)
- Check build logs in Vercel dashboard

**Environment variables?**
- Go to Project Settings → Environment Variables in Vercel dashboard
- Add any required variables

---

## Quick Commands Reference

```bash
# Git commands
git status                    # Check status
git add .                     # Stage all changes
git commit -m "message"       # Commit changes
git push                      # Push to GitHub

# Vercel CLI commands
vercel                        # Deploy to preview
vercel --prod                 # Deploy to production
vercel logs                   # View deployment logs
```

---

## Your App is Live! 🎉

Once deployed, you can:
- Share your Vercel URL with anyone
- Customize domain in Vercel dashboard (Settings → Domains)
- Monitor deployments in Vercel dashboard
- View analytics and performance metrics

Happy coding! 🚀

