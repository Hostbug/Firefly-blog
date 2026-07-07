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
    id: 1,
    content: "今天的晚霞很好看，想分享给你们。\n生活偶尔也需要按下暂停键，抬头看看天空。",
    media: [
    { type: "image", url: "/assets/images/sakura.png" }
  ],
    time: "2026-07-04 19:30",
    location: "阳台",
    likes: 12,
    tags: [],
  },
  {
    id: 2,
    content: "终于把博客从旧模板迁移到 Firefly 主题了，折腾了一整个周末，但看到成品的那一刻觉得值了。\n新的开始 🚀",
    media: [],
    time: "2026-07-02 23:15",
    location: "",
    likes: 23,
    tags: ["技术", "博客"],
  },
  {
    id: 3,
    content: "深夜听歌写代码，全世界都安静了，只剩下键盘声和音乐。\n这种心流状态真的会上瘾。",
    media: [],
    time: "2026-07-01 01:20",
    location: "",
    likes: 18,
    tags: ["日常"],
  }
];
