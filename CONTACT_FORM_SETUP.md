# Contact Form Setup Instructions

Your contact form is now configured to work with **Formspree** - perfect for GitHub Pages hosting!

## Quick Setup (5 minutes):

### 1. Create Formspree Account
- Go to [formspree.io](https://formspree.io)
- Sign up with your email (free plan allows 50 submissions/month)

### 2. Create New Form
- Click "New Form"
- Name it "GERDSEN AI Contact Form"
- Enter your email address where you want to receive messages

### 3. Get Your Form ID
- After creating the form, you'll get a unique ID like `xzbqkyne`
- Copy this ID

### 4. Update the Code
- Open `assets/js/main.js`
- Find line with `'https://formspree.io/f/YOUR_FORM_ID'`
- Replace `YOUR_FORM_ID` with your actual form ID
- Example: `'https://formspree.io/f/xzbqkyne'`

### 5. Deploy to GitHub Pages
- Commit and push your changes
- Your contact form will now send real emails!

## What Works:
- Real email delivery to your inbox
- Spam protection included
- Works perfectly with GitHub Pages
- Mobile responsive
- Form validation

## Free Plan Includes:
- 50 submissions per month
- Email notifications
- Basic spam filtering
- Formspree branding (small)

## Upgrade Options:
- Gold Plan ($10/month): 1000 submissions, no branding
- Remove Formspree branding
- Advanced features

## Alternative Options:
If you prefer other solutions:
- **EmailJS**: Client-side email sending
- **Netlify Forms**: If you switch to Netlify hosting
- **Custom API**: If you want to build your own backend

## Testing:
1. Fill out the form on your site
2. Submit it
3. Check your email (including spam folder)
4. You should receive the form submission within seconds!

---

**Need help?** The form will show clear success/error messages to users, and all submissions will appear in your Formspree dashboard.
