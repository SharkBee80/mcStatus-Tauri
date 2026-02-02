import { Store, Status, extra } from "@/modules";
import { reactive, Reactive } from "vue";
import { TauriStorage } from '@/core/storage';

const CONFIG_PATH = 'serverInfo.json';
const storage = new TauriStorage(CONFIG_PATH);
const data = await storage.load() || '[]'
// const data = localStorage.getItem('serversInfo') || '[]'
let servers: Store[] = []
if (data) {
	servers.push(...JSON.parse(data))
}

export const serversInfo: Reactive<Store[]> = reactive(servers)

let status: Status[] = []
servers.forEach(server => {
	status.push({
		...server,
		...extra()
	})
})

export const serversStatus: Reactive<Status[]> = reactive(status);


let refresh: Record<string, boolean> = serversInfo.reduce((acc, item) => {
	acc[item.uuid] = true;
	return acc;
}, {} as Record<string, boolean>);

export const refreshing = reactive(refresh);