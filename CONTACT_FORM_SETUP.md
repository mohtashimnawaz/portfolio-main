# Contact Form Setup Instructions

This document explains how to set up the contact form with MongoDB integration for your portfolio website.

## Features

- ✅ Responsive contact form with validation
- ✅ MongoDB integration for storing submissions
- ✅ Email notifications (optional)
- ✅ Auto-reply emails (optional)
- ✅ Admin dashboard to view submissions
- ✅ Form validation with Zod
- ✅ Beautiful UI with Tailwind CSS and Framer Motion

## Prerequisites

1. **MongoDB Database**: You can use either:
   - Local MongoDB installation
   - MongoDB Atlas (cloud database)

2. **Email Service** (Optional): For email notifications
   - Gmail with App Password
   - Or any SMTP service

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root and add the following variables:

```env
# MongoDB Configuration (Required)
MONGODB_URI=mongodb://localhost:27017
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net
DATABASE_NAME=portfolio

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NOTIFICATION_EMAIL=your-email@gmail.com

# Admin Access (Optional)
ADMIN_KEY=your-secret-admin-key

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service
3. Use `MONGODB_URI=mongodb://localhost:27017`

#### Option B: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Replace `<username>`, `<password>`, and `<cluster>` in your connection string
6. Use `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net`

### 3. Email Configuration (Optional)

If you want email notifications when someone submits the contact form:

#### Gmail Setup:
1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → App passwords
   - Generate a password for "Mail"
3. Use your Gmail address as `SMTP_USER`
4. Use the app password as `SMTP_PASS`

### 4. Admin Dashboard Setup (Optional)

To access the admin dashboard at `/admin`:
1. Set a secure `ADMIN_KEY` in your environment variables
2. Visit `http://localhost:3000/admin`
3. Enter your admin key to view submissions

## API Endpoints

### POST /api/contact
Submits a new contact form entry.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

### GET /api/contact
Retrieves contact submissions (admin only).

**Query Parameters:**
- `adminKey`: Your admin key
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

## Database Schema

The contact submissions are stored in MongoDB with the following structure:

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: Date,
  read: Boolean
}
```

## Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Admin Key**: Use a strong, random admin key
3. **MongoDB**: Ensure your MongoDB instance is properly secured
4. **Rate Limiting**: Consider adding rate limiting to prevent spam
5. **Input Validation**: The form uses Zod for client and server-side validation

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Failed**
   - Check your connection string
   - Ensure MongoDB is running (for local installations)
   - Check network access (for Atlas)

2. **Email Not Sending**
   - Verify SMTP credentials
   - Check Gmail app password setup
   - Ensure SMTP_HOST and SMTP_PORT are correct

3. **Form Not Submitting**
   - Check browser console for errors
   - Verify API route is accessible
   - Check MongoDB connection

### Development Testing:

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000`
3. Scroll to the contact form
4. Submit a test message
5. Check your MongoDB database for the entry
6. If email is configured, check for notification emails

## Production Deployment

1. Set up your MongoDB Atlas cluster (if not already done)
2. Configure environment variables in your deployment platform
3. Ensure all required environment variables are set
4. Test the contact form after deployment

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # API route for contact form
│   ├── admin/
│   │   └── page.tsx             # Admin dashboard
│   └── page.tsx                 # Main page with contact form
└── components/
    └── contact/
        └── ContactForm.tsx      # Contact form component
```

## Support

If you encounter any issues with the contact form setup, please check:
1. Environment variables are correctly set
2. MongoDB connection is working
3. All dependencies are installed
4. Check the browser console and server logs for error messages
