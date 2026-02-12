import type { 
  AnalysisResult, 
  ActivityData, 
  HeatmapData, 
  BotDetectionResult, 
  EngagementData,
  CrawlProgress,
  LifeStatus 
} from '@/types';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function detectPlatform(url: string): string {
  if (url.includes('reddit.com')) return 'Reddit';
  if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter/X';
  if (url.includes('facebook.com')) return 'Facebook';
  if (url.includes('discord.com')) return 'Discord';
  if (url.includes('stackoverflow.com')) return 'Stack Overflow';
  if (url.includes('medium.com')) return 'Medium';
  if (url.includes('github.com')) return 'GitHub';
  if (url.includes('quora.com')) return 'Quora';
  if (url.includes('phpbb') || url.includes('forum')) return 'Forum';
  return 'Website';
}

function generateActivityTimeline(status: LifeStatus): ActivityData[] {
  const currentMonth = new Date().getMonth();
  const data: ActivityData[] = [];
  
  for (let i = 11; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    let posts: number;
    let comments: number;
    
    if (status === 'alive') {
      posts = Math.floor(Math.random() * 50) + 80 - i * 2;
      comments = Math.floor(posts * (1.5 + Math.random()));
    } else if (status === 'dying') {
      posts = Math.floor((80 - i * 7) * (1 + Math.random() * 0.3));
      posts = Math.max(1, posts);
      comments = Math.floor(posts * (1 + Math.random()));
    } else {
      posts = Math.floor((30 - i * 3) * (1 + Math.random() * 0.2));
      posts = Math.max(0, posts);
      comments = Math.floor(posts * 0.5);
    }
    
    data.push({
      month: MONTHS[monthIndex],
      posts,
      comments
    });
  }
  
  return data;
}

function generateHeatmapData(status: LifeStatus, botScore: number): HeatmapData[] {
  const data: HeatmapData[] = [];
  
  for (const day of DAYS) {
    for (let hour = 0; hour < 24; hour += 3) {
      let activity: number;
      
      const isWorkHour = hour >= 9 && hour <= 18;
      const isWeekend = day === 'Sat' || day === 'Sun';
      
      if (status === 'dead') {
        activity = Math.floor(Math.random() * 10);
      } else if (botScore > 0.7) {
        // Bots are active 24/7
        activity = Math.floor(Math.random() * 40) + 60;
      } else {
        // Human pattern
        if (isWeekend) {
          activity = isWorkHour ? Math.floor(Math.random() * 30) + 40 : Math.floor(Math.random() * 20);
        } else {
          activity = isWorkHour ? Math.floor(Math.random() * 50) + 50 : Math.floor(Math.random() * 25) + 10;
        }
      }
      
      data.push({ day, hour, activity });
    }
  }
  
  return data;
}

function generateBotDetection(status: LifeStatus): BotDetectionResult {
  let baseScore: number;
  
  if (status === 'dead') {
    baseScore = 0.7 + Math.random() * 0.25;
  } else if (status === 'dying') {
    baseScore = 0.3 + Math.random() * 0.4;
  } else {
    baseScore = 0.05 + Math.random() * 0.2;
  }
  
  return {
    repetitivePhrasing: Math.min(1, baseScore + (Math.random() * 0.2 - 0.1)),
    unnaturalTiming: Math.min(1, baseScore + (Math.random() * 0.2 - 0.1)),
    accountPatterns: Math.min(1, baseScore * 0.8 + Math.random() * 0.2),
    languageComplexity: Math.min(1, 1 - baseScore * 0.5 + Math.random() * 0.2),
    overallBotScore: baseScore
  };
}

function generateEngagement(status: LifeStatus, botScore: number): EngagementData {
  let likesToComments: number;
  let timingPattern: 'gradual' | 'spike' | 'mixed';
  let commentDiversity: number;
  
  if (status === 'dead') {
    likesToComments = 50 + Math.random() * 100; // Suspicious ratio
    timingPattern = 'spike';
    commentDiversity = 0.1 + Math.random() * 0.2;
  } else if (status === 'dying') {
    likesToComments = 10 + Math.random() * 30;
    timingPattern = botScore > 0.5 ? 'spike' : 'mixed';
    commentDiversity = 0.3 + Math.random() * 0.3;
  } else {
    likesToComments = 3 + Math.random() * 7;
    timingPattern = 'gradual';
    commentDiversity = 0.6 + Math.random() * 0.3;
  }
  
  const authenticityScore = status === 'alive' 
    ? 0.7 + Math.random() * 0.25 
    : status === 'dying' 
      ? 0.3 + Math.random() * 0.4 
      : 0.1 + Math.random() * 0.2;
  
  return {
    likesToComments,
    timingPattern,
    commentDiversity,
    authenticityScore
  };
}

export function generateAnalysisResult(url: string): AnalysisResult {
  // Deterministic "random" based on URL for consistency
  const hash = url.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
  const rand = (offset = 0) => Math.abs(Math.sin(hash + offset));
  
  // Determine status based on URL characteristics
  let status: LifeStatus;
  const urlLower = url.toLowerCase();
  
  if (urlLower.includes('reddit.com/r/python') || 
      urlLower.includes('stackoverflow.com') ||
      urlLower.includes('github.com')) {
    status = 'alive';
  } else if (urlLower.includes('myspace') || 
             urlLower.includes('geocities') ||
             urlLower.includes('2010')) {
    status = 'dead';
  } else if (rand(1) > 0.6) {
    status = 'alive';
  } else if (rand(1) > 0.3) {
    status = 'dying';
  } else {
    status = 'dead';
  }
  
  const botDetection = generateBotDetection(status);
  const activityTimeline = generateActivityTimeline(status);
  const heatmapData = generateHeatmapData(status, botDetection.overallBotScore);
  const engagement = generateEngagement(status, botDetection.overallBotScore);
  
  // Calculate life score
  let score = 100;
  
  // Factor 1: Recency (40 points)
  const lastActivityIdx = activityTimeline.length - 1;
  const recentActivity = activityTimeline[lastActivityIdx].posts;
  if (recentActivity === 0) {
    score -= 40;
  } else if (recentActivity < 5) {
    score -= 25;
  } else if (recentActivity < 15) {
    score -= 10;
  }
  
  // Factor 2: Activity Trend (25 points)
  const oldAvg = activityTimeline.slice(0, 6).reduce((a, b) => a + b.posts, 0) / 6;
  const newAvg = activityTimeline.slice(6).reduce((a, b) => a + b.posts, 0) / 6;
  if (newAvg < oldAvg * 0.3) {
    score -= 25;
  } else if (newAvg < oldAvg * 0.6) {
    score -= 15;
  }
  
  // Factor 3: Bot Percentage (20 points)
  score -= Math.floor(botDetection.overallBotScore * 20);
  
  // Factor 4: Engagement Authenticity (15 points)
  score -= Math.floor((1 - engagement.authenticityScore) * 15);
  
  score = Math.max(0, Math.min(100, Math.round(score)));
  
  // Override status based on score
  if (score >= 70) {
    status = 'alive';
  } else if (score >= 40) {
    status = 'dying';
  } else {
    status = 'dead';
  }
  
  const daysSinceLastPost = status === 'dead' 
    ? Math.floor(180 + Math.random() * 500)
    : status === 'dying'
      ? Math.floor(14 + Math.random() * 60)
      : Math.floor(Math.random() * 3);
  
  return {
    url,
    platform: detectPlatform(url),
    lifeScore: score,
    status,
    lastActivity: `${daysSinceLastPost} days ago`,
    daysSinceLastPost,
    activityTrend: newAvg > oldAvg * 1.1 ? 'growing' : newAvg > oldAvg * 0.8 ? 'stable' : newAvg > oldAvg * 0.2 ? 'declining' : 'flatlined',
    activityTimeline,
    heatmapData,
    botDetection,
    engagement,
    analyzedAt: new Date()
  };
}

export async function simulateCrawling(
  url: string,
  onProgress: (progress: CrawlProgress) => void
): Promise<AnalysisResult> {
  const stages = [
    { stage: 'validating', message: 'Validating URL...', duration: 500 },
    { stage: 'connecting', message: 'Connecting to server...', duration: 800 },
    { stage: 'crawling', message: 'Crawling page content...', duration: 1200 },
    { stage: 'extracting', message: 'Extracting posts and comments...', duration: 1000 },
    { stage: 'analyzing', message: 'Analyzing activity patterns...', duration: 1500 },
    { stage: 'detecting', message: 'Running bot detection...', duration: 1200 },
    { stage: 'scoring', message: 'Calculating life score...', duration: 800 },
  ];
  
  let totalProgress = 0;
  
  for (const { stage, message, duration } of stages) {
    const steps = 5;
    for (let i = 1; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, duration / steps));
      totalProgress = Math.min(99, totalProgress + (100 / (stages.length * steps)));
      onProgress({
        stage,
        progress: Math.round(totalProgress),
        message: `${message} (${Math.round((i / steps) * 100)}%)`
      });
    }
  }
  
  onProgress({ stage: 'complete', progress: 100, message: 'Analysis complete!' });
  
  return generateAnalysisResult(url);
}
