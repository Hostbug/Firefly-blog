export interface SayingMedia {
  type: "image" | "video";
  url: string;
  poster?: string;
}

export interface Saying {
  id: number;
  content: string;
  media?: SayingMedia[];
  time: string;
  location?: string;
  likes: number;
  tags?: string[];
}

export const sayingsData: Saying[] = [
  {
    id: 3,
    content: "深夜听歌写代码，全世界都安静了，只剩下键盘声和音乐。\n这种心流状态真的会上瘾。",
    media: [],
    time: "2026-07-07 19:20",
    location: "127.0.0.1",
    likes: 520,
    tags: ["日常"],
  }
];
