import { useState } from "react";
import axios from "axios";
import {
  Globe,
  Activity,
  Clock,
  FileText,
  ImageIcon
} from "lucide-react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const auditPage = async () => {
    setLoading(true);
    setError("");
    setReport(null);

    try {
      const res = await axios.post("http://localhost:5000/api/audit", {
        url,
      });

      setReport(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🚀 Page Pulse</h1>
      <p>Website Audit Tool</p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={auditPage}>Audit</button>
      </div>

      {loading && <h3>Loading...</h3>}

      {error && <p className="error">{error}</p>}

      {report && (

        
        <div className="report">
          <h2>Audit Report</h2>

          <div className="card">
            <strong>
  <Globe size={18} /> URL:
</strong>

<strong>
  <Activity size={18} /> Status:
</strong>

<strong>
  <Clock size={18} /> Response Time:
</strong>

<strong>
  <FileText size={18} /> Title:
</strong>

<strong>
  <ImageIcon size={18} /> Images Missing Alt:
</strong>
            <p>{report.url}</p>
          </div>

         <div className="score-card">
  <h3>SEO Score</h3>

  <div 
    className={
      report.seoScore >= 80 
      ? "score good" 
      : report.seoScore >= 50 
      ? "score average" 
      : "score poor"
    }
  >
    {report.seoScore}/100
  </div>
</div>


          <div className="card">
            <strong>Status:</strong>
            <p>{report.status}</p>
          </div>

          <div className="card">
            <strong>Response Time:</strong>
            <p>{report.responseTime}</p>
          </div>

          <div className="card">
            <strong>Title:</strong>
            <p>{report.title}</p>
          </div>

          <div className="card">
            <strong>Meta Description:</strong>
            <p>{report.metaDescription}</p>
          </div>

          <div className="card">
            <strong>H1 Count:</strong>
            <p>{report.h1Count}</p>
          </div>

          <div className="card">
            <strong>Images Missing Alt:</strong>
            <p>{report.imagesMissingAltText}</p>
          </div>

          <div className="card">
            <strong>Approximate Word Count:</strong>
            <p>{report.approximateWordCount}</p>
          </div>
        </div>
      )}

      <footer>
  Built for{" "}
  <a
    href="https://digitalheroesco.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    Digital HeroesTraining Task
  </a>
</footer>
    </div>
  );
}

export default App;