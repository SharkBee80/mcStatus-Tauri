import { Edition, extra, McFrom, Store } from "@/modules";
import { serversInfo, serversStatus, refreshing, appStatus } from "@/provider";
import { query } from "@/core/mc-status";
import { TaskQueue } from "@/utils";
import { match } from '@/core/handle';
import { config } from '@/provider'
import { computed } from "vue";

let queue: TaskQueue;
const concurrency = computed(() => config.Home.thread);

function get_set_queue() {
	if (!queue) {
		queue = new TaskQueue(concurrency, 'mcdata_query');
	}
	return queue;
}

export class Mcdata {
	private static readonly queue: TaskQueue = get_set_queue();

	static save(server: Store) {
		console.log(server);
	}

	static add(form: McFrom) {
		const server: Store = {
			uuid: Date.now().toString(),
			name: form.name ? form.name : "MineCraft Server",
			host: hostname(form.address).toUpperCase(),
			address: full_address(form.address, form.edition),
			edition: form.edition,
			addtime: new Date().toLocaleString(),
			edittime: new Date().toLocaleString(),
		};
		serversInfo.push(server)
		serversStatus.push({ ...server, ...extra() })
		refreshing[server.uuid] = true;
		// this.queryOne(server.uuid);
	}

	static edit(uuid: string, form: McFrom) {
		const data = {
			name: form.name ? form.name : "MineCraft Server",
			address: full_address(form.address, form.edition),
			edition: form.edition,
			edittime: new Date().toLocaleString(),
		};
		const server = serversInfo.find(server => server.uuid === uuid);
		const status = serversStatus.find(server => server.uuid === uuid);
		Object.assign(server!, data);
		Object.assign(status!, server);
		this.queryOne(uuid);
	}

	static delete(uuid: string) {
		serversInfo.splice(serversInfo.findIndex(server => server.uuid === uuid), 1);
		serversStatus.splice(serversStatus.findIndex(server => server.uuid === uuid), 1);
		Reflect.deleteProperty(refreshing, uuid);
		if (appStatus.activeUUID === uuid) appStatus.activeUUID = '';
	}

	static splice(fromIndex: number, toIndex: number) {
		serversInfo.splice(toIndex, 0, serversInfo.splice(fromIndex, 1)[0]);
		serversStatus.splice(toIndex, 0, serversStatus.splice(fromIndex, 1)[0]);
	}

	static async queryOne(uuid: string) {
		if (refreshing[uuid] === undefined) return;
		refreshing[uuid] = true;
		console.log('queryOne', uuid)
		const server = serversInfo.find(server => server.uuid === uuid);
		if (server === undefined) return;
		const data = await this.queue.add(server.uuid, async () => await query(server.address, server.edition))
		if (data === undefined) return;
		const status = serversStatus.find(server => server.uuid === uuid);
		refreshing[uuid] = false;
		return match(data, server, status!)
	}

	static getOne(uuid: string): Store | undefined {
		return serversInfo.find(server => server.uuid === uuid);
	}

	static refreshAll() {
		Object.keys(refreshing).forEach(uuid => {
			this.refreshOne(uuid);
		});
	}
	static refreshOne(uuid: string) {
		refreshing[uuid] = true;
		this.queryOne(uuid);
	}

	static refreshFalse() {
		serversStatus.forEach(server => {
			if (server.status === 'offline') {
				this.refreshOne(server.uuid);
			}
		});
	}
}

///////////////////////////////////////////////////////////
// 获取完整的地址
function full_address(address: string, _edition: Edition) {
	if (address.startsWith('http://') || address.startsWith('https://')) null;
	else address = `http://${address}`;
	const url = new URL(address);
	if (!url.port) {
		// if (edition === 'Bedrock') return `${url.hostname}:19132`;
		// else return `${url.hostname}:25565`;
		return url.hostname;
	} else {
		return url.host;
	}
}

function hostname(address: string) {
	if (address.startsWith('http://') || address.startsWith('https://')) null;
	else address = `http://${address}`;
	const url = new URL(address);
	return url.hostname;
}