import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, User, Phone, MapPin, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CheckAdvisorProps {
  language: "en" | "hi";
}

const CheckAdvisor = ({ language }: CheckAdvisorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const text = {
    en: {
      title: "Check Financial Advisor",
      subtitle: "Verify the credibility and fraud risk of financial advisors",
      placeholder: "Enter advisor name or phone number",
      searchBtn: "Check Advisor",
      noResults: "No advisor found with this name or phone number",
      fraudScore: "Fraud Score",
      safeScore: "SAFE",
      mediumScore: "MEDIUM RISK", 
      highScore: "HIGH RISK",
      details: "Advisor Details",
      suspiciousKeywords: "Suspicious Keywords Found",
      recentChecks: "Recent Checks"
    },
    hi: {
      title: "वित्तीय सलाहकार जांचें",
      subtitle: "वित्तीय सलाहकारों की विश्वसनीयता और धोखाधड़ी के जोखिम की पुष्टि करें",
      placeholder: "सलाहकार का नाम या फोन नंबर दर्ज करें",
      searchBtn: "सलाहकार जांचें",
      noResults: "इस नाम या फोन नंबर के साथ कोई सलाहकार नहीं मिला",
      fraudScore: "धोखाधड़ी स्कोर",
      safeScore: "सुरक्षित",
      mediumScore: "मध्यम जोखिम",
      highScore: "उच्च जोखिम",
      details: "सलाहकार विवरण", 
      suspiciousKeywords: "संदिग्ध कीवर्ड मिले",
      recentChecks: "हाल की जांच"
    }
  };

  // Actual data
  const advisorDatabase = [
    {
      name: "John Doe",
      reg_number: "AD12345",
      verified: false,
      description: "Guaranteed returns monthly!"
    },
    {
      name: "Jane Smith",
      reg_number: "AD67890", 
      verified: true,
      description: "Registered SEBI advisor with transparent records."
    }
  ];

  const scamKeywords = {
    high_risk: [
      "guaranteed returns",
      "no risk",
      "get rich quick"
    ],
    medium_risk: [
      "premium membership",
      "hidden strategy"
    ],
    safe_words: [
      "registered",
      "SEBI",
      "transparent"
    ]
  };

  const mockResults = {
    "John Doe": {
      name: "John Doe",
      phone: "+91-9876543210",
      location: "Mumbai, Maharashtra",
      fraudScore: 25, // Based on new scoring
      suspiciousKeywords: ["guaranteed returns"],
      verified: false,
      lastChecked: "Just now"
    },
    "Jane Smith": {
      name: "Jane Smith", 
      phone: "+91-8765432109",
      location: "Delhi",
      fraudScore: 85,
      suspiciousKeywords: [],
      verified: true,
      lastChecked: "Just now"
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = mockResults[searchQuery as keyof typeof mockResults];
      setResults(result || null);
      setIsLoading(false);
      
      // Show gamification toast if result found
      if (result) {
        showGamificationToast();
      }
    }, 1500);
  };

  const showGamificationToast = () => {
    // Simulate points earned and badge unlock
    const pointsEarned = 10;
    const currentPoints = 10; // This would come from user state
    
    toast({
      title: language === "en" ? "🎉 Points Earned!" : "🎉 अंक अर्जित!",
      description: language === "en" 
        ? `You earned ${pointsEarned} points! Total: ${currentPoints}`
        : `आपने ${pointsEarned} अंक अर्जित किए! कुल: ${currentPoints}`,
      duration: 3000,
    });

    // Check for badge unlock (simplified)
    if (currentPoints >= 1) {
      setTimeout(() => {
        toast({
          title: language === "en" ? "🏅 New Badge Unlocked!" : "🏅 नया बैज अनलॉक!",
          description: language === "en" 
            ? "🕵️ Smart Starter badge unlocked!"
            : "🕵️ स्मार्ट स्टार्टर बैज अनलॉक!",
          duration: 4000,
        });
      }, 1500);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "success";
    if (score >= 40) return "warning"; 
    return "destructive";
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return text[language].safeScore;
    if (score >= 40) return text[language].mediumScore;
    return text[language].highScore;
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return CheckCircle;
    if (score >= 40) return AlertTriangle;
    return XCircle;
  };

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">{text[language].title}</h3>
        <p className="text-muted-foreground">{text[language].subtitle}</p>
      </div>

      {/* Search Form */}
      <Card className="p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={text[language].placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12"
            />
          </div>
          <Button 
            type="submit" 
            variant="default"
            size="lg"
            disabled={isLoading}
            className="h-12 px-8"
          >
            {isLoading ? (
              language === "en" ? "Checking..." : "जांच रहे हैं..."
            ) : (
              text[language].searchBtn
            )}
          </Button>
        </form>
      </Card>

      {/* Results */}
      {results && (
        <Card className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Fraud Score */}
            <div className="lg:w-1/3">
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-4">{text[language].fraudScore}</h4>
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-${getScoreColor(results.fraudScore)} text-${getScoreColor(results.fraudScore)}-foreground mb-4 animate-pulse-${getScoreColor(results.fraudScore) === 'success' ? 'safe' : getScoreColor(results.fraudScore) === 'warning' ? 'warning' : 'danger'}`}>
                  <span className="text-2xl font-bold">{results.fraudScore}</span>
                </div>
                <Badge variant={getScoreColor(results.fraudScore) as any} className="mb-2">
                  {getScoreText(results.fraudScore)}
                </Badge>
              </div>
            </div>

            {/* Advisor Details */}
            <div className="lg:w-2/3">
              <h4 className="text-lg font-semibold mb-4">{text[language].details}</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{results.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span>{results.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span>{results.location}</span>
                </div>
              </div>

              {/* Suspicious Keywords */}
              {results.suspiciousKeywords.length > 0 && (
                <div className="mt-6">
                  <h5 className="font-semibold text-destructive mb-2">{text[language].suspiciousKeywords}</h5>
                  <div className="flex flex-wrap gap-2">
                    {results.suspiciousKeywords.map((keyword: string, index: number) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {results === null && searchQuery && !isLoading && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">{text[language].noResults}</p>
        </Card>
      )}

      {/* Demo Instructions */}
      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground text-center">
          {language === "en" 
            ? "Demo: Try searching 'John Doe' or 'Jane Smith'"
            : "डेमो: 'John Doe' या 'Jane Smith' खोजने का प्रयास करें"
          }
        </p>
      </Card>
    </div>
  );
};

export default CheckAdvisor;