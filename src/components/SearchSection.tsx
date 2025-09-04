import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Shield, TrendingUp, Award } from "lucide-react";
import heroImage from "@/assets/hero-security.jpg";

interface SearchSectionProps {
  language: "en" | "hi";
  onSearch: (query: string) => void;
}

const SearchSection = ({ language, onSearch }: SearchSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const text = {
    en: {
      title: "Check Financial Advisors & Websites",
      subtitle: "Enter advisor name, phone number, or website URL to check fraud risk",
      placeholder: "Enter advisor name, phone, or website...",
      searchBtn: "Check Now",
      features: [
        { icon: Shield, title: "Instant Fraud Score", desc: "Get immediate risk assessment" },
        { icon: TrendingUp, title: "Real-time Data", desc: "Updated fraud database" },
        { icon: Award, title: "Earn Points", desc: "Get rewarded for checking" }
      ]
    },
    hi: {
      title: "वित्तीय सलाहकार और वेबसाइट जांचें",
      subtitle: "धोखाधड़ी के जोखिम की जांच के लिए सलाहकार का नाम, फोन नंबर या वेबसाइट URL दर्ज करें",
      placeholder: "सलाहकार का नाम, फोन या वेबसाइट दर्ज करें...",
      searchBtn: "अभी जांचें",
      features: [
        { icon: Shield, title: "तत्काल धोखाधड़ी स्कोर", desc: "तुरंत जोखिम मूल्यांकन प्राप्त करें" },
        { icon: TrendingUp, title: "रियल-टाइम डेटा", desc: "अद्यतन धोखाधड़ी डेटाबेस" },
        { icon: Award, title: "अंक अर्जित करें", desc: "जांच के लिए पुरस्कृत हों" }
      ]
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <section className="relative">
      {/* Hero Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Security Protection"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {text[language].title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {text[language].subtitle}
          </p>
        </div>

        {/* Search Form */}
        <Card className="p-6 mb-12 shadow-card backdrop-blur-sm bg-card/95">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={text[language].placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12 text-lg"
              />
            </div>
            <Button 
              type="submit" 
              variant="hero"
              size="lg"
              className="h-12 px-8 gradient-primary text-primary-foreground font-semibold shadow-glow transition-smooth hover:scale-105"
            >
              {text[language].searchBtn}
            </Button>
          </form>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          {text[language].features.map((feature, index) => (
            <Card key={index} className="p-6 text-center shadow-card hover:shadow-glow transition-smooth">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl gradient-accent text-accent-foreground mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;