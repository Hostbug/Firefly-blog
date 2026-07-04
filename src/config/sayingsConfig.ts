export interface Saying {
	id: number;
	content: string;
	images?: string[];
	time: string;
	location?: string;
	likes: number;
	comments?: { author: string; text: string; time?: string }[];
	tags?: string[];
}

export const sayingsData: Saying[] = [
	{
		id: 1,
		content: "今天的晚霞很好看，想分享给你们。\n生活偶尔也需要按下暂停键，抬头看看天空。",
		time: "2026-07-04 19:30",
		location: "阳台",
		likes: 12,
		comments: [
			{ author: "小鱼", text: "好治愈！", time: "20:01" },
            { author: "小熊", text: "我也喜欢看晚霞~", time: "20:02" },
		],
	},

];
