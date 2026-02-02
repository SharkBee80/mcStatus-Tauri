export type Edition = 'Bedrock' | 'Java'

export type McFrom = {
	name: string,
	address: string,
	edition: Edition,
}

export type Store = {
	uuid: string, // 服务器ID
	name: string, // 服务器名称
	host: string, // 服务器地址
	address: string, // 服务器地址
	edition: Edition, // 服务器版本
	addtime: string, // 添加时间
	edittime: string, // 修改时间
	//
	icon?: string | null, // 服务器图标
	version?: string | null, // 服务器版本
	motd?: string, // 服务器描述
}

export type Status = Store & Extra

export type Extra = {
	status: 'online' | 'offline', // 是否在线
	port: number | null,
	players: number | null, // 在线玩家数
	maxplayers?: number | null, // 最大玩家数
	onlines: Array<{ name: string, id: string }> | null, // 在线玩家
	ping: number | null, // 延迟 // string
	serverName: string, // 服务器地址
	signal: number, // 信号
	updatetime: string, // 更新时间
}

export const extra = (): Extra => {
	return {
		status: 'offline',
		port: null,
		players: null,
		maxplayers: null,
		onlines: null,
		ping: null,
		serverName: 'Unknown',
		signal: 0,
		updatetime: new Date().toLocaleString(),
	}
}

export interface _status extends Object {
	status: string | boolean | null, // 是否在线
	players: number | null, // 在线玩家数
	maxplayers: number | null, // 最大玩家数
}

// const example: _status = {
// 	uuid: 1751099295, // 服务器ID
// 	name: "MineCraft Server", // 服务器名称
// 	address: "mc.example.com", // 服务器地址
// 	edition: "Java", // 服务器版本
// 	fulladdress: "mc.example.com:25565", // 完整地址
// 	addtime: "2025-06-28 16:28:15", // 添加时间
// 	edittime: "2025-06-28 16:28:15", // 修改时间

// 	icon: null, // 服务器图标
// 	version: null, // 服务器版本
// 	motd: "A MineCraft Server", // 服务器描述

// 	status: "Offline", // 是否在线
// 	players: null, // 在线玩家数
// 	maxplayers: null, // 最大玩家数
// 	onlines: null, // 在线玩家
// 	ping: null, // 延迟
// 	serverName: 'MC.EXAMPLE.COM', // 服务器地址
// 	signal: 0, // 信号
// 	updatetime: "2025-06-28 17:58:19", // 更新时间
// }