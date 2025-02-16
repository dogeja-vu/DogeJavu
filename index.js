import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [news, setNews] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchNews() {
      const response = await fetch("https://api.publicapis.org/entries"); // Placeholder API for news
      const data = await response.json();
      setNews(data.entries.slice(0, 5)); // Example data fetch
    }
    fetchNews();
  }, []);

  useEffect(() => {
    async function fetchLeaderboard() {
      const response = await fetch("https://example.com/leaderboard-api"); // Placeholder API
      const data = await response.json();
      setLeaderboard(data.leaderboard);
    }
    fetchLeaderboard();
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">DogeJavu: Government Efficiency Tracker</h1>
      <p className="text-center mb-4">Tracking government waste and efficiency efforts in real-time.</p>
      
      <h2 className="text-2xl font-semibold mt-6">Latest Reports</h2>
      <div className="grid gap-4 mt-4">
        {news.length > 0 ? (
          news.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold">{item.API}</h3>
                <p>{item.Description}</p>
                <a
                  href={item.Link}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Read More
                </a>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>Loading updates...</p>
        )}
      </div>

      <h2 className="text-2xl font-semibold mt-6">Leaderboard: Most Efficient & Wasteful Agencies</h2>
      <div className="grid gap-4 mt-4">
        {leaderboard.length > 0 ? (
          leaderboard.map((agency, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold">{agency.name}</h3>
                <p>Efficiency Score: {agency.score}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>Loading leaderboard...</p>
        )}
      </div>

      <h2 className="text-2xl font-semibold mt-6">Report Government Waste</h2>
      <form onSubmit={handleSubmission} className="mt-4">
        <input
          type="text"
          name="report"
          placeholder="Describe the wasteful spending..."
          className="border p-2 w-full"
          required
        />
        <Button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md mt-2">
          Submit Report
        </Button>
      </form>

      <h2 className="text-2xl font-semibold mt-6">User Submissions</h2>
      <input
        type="text"
        placeholder="Search reports..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <div className="mt-4">
        {filteredSubmissions.length > 0 ? (
          filteredSubmissions.map((submission, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <p>{submission}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No reports match your search.</p>
        )}
      </div>

      <div className="text-center mt-6">
        <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">Subscribe for Updates</Button>
      </div>
    </div>
  );
}
