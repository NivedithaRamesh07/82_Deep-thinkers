import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function AuditForm() {
  const [urls, setUrls] = useState([""]); // start with one URL
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addUrlInput = () => {
    setUrls([...urls, ""]);
  };

  const handleChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleSubmit = async () => {
    if (urls.some((url) => url.trim() === "")) {
      alert("Please fill all URL fields before running audit!");
      return;
    }

    setLoading(true);
    setResults([]);
    try {
      const response = await axios.post("http://localhost:5000/audit", { urls });
      setResults(response.data);
    } catch (error) {
      console.error("Audit failed:", error);
      alert("Error running audit. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {urls.map((url, i) => (
        <input
          key={i}
          type="text"
          value={url}
          onChange={(e) => handleChange(i, e.target.value)}
          placeholder={`Enter URL ${i + 1}`}
          className="url-input"
        />
      ))}

      <div className="button-group">
        <button className="btn" onClick={addUrlInput}>
          ➕ Add Another URL
        </button>
        <button className="btn run-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "🚀 Running..." : "🚀 Run Audit"}
        </button>
      </div>

      {results.length > 0 && (
        <div className="results-container">
          <h3>📊 Comparison Results</h3>
          <table className="results-table">
            <thead>
              <tr>
                <th>URL</th>
                <th>Performance</th>
                <th>SEO</th>
                <th>Accessibility</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, i) => (
                <tr key={i}>
                  <td>{res.url}</td>
                  <td>{res.performance}</td>
                  <td>{res.seo}</td>
                  <td>{res.accessibility}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <BarChart
            width={600}
            height={300}
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
          </BarChart>
        </div>
      )}
    </div>
  );
}

export default AuditForm;
