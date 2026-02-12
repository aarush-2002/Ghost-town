import type { CrawlProgress } from '@/types';
import { cn } from '@/utils/cn';

interface CrawlingProgressProps {
  progress: CrawlProgress;
}

const stageIcons: Record<string, string> = {
  validating: '🔗',
  connecting: '🌐',
  crawling: '🕷️',
  extracting: '📦',
  analyzing: '📊',
  detecting: '🤖',
  scoring: '🎯',
  complete: '✅'
};

export function CrawlingProgress({ progress }: CrawlingProgressProps) {
  const { stage, progress: percent, message } = progress;
  
  const stages = [
    { key: 'validating', label: 'Validate' },
    { key: 'connecting', label: 'Connect' },
    { key: 'crawling', label: 'Crawl' },
    { key: 'extracting', label: 'Extract' },
    { key: 'analyzing', label: 'Analyze' },
    { key: 'detecting', label: 'Detect' },
    { key: 'scoring', label: 'Score' },
  ];

  const currentStageIndex = stages.findIndex(s => s.key === stage);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        {/* Animated Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center animate-pulse">
              <span className="text-4xl">{stageIcons[stage] || '🔍'}</span>
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-cyan-400/30 animate-ping" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300 font-medium">{message}</span>
            <span className="text-cyan-400 font-mono">{percent}%</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Stage Steps */}
        <div className="flex items-center justify-between">
          {stages.map((s, i) => {
            const isComplete = i < currentStageIndex;
            const isCurrent = i === currentStageIndex;
            
            return (
              <div key={s.key} className="flex flex-col items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300",
                  isComplete 
                    ? "bg-emerald-500 text-white" 
                    : isCurrent 
                      ? "bg-cyan-500 text-white ring-4 ring-cyan-500/30" 
                      : "bg-slate-700 text-slate-500"
                )}>
                  {isComplete ? '✓' : i + 1}
                </div>
                <span className={cn(
                  "text-xs mt-1",
                  isComplete || isCurrent ? "text-slate-300" : "text-slate-600"
                )}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* What's Happening */}
        <div className="mt-6 p-4 bg-slate-900/50 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-1 h-full bg-cyan-500 rounded-full animate-pulse" />
            <div>
              <p className="text-slate-300 text-sm font-medium mb-1">
                {stage === 'validating' && 'Checking URL format and reachability...'}
                {stage === 'connecting' && 'Establishing secure connection to the server...'}
                {stage === 'crawling' && 'Scanning pages for posts and metadata...'}
                {stage === 'extracting' && 'Pulling activity data and user interactions...'}
                {stage === 'analyzing' && 'Processing temporal patterns and trends...'}
                {stage === 'detecting' && 'Running NLP algorithms for bot signatures...'}
                {stage === 'scoring' && 'Calculating final life score metrics...'}
                {stage === 'complete' && 'Analysis complete! Preparing results...'}
              </p>
              <p className="text-slate-500 text-xs">
                {stage === 'validating' && 'Ensuring the URL is accessible and properly formatted'}
                {stage === 'connecting' && 'Using adaptive rate limiting to avoid detection'}
                {stage === 'crawling' && 'Respecting robots.txt and rate limits'}
                {stage === 'extracting' && 'Collecting timestamps, authors, and engagement data'}
                {stage === 'analyzing' && 'Detecting trends with time-series analysis'}
                {stage === 'detecting' && 'Analyzing language patterns with TF-IDF vectors'}
                {stage === 'scoring' && 'Applying weighted scoring formula'}
                {stage === 'complete' && 'Your results are ready to view'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
