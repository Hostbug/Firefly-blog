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
  },
  {
    id: 4,
    content: "我经常会在睡不着的时候反思，反思我走过的路，我做过的决定，如果可以重来的话，我会不会做出不同的选择。我也会在某一个瞬间觉得自己走错了很多路。",
    media: [
      { type: "video", url: "/assets/videos/1074.mp4" }
  ],
    time: "2026-07-28 00:00",
    location: "127.0.0.1",
    likes: 520,
    tags: ["日常"],
  },
  {
    id: 5,
    content: "test img 1",
    media: [
    { type: "image", url: "http://gallery.hwh.ccwu.cc/img/a8a3551bf4fb.jpg" }
  ],
    time: "2026-07-28 00:11",
    location: "127.0.0.1",
    likes: 520,
    tags: ["日常"],
  }
];
