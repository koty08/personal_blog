"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Eye } from "lucide-react";
import { statsOptions } from "@/services/stats/options";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";

export default function StatsGraph() {
  const { data } = useSuspenseQuery(statsOptions);

  if (data.visitors.length === 0) return null;

  const chartData = data.visitors.map((d) => ({
    date: dayjs(d.date).format("MM/DD"),
    방문자: d.uniques,
    페이지뷰: d.pageViews,
  }));

  return (
    <Card className="border-border/50 gap-4 py-1">
      <CardHeader className="px-4 pt-3 pb-1">
        <CardTitle className="flex items-center gap-2 text-xs font-medium">
          <Eye className="h-3.5 w-3.5" />
          최근 30일 통계
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3">
        <ResponsiveContainer width="100%" height={130}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUniques" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-5)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="var(--chart-5)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11 }}
              className="fill-muted-foreground"
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              itemStyle={{ color: "hsl(var(--muted-foreground))" }}
            />
            <Area
              type="monotone"
              dataKey="페이지뷰"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1.5}
              fill="url(#colorPageViews)"
              dot={false}
            />
            <Area type="monotone" dataKey="방문자" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorUniques)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
