import { cn } from '@/utils/cn';
import type { LifeStatus } from '@/types';

interface LifeScoreDisplayProps {
  score: number;
  status: LifeStatus;
}

export function LifeScoreDisplay({ score, status }: LifeScoreDisplayProps) {
  const statusConfig = {
    alive: {
      emoji: '🟢',
      label: 'ALIVE',
      bgGradient: 'from-emerald-500 to-green-600',
      ringColor: 'ring-emerald-400',
      textColor: 'text-emerald-400',
      glowColor: 'shadow-emerald-500/50',
      description: 'This community is thriving with real human activity!'
    },
    dying: {
      emoji: '🟡',
      label: 'DYING',
      bgGradient: 'from-amber-500 to-orange-600',
      ringColor: 'ring-amber-400',
      textColor: 'text-amber-400',
      glowColor: 'shadow-amber-500/50',
      description: 'Activity is declining. Signs of bot infiltration detected.'
    },
    dead: {
      emoji: '🔴',
      label: 'DEAD',
      bgGradient: 'from-red-500 to-rose-700',
      ringColor: 'ring-red-400',
      textColor: 'text-red-400',
      glowColor: 'shadow-red-500/50',
      description: 'This community is a ghost town. Most activity appears to be bots.'
    }
  };

  const config = statusConfig[status];
  
  // Calculate the stroke dasharray for the circular progress
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Circular Score Display */}
      <div className="relative">
        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-slate-700/50"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={status === 'alive' ? 'text-emerald-400' : status === 'dying' ? 'text-amber-400' : 'text-red-400'} style={{ stopColor: 'currentColor' }} />
              <stop offset="100%" className={status === 'alive' ? 'text-green-500' : status === 'dying' ? 'text-orange-500' : 'text-rose-600'} style={{ stopColor: 'currentColor' }} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Score text in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-white">{score}</span>
          <span className="text-slate-400 text-sm">/ 100</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className={cn(
        "flex items-center gap-3 px-6 py-3 rounded-full",
        "bg-gradient-to-r", config.bgGradient,
        "shadow-lg", config.glowColor,
        "ring-2", config.ringColor, "ring-offset-2 ring-offset-slate-900"
      )}>
        <span className="text-2xl">{config.emoji}</span>
        <span className="text-xl font-bold text-white tracking-wide">{config.label}</span>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-center max-w-md">
        {config.description}
      </p>
    </div>
  );
}
