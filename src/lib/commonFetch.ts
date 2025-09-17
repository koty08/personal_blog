const origin = "http://localhost:3000/api";

export default async function commonFetch<T>(
  url: string,
  searchParams?: Record<string, string | undefined>,
  requestInit?: RequestInit
): Promise<T | null> {
  if (searchParams) {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, value);
    });
    url = url + "?" + params.toString();
  }

  const response = await fetch(origin + url, requestInit)
    .then((res) => res.json())
    .catch(() => {
      return null;
    });
  return response;
}
