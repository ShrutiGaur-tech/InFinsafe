import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Shield, Search, Target, Award } from "lucide-react";

interface AchievementsProps {
  language: "en" | "hi";
}

const Achievements = ({ language }: AchievementsProps) => {
  // Mock user data
  const userStats = {
    totalPoints: 850,
    checksCompleted: 42,
    fraudsPrevented: 3,
    level: 5,
    nextLevelPoints: 1000
  };

  const badges = [
    {
      id: "smart_starter",
      emoji: "🕵️",
      name: language === "en" ? "Smart Starter" : "स्मार्ट शुरुआत",
      description: language === "en" ? "Completed first fraud check" : "पहली धोखाधड़ी जांच पूरी की",
      unlocked: true,
      points: 50
    },
    {
      id: "alert_investor", 
      emoji: "🛡️",
      name: language === "en" ? "Alert Investor" : "सतर्क निवेशक",
      description: language === "en" ? "Detected a fraudulent advisor" : "एक धोखेबाज़ सलाहकार का पता लगाया",
      unlocked: true,
      points: 200
    },
    {
      id: "fraud_buster",
      emoji: "🔍", 
      name: language === "en" ? "Fraud Buster" : "धोखाधड़ी बस्टर",
      description: language === "en" ? "Completed 25 security checks" : "25 सुरक्षा जांच पूरी की",
      unlocked: true,
      points: 300
    },
    {
      id: "security_champion",
      emoji: "🏆",
      name: language === "en" ? "Security Champion" : "सुरक्षा चैंपियन", 
      description: language === "en" ? "Helped protect 5 people from fraud" : "5 लोगों को धोखाधड़ी से बचाने में मदद की",
      unlocked: false,
      points: 500
    },
    {
      id: "guardian_angel",
      emoji: "👼",
      name: language === "en" ? "Guardian Angel" : "संरक्षक देवदूत",
      description: language === "en" ? "Prevented frauds worth ₹1,00,000+" : "₹1,00,000+ की धोखाधड़ी रोकी",
      unlocked: false,
      points: 1000
    },
    {
      id: "fraud_detective",
      emoji: "🕵️‍♀️",
      name: language === "en" ? "Fraud Detective" : "धोखाधड़ी जासूस", 
      description: language === "en" ? "Found 10 suspicious websites" : "10 संदिग्ध वेबसाइटें मिलीं",
      unlocked: false,
      points: 750
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
              <div className="text-4xl mb-2">{badge.emoji}</div>
              <h5 className="font-semibold text-foreground">{badge.name}</h5>
              <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
              <Badge variant="secondary" className="text-xs">
                +{badge.points} {language === "en" ? "points" : "अंक"}
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
              <div className="text-4xl mb-2 grayscale">{badge.emoji}</div>
              <h5 className="font-semibold text-muted-foreground">{badge.name}</h5>
              <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
              <Badge variant="outline" className="text-xs">
                +{badge.points} {language === "en" ? "points" : "अंक"}
              </Badge>
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