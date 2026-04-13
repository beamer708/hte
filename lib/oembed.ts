export interface OEmbedData {
  title: string;
  author_name: string;
  thumbnail_url: string;
}

export async function fetchOEmbed(videoUrl: string): Promise<OEmbedData | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      title: data.title ?? "",
      author_name: data.author_name ?? "",
      thumbnail_url: data.thumbnail_url ?? "",
    };
  } catch {
    return null;
  }
}
