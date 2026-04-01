import type { MetadataRoute } from "next";
import { getQueryClient } from "@/lib/getQueryClient";
import { postsOptions } from "@/services/post/options";

const BASE_URL = "https://kotys.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result = await getQueryClient()
    .fetchQuery(postsOptions({ limit: 1000, temp: false }))
    .catch(() => null);

  const postEntries: MetadataRoute.Sitemap = (result?.posts ?? []).map((post) => ({
    url: `${BASE_URL}/post/${post.uid}`,
    lastModified: new Date(post.updated_date ?? post.register_date),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/posts`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...postEntries,
  ];
}
