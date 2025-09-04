import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Shield } from "lucide-react";

interface HeaderProps {
  language: "en" | "hi";
  onLanguageChange: (lang: "en" | "hi") => void;
}

const Header = ({ language, onLanguageChange }: HeaderProps) => {
  const text = {
    en: {
      title: "InFinsafe",
      tagline: "Protect Yourself from Financial Fraud"
    },
    hi: {
      title: "इनफिनसेफ",
      tagline: "वित्तीय धोखाधड़ी से अपनी सुरक्षा करें"
    }
  };

  return (
   import React, { useState } from "react";
import { Shield, Globe } from "lucide-react";
import { Button } from "../components/ui/button";

interface HeaderProps {
  text: any;
  language: "en" | "hi";
  onLanguageChange: (lang: "en" | "hi") => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ text, language, onLanguageChange, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) {
      alert("Please enter a name, mobile number, or website.");
      return;
    }
    onSearch(query.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <header className="w-full py-4 px-4 bg-card shadow-soft sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-primary">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{text[language].title}</h1>
            <p className="text-sm text-muted-foreground hidden sm:block">{text[language].tagline}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 max-w-md mx-4">
          <input
            type="text"
            placeholder="Enter name, mobile number, or website"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow border border-gray-300 rounded-l-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-xl hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Language Switcher */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onLanguageChange(language === "en" ? "hi" : "en")}
          className="flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          {language === "en" ? "हिं" : "EN"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
