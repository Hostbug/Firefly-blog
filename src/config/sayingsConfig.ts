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
		time: "2026-07-04 19:30",
		location: "阳台",
		likes: 12,
		media: [
			{ type: "image", url: "/assets/images/sakura.png" },
		],
	},
	{
		id: 2,
		content: "终于把博客从旧模板迁移到 Firefly 主题了，折腾了一整个周末，但看到成品的那一刻觉得值了。\n新的开始 🚀",
		time: "2026-07-02 23:15",
		likes: 23,
		tags: ["技术", "博客"],
	},
	{
		id: 3,
		content: "深夜听歌写代码，全世界都安静了，只剩下键盘声和音乐。\n这种心流状态真的会上瘾。",
		time: "2026-07-01 01:20",
		likes: 18,
		tags: ["日常"],
	},
	{
		id: 4,
		content: "今天吃到了一家超好吃的拉面店 🍜\n浓郁的豚骨汤底，溏心蛋刚刚好。\n幸福感拉满的一天。",
		time: "2026-06-28 12:30",
		location: "某条小巷子",
		likes: 31,
		media: [
			{ type: "video", url: "/assets/videos/sample.mp4", poster: "/assets/images/sakura.png" },
		],
	},
	{
		id: 5,
		content: "读完了《百年孤独》。\n马尔克斯笔下的时间是圆的，所有的事都在重复，又都不一样。\n好书值得反复读。",
		time: "2026-06-25 22:00",
		likes: 15,
		tags: ["读书"],
	},
	{
		id: 6,
		content: "下雨天，窝在沙发上看了一下午的番。\n窗外雨声淅沥，屏幕里是另一个世界。\n完美的周末。",
		time: "2026-06-22 17:00",
		likes: 20,
		tags: ["番剧", "周末"],
	},
	{
		id: 7,
		content: "学到了一个新 CSS 技巧，原来 grid 布局还能这样用！\n感觉自己又变强了一点点 ✨\n技术分享链接已放在评论区。",
		time: "2026-06-20 14:30",
		likes: 27,
		tags: ["技术", "CSS"],
	},
	{
		id: 8,
		content: "下班路上拍到的云彩，像棉花糖一样。\n有时候觉得，美就在身边，只是我们走得太快。",
		time: "2026-06-18 18:45",
		location: "回家路上",
		likes: 19,
	},
	{
		id: 9,
		content: "新入手了一套键帽，樱桃粉轴的手感太好了。\n噼里啪啦的声音是写代码的 BGM。\n（邻居可能不这么想）",
		time: "2026-06-15 20:00",
		likes: 35,
		tags: ["装备"],
	},
	{
		id: 10,
		content: "凌晨三点的 bug，清晨六点终于修好了。\n原来是一个分号的问题。\n世界和平了，我也要去和平了（睡觉）。",
		time: "2026-06-12 06:15",
		likes: 42,
		tags: ["编程", "日常"],
	},
	{
		id: 11,
		content: "周末去了趟花鸟市场，买了一盆小多肉。\n希望这次能养活它 🌱\n（上次的仙人掌已经……算了不提了）",
		time: "2026-06-08 16:00",
		location: "花鸟市场",
		likes: 16,
	},
	{
		id: 12,
		content: "深夜的网易云推了一首老歌，突然想起了很多事。\n有些歌之所以好听，是因为它承载了一段记忆。",
		time: "2026-06-05 23:40",
		likes: 28,
		tags: ["音乐", "感悟"],
	},
];
