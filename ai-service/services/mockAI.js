import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Required for ESM path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load JSON safely
function loadJSON(file) {
  const filePath = path.join(__dirname, "../data", file);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// Load data
const profile = loadJSON("profile.json");
const education = loadJSON("education.json");
const experience = loadJSON("experience.json");
const projects = loadJSON("projects.json");
const skills = loadJSON("skills.json");
const strengths = loadJSON("strengths.json");
const ideology = loadJSON("ideology.json");
const goals = loadJSON("goals.json");
const lifeStory = loadJSON("lifeStory.json");
const personalLife = loadJSON("personalLife.json");
const socials = loadJSON("socials.json");

/* Utility: safely stringify objects */
const stringify = (obj) =>
  typeof obj === "string"
    ? obj
    : JSON.stringify(obj, null, 2);

/* 🧠 Main brain */
export default function mockAI(question = "") {
  const q = question.toLowerCase();

  let response = "";

  /* ===================== ABOUT ME (FULL STORY) ===================== */
  if (
    q.includes("about") ||
    q.includes("yourself") ||
    q.includes("who are you") ||
    q.includes("tell me about you")
  ) {
    response += `👋 ${profile.name || ""}\n\n`;

    response += `${stringify(profile)}\n\n`;
    response += `${stringify(education)}\n\n`;
    response += `${stringify(experience)}\n\n`;
    response += `${stringify(skills)}\n\n`;
    response += `${stringify(strengths)}\n\n`;
    response += `${stringify(goals)}\n\n`;

    return response.trim();
  }

  /* ===================== PROJECTS ===================== */
  if (q.includes("project") || q.includes("built") || q.includes("hivefund")) {
    return stringify(projects);
  }

  /* ===================== SKILLS ===================== */
  if (q.includes("skill") || q.includes("tech") || q.includes("stack")) {
    return stringify(skills);
  }

  /* ===================== EXPERIENCE ===================== */
  if (
    q.includes("experience") ||
    q.includes("intern") ||
    q.includes("work")
  ) {
    return stringify(experience);
  }

  /* ===================== EDUCATION ===================== */
  if (
    q.includes("education") ||
    q.includes("college") ||
    q.includes("degree")
  ) {
    return stringify(education);
  }

  /* ===================== PERSONAL LIFE ===================== */
  if (
    q.includes("family") ||
    q.includes("personal") ||
    q.includes("life") ||
    q.includes("car") ||
    q.includes("polo") ||
    q.includes("phone")
  ) {
    return stringify(personalLife);
  }

  /* ===================== IDEOLOGY ===================== */
  if (
    q.includes("politics") ||
    q.includes("ideology") ||
    q.includes("left") ||
    q.includes("feminism")
  ) {
    return stringify(ideology);
  }

  /* ===================== GOALS ===================== */
  if (
    q.includes("goal") ||
    q.includes("future") ||
    q.includes("plan")
  ) {
    return stringify(goals);
  }

  /* ===================== CONTACT ===================== */
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("social") ||
    q.includes("linkedin") ||
    q.includes("github") ||
    q.includes("x")
  ) {
    return stringify(socials);
  }

  /* ===================== FALLBACK ===================== */
  return (
    "⚙️ AI brain still connecting dots...\n\n" +
    "You can ask about:\n" +
    "- my background\n" +
    "- projects\n" +
    "- skills\n" +
    "- education\n" +
    "- ideology\n" +
    "- personal life\n\n" +
    "Basically… my whole life story 😄"
  );
}












