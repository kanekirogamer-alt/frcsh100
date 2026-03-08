import { useState } from "react";
import ProgressBar from "./ProgressBar";
import RecentClaims from "./RecentClaims";

interface QuizScreenProps {
  onComplete: () => void;
  onUnder18: () => void;
}

const QuizScreen = ({ onComplete, onUnder18 }: QuizScreenProps) => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const progress = step === 0 ? 33 : step === 1 ? 66 : 99;

  const spendingOptions = [
    { label: "Shopping", icon: "🛍️" },
    { label: "Friends & Family", icon: "👥" },
    { label: "Bills", icon: "💳" },
    { label: "Other", icon: "✨" },
  ];

  const handleSpendingSelect = (option: string) => {
    setSelected(option);
    setTransitioning(true);
    setTimeout(() => {
      setStep(1);
      setSelected(null);
      setTransitioning(false);
    }, 400);
  };

  const handleAgeSelect = (isOver18: boolean) => {
    setSelected(isOver18 ? "yes" : "no");
    if (!isOver18) {
      onUnder18();
      return;
    }
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="pt-6 px-6 pb-4">
        <div className="flex justify-center mb-4">
          <img src="https://cdn.builder.io/api/v1/image/assets%2Fc02707221f9c49859a2070e5da77a1b1%2F8db438e8a5f34b0f95c20f368b0c1cf4?format=webp&width=800&height=1200" alt="Logo" className="w-12 h-12 object-contain" />
        </div>
        <p className="text-center text-xs tracking-[0.2em] text-muted-foreground uppercase mb-6">
          Exclusive Reward
        </p>
        <ProgressBar progress={progress} label="Progress" />
      </div>

      <div className="flex-1 px-6 pt-4">
        {!transitioning && step === 0 && (
          <div className="fade-in">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              What would you spend the reward money on?
            </h1>
            <p className="text-muted-foreground mb-6">Choose one option below</p>
            <div className="space-y-3">
              {spendingOptions.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSpendingSelect(opt.label)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-150 text-left
                    ${selected === opt.label
                      ? "border-primary bg-accent shadow-sm"
                      : "border-border bg-card hover:border-primary/40"
                    }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="font-medium text-foreground">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {!transitioning && step === 1 && (
          <div className="fade-in">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Are you 18 years or older?
            </h1>
            <p className="text-muted-foreground mb-6">We need to verify your eligibility</p>
            <div className="space-y-3">
              <button
                onClick={() => handleAgeSelect(true)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-150 text-left
                  ${selected === "yes"
                    ? "border-primary bg-accent shadow-sm"
                    : "border-border bg-card hover:border-primary/40"
                  }`}
              >
                <span className="text-2xl">✅</span>
                <span className="font-medium text-foreground">Yes, I am over 18 years old</span>
              </button>
              <button
                onClick={() => handleAgeSelect(false)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-150 text-left
                  ${selected === "no"
                    ? "border-destructive bg-destructive/5 shadow-sm"
                    : "border-border bg-card hover:border-muted-foreground/40"
                  }`}
              >
                <span className="text-2xl">🚫</span>
                <span className="font-medium text-foreground">No, I am not over 18 years old</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <RecentClaims />
    </div>
  );
};

export default QuizScreen;
