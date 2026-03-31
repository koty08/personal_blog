export interface DailyVisitor {
  date: string;
  requests: number;
  pageViews: number;
  uniques: number;
}

export interface StatsData {
  totalPosts: number;
  totalComments: number;
  totalVisitors: number | null;
  visitors: DailyVisitor[];
}
