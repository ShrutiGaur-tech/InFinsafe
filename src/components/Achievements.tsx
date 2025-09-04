import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Shield, Search, Target, Award } from "lucide-react";

interface AchievementsProps {
  language: "en" | "hi";
}

const Achievements = ({ language }: AchievementsProps) => {
  // User data based on actual structure
  const userStats = {
    totalPoints: 35,
    checksCompleted: 8,
    fraudsPrevented: 2,
    level: 2,
    nextLevelPoints: 50
  };

  const badges = [
    {
      id: "smart_starter",
      name: language === "en" ? "Smart Starter" : "स्मार्ट शुरुआत",
      icon: "🕵️",
      threshold: 1,
      description: language === "en" ? "Completed first fraud check" : "पहली धोखाधड़ी जांच पूरी की",
      unlocked: true
    },
    {
      id: "alert_investor", 
      name: language === "en" ? "Alert Investor" : "सतर्क निवेशक",
      icon: "🛡️",
      threshold: 10,
      description: language === "en" ? "Earned 10 points" : "10 अंक अर्जित किए",
      unlocked: true
    },
    {
      id: "fraud_buster",
      name: language === "en" ? "Fraud Buster" : "धोखाधड़ी बस्टर",
      icon: "🔍", 
      threshold: 25,
      description: language === "en" ? "Earned 25 points" : "25 अंक अर्जित किए",
      unlocked: true
    },
    {
      id: "market_guardian",
      name: language === "en" ? "Market Guardian" : "मार्केट गार्डियन",
      icon: "🏅",
      threshold: 50,
      description: language === "en" ? "Earned 50 points" : "50 अंक अर्जित किए",
      unlocked: false
    },
    {
      id: "safe_citizen",
      name: language === "en" ? "Safe Citizen" : "सुरक्षित नागरिक",
      icon: "🌍",
      threshold: 100,
      description: language === "en" ? "Earned 100 points" : "100 अंक अर्जित किए",
      unlocked: false
    }
  ];

  const text = {
    en: {
      title: "Your Achievements",
      subtitle: "Track your progress in fighting financial fraud",
      totalPoints: "Total Points",
      level: "Level",
      checksCompleted: "Checks Completed", 
      fraudsPrevented: "Frauds Prevented",
      progressToNext: "Progress to Next Level",
      unlockedBadges: "Unlocked Badges",
      lockedBadges: "Locked Badges",
      earnPoints: "Earn points by:",
      pointsActivities: [
        "Checking advisors (+10 points)",
        "Checking websites (+15 points)", 
        "Detecting fraud (+100 points)",
        "Sharing with friends (+25 points)"
      ]
    },
    hi: {
      title: "आपकी उपलब्धियां",
      subtitle: "वित्तीय धोखाधड़ी से लड़ने में अपनी प्रगति को ट्रैक करें",
      totalPoints: "कुल अंक",
      level: "स्तर",
      checksCompleted: "जांच पूरी की",
      fraudsPrevented: "धोखाधड़ी रोकी",
      progressToNext: "अगले स्तर तक प्रगति",
      unlockedBadges: "अनलॉक किए गए बैज",
      lockedBadges: "लॉक किए गए बैज",
      earnPoints: "अंक अर्जित करें:",
      pointsActivities: [
        "सलाहकारों की जांच करके (+10 अंक)",
        "वेबसाइटों की जांच करके (+15 अंक)",
        "धोखाधड़ी का पता लगाकर (+100 अंक)",
        "दोस्तों के साथ साझा करके (+25 अंक)"
      ]
    }
  };

  const progressPercentage = (userStats.totalPoints / userStats.nextLevelPoints) * 100;
  const unlockedBadges = badges.filter(badge => badge.unlocked);
  const lockedBadges = badges.filter(badge => !badge.unlocked);

  return (
    <div className="p-6 space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">{text[language].title}</h3>
        <p className="text-muted-foreground">{text[language].subtitle}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 text-center gradient-accent text-accent-foreground">
          <div className="text-2xl font-bold">{userStats.totalPoints}</div>
          <div className="text-sm opacity-90">{text[language].totalPoints}</div>
        </Card>
        <Card className="p-4 text-center gradient-primary text-primary-foreground">
          <div className="text-2xl font-bold">{userStats.level}</div>
          <div className="text-sm opacity-90">{text[language].level}</div>
        </Card>
        <Card className="p-4 text-center bg-success text-success-foreground">
          <div className="text-2xl font-bold">{userStats.checksCompleted}</div>
          <div className="text-sm opacity-90">{text[language].checksCompleted}</div>
        </Card>
        <Card className="p-4 text-center bg-warning text-warning-foreground">
          <div className="text-2xl font-bold">{userStats.fraudsPrevented}</div>
          <div className="text-sm opacity-90">{text[language].fraudsPrevented}</div>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">{text[language].progressToNext}</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{text[language].level} {userStats.level}</span>
            <span>{userStats.totalPoints} / {userStats.nextLevelPoints}</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="text-center text-sm text-muted-foreground">
            {userStats.nextLevelPoints - userStats.totalPoints} {language === "en" ? "points to next level" : "अंक अगले स्तर तक"}
          </div>
        </div>
      </Card>

      {/* Unlocked Badges */}
      <div>
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" />
          {text[language].unlockedBadges}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlockedBadges.map((badge) => (
            <Card key={badge.id} className="p-4 text-center shadow-card bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <div className="text-4xl mb-2">{badge.icon}</div>
              <h5 className="font-semibold text-foreground">{badge.name}</h5>
              <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
              <Badge variant="secondary" className="text-xs">
                {badge.threshold} {language === "en" ? "points" : "अंक"}
              </Badge>
            </Card>
          ))}
        </div>
      </div>

      {/* Locked Badges */}
      <div>
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-muted-foreground" />
          {text[language].lockedBadges}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lockedBadges.map((badge) => (
            <Card key={badge.id} className="p-4 text-center opacity-60 border-dashed">
              <div className="text-4xl mb-2 grayscale">{badge.icon}</div>
              <h5 className="font-semibold text-muted-foreground">{badge.name}</h5>
              <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
              <Badge variant="outline" className="text-xs">
                {badge.threshold} {language === "en" ? "points needed" : "अंक चाहिए"}
              </Badge>
              <div className="mt-2 w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min(100, (userStats.totalPoints / badge.threshold) * 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {userStats.totalPoints}/{badge.threshold}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* How to Earn Points */}
      <Card className="p-6 bg-muted/50">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-accent" />
          {text[language].earnPoints}
        </h4>
        <ul className="space-y-2">
          {text[language].pointsActivities.map((activity, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <Award className="w-4 h-4 text-accent" />
              {activity}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Achievements;