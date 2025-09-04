import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [results, setResults] = useState<any[]>([]);

  const performSearch = async (query: string) => {
    try {
      const res = await fetch(`https://api.example.com/search?q=${query}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      alert("Error fetching data.");
    }
  };

  return (
    <div className="p-4">
      <SearchBar onSearch={performSearch} />
      <div className="mt-4">
        {results.length === 0 ? (
          <p>No results found</p>
        ) : (
          results.map((item, index) => (
            <div key={index} className="border p-2 my-2 rounded">
              {item.name} - {item.mobile} - {item.website}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
