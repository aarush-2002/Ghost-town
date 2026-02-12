export type LifeStatus = 'alive' | 'dying' | 'dead';

export interface ActivityData {
  month: string;
  posts: number;
  comments: number;
}

export interface HeatmapData {
  day: string;
  hour: number;
  activity: number;
}

export interface BotDetectionResult {
  repetitivePhrasing: number;
  unnaturalTiming: number;
  accountPatterns: number;
  languageComplexity: number;
  overallBotScore: number;
}

export interface EngagementData {
  likesToComments: number;
  timingPattern: 'gradual' | 'spike' | 'mixed';
  commentDiversity: number;
  authenticityScore: number;
}

export interface AnalysisResult {
  url: string;
  platform: string;
  lifeScore: number;
  status: LifeStatus;
  lastActivity: string;
  daysSinceLastPost: number;
  activityTrend: 'growing' | 'stable' | 'declining' | 'flatlined';
  activityTimeline: ActivityData[];
  heatmapData: HeatmapData[];
  botDetection: BotDetectionResult;
  engagement: EngagementData;
  analyzedAt: Date;
}

export interface CrawlProgress {
  stage: string;
  progress: number;
  message: string;
}
