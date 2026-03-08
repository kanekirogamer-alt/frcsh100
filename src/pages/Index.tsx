import { useState } from "react";
import QuizScreen from "@/components/QuizScreen";
import LoadingScreen from "@/components/LoadingScreen";
import OfferScreen from "@/components/OfferScreen";
import RecentClaims from "@/components/RecentClaims";

type Screen = "quiz" | "loading" | "offer" | "blocked";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("quiz");

  return (
    <div className="max-w-md mx-auto min-h-screen">
      {screen === "quiz" && (
        <QuizScreen
          onComplete={() => setScreen("loading")}
          onUnder18={() => setScreen("loading")}
        />
      )}
      {screen === "loading" && (
        <LoadingScreen onComplete={() => setScreen("offer")} />
      )}
      {screen === "offer" && <OfferScreen />}
      {screen === "blocked" && (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center fade-in">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <span className="text-3xl">🚫</span>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground">
            Unfortunately, this offer is only available to users 18+.
          </p>
          <RecentClaims />
        </div>
      )}
    </div>
  );
};

export default Index;
