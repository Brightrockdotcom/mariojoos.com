// Server-side only. Never import this into a Client Component's runtime path,
// and never read BRIGHTROCK_PUBLIC_API_KEY anywhere that ships to the browser.
// (The lack of a NEXT_PUBLIC_ prefix means Next will not inline it client-side.)

export interface Creator {
  channelId: string;
  channelUrl: string | null;
  name: string | null;
  followerCount: number | null;
  profileImageUrl: string | null;
  strategistName: string | null;
  updatedAt: string | null;
}

const ENDPOINT = "https://workspace.brightrock.com/api/public/verified-creators";

/**
 * Fetches verified creators from the Brightrock Workspace API.
 * Returns an empty array on any non-200 response or network error so the
 * page never crashes. Cached for 300s to match the endpoint's s-maxage.
 */
export async function getCreators(): Promise<Creator[]> {
  const key = process.env.BRIGHTROCK_PUBLIC_API_KEY;
  if (!key) return [];

  try {
    const res = await fetch(ENDPOINT, {
      headers: {
        Authorization: `Bearer ${key}`,
        "x-api-key": key,
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) return [];

    const data = (await res.json()) as { creators?: Creator[] } | null;
    return Array.isArray(data?.creators) ? data!.creators : [];
  } catch {
    return [];
  }
}
