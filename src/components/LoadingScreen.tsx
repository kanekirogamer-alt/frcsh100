import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import RecentClaims from "./RecentClaims";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(66);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 98) {
          clearInterval(interval);
          setTimeout(onComplete, 200);
          return 99;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <img src="https://cdn.builder.io/api/v1/image/assets%2Fc02707221f9c49859a2070e5da77a1b1%2F8db438e8a5f34b0f95c20f368b0c1cf4?format=webp&width=800&height=1200" alt="Logo" className="w-12 h-12 object-contain mb-6" />
      <h2 className="text-xl font-bold text-foreground mb-2">Verifying your eligibility...</h2>
      <p className="text-muted-foreground text-sm mb-8">Please wait a moment</p>
      <div className="w-full max-w-xs">
        <ProgressBar progress={Math.min(progress, 99)} label="Progress" />
      </div>
      <RecentClaims />
    </div>
  );
};

export default LoadingScreen;
