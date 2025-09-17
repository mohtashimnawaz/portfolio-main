# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Sign up for a free account
3. Create a new cluster (choose the free tier)

## Step 2: Set up Database Access
1. In Atlas dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Create a username and password
4. Set permissions to "Read and write to any database"

## Step 3: Set up Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - This is safe for serverless functions like Vercel

## Step 4: Get Connection String
1. Go to "Databases" and click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace <username> and <password> with your credentials
5. Replace <dbname> with "portfolio"

Example connection string:
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority

## Step 5: Add to Vercel Environment Variables
1. In your Vercel dashboard, go to your project
2. Go to Settings → Environment Variables
3. Add these variables:
   - MONGODB_URI: your-atlas-connection-string
   - DATABASE_NAME: portfolio
   - ADMIN_KEY: your-secure-admin-key
   - NEXT_PUBLIC_SITE_URL: your-vercel-domain

## Optional: Email Configuration
If you want email notifications:
   - SMTP_HOST: smtp.gmail.com
   - SMTP_PORT: 587
   - SMTP_USER: your-email@gmail.com
   - SMTP_PASS: your-gmail-app-password
   - NOTIFICATION_EMAIL: your-email@gmail.com
