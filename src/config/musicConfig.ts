import type { MusicPlayerConfig } from "../types/config";

// 音乐播放器配置
export const musicPlayerConfig: MusicPlayerConfig = {
// 禁用音乐播放器方法：
// 模板默认侧边栏和导航栏两个都显示
// 1. 侧边栏：在sidebarConfig.ts侧边栏配置把音乐组件enable设为false禁用即可
// 2. 导航栏：在本配置文件把showInNavbar设为false禁用即可

	// 是否在导航栏显示音乐播放器入口
	showInNavbar: true,

	// 使用方式："meting" 使用 Meting API，"local" 使用本地音乐列表
	mode: "local",

	// 默认音量 (0-1)
	volume: 0.7,

	// 播放模式：'list'=列表循环, 'one'=单曲循环, 'random'=随机播放
	playMode: "list",

	// 是否显启用歌词
	showLyrics: true,

	// Meting API 配置
	meting: {
		//  https://api.injahow.cn/meting/?server=netease&type=playlist&id=5227743727
		// Meting API 地址
		// 默认使用官方 API，也可以使用自定义 API
		api: "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id",
		// 音乐平台：netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
		server: "netease",
		// 类型：song=单曲, playlist=歌单, album=专辑, search=搜索, artist=艺术家
		type: "playlist",
		// 歌单/专辑/单曲 ID 或搜索关键词
		id: "5227743727",
		// 认证 token（可选）
		auth: "",
		// 备用 API 配置（当主 API 失败时使用）
		fallbackApis: [
			"https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
		],
	},

	// 本地音乐配置（当 mode 为 'local' 时使用）
	// 1. 支持传入歌词文件的路径
	// lrc: "/assets/music/lrc/使一颗心免于哀伤-哼唱.lrc",
	// 2. 或者直接填入歌词字符串内容
	// lrc: "[00:00.00]歌词内容...",
	local: {
		playlist: [
			// music-set
			{
				name: "一路向北 (DJ版)",
				artist: "半糖记",
				url: "Firefly-blog/src/assets/music/一路向北 (DJ版) - 半糖记.mp3",
				cover: "",
				lrc: "Firefly-blog/src/assets/music/一路向北 (DJ版) - 半糖记.lrc",
			},
			{
				name: "其实",
				artist: "薛之谦",
				url: "Firefly-blog/src/assets/music/其实 - 薛之谦.mp3",
				cover: "",
				lrc: "Firefly-blog/src/assets/music/其实 - 薛之谦.lrc",
			},
			{
				name: "南风北巷",
				artist: "邵帅",
				url: "Firefly-blog/src/assets/music/南风北巷 - 邵帅.mp3",
				cover: "",
				lrc: "Firefly-blog/src/assets/music/南风北巷 - 邵帅.lrc",
			},
			{
				name: "同花顺",
				artist: "林倛玉",
				url: "Firefly-blog/src/assets/music/同花顺 - 林倛玉.mp3",
				cover: "",
				lrc: "Firefly-blog/src/assets/music/同花顺 - 林倛玉.lrc",
			},
			{
				name: "坏杀手 (你站在聚光灯的舞台)",
				artist: "李艺谋",
				url: "Firefly-blog/src/assets/music/坏杀手 (你站在聚光灯的舞台) - 李艺谋.mp3",
				cover: "",
				lrc: "Firefly-blog/src/assets/music/坏杀手 (你站在聚光灯的舞台) - 李艺谋.lrc",
			},
			{
				name: "海屿你",
				artist: "马也_Crabbit、Cole先生",
				url: "Firefly-blog/src/assets/music/海屿你 - 马也_Crabbit、Cole先生.mp3",
				cover: "",
				lrc: "Firefly-blog/src/assets/music/海屿你 - 马也_Crabbit、Cole先生.lrc",
			},
			{
				name: "爱旧爱 (dj0.8x)",
				artist: "焦七七、前男友",
				url: "Firefly-blog/src/assets/music/爱旧爱 (dj0.8x) - 焦七七、前男友.mp3",
				cover: "",
				lrc: "Firefly-blog/src/assets/music/爱旧爱 (dj0.8x) - 焦七七、前男友.lrc",
			},
			{
				name: "珊瑚海",
				artist: "周杰伦、Lara梁心颐",
				url: "Firefly-blog/src/assets/music/珊瑚海 - 周杰伦、Lara梁心颐.mp3",
				cover: "",
				lrc: "Firefly-blog/src/assets/music/珊瑚海 - 周杰伦、Lara梁心颐.lrc",
			},
			{
				name: "程艾影",
				artist: "赵雷",
				url: "Firefly-blog/src/assets/music/程艾影 - 赵雷.mp3",
				cover: "",
				lrc: "Firefly-blog/src/assets/music/程艾影 - 赵雷.lrc",
			},
			{
				name: "给自己的歌",
				artist: "en (王翊恩)",
				url: "Firefly-blog/src/assets/music/给自己的歌 - en (王翊恩).mp3",
				cover: "",
				lrc: "Firefly-blog/src/assets/music/给自己的歌 - en (王翊恩).lrc",
			},
		],
	},
};



