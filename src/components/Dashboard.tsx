import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CheckAdvisor from "./CheckAdvisor";
import CheckWebsite from "./CheckWebsite";
import Achievements from "./Achievements";
import { User, Globe, Trophy } from "lucide-react";

interface DashboardProps {
  language: "en" | "hi";
}

const Dashboard = ({ language }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("advisor");

  const text = {
    en: {
      advisor: "Check Advisor",
      website: "Check Website", 
      achievements: "Achievements"
    },
    hi: {
      advisor: "सलाहकार जांचें",
      website: "वेबसाइट जांचें",
      achievements: "उपलब्धियां"
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {language === "en" ? "InFinsafe Dashboard" : "इनफिनसेफ डैशबोर्ड"}
        </h2>
        <p className="text-muted-foreground">
          {language === "en" 
            ? "Your fraud protection command center"
            : "आपका धोखाधड़ी सुरक्षा नियंत्रण केंद्र"
          }
        </p>
      </div>

      <Card className="shadow-card">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="advisor" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{text[language].advisor}</span>
            </TabsTrigger>
            <TabsTrigger value="website" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{text[language].website}</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">{text[language].achievements}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="advisor" className="mt-0">
            <CheckAdvisor language={language} />
          </TabsContent>

          <TabsContent value="website" className="mt-0">
            <CheckWebsite language={language} />
          </TabsContent>

          <TabsContent value="achievements" className="mt-0">
            <Achievements language={language} />
          </TabsContent>
        </Tabs>
      </Card>
    </section>
  );
};

export default Dashboard;