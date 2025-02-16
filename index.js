import { useEffect, useState } from "react";

export default function Home() {
  const [news, setNews] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("https://api.publicapis.org/entries"); // Placeholder API for news
        const data = await response.json();
        setNews(data.entries.slice(0, 5)); // Example data fetch
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }
    fetchNews();
  }, []);

  function handleSubmission(event) {
    event.preventDefault();
    const report = event.target.elements.report.value;
    setSubmissions([...submissions, report]);
    event.target.reset();
  }

  const filteredSubmissions = submissions.filter(submission =>
    submission.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>
        DogeJavu: Government Efficiency Tracker
      </h1>
      <p style={{ textAlign: "center" }}>
        Tracking government waste and efficiency efforts in real-time.
      </p>

      <h2>Latest Reports</h2>
      <div>
        {news.length > 0 ? (
          news.map((item, index) => (
            <div key={index} style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "10px" }}>
              <h3>{item.API}</h3>
              <p>{item.Description}</p>
              <a href={item.Link} target="_blank" rel="noopener noreferrer">Read More</a>
            </div>
          ))
        ) : (
          <p>Loading updates...</p>
        )}
      </div>

      <h2>Leaderboard: Most Efficient & Wasteful Agencies</h2>
      <div>
        {leaderboard.length > 0 ? (
          leaderboard.map((agency, index) => (
            <div key={index} style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "10px" }}>
              <h3>{agency.name}</h3>
              <p>Efficiency Score: {agency.score}</p>
            </div>
          ))
        ) : (
          <p>No leaderboard data available.</p>
        )}
      </div>

      <h2>Report Government Waste</h2>
      <form onSubmit={handleSubmission}>
        <input type="text" name="report" placeholder="Describe the wasteful spending..." required style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
        <button type="submit" style={{ padding: "10px 15px", background: "red", color: "white", border: "none", cursor: "pointer" }}>Submit Report</button>
      </form>

      <h2>User Submissions</h2>
      <input type="text" placeholder="Search reports..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
      <div>
        {filteredSubmissions.length > 0 ? (
          filteredSubmissions.map((submission, index) => (
            <div key={index} style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "10px" }}>
              <p>{submission}</p>
            </div>
          ))
        ) : (
          <p>No reports match your search.</p>
        )}
      </div>
    </div>
  );
}

    </div>
  );
}
