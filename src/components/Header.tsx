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
    <header className="w-full py-4 px-4 bg-card shadow-soft sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-primary">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{text[language].title}</h1>
            <p className="text-sm text-muted-foreground hidden sm:block">{text[language].tagline}</p>
          </div>
        </div>

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