export const adminMenu = [
	{
		// Quản lý người dùng
		name: "menu.admin.manage-user",
		menus: [
			{
				name: "menu.admin.crud",
				link: "/system/user-manage",
			},
			{
				name: "menu.admin.redux",
				link: "/system/user-redux",
			},
			{
				name: "menu.admin.client",
				link: "/system/user-client",
				// subMenus: [
				// 	{
				// 		name: "menu.system.system-administrator.user-manage",
				// 		link: "/system/user-manage",
				// 	},
				// 	{
				// 		name: "menu.system.system-administrator.user-redux",
				// 		link: "/system/user-redux",
				// 	},
				// ],
			},
			{
				name: "menu.admin.admin",
				link: "/system/user-admin",
			},
		],
	},
	{
		// Quản lý phim
		name: "menu.admin.manage-movie",
		link: "/system/manage-movie",
	},
	{
		// Quản lý rạp phim
		name: "menu.admin.manage-cinema",
		link: "/system/manage-cinema",
	},
	{
		// Quản lý đặt vé
		name: "menu.admin.manage-booking",
		link: "/system/manage-booking",
	},
];
