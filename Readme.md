# 🤖 AI Portfolio – Prajwal K M

An AI-powered personal portfolio that represents **me as a digital identity**.  
Instead of just listing projects and skills, this platform lets people **talk to my AI version** and ask anything about my life, journey, experience, values, and interests.

project combines **Full Stack Development + AI Integration + Personal Storytelling** into one interactive system.

---

## ✨ What Makes This Different?

Most portfolios answer:
> “What technologies do you know?”

This one answers:
> **“Who are you?”**

✔ Speaks in **first person** as me  
✔ Remembers my **education, internships, projects, family, interests, and values**  
✔ Can describe my **car, phone, creative interests, and ideology** when asked  
✔ Friendly, human, and expressive tone  
✔ Professional when used in recruiter context  
✔ Powered by AI but fully controlled by my own data  

---

## 🧠 How It Works

The system is built in three layers:

Frontend (React)
↓
Backend (Express API)
↓
AI Service (LLM + Personal Knowledge Base)


### 🔹 Frontend
- Clean, responsive UI
- Chat-based interface
- Users can ask:
  - “Tell me about your journey”
  - “Describe your projects”
  - “What are your beliefs?”
  - “What car do you drive?”
  - “Are you into video editing?”

### 🔹 Backend
- Express.js API
- Handles chat requests
- Connects frontend to AI service securely

### 🔹 AI Service
- Uses OpenAI API
- Injects my personal data into every prompt
- Responds in **first person**
- Never fabricates information

---

## 📂 Project Structure
ai-portfolio/
│
├── frontend/ # React UI
│
├── backend/ # Express API
│ ├── routes/
│ ├── controllers/
│ └── app.js
│
├── ai-service/ # AI Brain
│ ├── services/
│ │ ├── aiClient.js
│ │ └── contextBuilder.js
│ ├── data/ # Personal Knowledge Base
│ │ ├── profile.json
│ │ ├── education.json
│ │ ├── experience.json
│ │ ├── skills.json
│ │ ├── projects.json
│ │ ├── lifeStory.json
│ │ ├── personalLife.json
│ │ ├── ideology.json
│ │ └── socials.json
│ └── index.js
│
├── .env # API keys
└── README.md


---

## 🧬 Personal AI Memory

The AI is powered by structured JSON files that store:

### 👤 Profile
- Name: Prajwal K M  
- Role: Full Stack Developer  
- Interests: AI, Web Development, Video Editing, Cars, Politics, System Design  

### 🎓 Education
- **Bachelor of Computer Applications** – Completed  
- **Master of Computer Applications** – Pursuing (Expected: July 2026)

### 💼 Experience
- **Frontend Developer Intern – Scontinent Technologies**  
  → Learned React and frontend fundamentals  
- **Full Stack Developer Intern – Bizpel Connecting Dots Pvt. Ltd. (Current)**  
  → Working on frontend, backend, APIs, and databases  

### 🚀 Projects
#### 1️⃣ AI Portfolio Website
- Interactive portfolio where users can ask about my life, skills, values, and journey  
- Tech: React, Node.js, Express, OpenAI API  

#### 2️⃣ HiveFund – AI-Based Crowdfunding Platform
- Uses **AI, ML, and a weighted algorithm** to detect fraudulent campaigns  
- Provides **trust ratings** for admins and donors  
- Focused on transparency and safety in crowdfunding  

### 🛠 Skills
- **Frontend:** React, HTML, CSS, JavaScript  
- **Backend:** Node.js, Express  
- **Databases:** MongoDB, MySQL  
- **AI/ML:** AI integration, basic ML concepts  
- **Creative:** Video Editing, Visual Storytelling  
- **Tools:** Git, Postman, VS Code  

### ❤️ Personal Life & Interests
- Strong family influence focused on discipline and growth  
- Enthusiastic about technology and creativity  
- Interested in **video editing** and content creation  
- Uses **iPhone** (prefers clean design and polished systems)  
- Loves cars and owns a **Volkswagen Polo 2018**  
  → Sporty, well-engineered, practical, and reliable  

### 🌍 Ideology & Values
- Politically **left-leaning**  
- Supports:
  - Feminism & gender equality  
  - Science, evolution, and evidence-based thinking  
  - Human rights and dignity  
  - Socialist principles like fairness, welfare, and reducing inequality  
- Active on **X (Twitter)**, engaging in discussions on social issues and politics  

---

## 🗣 Example Questions It Can Answer

- “Tell me about your journey into tech.”  
- “Where did you learn React?”  
- “What are you doing at Bizpel?”  
- “What is HiveFund and how does it detect fraud?”  
- “Describe your car.”  
- “What phone do you use?”  
- “Are you into video editing?”  
- “What are your political beliefs?”  
- “Where can I find you on GitHub or LinkedIn?”  

---

## 🔒 Safety & Integrity

✔ Does **not** invent facts  
✔ Does **not** expose sensitive or private information  
✔ If something is not in the data, it responds with:  
**“I don’t have that information yet.”**  
✔ Personal, honest, and professional  

---

## ⚙ Setup & Run

### 1️⃣ Install Dependencies

cd frontend
npm install

cd ../backend
npm install

cd ../ai-service
npm install

OPENAI_API_KEY=your_api_key_here

2️⃣ Add Environment Variable
Create a .env file inside ai-service/:
OPENAI_API_KEY=your_api_key_here

3️⃣ Start Backend
cd backend
node app.js

4️⃣ Start Frontend
cd frontend
npm start

🚀 Why I Built This
I didn’t want my portfolio to just be a list of technologies.
I wanted it to reflect who I am:

My journey

My mindset

My values

My creativity

My approach to engineering

This project represents my belief that technology should be intelligent, personal, and meaningful.

👨‍💻 Author
Prajwal K M
Full Stack Developer | AI Enthusiast | Creative Technologist

⭐ Future Enhancements
Session-based memory (AI remembers previous questions in a chat)

Admin dashboard to update personal data without code

Multi-mode responses (Casual / Professional / Political / Story)

Deployment to cloud (Vercel + Render)

