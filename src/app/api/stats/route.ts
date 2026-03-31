import { NextResponse } from "next/server";
import prisma from "../prisma";
import { apiError } from "@/consts/apiError";
import dayjs from "dayjs";

interface CloudflareAnalyticsGroup {
  dimensions: { date: string };
  sum: { requests: number; pageViews: number };
  uniq: { uniques: number };
}

async function getCloudflareVisitors() {
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!zoneId || !apiToken) return null;

  const endDate = dayjs().format("YYYY-MM-DD");
  const startDate = dayjs().subtract(29, "day").format("YYYY-MM-DD");

  const query = `
    query {
      viewer {
        zones(filter: { zoneTag: "${zoneId}" }) {
          httpRequests1dGroups(
            limit: 30
            filter: { date_geq: "${startDate}", date_leq: "${endDate}" }
            orderBy: [date_ASC]
          ) {
            dimensions { date }
            sum { requests pageViews }
            uniq { uniques }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const json = await res.json();
  const groups: CloudflareAnalyticsGroup[] =
    json?.data?.viewer?.zones?.[0]?.httpRequests1dGroups ?? [];

  return groups.map((g) => ({
    date: g.dimensions.date,
    requests: g.sum.requests,
    pageViews: g.sum.pageViews,
    uniques: g.uniq.uniques,
  }));
}

export async function GET() {
  try {
    const [totalPosts, totalComments, visitors] = await Promise.all([
      prisma.post.count({ where: { published: true } }),
      prisma.comment.count(),
      getCloudflareVisitors(),
    ]);

    const totalVisitors = visitors?.reduce((sum, d) => sum + d.uniques, 0) ?? null;

    return NextResponse.json({
      totalPosts,
      totalComments,
      totalVisitors,
      visitors: visitors ?? [],
    });
  } catch (error) {
    console.error(error);
    return apiError.internalServerError("통계 조회");
  }
}
