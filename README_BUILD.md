# ♟️ Chess Master - Build Instructions for Local Machine

## 📋 Prerequisites

Before you start, install these on your computer:

### **1. Node.js & npm**
- Download from: https://nodejs.org/
- Version: 18.x or higher
- Verify: `node --version` and `npm --version`

### **2. Git**
- Download from: https://git-scm.com/
- Verify: `git --version`

### **3. Expo CLI**
```bash
npm install -g expo-cli eas-cli
```

### **4. Create Expo Account**
- Visit: https://expo.dev/signup
- Sign up (free)
- Verify your email

---

## 🚀 Building Your Android APK

### **Step 1: Clone or Download This Project**

**Option A: If you have git access:**
```bash
git clone [YOUR_GIT_REPO_URL]
cd chess-master
```

**Option B: If you downloaded ZIP:**
```bash
# Extract the ZIP file
cd chess-master
```

---

### **Step 2: Install Dependencies**

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install
# or
yarn install
```

**This will install:**
- React Native
- Expo
- Chess.js
- All required packages

---

### **Step 3: Configure Environment**

The `.env` file is already configured, but verify it exists:

```bash
# Check frontend/.env
cat .env
```

Should contain:
```
EXPO_PUBLIC_BACKEND_URL=https://your-backend-url.com
```

---

### **Step 4: Login to Expo**

```bash
npx eas-cli login
```

Enter your Expo credentials when prompted.

---

### **Step 5: Build Android APK**

```bash
npx eas-cli build --platform android --profile preview
```

**What happens:**
1. ✅ Code is uploaded to Expo servers
2. ✅ APK is built in the cloud (15-20 minutes)
3. ✅ You get a download link

**Output will look like:**
```
✔ Logged in as your-email@example.com
✔ Project: chess-master
✔ Build started!

View build: https://expo.dev/accounts/username/builds/build-id

⏱️  Estimated time: 15 minutes
```

---

### **Step 6: Download APK**

When build completes:

1. Click the link shown in terminal
2. OR visit: https://expo.dev
3. Go to your project
4. Click "Builds"
5. Download the APK file

---

### **Step 7: Install on Android Phone**

1. Transfer APK to your phone (via USB, Google Drive, email)
2. On phone: Enable "Install from unknown sources"
   - Settings → Security → Unknown Sources → Enable
3. Tap the APK file
4. Install
5. Open Chess Master app!

---

## 🔧 Alternative: Local Build (Advanced)

If you want to build the APK directly on your machine:

### **Requirements:**
- Android Studio installed
- Android SDK configured
- Java JDK 11 or higher

### **Commands:**
```bash
cd frontend

# Install Android build tools
npm install -g @expo/ngrok

# Build locally
npx eas-cli build --platform android --profile preview --local
```

---

## 🎯 Quick Commands Reference

```bash
# Install dependencies
cd frontend && npm install

# Login to Expo
npx eas-cli login

# Build Android APK (cloud)
npx eas-cli build -p android --profile preview

# Check build status
npx eas-cli build:list

# Run in development mode
npm start
```

---

## 📱 Testing Before Build

Want to test first? Use Expo Go:

```bash
cd frontend
npm start
```

Then scan QR code with Expo Go app on your phone.

---

## 🐛 Troubleshooting

### **"Command not found: eas-cli"**
```bash
npm install -g eas-cli
```

### **"Not logged in"**
```bash
npx eas-cli login
```

### **"Build failed"**
- Check internet connection
- Verify Expo account is active
- Check build logs at expo.dev
- Try building again

### **"Dependencies error"**
```bash
cd frontend
rm -rf node_modules
npm install
```

---

## 📂 Project Structure

```
chess-master/
├── frontend/               # React Native Expo app
│   ├── app/               # App screens (routes)
│   ├── components/        # Chess components
│   ├── contexts/          # Auth context
│   ├── utils/             # Chess AI engine
│   ├── package.json       # Dependencies
│   ├── app.json          # Expo config
│   └── eas.json          # Build config
├── backend/               # FastAPI backend
│   ├── server.py         # Main server
│   ├── auth.py           # Authentication
│   └── models.py         # Data models
└── README_BUILD.md        # This file
```

---

## 🎉 What You Get

After successful build:

- ✅ **Standalone APK** (works without Expo Go)
- ✅ **~50-80 MB** file size
- ✅ **Works on any Android device** (Android 6.0+)
- ✅ **Can share** with friends/testers
- ✅ **Ready for Play Store** (use production profile)

---

## 🚀 Next Steps After Build

1. **Test thoroughly** on your phone
2. **Share APK** with beta testers
3. **Get feedback** and iterate
4. **Build production version** for Play Store:
   ```bash
   npx eas-cli build -p android --profile production
   ```

---

## 📞 Support

- Expo Docs: https://docs.expo.dev/
- EAS Build Docs: https://docs.expo.dev/build/introduction/
- Expo Forums: https://forums.expo.dev/

---

## ⚡ Quick Start (TL;DR)

```bash
# 1. Install dependencies
cd frontend && npm install

# 2. Login
npx eas-cli login

# 3. Build
npx eas-cli build -p android --profile preview

# 4. Download APK from link provided

# 5. Install on phone and test!
```

---

**Built with ❤️ using Expo & React Native**
