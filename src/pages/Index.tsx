import { useState } from "react";
import Header from "@/components/Header";
import SearchSection from "@/components/SearchSection";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [language, setLanguage] = useState<"en" | "hi">("en");

  const handleSearch = (query: string) => {
    // For demo purposes, we'll just show an alert
    // In a real app, this would navigate to results or update state
    console.log("Searching for:", query);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main>
        <SearchSection language={language} onSearch={handleSearch} />
        <Dashboard language={language} />
      </main>
    </div>
  );
};

export default Index;
