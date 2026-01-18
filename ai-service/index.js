import mockAI from "./services/mockAI.js";
// import askOpenAI from "./services/aiClient.js"; // 🔮 future

const AI_MODE = "MOCK"; // change to "OPENAI" later

export async function askAI(question) {
  if (AI_MODE === "MOCK") {
    return mockAI(question);
  }

  // 🔮 Future use
  // return askOpenAI(question);
}
