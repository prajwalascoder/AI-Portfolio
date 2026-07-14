import fs from "fs";
import path from "path";

// ─────────────────────────────────────────────────────────────
//  Rule-Based "AI" Chat Engine — No API keys needed!
//  Uses keyword matching, fuzzy scoring, context awareness,
//  and varied response templates to feel natural.
// ─────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════
//  📋 PORTFOLIO DATA — Dynamically loaded from JSON files!
// ═══════════════════════════════════════════════════════════

const dataDir = path.resolve("../ai-service/data");

function loadJSON(filename) {
  try {
    const raw = fs.readFileSync(path.join(dataDir, filename), "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error loading ${filename}:`, err);
    return null;
  }
}

const getPortfolioData = () => {
  const profile = loadJSON("profile.json") || {};
  const skills = loadJSON("skills.json") || {};
  const projects = loadJSON("projects.json") || [];
  const socials = loadJSON("socials.json") || {};

  return {
    name: profile.name || "Prajwal K M",
    role: profile.role || "Backend Engineer",
    location: profile.location || "India",
    email: "prajwalkm2003@outlook.com",
    github: socials.github?.handle || "https://github.com/prajwalascoder",
    linkedin: socials.linkedin?.handle || "https://linkedin.com/in/prajwalkm",
    bio: profile.summary || "I'm Prajwal K M, a passionate developer.",

    skills: {
      cloud: skills.cloud || ["AWS", "Azure", "Google Cloud"],
      cicd: skills.devops || ["Docker", "Terraform", "GitHub Actions", "Jenkins"],
      tools: skills.tools || ["Git", "GitHub", "VS Code"],
      other: skills.familiarWith || ["System Design", "Scripting", "Monitoring"],
    },

    projects: Array.isArray(projects) ? projects : [],

    education: "Currently pursuing Master of Computer Applications.",
    interests: profile.interests || ["Backend Engineering", "DevOps", "Cloud Computing"],
    funFacts: [
      "I built this entire portfolio from scratch!",
      "I love automating things so I don't have to do them twice.",
      "I'm always up for a challenging infrastructure problem.",
      "I believe in learning by building real projects.",
    ],
  };
};

// ═══════════════════════════════════════════════════════════
//  🧠 KNOWLEDGE BASE — Pattern → Response mappings
// ═══════════════════════════════════════════════════════════

const getKnowledgeBase = () => {
  const PORTFOLIO = getPortfolioData();
  
  return [
  // ── About / Introduction ──
  {
    keywords: ["who", "about", "yourself", "introduce", "tell me about yourself", "background", "bio", "describe"],
    weight: 10,
    responses: [
      () => `👋 Hey! I'm ${PORTFOLIO.name}, a ${PORTFOLIO.role} based in ${PORTFOLIO.location}.\n\n${PORTFOLIO.bio}\n\nI specialize in building full-stack web apps using React, Node.js, and modern CSS. Feel free to ask me about my projects, skills, or how to get in touch!`,
      () => `Hi there! I'm ${PORTFOLIO.name} — a ${PORTFOLIO.role} who loves crafting beautiful, functional web experiences.\n\n${PORTFOLIO.bio}\n\nWant to know about my skills or see my projects? Just ask! 🚀`,
      () => `I'm ${PORTFOLIO.name}, a developer who's passionate about building things that live on the internet. ${PORTFOLIO.bio}\n\nAsk me about my tech stack, projects, or anything else!`,
    ],
  },

  // ── Name ──
  {
    keywords: ["name", "who are you", "what's your name", "your name"],
    weight: 12,
    responses: [
      () => `I'm ${PORTFOLIO.name}! 👋 A ${PORTFOLIO.role} based in ${PORTFOLIO.location}. Nice to meet you!`,
      () => `My name is ${PORTFOLIO.name} — I'm a ${PORTFOLIO.role}. What would you like to know about me?`,
    ],
  },

  // ── Skills ──
  {
    keywords: ["skills", "tech stack", "technologies", "what can you do", "capable", "proficient", "languages", "frameworks", "tools"],
    weight: 10,
    responses: [
      () => {
        const s = PORTFOLIO.skills;
        return `🧠 Here's my tech toolkit:\n\n**Cloud:** ${s.cloud.join(", ")}\n**CI/CD:** ${s.cicd.join(", ")}\n**Tools:** ${s.tools.join(", ")}\n**Other:** ${s.other.join(", ")}\n\nI'm always learning and adding new skills to this list!`;
      },
      () => {
        const s = PORTFOLIO.skills;
        return `💻 My skill set spans the DevOps spectrum:\n\n☁️ Cloud: ${s.cloud.join(" · ")}\n🚀 CI/CD: ${s.cicd.join(" · ")}\n🔧 Tools: ${s.tools.join(" · ")}\n🌟 Extras: ${s.other.join(" · ")}\n\nI love working on scalable infrastructure and automation.`;
      },
    ],
  },

  // ── DevOps / Cloud specific ──
  {
    keywords: ["devops", "cloud", "aws", "docker", "kubernetes", "ci/cd", "automation", "infrastructure", "terraform", "pipeline"],
    weight: 8,
    responses: [
      () => `⚙️ As a DevOps Engineer, I specialize in ${PORTFOLIO.skills.tools.join(", ")}. I focus on creating robust CI/CD pipelines, automating infrastructure with tools like Terraform, and scaling applications in the cloud.`,
      () => `My DevOps toolkit includes ${PORTFOLIO.skills.cloud.join(", ")} and ${PORTFOLIO.skills.cicd.join(", ")}. I believe in automating everything and building infrastructure that scales gracefully.`,
    ],
  },

  // ── Projects ──
  {
    keywords: ["projects", "work", "portfolio", "built", "created", "showcase", "examples", "what have you"],
    weight: 10,
    responses: [
      () => {
        const projectList = PORTFOLIO.projects
          .map((p) => `💼 **${p.title || p.name}**\n   ${p.description}\n   Tech: ${p.tech ? p.tech.join(", ") : ""}`)
          .join("\n\n");
        return `Here are some of my projects:\n\n${projectList}\n\nI'm always working on something new — stay tuned! 🚀`;
      },
      () => {
        const projectList = PORTFOLIO.projects
          .map((p) => `💼 **${p.title || p.name}** — ${p.description} [${p.tech ? p.tech.join(", ") : ""}]`)
          .join("\n\n");
        return `🔨 Here's what I've been building:\n\n${projectList}\n\nEach project taught me something new and pushed my skills forward.`;
      },
    ],
  },

  // ── Contact ──
  {
    keywords: ["contact", "email", "reach", "hire", "connect", "get in touch", "social", "linkedin", "github"],
    weight: 10,
    responses: [
      () => `📬 You can reach me through:\n\n📧 Email: ${PORTFOLIO.email}\n🐙 GitHub: ${PORTFOLIO.github}\n💼 LinkedIn: ${PORTFOLIO.linkedin}\n\nI'm always open to interesting conversations and opportunities!`,
      () => `Want to connect? Here's how:\n\n✉️ ${PORTFOLIO.email}\n🔗 GitHub: ${PORTFOLIO.github}\n🔗 LinkedIn: ${PORTFOLIO.linkedin}\n\nDon't hesitate to reach out — I'd love to hear from you!`,
    ],
  },

  // ── Resume / CV ──
  {
    keywords: ["resume", "cv", "download", "pdf", "curriculum"],
    weight: 10,
    responses: [
      () => `📄 You can view or download my resume by clicking the **Resume** button on the homepage, or directly at /resume.pdf. It has all the details about my experience, education, and skills!`,
      () => `My resume is available right on this site! Click the 📄 Resume card on the main page to view/download it as a PDF.`,
    ],
  },

  // ── Education ──
  {
    keywords: ["education", "study", "college", "university", "degree", "school", "qualification", "academic"],
    weight: 9,
    responses: [
      () => `🎓 ${PORTFOLIO.education}\n\nBut honestly, most of my practical skills come from building real projects, contributing to open source, and constantly learning new tech on my own.`,
      () => `📚 ${PORTFOLIO.education} I'm a strong believer that the best learning happens when you build things — and that's exactly what I do!`,
    ],
  },

  // ── Experience ──
  {
    keywords: ["experience", "work history", "job", "career", "professional", "worked at", "company"],
    weight: 9,
    responses: [
      () => `💼 I'm an emerging developer actively building my experience through real-world projects and continuous learning. My project portfolio demonstrates my ability to architect and ship full-stack applications.\n\nCheck out my resume for the full details! 📄`,
      () => `I'm building my career through hands-on project work and self-driven learning. Every project you see here is a testament to my dedication and growth as a developer. My resume has the complete picture!`,
    ],
  },

  // ── Location ──
  {
    keywords: ["where", "location", "based", "live", "from", "country", "city"],
    weight: 7,
    responses: [
      () => `📍 I'm based in ${PORTFOLIO.location}. I'm open to remote opportunities and collaborations from anywhere in the world!`,
      () => `I'm from ${PORTFOLIO.location}! 🌏 Happy to work remotely with teams across the globe.`,
    ],
  },

  // ── Interests / Hobbies ──
  {
    keywords: ["interests", "hobbies", "passion", "enjoy", "free time", "fun", "like to do"],
    weight: 7,
    responses: [
      () => `🌟 My interests include: ${PORTFOLIO.interests.join(", ")}.\n\nFun fact: ${PORTFOLIO.funFacts[Math.floor(Math.random() * PORTFOLIO.funFacts.length)]}`,
      () => `Outside of coding, I'm into ${PORTFOLIO.interests.join(", ")}. I believe staying curious is what makes a great developer!\n\n😄 ${PORTFOLIO.funFacts[Math.floor(Math.random() * PORTFOLIO.funFacts.length)]}`,
    ],
  },

  // ── Availability / Hiring ──
  {
    keywords: ["available", "hire", "freelance", "open to work", "hiring", "opportunities", "collaborate", "job"],
    weight: 9,
    responses: [
      () => `✅ Yes, I'm open to opportunities! Whether it's a full-time role, freelance project, or collaboration — I'd love to chat.\n\nReach out at ${PORTFOLIO.email} or connect on LinkedIn: ${PORTFOLIO.linkedin}`,
      () => `I'm actively looking for exciting opportunities! If you have something interesting in mind, let's talk.\n\n📧 ${PORTFOLIO.email}\n💼 ${PORTFOLIO.linkedin}`,
    ],
  },

  // ── This website / portfolio ──
  {
    keywords: ["this website", "this site", "this portfolio", "built with", "tech behind"],
    weight: 11,
    responses: [
      () => `🌐 This portfolio is built with:\n\n⚛️ **React** — for the interactive UI\n🎨 **Custom CSS** — glassmorphism, gradients, and animations\n🟢 **Node.js + Express** — backend API\n🧠 **Rule-based Engine** — the "AI" chatbot you're talking to right now!\n\nNo external AI APIs — just clever pattern matching and a well-structured knowledge base. Pretty cool, right? 😎`,
      () => `This site is my personal creation! Built with React on the frontend, Node.js/Express on the backend, and this chatbot runs on a custom rule-based engine — no OpenAI required! The design features glassmorphism, dynamic color trails, and smooth animations.`,
    ],
  },

  // ── Gratitude / Compliments ──
  {
    keywords: ["thanks", "thank you", "awesome", "great", "cool", "nice", "amazing", "love it", "impressive", "good job", "well done"],
    weight: 6,
    responses: [
      () => `Thank you so much! 😊 That means a lot. If you'd like to know more about anything, just ask!`,
      () => `Aww, thanks! 🙏 Glad you like it. Feel free to explore more — there's plenty to discover!`,
      () => `You're too kind! 😄 Happy to chat more — ask me anything about ${PORTFOLIO.name}'s work!`,
    ],
  },

  // ── Jokes / Fun ──
  {
    keywords: ["joke", "funny", "make me laugh", "humor"],
    weight: 5,
    responses: [
      () => `😄 Why do programmers prefer dark mode?\n\nBecause light attracts bugs! 🐛`,
      () => `😂 A SQL query walks into a bar, sees two tables, and asks...\n"Can I JOIN you?"`,
      () => `🤣 Why was the JavaScript developer sad?\n\nBecause he didn't Node how to Express himself!`,
      () => `😆 What's a developer's favorite tea?\n\nURL Grey! 🍵`,
    ],
  },
];
};


// ═══════════════════════════════════════════════════════════
//  🔍 MATCHING ENGINE
// ═══════════════════════════════════════════════════════════

/**
 * Normalize text: lowercase, remove punctuation, collapse whitespace
 */
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Simple word-level similarity (Jaccard-like)
 */
function wordOverlap(a, b) {
  const setA = new Set(a.split(" "));
  const setB = new Set(b.split(" "));
  let intersection = 0;
  for (const word of setA) {
    if (setB.has(word)) intersection++;
  }
  return intersection / Math.max(setA.size, 1);
}

/**
 * Score a user message against a knowledge entry
 */
function scoreEntry(normalizedMsg, entry) {
  let score = 0;

  for (const keyword of entry.keywords) {
    const normalizedKeyword = normalize(keyword);
    
    // Create a regex to match the keyword exactly as a whole word/phrase
    const regex = new RegExp(`\\b${normalizedKeyword}\\b`, 'i');
    
    if (regex.test(normalizedMsg)) {
      score += entry.weight;
    }
  }

  return score;
}

/**
 * Detect greetings
 */
function isGreeting(msg) {
  const greetings = ["hi", "hello", "hey", "howdy", "yo", "sup", "hola", "greetings", "good morning", "good afternoon", "good evening", "whats up", "what s up"];
  return greetings.some((g) => msg === g || msg.startsWith(g + " ") || msg.endsWith(" " + g));
}

/**
 * Detect help / meta questions
 */
function isHelpQuestion(msg) {
  const helpPhrases = ["what can i ask", "what do you know", "help", "what can you do", "how does this work", "what should i ask", "menu", "options"];
  return helpPhrases.some((h) => msg.includes(h));
}


// ═══════════════════════════════════════════════════════════
//  💬 MAIN HANDLER
// ═══════════════════════════════════════════════════════════

export const handleChat = async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ reply: "Please type a message so I can help you! 😊" });
  }

  const normalizedMsg = normalize(message);

  // ── Greeting detection ──
  if (isGreeting(normalizedMsg)) {
    const PORTFOLIO = getPortfolioData();
    const greetingResponses = [
      `Hey there! 👋 I'm ${PORTFOLIO.name}'s portfolio assistant. Ask me about skills, projects, experience, or anything else!`,
      `Hello! 😊 Welcome to ${PORTFOLIO.name}'s portfolio. I can tell you about projects, skills, contact info, and more. What interests you?`,
      `Hi! 🚀 Great to have you here. Try asking about my projects, tech stack, or how to get in touch!`,
      `Hey! 👋 I'm here to help you learn about ${PORTFOLIO.name}. You can ask about:\n\n• 👤 About me\n• 🧠 Skills & tech stack\n• 💼 Projects\n• 📬 Contact info\n• 📄 Resume\n\nWhat would you like to know?`,
    ];
    const reply = greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    return res.status(200).json({ reply });
  }

  // ── Help / Meta ──
  if (isHelpQuestion(normalizedMsg)) {
    const PORTFOLIO = getPortfolioData();
    return res.status(200).json({
      reply: `🤖 I'm ${PORTFOLIO.name}'s portfolio assistant! Here's what I can help with:\n\n👤 **About** — Who is Prajwal?\n🧠 **Skills** — Tech stack & expertise\n💼 **Projects** — What I've built\n📬 **Contact** — How to reach me\n📄 **Resume** — View/download my CV\n🎓 **Education** — Academic background\n🌍 **Location** — Where I'm based\n💡 **Interests** — What I'm passionate about\n✅ **Hiring** — Am I available?\n😄 **Fun** — Tell me a joke!\n\nJust type a question naturally — I'll understand!`,
    });
  }

  const knowledgeBase = getKnowledgeBase();

  // ── Score all knowledge entries ──
  const scored = knowledgeBase.map((entry, idx) => ({
    idx,
    score: scoreEntry(normalizedMsg, entry),
    entry,
  }));

  scored.sort((a, b) => b.score - a.score);

  const bestMatch = scored[0];

  // ── Threshold check ──
  if (bestMatch.score > 0) {
    const responses = bestMatch.entry.responses;
    const reply = responses[Math.floor(Math.random() * responses.length)]();
    return res.status(200).json({ reply });
  }

  // ── Fallback: no good match ──
  const PORTFOLIO = getPortfolioData();
  const fallbacks = [
    `🤔 Hmm, I'm not sure about that one. Try asking about ${PORTFOLIO.name}'s skills, projects, experience, or contact info!`,
    `I don't quite have the answer to that, but I can tell you about:\n\n• 👤 Who I am\n• 🧠 My skills\n• 💼 My projects\n• 📬 How to contact me\n\nGive it a try!`,
    `That's a great question, but it's outside my knowledge base. 😅 I'm best at answering questions about ${PORTFOLIO.name}'s portfolio, skills, and work!`,
    `I'm still learning! For now, try questions like "What are your skills?" or "Tell me about your projects" — I'm great at those! 😊`,
  ];

  const reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  return res.status(200).json({ reply });
};
