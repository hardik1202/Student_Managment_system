const express = require("express");

const router = express.Router();

async function generateWithOpenAI(title) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Write a short 2-sentence academic profile description for this student: ${title}`,
        },
      ],
    }),
  });
  if (!response.ok) throw new Error("OpenAI request failed");
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

async function generateWithGemini(title) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `Write a short 2-sentence academic profile description for this student: ${title}`,
            },
          ],
        },
      ],
    }),
  });
  if (!response.ok) throw new Error("Gemini request failed");
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

router.post("/generate-description", async (req, res) => {
  const title = `${req.body.name || "Student"} studying ${req.body.course || "their programme"}`;
  try {
    const description =
      (await generateWithOpenAI(title)) || (await generateWithGemini(title));
    if (!description) {
      return res.json({
        description: `${req.body.name || "This student"} is enrolled in ${req.body.course || "a CHARUSAT programme"} and is building practical skills through coursework and labs.`,
        fallback: true,
      });
    }
    res.json({ description, fallback: false });
  } catch (err) {
    res.status(200).json({
      description: "",
      fallback: true,
      error: "AI suggestion is unavailable. You can type a description manually.",
    });
  }
});

module.exports = router;
