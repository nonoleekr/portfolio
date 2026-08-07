import Slugger from "github-slugger";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractToc(markdown: string): TocItem[] {
  const slugger = new Slugger();
  const lines = markdown.split("\n");
  const items: TocItem[] = [];

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.*)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1]?.length as 2 | 3;
    const text = (match[2] ?? "").replace(/[*`_]/g, "").trim();
    items.push({ id: slugger.slug(text), text, level });
  }

  return items;
}
