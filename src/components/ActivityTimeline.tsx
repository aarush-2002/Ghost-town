import type { ActivityData } from '@/types';

interface ActivityTimelineProps {
  data: ActivityData[];
  trend: 'growing' | 'stable' | 'declining' | 'flatlined';
}

export function ActivityTimeline({ data, trend }: ActivityTimelineProps) {
  const maxPosts = Math.max(...data.map(d => d.posts), 1);
  const maxComments = Math.max(...data.map(d => d.comments), 1);
  const maxValue = Math.max(maxPosts, maxComments);

  const chartWidth = 700;
  const chartHeight = 200;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  const getX = (index: number) => padding.left + (index / (data.length - 1)) * graphWidth;
  const getY = (value: number) => padding.top + graphHeight - (value / maxValue) * graphHeight;

  const postsPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.posts)}`).join(' ');
  const commentsPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.comments)}`).join(' ');

  const trendConfig = {
    growing: { icon: '📈', label: 'Growing', color: 'text-emerald-400' },
    stable: { icon: '➡️', label: 'Stable', color: 'text-blue-400' },
    declining: { icon: '📉', label: 'Declining', color: 'text-amber-400' },
    flatlined: { icon: '💀', label: 'Flatlined', color: 'text-red-400' }
  };

  const trendInfo = trendConfig[trend];

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="text-xl">📊</span>
          Activity Timeline
        </h3>
        <div className={`flex items-center gap-2 ${trendInfo.color}`}>
          <span>{trendInfo.icon}</span>
          <span className="text-sm font-medium">{trendInfo.label}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg width={chartWidth} height={chartHeight} className="min-w-full">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(percent => (
            <g key={percent}>
              <line
                x1={padding.left}
                y1={getY(maxValue * percent / 100)}
                x2={chartWidth - padding.right}
                y2={getY(maxValue * percent / 100)}
                stroke="currentColor"
                strokeWidth="1"
                className="text-slate-700"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 10}
                y={getY(maxValue * percent / 100)}
                fill="currentColor"
                className="text-slate-500 text-xs"
                textAnchor="end"
                dominantBaseline="middle"
              >
                {Math.round(maxValue * percent / 100)}
              </text>
            </g>
          ))}

          {/* X-axis labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={getX(i)}
              y={chartHeight - 10}
              fill="currentColor"
              className="text-slate-500 text-xs"
              textAnchor="middle"
            >
              {d.month}
            </text>
          ))}

          {/* Comments area */}
          <path
            d={`${commentsPath} L ${getX(data.length - 1)} ${chartHeight - padding.bottom} L ${getX(0)} ${chartHeight - padding.bottom} Z`}
            fill="url(#commentsGradient)"
            opacity="0.3"
          />

          {/* Posts area */}
          <path
            d={`${postsPath} L ${getX(data.length - 1)} ${chartHeight - padding.bottom} L ${getX(0)} ${chartHeight - padding.bottom} Z`}
            fill="url(#postsGradient)"
            opacity="0.3"
          />

          {/* Comments line */}
          <path
            d={commentsPath}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Posts line */}
          <path
            d={postsPath}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {data.map((d, i) => (
            <g key={i}>
              <circle cx={getX(i)} cy={getY(d.posts)} r="4" fill="#06b6d4" className="stroke-slate-900" strokeWidth="2" />
              <circle cx={getX(i)} cy={getY(d.comments)} r="4" fill="#8b5cf6" className="stroke-slate-900" strokeWidth="2" />
            </g>
          ))}

          <defs>
            <linearGradient id="postsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="commentsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500" />
          <span className="text-slate-400 text-sm">Posts</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-violet-500" />
          <span className="text-slate-400 text-sm">Comments</span>
        </div>
      </div>
    </div>
  );
}
