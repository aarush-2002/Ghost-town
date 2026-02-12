import { useState, useCallback } from 'react';
import type { AnalysisResult, CrawlProgress } from '@/types';
import { simulateCrawling } from '@/utils/simulation';
import { URLInput } from '@/components/URLInput';
import { CrawlingProgress } from '@/components/CrawlingProgress';
import { LifeScoreDisplay } from '@/components/LifeScoreDisplay';
import { ActivityTimeline } from '@/components/ActivityTimeline';
import { EngagementHeatmap } from '@/components/EngagementHeatmap';
import { BotDetectionPanel } from '@/components/BotDetectionPanel';
import { EngagementPanel } from '@/components/EngagementPanel';
import { AnalysisSummary } from '@/components/AnalysisSummary';

type AppState = 'idle' | 'analyzing' | 'results';

export function App() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [progress, setProgress] = useState<CrawlProgress>({ stage: 'validating', progress: 0, message: '' });
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = useCallback(async (url: string) => {
    setAppState('analyzing');
    setProgress({ stage: 'validating', progress: 0, message: 'Starting analysis...' });

    try {
      const analysisResult = await simulateCrawling(url, (p) => {
        setProgress(p);
      });

      setResult(analysisResult);
      setAppState('results');
    } catch (error) {
      console.error('Analysis failed:', error);
      setAppState('idle');
    }
  }, []);

  const handleReset = useCallback(() => {
    setAppState('idle');
    setResult(null);
    setProgress({ stage: 'validating', progress: 0, message: '' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Glow Effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-800/50 backdrop-blur-sm bg-slate-900/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <span className="text-xl">👻</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    GhostNet
                  </h1>
                  <p className="text-xs text-slate-500">Dead Internet Detector</p>
                </div>
              </div>

              {appState === 'results' && (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  New Analysis
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {appState === 'idle' && (
            <div className="space-y-12">
              {/* Hero Section */}
              <div className="text-center space-y-6 py-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-sm text-slate-400">
                  <span className="animate-pulse">🔴</span>
                  <span>Is your favorite community actually alive?</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-bold">
                  <span className="text-white">Detect </span>
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Ghost Towns</span>
                  <span className="text-white"> on the Internet</span>
                </h2>
                
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  GhostNet analyzes communities to find out if they're thriving with real humans 
                  or just bots pretending to be alive.
                </p>

                {/* URL Input */}
                <div className="pt-4">
                  <URLInput onAnalyze={handleAnalyze} isAnalyzing={false} />
                </div>
              </div>

              {/* How It Works */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">1. Crawl the Site</h3>
                  <p className="text-slate-400 text-sm">
                    We scan the community for posts, comments, likes, and user activity patterns.
                  </p>
                </div>

                <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                  <div className="w-12 h-12 rounded-lg bg-violet-500/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">2. Detect Bots</h3>
                  <p className="text-slate-400 text-sm">
                    Using NLP and timing analysis, we identify patterns that reveal bot activity.
                  </p>
                </div>

                <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">3. Score & Classify</h3>
                  <p className="text-slate-400 text-sm">
                    Get a Life Score (0-100) and see if the community is 🟢 ALIVE, 🟡 DYING, or 🔴 DEAD.
                  </p>
                </div>
              </div>

              {/* Warning Banner */}
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">⚠️</span>
                  <div>
                    <h3 className="text-lg font-semibold text-red-400 mb-2">The Dead Internet Problem</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Many online communities look active but are actually ghost towns filled with bots. 
                      They have posts, comments, and likes — but no real humans. You ask a question and 
                      wait weeks for a reply that never comes. GhostNet helps you identify these communities 
                      before you waste your time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {appState === 'analyzing' && (
            <div className="py-12">
              <CrawlingProgress progress={progress} />
            </div>
          )}

          {appState === 'results' && result && (
            <div className="space-y-8">
              {/* Life Score Hero */}
              <div className="text-center py-8">
                <LifeScoreDisplay score={result.lifeScore} status={result.status} />
              </div>

              {/* Analysis Summary */}
              <AnalysisSummary result={result} />

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ActivityTimeline data={result.activityTimeline} trend={result.activityTrend} />
                <EngagementHeatmap data={result.heatmapData} botScore={result.botDetection.overallBotScore} />
              </div>

              {/* Bot Detection & Engagement */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BotDetectionPanel result={result.botDetection} />
                <EngagementPanel engagement={result.engagement} />
              </div>

              {/* Scoring Explanation */}
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span>🧮</span>
                  How the Score Was Calculated
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-900/50 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">
                      {result.daysSinceLastPost > 365 ? '-40' : result.daysSinceLastPost > 90 ? '-25' : result.daysSinceLastPost > 30 ? '-10' : '0'}
                    </div>
                    <div className="text-slate-400 text-sm">Recency (40pts max)</div>
                    <div className="text-slate-500 text-xs mt-1">
                      {result.daysSinceLastPost} days since last post
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-lg">
                    <div className="text-2xl font-bold text-violet-400 mb-1">
                      {result.activityTrend === 'declining' ? '-25' : result.activityTrend === 'flatlined' ? '-25' : '0'}
                    </div>
                    <div className="text-slate-400 text-sm">Activity Trend (25pts max)</div>
                    <div className="text-slate-500 text-xs mt-1">
                      Activity is {result.activityTrend}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-lg">
                    <div className="text-2xl font-bold text-rose-400 mb-1">
                      -{Math.round(result.botDetection.overallBotScore * 20)}
                    </div>
                    <div className="text-slate-400 text-sm">Bot Detection (20pts max)</div>
                    <div className="text-slate-500 text-xs mt-1">
                      {Math.round(result.botDetection.overallBotScore * 100)}% bot activity
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-400 mb-1">
                      -{Math.round((1 - result.engagement.authenticityScore) * 15)}
                    </div>
                    <div className="text-slate-400 text-sm">Engagement (15pts max)</div>
                    <div className="text-slate-500 text-xs mt-1">
                      {Math.round(result.engagement.authenticityScore * 100)}% authentic
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/50 mt-12 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-slate-500 text-sm">
              GhostNet — Detecting ghost towns on the internet since 2024
            </p>
            <p className="text-slate-600 text-xs mt-2">
              Built with NLP, time-series analysis, and a healthy skepticism of bots
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
