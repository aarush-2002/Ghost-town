import type { HeatmapData } from '@/types';
import { cn } from '@/utils/cn';

interface EngagementHeatmapProps {
  data: HeatmapData[];
  botScore: number;
}

export function EngagementHeatmap({ data, botScore }: EngagementHeatmapProps) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = [0, 3, 6, 9, 12, 15, 18, 21];

  const getActivity = (day: string, hour: number) => {
    const item = data.find(d => d.day === day && d.hour === hour);
    return item?.activity ?? 0;
  };

  const getActivityColor = (activity: number) => {
    if (activity === 0) return 'bg-slate-800';
    if (activity < 20) return 'bg-slate-700';
    if (activity < 40) return 'bg-emerald-900';
    if (activity < 60) return 'bg-emerald-700';
    if (activity < 80) return 'bg-emerald-500';
    return 'bg-emerald-400';
  };

  const isLikelyBots = botScore > 0.5;

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="text-xl">🗓️</span>
          Activity Heatmap
        </h3>
        <div className={cn(
          "flex items-center gap-2 px-3 py-1 rounded-full text-sm",
          isLikelyBots ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
        )}>
          <span>{isLikelyBots ? '🤖' : '👤'}</span>
          <span>{isLikelyBots ? 'Bot-like pattern' : 'Human pattern'}</span>
        </div>
      </div>

      {/* Explanation */}
      <div className="mb-4 p-3 bg-slate-900/50 rounded-lg text-sm text-slate-400">
        {isLikelyBots ? (
          <p>
            <span className="text-red-400 font-medium">⚠️ Suspicious:</span> Activity is evenly distributed across all hours, including 3-6 AM. 
            Real humans sleep—bots don't!
          </p>
        ) : (
          <p>
            <span className="text-emerald-400 font-medium">✓ Normal:</span> Activity peaks during daytime hours with lower activity at night. 
            This matches typical human behavior.
          </p>
        )}
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto">
        <div className="min-w-fit">
          {/* Hour labels */}
          <div className="flex mb-2 ml-12">
            {hours.map(hour => (
              <div key={hour} className="w-10 text-center text-xs text-slate-500">
                {hour}:00
              </div>
            ))}
          </div>

          {/* Grid */}
          {days.map(day => (
            <div key={day} className="flex items-center mb-1">
              <div className="w-10 text-xs text-slate-500 text-right pr-2">{day}</div>
              <div className="flex gap-1">
                {hours.map(hour => {
                  const activity = getActivity(day, hour);
                  return (
                    <div
                      key={hour}
                      className={cn(
                        "w-9 h-9 rounded transition-all hover:scale-110 cursor-pointer",
                        getActivityColor(activity),
                        "flex items-center justify-center text-xs font-medium",
                        activity > 50 ? "text-slate-900" : "text-slate-400"
                      )}
                      title={`${day} ${hour}:00 - Activity: ${activity}`}
                    >
                      {activity > 0 && activity}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-1 mt-4">
        <span className="text-xs text-slate-500 mr-2">Less</span>
        <div className="w-4 h-4 rounded bg-slate-800" />
        <div className="w-4 h-4 rounded bg-slate-700" />
        <div className="w-4 h-4 rounded bg-emerald-900" />
        <div className="w-4 h-4 rounded bg-emerald-700" />
        <div className="w-4 h-4 rounded bg-emerald-500" />
        <div className="w-4 h-4 rounded bg-emerald-400" />
        <span className="text-xs text-slate-500 ml-2">More</span>
      </div>
    </div>
  );
}
