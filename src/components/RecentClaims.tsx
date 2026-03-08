import { useEffect, useState, useRef } from "react";

const names = [
  "Sarah M.", "James K.", "Emily R.", "David L.", "Olivia P.",
  "Michael B.", "Sophia W.", "Daniel T.", "Ava H.", "Chris N.",
  "Isabella G.", "Matthew S.", "Mia C.", "Andrew F.", "Charlotte D.",
  "Hannah J.", "Ryan O.", "Grace F.", "Nathan W.", "Ella B.",
  "Lucas V.", "Chloe A.", "Ethan R.", "Lily T.", "Jack S.",
  "Amelia K.", "Noah G.", "Zoe L.", "Oscar D.", "Ruby H.",
  "Harry P.", "Freya C.", "George M.", "Poppy N.", "Thomas E.",
  "Jessica W.", "Samuel R.", "Alice B.", "William H.", "Daisy F.",
  "Benjamin T.", "Victoria J.", "Alexander L.", "Sophie R.", "Oliver G.",
  "Emma H.", "Mason C.", "Abigail K.", "Logan N.", "Madison D.",
  "Jackson W.", "Elizabeth F.", "Aiden S.", "Avery M.", "Liam B.",
  "Harper T.", "Noah J.", "Evelyn L.", "Lucas R.", "Scarlett P.",
  "Mason E.", "Violet G.", "Ethan H.", "Aurora C.", "Benjamin K.",
  "Penelope N.", "Elijah D.", "Ariana W.", "Logan F.", "Gianna S.",
  "Oliver M.", "Luna B.", "Benjamin T.", "Stella J.", "Lucas L.",
  "Cora R.", "Mason E.", "Natalie G.", "Elijah H.", "Zoe C.",
  "Logan K.", "Riley N.", "Noah D.", "Leah W.", "Ethan F.",
  "Hazel S.", "Mason M.", "Eleanor B.", "Benjamin T.", "Ella J.",
  "Oliver L.", "Avery R.", "Lucas E.", "Camila G.", "Elijah H.",
  "Paisley C.", "Logan K.", "Nora N.", "Noah D.", "Clara W.",
  "Mason F.", "Scarlett S.", "Ethan M.", "Grace B.", "Benjamin T.",
  "Chloe J.", "Oliver L.", "Layla R.", "Lucas E.", "Lily G.",
  "Elijah H.", "Zoe C.", "Logan K.", "Savannah N.", "Noah D.",
  "Audrey W.", "Mason F.", "Brooklyn S.", "Ethan M.", "Bella B.",
];

const games = ["Monopoly Go", "Coin Master"];

const randomAmount = () => Math.floor(Math.random() * 141) + 60;

const randomActivityMessage = () => {
  const activities = [
    "installed the app and created an account",
    (amount: number) => `cashed out £${amount} for playing ${games[Math.floor(Math.random() * games.length)]}`,
  ];

  const activity = activities[Math.floor(Math.random() * activities.length)];
  if (typeof activity === "function") {
    return activity(randomAmount());
  }
  return activity;
};

const formatElapsed = (seconds: number) => {
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.floor(seconds / 60)}m ago`;
};

interface ClaimEntry {
  name: string;
  activity: string;
  createdAt: number;
}

const RecentClaims = () => {
  const [claims, setClaims] = useState<ClaimEntry[]>([]);
  const [, setTick] = useState(0);
  const intervalRef = useRef<number>();

  useEffect(() => {
    const now = Date.now();
    const initial: ClaimEntry[] = Array.from({ length: 3 }, (_, i) => ({
      name: names[Math.floor(Math.random() * names.length)],
      activity: randomActivityMessage(),
      createdAt: now - (i + 1) * 7000,
    }));
    setClaims(initial);

    const addClaim = () => {
      setClaims((prev) => [
        { name: names[Math.floor(Math.random() * names.length)], activity: randomActivityMessage(), createdAt: Date.now() },
        ...prev.slice(0, 4),
      ]);
      intervalRef.current = window.setTimeout(addClaim, 5000 + Math.random() * 2000);
    };
    intervalRef.current = window.setTimeout(addClaim, 5000 + Math.random() * 2000);

    const tickInterval = setInterval(() => setTick((t) => t + 1), 1000);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      clearInterval(tickInterval);
    };
  }, []);

  return (
    <div className="px-6 mt-6 pb-10">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Recent Activity
      </h3>
      <div className="space-y-2">
        {claims.map((claim, i) => {
          const elapsed = Math.max(0, Math.round((Date.now() - claim.createdAt) / 1000));
          return (
            <div
              key={`${claim.name}-${claim.createdAt}`}
              className={`flex items-center justify-between py-2.5 px-4 rounded-xl bg-card border border-border ${i === 0 ? "fade-in" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-semibold text-accent-foreground">
                  {claim.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{claim.name}</p>
                  <p className="text-xs text-muted-foreground">{claim.activity}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{elapsed < 2 ? "Just now" : formatElapsed(elapsed)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentClaims;
