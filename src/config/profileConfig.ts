import type { ProfileConfig } from "../types/config";

export const profileConfig: ProfileConfig = {
	// 头像
	// 图片路径支持三种格式：
	// 1. public 目录（以 "/" 开头，不优化）："/assets/images/avatar.webp"
	// 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/avatar.webp"
	// 3. 远程 URL："https://example.com/avatar.jpg"
	avatar: "assets/images/avatar.avif",

	// 名字
	name: "xiaoH",

	// 个人签名
	bio: "Hello, I'm xiaoH.",

	// 链接配置
	// 已经预装的图标集：fa7-brands，fa7-regular，fa7-solid，material-symbols，simple-icons
	// 访问https://icones.js.org/ 获取图标代码，
	// 如果想使用尚未包含相应的图标集，则需要安装它
	// `pnpm add @iconify-json/<icon-set-name>`
	// showName: true 时显示图标和名称，false 时只显示图标
	links: [
		{
			name: "qq",
			icon: "fa7-brands:qq",
			url: "https://qun.qq.com/universal-share/share?ac=1&authKey=N%2BUmyI2%2BkO%2Fejdbuz22vu1xjgFgjKGCG93D9NeRYopY1y3mZktEeyheDkHaC%2Ffb9&busi_data=eyJncm91cENvZGUiOiIxMDkwNjM0ODU0IiwidG9rZW4iOiJjcVF3VWVxN25uQTZSeG9Hdkw2cHQ4enZnc1BHQzlvZHRFcVFUa3Nzbi9XZ3pWYnFab2hhSno0a1E3aCs4eHBjIiwidWluIjoiMzEwODQ1NTYxOSJ9&data=9FvUF0VcbpjWEuI2UciqDqv3VFj_n3hou9QobTktV19AxNBmv8R1CHybCVy6opXjGQxgx8xp3uPUbjO4BA71jw&svctype=4&tempid=h5_group_info",
			showName: false,
		},
		{
			name: "Email",
			icon: "fa7-solid:envelope",
			url: "mailto:blog@h5201314h.de5.net",
			showName: false,
		},
		{
			name: "RSS",
			icon: "fa7-solid:rss",
			url: "/rss/",
			showName: false,
		},
	],
};
