import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/audit", async (req, res) => {
  const { urls } = req.body;
  if (!urls || urls.length === 0) return res.status(400).json({ error: "No URLs provided" });

  const results = [];

  for (let url of urls) {
    try {
      const performance = Math.floor(Math.random() * 100);
      const seo = Math.floor(Math.random() * 100);
      const accessibility = Math.floor(Math.random() * 100);
      const bestPractices = Math.floor(Math.random() * 100);
      const pwa = Math.floor(Math.random() * 100);
      const cls = +(Math.random() * 0.25).toFixed(2);
      const https = Math.random() > 0.1;

      // Add security-related fields
      const security = Math.floor(Math.random() * 100);
      const mixedContent = Math.random() > 0.7 ? "Yes" : "No";
      const unsafeScripts = Math.random() > 0.8 ? "Yes" : "No";

      results.push({
        url,
        performance,
        seo,
        accessibility,
        bestPractices,
        pwa,
        cls,
        https,
        security,
        mixedContent,
        unsafeScripts
      });
    } catch (err) {
      results.push({ url, error: "Failed to audit" });
    }
  }

  res.json(results);
});

app.listen(5000, () => console.log("Backend running on port 5000"));
