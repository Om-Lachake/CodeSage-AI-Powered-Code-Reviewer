const generateContent = require("../services/ai.services");

module.exports.getReview = async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).send("Prompt is required");
  }

  try {
    const response = await generateContent(code);
    res.send(response);
  } catch (error) {
    res.status(500).send("AI Service Error: " + error.message);
  }
};
