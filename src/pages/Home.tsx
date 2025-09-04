import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

interface Result {
  name: string;
  mobile: string;
  website: string;
}

const Home = () => {
  const [results, setResults] = useState<Result[]>([]);

  // Example API call (replace with your real API endpoint)
  const performSearch = async (query: string) => {
    try {
      // Replace this fetch with your actual API
      const res = await fetch(`https://api.example.com/search?q=${query}`);
      const data = await res.json();

      // Example: ensure data.results exists
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      alert("Error fetching data.");
    }
  };

  return (
    <div className="p-4">
      <SearchBar onSearch={performSearch} />

      <div className="mt-6 max-w-3xl mx-auto">
        {results.length === 0 ? (
          <p className="text-center text-gray-500">No results found</p>
        ) : (
          results.map((item, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg mb-4 shadow-sm hover:shadow-md transition"
            >
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Mobile:</strong> {item.mobile}</p>
              <p><strong>Website:</strong> {item.website}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

