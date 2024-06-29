export const adminMenu = [
	{
		// Quản lý người dùng
		name: "menu.admin.manage-user",
		menus: [
			{
				name: "menu.admin.user",
				link: "/system/user-manage",
			},
		],
	},
	{
		// Quản lý phim
		name: "menu.admin.manage-movie",
		menus: [
			{
				name: "menu.admin.manage-movie",
				link: "/system/manage-movie",
			},
			{
				name: "menu.admin.manage-showtime",
				link: "/system/manage-showtime",
			},
		],
	},
	{
		// Quản lý rạp phim
		name: "menu.admin.manage-cinema",
		menus: [
			{
				name: "menu.admin.manage-cinema",
				link: "/system/manage-cinema",
			},
			{
				name: "menu.admin.manage-screen",
				link: "/system/manage-screen",
			},
		],
	},
	{
		// Quản lý đặt vé
		name: "menu.admin.manage-booking",
		menus: [],
	},
];
