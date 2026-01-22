# TNBF Website - Quick Start Guide

## 🚀 Two Ways to Run the Application

---

## Option 1: Frontend Only (Recommended for Testing)

**No installation needed!** Just view the website:

### Windows:

```bash
# Open homepage in default browser
start e:\tnbf-website\pages\home\index.html
```

### Or manually:

1. Navigate to: `e:\tnbf-website\pages\home\`
2. Double-click `index.html`
3. Website opens in your browser!

**✅ Everything works except email submissions**

---

## Option 2: Full Application (With Backend)

### Step 1: View the Website

```bash
start e:\tnbf-website\pages\home\index.html
```

### Step 2: Configure Email (One-time setup)

1. Create `.env` file from template:

```bash
cd e:\tnbf-website\backend
copy .env.example .env
```

2. Edit `.env` file and add your Gmail App Password:
   - Go to https://myaccount.google.com/security
   - Enable 2-Factor Authentication
   - Create App Password (select "Mail")
   - Copy the 16-character password
   - Paste it in `.env` file

```
EMAIL_USER=tnbsns.finance@gmail.com
EMAIL_PASS=your-16-char-password-here
PORT=3000
```

### Step 3: Start Backend Server

```bash
cd e:\tnbf-website\backend
npm start
```

**Server runs on:** http://localhost:3000

---

## 📁 Current Status

✅ **Backend Dependencies Installed**\
✅ **Website Ready to View**\
⏳ **Email Configuration Needed** (optional)

---

## 🎯 What Works Now

### ✅ Fully Functional:

- All 9 website pages
- Navigation between pages
- Premium UI/UX (animations, gradients)
- Popup lead form (shows after 30 sec)
- Chatbot widget (click to open WhatsApp)
- Responsive design

### ⏳ Needs Backend (Optional):

- Email submissions from contact form
- Email confirmations to users
- Admin email notifications

---

## 📋 Testing Checklist

1. **Open Homepage:**
   ```bash
   start e:\tnbf-website\pages\home\index.html
   ```

2. **Navigate Pages:**
   - Click on navigation links
   - Check About, Loans, Eligibility, etc.

3. **Test Features:**
   - Wait 30 seconds → popup form appears
   - Click chatbot button (bottom-left)
   - Click "Apply Now" buttons

4. **Test Forms:**
   - Fill out contact form
   - (Email won't send without backend running)

---

## 🔧 Troubleshooting

### Website not loading?

- Make sure you're opening `index.html` files
- Try different browser (Chrome, Edge, Firefox)

### Popup not showing?

- Wait 30 seconds OR scroll down 50%
- Clear browser storage: F12 → Application → Clear Storage

### Backend not starting?

```bash
cd e:\tnbf-website\backend
npm install
node server.js
```

---

## 📞 Quick Commands

**View Website:**

```bash
start e:\tnbf-website\pages\home\index.html
```

**Start Backend:**

```bash
cd e:\tnbf-website\backend
npm start
```

**Stop Backend:** Press `Ctrl + C` in terminal

---

**Current Status:** ✅ Ready to view website!\
**Next Step:** Open homepage and explore! 🎉
