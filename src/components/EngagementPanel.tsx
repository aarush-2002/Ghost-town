import type { EngagementData } from '@/types';
import { cn } from '@/utils/cn';

interface EngagementPanelProps {
  engagement: EngagementData;
}

export function EngagementPanel({ engagement }: EngagementPanelProps) {
  const { likesToComments, timingPattern, commentDiversity, authenticityScore } = engagement;

  const timingConfig = {
    gradual: { 
      icon: '📈', 
      label: 'Gradual Growth', 
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
      description: 'Engagement grows naturally over time'
    },
    spike: { 
      icon: '⚡', 
      label: 'Instant Spike', 
      color: 'text-red-400',
      bg: 'bg-red-500/20',
      description: 'Sudden burst of activity, then nothing'
    },
    mixed: { 
      icon: '📊', 
      label: 'Mixed Pattern', 
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
      description: 'Inconsistent engagement patterns'
    }
  };

  const timing = timingConfig[timingPattern];
  const isAuthentic = authenticityScore > 0.5;

  // Mini visualization for engagement timing
  const TimingChart = () => {
    if (timingPattern === 'gradual') {
      return (
        <svg width="120" height="40" className="opacity-70">
          <path
            d="M 0 35 Q 30 30 50 25 Q 70 18 90 10 Q 110 5 120 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-emerald-400"
          />
          <circle cx="0" cy="35" r="3" fill="currentColor" className="text-emerald-400" />
          <circle cx="120" cy="2" r="3" fill="currentColor" className="text-emerald-400" />
        </svg>
      );
    }
    if (timingPattern === 'spike') {
      return (
        <svg width="120" height="40" className="opacity-70">
          <path
            d="M 0 38 L 20 35 L 30 2 L 40 35 L 120 38"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-red-400"
          />
          <circle cx="30" cy="2" r="3" fill="currentColor" className="text-red-400" />
        </svg>
      );
    }
    return (
      <svg width="120" height="40" className="opacity-70">
        <path
          d="M 0 35 L 20 20 L 40 30 L 60 10 L 80 25 L 100 15 L 120 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-amber-400"
        />
      </svg>
    );
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="text-xl">💬</span>
          Engagement Authenticity
        </h3>
        <div className={cn(
          "px-4 py-2 rounded-full text-sm font-medium",
          isAuthentic ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
        )}>
          {Math.round(authenticityScore * 100)}% Authentic
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Likes to Comments Ratio */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Likes to Comments Ratio</span>
            <span className={cn(
              "font-medium",
              likesToComments > 20 ? "text-red-400" : likesToComments > 10 ? "text-amber-400" : "text-emerald-400"
            )}>
              {likesToComments.toFixed(1)}:1
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">👍</span>
            <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full",
                  likesToComments > 20 ? "bg-red-500" : likesToComments > 10 ? "bg-amber-500" : "bg-emerald-500"
                )}
                style={{ width: `${Math.min(100, likesToComments * 2)}%` }}
              />
            </div>
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-xs text-slate-500">
            {likesToComments > 20 
              ? '⚠️ Too many likes, too few comments. Suspicious!'
              : likesToComments > 10 
                ? 'Some imbalance between likes and comments'
                : '✓ Good balance of likes and comments'
            }
          </p>
        </div>

        {/* Timing Pattern */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Engagement Timing</span>
            <div className={cn("flex items-center gap-1", timing.color)}>
              <span>{timing.icon}</span>
              <span className="text-sm font-medium">{timing.label}</span>
            </div>
          </div>
          <div className={cn("p-3 rounded-lg", timing.bg)}>
            <TimingChart />
          </div>
          <p className="text-xs text-slate-500">{timing.description}</p>
        </div>

        {/* Comment Diversity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Comment Diversity</span>
            <span className={cn(
              "font-medium",
              commentDiversity < 0.3 ? "text-red-400" : commentDiversity < 0.6 ? "text-amber-400" : "text-emerald-400"
            )}>
              {Math.round(commentDiversity * 100)}%
            </span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={i}
                className={cn(
                  "flex-1 h-6 rounded",
                  i / 10 < commentDiversity 
                    ? commentDiversity < 0.3 
                      ? "bg-red-500/50" 
                      : commentDiversity < 0.6 
                        ? "bg-amber-500/50" 
                        : "bg-emerald-500/50"
                    : "bg-slate-700"
                )}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500">
            {commentDiversity < 0.3 
              ? '⚠️ Comments are repetitive ("Nice!", "Great!")'
              : commentDiversity < 0.6 
                ? 'Comments show some variety'
                : '✓ Diverse comments with unique opinions'
            }
          </p>
        </div>

        {/* Overall Authenticity */}
        <div className="space-y-3">
          <span className="text-slate-400 text-sm">Authenticity Verdict</span>
          <div className={cn(
            "p-4 rounded-lg border",
            isAuthentic 
              ? "bg-emerald-500/10 border-emerald-500/30" 
              : "bg-red-500/10 border-red-500/30"
          )}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{isAuthentic ? '✅' : '❌'}</span>
              <div>
                <p className={cn("font-medium", isAuthentic ? "text-emerald-400" : "text-red-400")}>
                  {isAuthentic ? 'Likely Real Engagement' : 'Likely Fake Engagement'}
                </p>
                <p className="text-slate-400 text-sm">
                  {isAuthentic 
                    ? 'Engagement patterns match genuine user behavior'
                    : 'Engagement shows signs of being manufactured'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
