import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/audit", async (req, res) => {
  const { urls } = req.body;
  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: "URLs missing or invalid" });
  }

  try {
    // Generate dummy values for demo
    const results = urls.map((url) => ({
      url,
      performance: Math.floor(Math.random() * 100),
      seo: Math.floor(Math.random() * 100),
      accessibility: Math.floor(Math.random() * 100),
      bestPractices: Math.floor(Math.random() * 100),
      pwa: Math.floor(Math.random() * 100),
      cls: Math.random().toFixed(2),
      https: Math.random() > 0.1 ? "Yes" : "No",
    }));

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Audit failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
