import { useRef } from "react";
import ProgressBar from "./ProgressBar";
import RecentClaims from "./RecentClaims";

const AFFILIATE_LINK = "https://rainawards.com/r/eyJ0IjoiZnJlZWNhc2gtY3BpLWIiLCJ1IjoiNjlhNWRkNzJiZTc0YjgwY2NjMTQxY2U1IiwidHMiOjE3NzI5NTg1MDg2MDF9?s2=c5_mar";

const OfferScreen = () => {
  const handleCTA = () => {
    window.location.href = AFFILIATE_LINK;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col slide-up">
      {/* Header */}
      <div className="pt-6 px-6 pb-4">
        <div className="flex justify-center mb-4">
          <img src="https://cdn.builder.io/api/v1/image/assets%2Fc02707221f9c49859a2070e5da77a1b1%2F8db438e8a5f34b0f95c20f368b0c1cf4?format=webp&width=800&height=1200" alt="Logo" className="w-12 h-12 object-contain" />
        </div>
        <p className="text-center text-xs tracking-[0.2em] text-muted-foreground uppercase mb-6">
          Exclusive Reward
        </p>
        <ProgressBar progress={99} label="Progress" />
      </div>

      {/* Hero */}
      <div className="px-6 pt-4 pb-2">
        <h1 className="text-3xl font-bold text-foreground mb-2">Almost There! 🎉</h1>
        <p className="text-muted-foreground">Follow these simple steps to claim your reward.</p>
      </div>

      {/* Steps */}
      <div className="mx-6 mt-4 bg-card rounded-2xl shadow-sm border border-border p-5 space-y-5">
        <StepItem
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          title="Install the app"
          description="Download and set up on your device"
        />
        <StepItem
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M22 4L12 13 2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          title="Create an account"
          description="Sign up with your email"
        />
        <StepItem
          icon={
            <div className="text-primary text-2xl font-bold">£</div>
          }
          title="Play and Win"
          description="Enjoy games and earn rewards"
        />
      </div>

      {/* CTA */}
      <div className="px-6 mt-6">
        <button
          onClick={handleCTA}
          className="w-full py-4 bg-primary text-primary-foreground font-bold text-lg rounded-full shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-150"
        >
          Get Started →
        </button>
      </div>

      {/* Trust Strip */}
      <div className="px-6 mt-5">
        <div className="flex items-center justify-center gap-5 text-muted-foreground">
          <TrustBadge icon={<LockIcon />} label="256-bit SSL" />
          <TrustBadge icon={<ShieldIcon />} label="Secured Deals" />
          <TrustBadge icon={<StarIcon />} label="4.8★ (12k+)" />
        </div>
      </div>

      {/* Social Proof */}
      <RecentClaims />
    </div>
  );
};

const StepItem = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="font-semibold text-foreground text-sm">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);

const TrustBadge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-1.5 text-xs">
    {icon}
    <span>{label}</span>
  </div>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="5" y="11" width="14" height="10" rx="2"/>
    <path d="M8 11V7a4 4 0 118 0v4"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 2l7 4v5c0 5-3.5 9.7-7 11-3.5-1.3-7-6-7-11V6l7-4z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export default OfferScreen;
