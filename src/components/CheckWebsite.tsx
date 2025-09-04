import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Link, Shield, AlertTriangle, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CheckWebsiteProps {
  language: "en" | "hi";
}

const CheckWebsite = ({ language }: CheckWebsiteProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const text = {
    en: {
      title: "Check Website Safety",
      subtitle: "Analyze websites for fraud indicators and security risks",
      placeholder: "Enter website URL (e.g., example.com)",
      searchBtn: "Check Website",
      noResults: "Website analysis could not be completed",
      fraudScore: "Safety Score",
      safeScore: "SAFE",
      mediumScore: "SUSPICIOUS", 
      highScore: "DANGEROUS",
      details: "Website Details",
      suspiciousKeywords: "Red Flags Detected",
      securityFeatures: "Security Features",
      lastChecked: "Last Checked"
    },
    hi: {
      title: "वेबसाइट सुरक्षा जांचें",
      subtitle: "धोखाधड़ी संकेतकों और सुरक्षा जोखिमों के लिए वेबसाइटों का विश्लेषण करें",
      placeholder: "वेबसाइट URL दर्ज करें (जैसे example.com)",
      searchBtn: "वेबसाइट जांचें",
      noResults: "वेबसाइट विश्लेषण पूरा नहीं हो सका",
      fraudScore: "सुरक्षा स्कोर",
      safeScore: "सुरक्षित",
      mediumScore: "संदिग्ध",
      highScore: "खतरनाक",
      details: "वेबसाइट विवरण",
      suspiciousKeywords: "लाल झंडे का पता चला",
      securityFeatures: "सुरक्षा सुविधाएं",
      lastChecked: "पिछली बार जांची गई"
    }
  };

  // Mock data for demo
  const mockResults = {
    "trustbank.com": {
      url: "trustbank.com",
      domain: "trustbank.com",
      safetyScore: 92,
      httpsEnabled: true,
      sslCertValid: true,
      suspiciousKeywords: [],
      securityFeatures: ["SSL Certificate", "HTTPS", "Valid Domain"],
      lastChecked: "Just now"
    },
    "quick-money-scheme.net": {
      url: "quick-money-scheme.net",
      domain: "quick-money-scheme.net", 
      safetyScore: 15,
      httpsEnabled: false,
      sslCertValid: false,
      suspiciousKeywords: ["guaranteed profits", "get rich quick", "no risk investment", "instant money"],
      securityFeatures: [],
      lastChecked: "Just now"
    },
    "investment-advisor.in": {
      url: "investment-advisor.in",
      domain: "investment-advisor.in",
      safetyScore: 65,
      httpsEnabled: true,
      sslCertValid: true,
      suspiciousKeywords: ["100% returns"],
      securityFeatures: ["SSL Certificate", "HTTPS"],
      lastChecked: "Just now"
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    
    // Clean URL
    let cleanUrl = searchQuery.toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
    
    // Simulate API call
    setTimeout(() => {
      const result = mockResults[cleanUrl as keyof typeof mockResults];
      setResults(result || null);
      setIsLoading(false);
      
      // Show gamification toast if result found
      if (result) {
        showGamificationToast();
      }
    }, 2000);
  };

  const showGamificationToast = () => {
    // Simulate points earned and badge unlock
    const pointsEarned = 15;
    const currentPoints = 25; // This would come from user state
    
    toast({
      title: language === "en" ? "🎉 Points Earned!" : "🎉 अंक अर्जित!",
      description: language === "en" 
        ? `You earned ${pointsEarned} points! Total: ${currentPoints}`
        : `आपने ${pointsEarned} अंक अर्जित किए! कुल: ${currentPoints}`,
      duration: 3000,
    });

    // Check for badge unlock (simplified)
    if (currentPoints >= 25) {
      setTimeout(() => {
        toast({
          title: language === "en" ? "🏅 New Badge Unlocked!" : "🏅 नया बैज अनलॉक!",
          description: language === "en" 
            ? "🔍 Fraud Buster badge unlocked!"
            : "🔍 धोखाधड़ी बस्टर बैज अनलॉक!",
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
            <Globe className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
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
              language === "en" ? "Analyzing..." : "विश्लेषण कर रहे हैं..."
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
            {/* Safety Score */}
            <div className="lg:w-1/3">
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-4">{text[language].fraudScore}</h4>
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-${getScoreColor(results.safetyScore)} text-${getScoreColor(results.safetyScore)}-foreground mb-4`}>
                  <span className="text-2xl font-bold">{results.safetyScore}</span>
                </div>
                <Badge variant={getScoreColor(results.safetyScore) as any} className="mb-2">
                  {getScoreText(results.safetyScore)}
                </Badge>
              </div>
            </div>

            {/* Website Details */}
            <div className="lg:w-2/3">
              <h4 className="text-lg font-semibold mb-4">{text[language].details}</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Link className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{results.domain}</span>
                  <Button variant="ghost" size="sm" className="p-1">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span>HTTPS: {results.httpsEnabled ? "✓" : "✗"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-muted-foreground" />
                  <span>SSL: {results.sslCertValid ? "Valid" : "Invalid"}</span>
                </div>
              </div>

              {/* Security Features */}
              {results.securityFeatures.length > 0 && (
                <div className="mt-6">
                  <h5 className="font-semibold text-success mb-2">{text[language].securityFeatures}</h5>
                  <div className="flex flex-wrap gap-2">
                    {results.securityFeatures.map((feature: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

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
            ? "Demo: Try 'trustbank.com', 'quick-money-scheme.net', or 'investment-advisor.in'"
            : "डेमो: 'trustbank.com', 'quick-money-scheme.net', या 'investment-advisor.in' आज़माएं"
          }
        </p>
      </Card>
    </div>
  );
};

export default CheckWebsite;