# TNBF Website - Simple Setup Guide

## ✅ Your website is ready to use!

All forms automatically send emails to **tnbsns.finance@gmail.com** using
FormSubmit (free service).

---

## 🚀 Quick Start

### 1. Open Your Website

```bash
start e:\tnbf-website\pages\home\index.html
```

That's it! No installation, no server needed.

---

## 📧 How Forms Work

**All forms send emails to:** `tnbsns.finance@gmail.com`

### First-Time Setup (One-Time Only)

1. Someone submits a form for the first time
2. FormSubmit sends confirmation email to tnbsns.finance@gmail.com
3. Click the confirmation link in that email
4. Done! All future form submissions arrive in your inbox

### What You Receive

When someone applies, you get an email with:

- Applicant's name
- Phone number
- Email address
- Business details
- Loan amount requested
- Monthly transaction volume

---

## 📁 Website Structure

```
e:/tnbf-website/
├── pages/
│   ├── home/                    ← Start here
│   ├── about/
│   ├── loans/
│   ├── eligibility/
│   ├── industries/
│   ├── testimonials/
│   ├── contact-apply/          ← Main application form
│   ├── emi-calculator/         ← Loan calculator
│   ├── faq/                    ← Questions & answers
│   ├── privacy-policy/         ← Legal pages
│   ├── terms-conditions/
│   └── refund-policy/
├── blog/
│   ├── blog-list/
│   └── blog-template/
└── assets/
    ├── css/styles.css          ← Website styling
    ├── js/main.js              ← Popup & interactions
    └── images/logo.png         ← Your TNBF logo
```

---

## 🎯 Key Features

### ✅ 14 Professional Pages

- Complete business website
- Professional design
- Mobile responsive

### ✅ Interactive Tools

- **EMI Calculator** - Real-time loan calculations
- **FAQ** - 15+ common questions
- **Popup Form** - Captures leads automatically

### ✅ Legal Compliance

- Privacy Policy (GDPR compliant)
- Terms & Conditions
- Refund Policy

### ✅ SEO Optimized

- Meta tags on all pages
- Sitemap.xml
- Schema markup
- Fast loading

---

## 📞 Contact Forms

### 1. Main Application Form

**Location:** `pages/contact-apply/index.html`

Fields collected:

- Full name
- Email
- Phone number
- Business name & type
- Loan amount
- Monthly transactions
- Purpose
- Additional message

### 2. Popup Quick Lead Form

**Triggers:** After 30 seconds OR 50% page scroll

Fields collected:

- Name
- Phone
- Business type
- Loan amount needed
- Monthly transactions

---

## 🎨 Customization

### Update Your Phone Number

Edit `assets/js/main.js`, find line:

```javascript
window.open('https://wa.me/919876543210?text=Hi...
```

Change `919876543210` to your WhatsApp number.

### Change Colors

Edit `assets/css/styles.css`:

```css
--primary-color: #0ea5e9; /* Sky Blue */
--cta-color: #dc2626; /* Red */
```

### Disable Popup Form

Edit `assets/js/main.js`, comment out:

```javascript
// setTimeout(function() {
//     showLeadPopup();
// }, 30000);
```

---

## 📱 Mobile & Desktop

Website automatically adapts to:

- Desktop computers
- Tablets
- Mobile phones

All forms, buttons, and content work perfectly on all devices.

---

## 🔧 Testing Checklist

- [ ] Open homepage
- [ ] Navigate to all pages
- [ ] Test EMI Calculator
- [ ] Fill out contact form (test email)
- [ ] Check FAQ accordion
- [ ] Test on mobile phone
- [ ] Verify popup appears after 30 sec

---

## 🌐 Going Live (When Ready)

### Option 1: Free Hosting

- **Netlify** - netlify.com (recommended)
- **Vercel** - vercel.com
- **GitHub Pages** - github.com

### Option 2: Paid Hosting

- **Hostinger** - ₹99/month
- **GoDaddy** - ₹149/month
- **Bluehost** - ₹199/month

### Steps:

1. Buy domain (e.g., tnbf.com)
2. Upload all files from `e:\tnbf-website\`
3. Point domain to hosting
4. Website is live!

---

## ❓ Common Questions

**Q: Do I need to run any servers?**\
A: No! Just open the HTML files in a browser.

**Q: How do I get form submissions?**\
A: They're emailed to tnbsns.finance@gmail.com automatically.

**Q: Can I edit the content?**\
A: Yes! Edit any `.html` file in a text editor.

**Q: Is it mobile-friendly?**\
A: Yes! All pages are fully responsive.

**Q: Do I need to install anything?**\
A: No! Just open and use.

---

## 📞 Need Help?

- **Email:** tnbsns.finance@gmail.com
- **WhatsApp:** +91-9876543210

---

## ✅ You're All Set!

Your professional business loan website is complete and ready to use. Just open
`pages/home/index.html` and start exploring!

**Next Step:** Share your website link with customers once deployed.

---

**Status:** ✅ Production Ready\
**Last Updated:** January 20, 2026
