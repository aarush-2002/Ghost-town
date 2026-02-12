import { useState } from 'react';
import { cn } from '@/utils/cn';

interface URLInputProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

export function URLInput({ onAnalyze, isAnalyzing }: URLInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      let finalUrl = url.trim();
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://' + finalUrl;
      }
      onAnalyze(finalUrl);
    }
  };

  const exampleUrls = [
    { label: 'Reddit r/python', url: 'https://reddit.com/r/python' },
    { label: 'Stack Overflow', url: 'https://stackoverflow.com/questions' },
    { label: 'GitHub', url: 'https://github.com/trending' },
    { label: 'Example Forum', url: 'https://old-forum.example.com' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a URL to analyze (e.g., reddit.com/r/community)"
            disabled={isAnalyzing}
            className={cn(
              "w-full pl-12 pr-4 py-4 rounded-xl",
              "bg-slate-800/50 border border-slate-700",
              "text-white placeholder-slate-500",
              "focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "text-lg"
            )}
          />
        </div>

        <button
          type="submit"
          disabled={isAnalyzing || !url.trim()}
          className={cn(
            "w-full py-4 px-6 rounded-xl",
            "bg-gradient-to-r from-cyan-500 to-blue-600",
            "text-white font-semibold text-lg",
            "shadow-lg shadow-cyan-500/25",
            "hover:shadow-xl hover:shadow-cyan-500/30",
            "transform transition-all duration-200",
            "hover:scale-[1.02] active:scale-[0.98]",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
            "flex items-center justify-center gap-3"
          )}
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span className="text-xl">🔍</span>
              <span>Analyze Community</span>
            </>
          )}
        </button>
      </form>

      {/* Example URLs */}
      <div className="mt-6">
        <p className="text-slate-500 text-sm text-center mb-3">Try these examples:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {exampleUrls.map((example) => (
            <button
              key={example.url}
              onClick={() => setUrl(example.url)}
              disabled={isAnalyzing}
              className={cn(
                "px-4 py-2 rounded-lg",
                "bg-slate-800/30 border border-slate-700/50",
                "text-slate-400 text-sm",
                "hover:bg-slate-700/50 hover:text-slate-300",
                "transition-colors duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
