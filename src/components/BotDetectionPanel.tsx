import type { BotDetectionResult } from '@/types';
import { cn } from '@/utils/cn';

interface BotDetectionPanelProps {
  result: BotDetectionResult;
}

export function BotDetectionPanel({ result }: BotDetectionPanelProps) {
  const checks = [
    {
      label: 'Repetitive Phrasing',
      value: result.repetitivePhrasing,
      description: 'Checks if comments are copy-pasted or templated',
      icon: '📝'
    },
    {
      label: 'Unnatural Timing',
      value: result.unnaturalTiming,
      description: 'Detects clockwork-precise posting intervals',
      icon: '⏰'
    },
    {
      label: 'Account Patterns',
      value: result.accountPatterns,
      description: 'Identifies suspicious account age vs activity ratio',
      icon: '👤'
    },
    {
      label: 'Language Complexity',
      value: result.languageComplexity,
      description: 'Measures vocabulary diversity and sentence structure',
      icon: '🧠',
      invert: true // Higher is better for this one
    }
  ];

  const getScoreColor = (value: number, invert = false) => {
    const score = invert ? 1 - value : value;
    if (score < 0.3) return 'text-emerald-400';
    if (score < 0.6) return 'text-amber-400';
    return 'text-red-400';
  };

  const getBarColor = (value: number, invert = false) => {
    const score = invert ? 1 - value : value;
    if (score < 0.3) return 'bg-emerald-500';
    if (score < 0.6) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const overallBotScore = result.overallBotScore;
  const botPercentage = Math.round(overallBotScore * 100);
  const isLikelyBots = overallBotScore > 0.5;

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="text-xl">🤖</span>
          Bot Detection
        </h3>
        <div className={cn(
          "px-4 py-2 rounded-full text-sm font-medium",
          isLikelyBots ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
        )}>
          {botPercentage}% Bot Activity
        </div>
      </div>

      {/* Overall Meter */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">Human</span>
          <span className="text-slate-400">Bot</span>
        </div>
        <div className="h-4 bg-slate-700 rounded-full overflow-hidden relative">
          <div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500"
            style={{ width: '100%' }}
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-4 h-6 bg-white rounded shadow-lg transition-all duration-500"
            style={{ left: `calc(${botPercentage}% - 8px)` }}
          />
        </div>
      </div>

      {/* Individual Checks */}
      <div className="space-y-4">
        {checks.map((check) => (
          <div key={check.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{check.icon}</span>
                <span className="text-slate-300 text-sm font-medium">{check.label}</span>
              </div>
              <span className={cn("text-sm font-medium", getScoreColor(check.value, check.invert))}>
                {Math.round(check.value * 100)}%
              </span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={cn("h-full rounded-full transition-all duration-500", getBarColor(check.value, check.invert))}
                style={{ width: `${check.value * 100}%` }}
              />
            </div>
            <p className="text-xs text-slate-500">{check.description}</p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className={cn(
        "mt-6 p-4 rounded-lg",
        isLikelyBots ? "bg-red-500/10 border border-red-500/30" : "bg-emerald-500/10 border border-emerald-500/30"
      )}>
        <div className="flex items-start gap-3">
          <span className="text-2xl">{isLikelyBots ? '⚠️' : '✅'}</span>
          <div>
            <p className={cn("font-medium mb-1", isLikelyBots ? "text-red-400" : "text-emerald-400")}>
              {isLikelyBots ? 'High Bot Activity Detected' : 'Mostly Human Activity'}
            </p>
            <p className="text-slate-400 text-sm">
              {isLikelyBots 
                ? 'Many indicators suggest automated activity. Engagement may not be from real users.'
                : 'Activity patterns are consistent with genuine human interaction.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
