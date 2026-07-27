import {
	LinkPreset,
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/config";
import { siteConfig } from "./siteConfig";

// 根据页面开关动态生成导航栏配置
const getDynamicNavBarConfig = (): NavBarConfig => {
	// 基础导航栏链接
	const links: (NavBarLink | LinkPreset)[] = [
		// 主页
		LinkPreset.Home,

		// 归档
		LinkPreset.Archive,
	];

	// 根据配置决定是否添加友链，在siteConfig关闭pages.friends时导航栏不显示友链
	if (siteConfig.pages.friends) {
		links.push(LinkPreset.Friends);
	}

	// 根据配置决定是否添加留言板，在siteConfig关闭pages.guestbook时导航栏不显示留言板
	if (siteConfig.pages.guestbook) {
		links.push(LinkPreset.Guestbook);
	}

	// 我的及其子菜单
	links.push({
		name: "我的",
		url: "/my/",
		icon: "material-symbols:person",
		children: [
			// 根据配置决定是否添加相册，在siteConfig关闭pages.gallery时导航栏不显示相册
			...(siteConfig.pages.gallery ? [LinkPreset.Gallery] : []),

			// 根据配置决定是否添加番组计划，在siteConfig关闭pages.bangumi时导航栏不显示番组计划
			...(siteConfig.pages.bangumi ? [LinkPreset.Bangumi] : []),
		],
	});

	// 关于及其子菜单
	links.push({
		name: "关于",
		url: "/content/",
		icon: "material-symbols:info",
		children: [
			// 根据配置决定是否添加赞助，在siteConfig关闭pages.sponsor时导航栏不显示赞助
			...(siteConfig.pages.sponsor ? [LinkPreset.Sponsor] : []),

			// 关于页面
			LinkPreset.About,
		],
	});

	// 自定义导航栏链接,并且支持多级菜单
	links.push({
		name: "链接",
		url: "/links/",
		icon: "material-symbols:link",

		// 子菜单
		children: [
			{
				name: "邮箱",
				url: "http://h5201314h.de5.net",
				external: true,
				icon: "",
			},
			{
				name: "artalk评论",
				url: "http://artalk.hwh.ccwu.cc",
				external: true,
				icon: "",
			},
			{
				name: "gallery图库",
				url: "http://gallery.hwh.ccwu.cc",
				external: true,
				icon: "",
			},
			{
				name: "admin",
				url: "http://admin.hwh.ccwu.cc",
				external: true,
				icon: "",
			},
			{
				name: "QQ聊天群",
				url: "https://qun.qq.com/universal-share/share?ac=1&authKey=N%2BUmyI2%2BkO%2Fejdbuz22vu1xjgFgjKGCG93D9NeRYopY1y3mZktEeyheDkHaC%2Ffb9&busi_data=eyJncm91cENvZGUiOiIxMDkwNjM0ODU0IiwidG9rZW4iOiJjcVF3VWVxN25uQTZSeG9Hdkw2cHQ4enZnc1BHQzlvZHRFcVFUa3Nzbi9XZ3pWYnFab2hhSno0a1E3aCs4eHBjIiwidWluIjoiMzEwODQ1NTYxOSJ9&data=9FvUF0VcbpjWEuI2UciqDqv3VFj_n3hou9QobTktV19AxNBmv8R1CHybCVy6opXjGQxgx8xp3uPUbjO4BA71jw&svctype=4&tempid=h5_group_info",
				external: true,
				icon: "fa7-brands:qq",
			},
		],
	});

	// 仅返回链接，其它导航搜索相关配置在模块顶层常量中独立导出
	return { links } as NavBarConfig;
};

// 导航搜索配置
export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();
