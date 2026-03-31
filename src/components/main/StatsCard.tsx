"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Users, ScrollText, MessageSquare } from "lucide-react";
import { statsOptions } from "@/services/stats/options";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function StatsCards() {
  const { data } = useSuspenseQuery(statsOptions);

  const statCards = [
    ...(data.totalVisitors !== null ? [{ label: "최근 30일 방문자", value: data.totalVisitors.toLocaleString(), icon: Users }] : []),
    { label: "전체 게시글", value: data.totalPosts.toLocaleString(), icon: ScrollText },
    { label: "전체 댓글", value: data.totalComments.toLocaleString(), icon: MessageSquare },
  ];

  return (
    <div className="justify-space flex w-full flex-wrap gap-2 md:justify-end">
      {statCards.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="border-border/50 max-w-40 flex-1 justify-between gap-2 py-2">
          <CardHeader className="flex flex-row items-center space-y-0 px-3 pt-3 pb-1">
            <Icon className="text-muted-foreground hidden h-3.5 w-3.5 shrink-0 sm:block" />
            <CardTitle className="text-muted-foreground text-xs">{label}</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <p className="text-xl font-bold">{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
