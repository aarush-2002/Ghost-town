import type { AnalysisResult } from '@/types';
import { cn } from '@/utils/cn';

interface AnalysisSummaryProps {
  result: AnalysisResult;
}

export function AnalysisSummary({ result }: AnalysisSummaryProps) {
  const metrics = [
    {
      label: 'Platform',
      value: result.platform,
      icon: '🌐',
      color: 'text-blue-400'
    },
    {
      label: 'Last Activity',
      value: result.lastActivity,
      icon: '🕐',
      color: result.daysSinceLastPost < 7 ? 'text-emerald-400' : result.daysSinceLastPost < 30 ? 'text-amber-400' : 'text-red-400'
    },
    {
      label: 'Trend',
      value: result.activityTrend.charAt(0).toUpperCase() + result.activityTrend.slice(1),
      icon: result.activityTrend === 'growing' ? '📈' : result.activityTrend === 'stable' ? '➡️' : result.activityTrend === 'declining' ? '📉' : '💀',
      color: result.activityTrend === 'growing' ? 'text-emerald-400' : result.activityTrend === 'stable' ? 'text-blue-400' : result.activityTrend === 'declining' ? 'text-amber-400' : 'text-red-400'
    },
    {
      label: 'Bot Score',
      value: `${Math.round(result.botDetection.overallBotScore * 100)}%`,
      icon: '🤖',
      color: result.botDetection.overallBotScore < 0.3 ? 'text-emerald-400' : result.botDetection.overallBotScore < 0.6 ? 'text-amber-400' : 'text-red-400'
    }
  ];

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="text-xl">📋</span>
          Analysis Summary
        </h3>
        <a 
          href={result.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1"
        >
          Visit Site
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* URL Display */}
      <div className="mb-4 p-3 bg-slate-900/50 rounded-lg">
        <p className="text-slate-400 text-sm truncate">{result.url}</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center p-3 bg-slate-900/30 rounded-lg">
            <span className="text-2xl mb-1 block">{metric.icon}</span>
            <p className={cn("font-semibold", metric.color)}>{metric.value}</p>
            <p className="text-slate-500 text-xs">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Analysis Time */}
      <div className="mt-4 text-center">
        <p className="text-slate-500 text-xs">
          Analyzed at {result.analyzedAt.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
