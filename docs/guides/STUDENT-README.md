# 🎓 JURA-LM-APP für Studierende

**Willkommen zum JURA-LM-APP!** Hier ist eine einfache Anleitung, um das Projekt zu nutzen.

---

## ⚡ QUICKSTART (3 Minuten)

### **Option 1: Vorgefertigtes Paket (Easiest)**
```powershell
# 1. Download: jura-lm-app-1.0-portable.zip
# 2. Extract: Anywhere you want
# 3. Run: Double-click setup.bat
# 4. Answer 2 questions:
#    - Database? → Choose SQLite (default)
#    - API Key? → (optional, skip if you don't have)
# 5. Done! App launches automatically ✅
```

### **Option 2: Source Code (For Developers)**
```bash
# 1. git clone <repo-url>
# 2. cd jura-lm-app
# 3. mvn clean package -DskipTests
# 4. java -jar target/jura-lm-app-shaded.jar
```

---

## 📚 STUDENT GUIDES

### **Installation & Setup**
- **[INSTALLATION.md](docs/INSTALLATION.md)** – Step-by-step setup for Windows/Mac/Linux
- **[QUICK-REFERENCE.md](docs/QUICK-REFERENCE.md)** – One-page cheat sheet (30 seconds)
- **[FAQ.md](docs/FAQ.md)** – Common questions answered

### **Using the App**
- **[NAVIGATION-GUIDE.md](docs/NAVIGATION-GUIDE.md)** – How to use all features
- **[RUNTIME_PROFILE_SWITCHING.md](docs/RUNTIME_PROFILE_SWITCHING.md)** – Switch between DEMO/PROD modes
- **[ENV_SETUP.md](docs/ENV_SETUP.md)** – Environment configuration

### **Having Issues?**
- **[TROUBLESHOOTING.md](docs/TROUBLESHOOTING-GUIDE.md)** – Error solutions
- **[DIRECTORY-STRUCTURE.md](docs/DIRECTORY-STRUCTURE.md)** – Understanding the project layout

---

## 🎯 What is JURA-LM-APP?

**JURA-LM-APP** is an interactive legal learning platform for studying German law (BGB - Bürgerliches Gesetzbuch).

### Features:
- ✅ **Interactive Quizzes** – Test your knowledge
- ✅ **AI-Powered Feedback** – Get instant feedback (Perplexity API)
- ✅ **Gamification** – Earn points, streaks, and badges
- ✅ **Case Studies** – Learn through real-world scenarios
- ✅ **Multiple Difficulty Levels** – Beginner to Advanced

---

## 💻 System Requirements

| Requirement | Details |
|-------------|---------|
| **Java** | Java 21+ (included in portable package) |
| **Database** | SQLite (built-in, no setup) or PostgreSQL (optional) |
| **OS** | Windows, macOS, or Linux |
| **RAM** | Minimum 2GB (4GB recommended) |
| **Disk** | ~100MB free space |

---

## 🚀 Getting Started

### **Step 1: Installation**
Choose your method above and follow the installation guide.

### **Step 2: Launch the App**
The app opens automatically after installation. If not:
```powershell
# Windows
java -jar jura-lm-app.jar

# macOS/Linux
java -jar jura-lm-app.jar
```

### **Step 3: First Login**
- Create your profile
- Choose difficulty level (Beginner/Intermediate/Advanced)
- Start with DEMO mode to explore

### **Step 4: Learn & Practice**
- Complete quizzes
- Read explanations
- Track your progress
- Earn achievements

---

## 📊 Features Overview

### **Interactive Learning**
- 📝 **Quizzes** – Multi-choice and essay questions
- 💡 **AI Feedback** – Instant explanations for answers
- 📚 **Case Studies** – Real legal scenarios

### **Gamification System**
- 🔥 **Streaks** – Maintain daily learning momentum
- ⭐ **Points & XP** – Earn for correct answers
- 🏆 **Badges** – Unlock achievements
- 📈 **Leaderboard** – Compete with classmates

### **Flexible Study Modes**
- **DEMO Mode** – Practice with sample data
- **PROD Mode** – Official learning environment

---

## ⚙️ Configuration

### **Environment Variables** (Optional)
Create `.env` file in project root:
```bash
# Database
DB_TYPE=sqlite  # or postgresql
DB_NAME=jura-lm-app
DB_USER=your_user
DB_PASSWORD=your_password

# API
PERPLEXITY_API_KEY=your_api_key_here

# Application
APP_MODE=demo  # or prod
LOG_LEVEL=INFO  # DEBUG, INFO, WARN, ERROR
```

### **Profiles**
- **DEMO** – Built-in data, no database needed
- **PROD** – Real database, official environment

Switch profiles in the app GUI: **File → Select Profile**

---

## 🐛 Troubleshooting

### **Java not found?**
```powershell
# Check Java version
java -version

# If not installed, download from:
# https://www.oracle.com/java/technologies/downloads/#java21
```

### **Port already in use?**
The app uses port 8080 by default. If it's busy:
```powershell
# Close any other apps using port 8080
# Or modify: scripts/.env
```

### **Database connection failed?**
See **[TROUBLESHOOTING.md](docs/TROUBLESHOOTING-GUIDE.md)** for detailed solutions.

### **Still stuck?**
Check **[FAQ.md](docs/FAQ.md)** for common issues.

---

## 📞 Getting Help

1. **Check the docs** – All guides are in `/docs`
2. **Read FAQ.md** – Most common questions answered
3. **Review TROUBLESHOOTING.md** – Error solutions
4. **Contact instructor** – For course-specific questions

---

## 🎓 Academic Notes

This application is designed to help you:
- ✅ Understand German law (BGB) concepts
- ✅ Practice exam-style questions
- ✅ Get instant feedback on your answers
- ✅ Track your learning progress
- ✅ Compete with peers (gamification)

Use it regularly for best results!

---

## 📋 Documentation Index

### Quick Access
| Need | File | Time |
|------|------|------|
| **Quick overview** | [QUICK-REFERENCE.md](docs/QUICK-REFERENCE.md) | 1 min |
| **Installation** | [INSTALLATION.md](docs/INSTALLATION.md) | 10 min |
| **Common issues** | [FAQ.md](docs/FAQ.md) | 5 min |
| **Errors/Problems** | [TROUBLESHOOTING.md](docs/TROUBLESHOOTING-GUIDE.md) | varies |
| **How to use app** | [NAVIGATION-GUIDE.md](docs/NAVIGATION-GUIDE.md) | 10 min |
| **Project layout** | [DIRECTORY-STRUCTURE.md](docs/DIRECTORY-STRUCTURE.md) | 5 min |

---

## 🎉 You're Ready!

You now have everything needed to use JURA-LM-APP. 

**Next steps:**
1. Download the portable package OR clone the repo
2. Follow the installation guide
3. Launch the app
4. Start learning!

---

## 📝 License

This project is provided for educational purposes. See LICENSE file for details.

---

**Happy learning! 🚀**

For questions or issues, refer to the documentation in `/docs` or contact your instructor.

---

*Last Updated: December 9, 2025*  
*Version: 1.1.0*
