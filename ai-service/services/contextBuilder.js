import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

// Required for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always resolve from ai-service/services → ai-service/data
const DATA_PATH = path.resolve(__dirname, "../data");

export async function buildContext() {
  try {
    const profile = await fs.readJson(path.join(DATA_PATH, "profile.json"));
    const skills = await fs.readJson(path.join(DATA_PATH, "skills.json"));
    const projects = await fs.readJson(path.join(DATA_PATH, "projects.json"));
    const education = await fs.readJson(path.join(DATA_PATH, "education.json"));
    const experience = await fs.readJson(path.join(DATA_PATH, "experience.json"));
    const strengths = await fs.readJson(path.join(DATA_PATH, "strengths.json"));
    const goals = await fs.readJson(path.join(DATA_PATH, "goals.json"));
    const lifeStory = await fs.readJson(path.join(DATA_PATH, "lifeStory.json"));
    const personalLife = await fs.readJson(path.join(DATA_PATH, "personalLife.json"));
    const ideology = await fs.readJson(path.join(DATA_PATH, "ideology.json"));
    const socials = await fs.readJson(path.join(DATA_PATH, "socials.json"));

    return `
PROFILE:
${JSON.stringify(profile, null, 2)}

SKILLS:
${JSON.stringify(skills, null, 2)}

PROJECTS:
${JSON.stringify(projects, null, 2)}

EDUCATION:
${JSON.stringify(education, null, 2)}

EXPERIENCE:
${JSON.stringify(experience, null, 2)}

STRENGTHS:
${JSON.stringify(strengths, null, 2)}

GOALS:
${JSON.stringify(goals, null, 2)}

LIFE STORY:
${JSON.stringify(lifeStory, null, 2)}

PERSONAL LIFE:
${JSON.stringify(personalLife, null, 2)}

IDEOLOGY & VALUES:
${JSON.stringify(ideology, null, 2)}

SOCIALS:
${JSON.stringify(socials, null, 2)}
`;
  } catch (error) {
    console.error("❌ CONTEXT BUILDER ERROR:", error);
    throw error;
  }
}
