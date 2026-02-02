import { invoke } from "@tauri-apps/api/core";

export async function query(address, edition) {
	let r = await invoke('plugin:mc-status|query_one', { address, edition });
	return r;
}
