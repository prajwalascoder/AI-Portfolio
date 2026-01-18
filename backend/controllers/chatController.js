export const handleChat = async (req, res) => {
  res.status(200).json({
    reply:
      "👤 AI is currently offline.\n\n" +
      "This portfolio is designed to be AI-powered.\n" +
      "Live intelligent responses will be enabled soon.\n\n" +
      "For now, feel free to explore the UI and resume 🙂"
  });
};
