const origin = "http://localhost:3000/api";

export default async function commonFetch<T>(
  url: string,
  searchParams?: Record<string, any>,
  requestInit?: RequestInit
): Promise<T | null> {
  if (searchParams) {
    Object.keys(searchParams).forEach((key) => searchParams[key] === undefined && delete searchParams[key]);
    url = url + "?" + new URLSearchParams(searchParams);
  }
  const response = await fetch(origin + url, requestInit)
    .then((res) => res.json())
    .catch(() => {
      return null;
    });
  return response;
}
