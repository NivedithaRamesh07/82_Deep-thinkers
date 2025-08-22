import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function AuditButton() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const runAudit = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: [url] }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Network response not ok: ${text}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Error running audit. See console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Input & Button */}
      <input
        type="text"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />
      <button
        onClick={runAudit}
        disabled={loading}
        style={{ padding: "10px 20px", marginLeft: "10px" }}
      >
        {loading ? "Running..." : "Run Audit"}
      </button>

      {/* Results Table */}
      {results.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h3>📊 Audit Results</h3>
          <table
            style={{
              margin: "0 auto",
              borderCollapse: "collapse",
              color: "white",
              width: "95%",
              backgroundColor: "#1a1a1a",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #333", padding: "10px" }}>URL</th>
                <th style={{ border: "1px solid #333", padding: "10px" }}>Performance</th>
                <th style={{ border: "1px solid #333", padding: "10px" }}>SEO</th>
                <th style={{ border: "1px solid #333", padding: "10px" }}>Accessibility</th>
                <th style={{ border: "1px solid #333", padding: "10px" }}>Best Practices</th>
                <th style={{ border: "1px solid #333", padding: "10px" }}>PWA</th>
                <th style={{ border: "1px solid #333", padding: "10px" }}>CLS</th>
                <th style={{ border: "1px solid #333", padding: "10px" }}>HTTPS</th>
                <th style={{ border: "1px solid #333", padding: "10px" }}>Security</th>
                <th style={{ border: "1px solid #333", padding: "10px" }}>Mixed Content</th>
                <th style={{ border: "1px solid #333", padding: "10px" }}>Unsafe Scripts</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, i) => (
                <tr key={i}>
                  <td style={{ border: "1px solid #333", padding: "10px" }}>{res.url}</td>
                  <td style={{ border: "1px solid #333", padding: "10px" }}>{res.performance}</td>
                  <td style={{ border: "1px solid #333", padding: "10px" }}>{res.seo}</td>
                  <td style={{ border: "1px solid #333", padding: "10px" }}>{res.accessibility}</td>
                  <td style={{ border: "1px solid #333", padding: "10px" }}>{res.bestPractices}</td>
                  <td style={{ border: "1px solid #333", padding: "10px" }}>{res.pwa}</td>
                  <td style={{ border: "1px solid #333", padding: "10px" }}>{res.cls}</td>
                  <td style={{ border: "1px solid #333", padding: "10px" }}>{res.https ? "Yes" : "No"}</td>
                  <td style={{ border: "1px solid #333", padding: "10px" }}>{res.security}</td>
                  <td style={{ border: "1px solid #333", padding: "10px" }}>{res.mixedContent}</td>
                  <td style={{ border: "1px solid #333", padding: "10px" }}>{res.unsafeScripts}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bar Chart */}
          <div style={{ marginTop: "30px" }}>
            <BarChart
              width={900}
              height={350}
              data={results}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="url" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="performance" fill="#8884d8" />
              <Bar dataKey="seo" fill="#82ca9d" />
              <Bar dataKey="accessibility" fill="#ffc658" />
              <Bar dataKey="bestPractices" fill="#ff7f50" />
              <Bar dataKey="pwa" fill="#00bfff" />
              <Bar dataKey="security" fill="#ff1493" />
            </BarChart>
          </div>
        </div>
      )}
    </div>
  );
}