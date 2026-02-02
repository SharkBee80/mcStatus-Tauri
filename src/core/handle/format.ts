import { Store, Status, extra } from '@/modules';
import { BedrockData, JavaData, McData, McStatus } from '@/core/mc-status';

function signalStrength(ping: number | null | undefined): 0 | 1 | 2 | 3 | 4 | 5 {
	if (ping === null || ping === undefined) return 0
	return ping < 100 ? 5 : ping < 200 ? 4 : ping < 300 ? 3 : ping < 400 ? 2 : 1
}

function haveJava(res: McStatus, storedata: Store, status: Status) {
	if (!res.data) return
	const data = res.data as McData;
	data.latency = data.latency / 2;
	const Jdata = res.data.data as JavaData;
	Object.assign(storedata, {
		icon: Jdata.favicon ?? null,
		version: Jdata.version.name,
		motd: Jdata.description
	})
	Object.assign(status, storedata, {
		status: "online",
		port: data.port,
		players: Jdata.players.online,
		maxplayers: Jdata.players.max,
		onlines: Jdata.players.sample ?? [],
		ping: data.latency.toFixed(2).toString(),
		serverName: data.hostname,
		signal: signalStrength(data.latency),
		updatetime: new Date().toLocaleString(),
	})
}

function noJava(_res: never | null | undefined, storedata: Store, status: Status) {
	Object.assign(status, storedata, extra())
}

function haveBedrock(res: McStatus, storedata: Store, status: Status) {
	if (!res.data) return
	const data = res.data as McData;
	data.latency = data.latency / 2;
	const Bdata = res.data.data as BedrockData;
	Object.assign(storedata, {
		icon: null,
		version: Bdata.edition,
		motd: Bdata.motd + "\n" + Bdata.motd2,
	})
	Object.assign(status, storedata, {
		status: "online",
		port: data.port,
		players: Number(Bdata.online_players),
		maxplayers: Number(Bdata.max_players),
		onlines: null,
		ping: data.latency.toFixed(2).toString(),
		serverName: data.hostname,
		signal: signalStrength(data.latency),
		updatetime: new Date().toLocaleString(),
	})
}

function noBedrock(_res: never | null | undefined, storedata: Store, status: Status) {
	Object.assign(status, storedata, extra())
}

export function have(res: McStatus, storedata: Store, status: Status) {
	if (storedata.edition === 'Java') {
		haveJava(res, storedata, status)
	} else {
		haveBedrock(res, storedata, status)
	}
}

export function nohave(res: McStatus, storedata: Store, status: Status) {
	if (storedata.edition === 'Java') {
		noJava(null, storedata, status)
	} else {
		noBedrock(res as never, storedata, status)
	}
}

export function match(res: McStatus, storedata: Store, status: Status) {
	res.data ? have(res, storedata, status) : nohave(res, storedata, status)
}

export function map2str(arr: Array<{ name: string, id: string }>, ops: { seperator?: '\n' | string | null, per?: boolean, limit?: boolean, short?: number }): string {
	let str = ''
	ops.short = ops.short ?? 5
	if (!ops.short) ops.short = 5;
	arr.sort((a, b) => a.name.localeCompare(b.name))
	arr.forEach((v, i) => {
		if (ops.limit) {
			if (i === ops.short) return str += ` ... ${arr.length - ops.short} more `;
			if (i > ops.short!) return
		}
		str += `${v.name}` + (ops.seperator ?? '') + (ops.per ? '\n' : '')
	})
	return str
}

// if (item.players) {
// 	a = ''
// 	item.players.forEach(player => {
// 		a += `<p>${parseMOTD(player.name)}</p>`
// 	});
// 	return `<div class="tooltiptext">${a}</div>`;
// } else {
// 	return "";
// }