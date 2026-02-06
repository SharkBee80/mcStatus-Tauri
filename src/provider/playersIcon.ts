import { TauriStorage } from '@/core/storage';
import { reactive } from "vue";

export type PlayersHead = {
	[uuid: string]: PlayerTab
};

export type PlayerTab = {
	img: string,
	time: number
	blob?: string
}

const CONFIG_PATH = 'playersHead.json';
const storage = new TauriStorage(CONFIG_PATH);
const data = await storage.load() || '{}';
let heads: PlayersHead = {}
if (data) {
	heads = JSON.parse(data);
}

export const playersHead = reactive(heads)