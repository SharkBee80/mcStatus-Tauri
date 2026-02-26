type Edition = "Java" | "Bedrock";

interface McStatus {
	data: McData | null;
	error: string | null;
	tasktime: number;
}

interface McData {
	online: boolean;
	ip: string;
	port: number;
	hostname: string;
	latency: number;
	dns: {
		a_records: string[],
		cname: string | null,
		ttl: number
	} | null;
	data: JavaData | BedrockData;
}

export interface JavaData {
	version: {
		name: string,
		protocol: number
	},
	players: {
		online: number,
		max: number,
		sample: Array<{
			name: string,
			id: string
		}> | null
	},
	description: string,
	favicon: string | null,
	map: string | null,
	gamemode: string | null,
	software: string | null,
	plugins: Array<{ name: string, version: string | null }> | null,
	mods: Array<{ modid: string, version: string | null }> | null
}

export interface BedrockData {
	edition: string,
	motd: string,
	protocol_version: string,
	online_players: string,
	max_players: string,
	server_uid: string,
	motd2: string,
	game_mode: string,
	game_mode_numeric: string,
	port_ipv4: string,
	port_ipv6: string
	map: string | null,
	software: string | null,
	raw_data: string
}



export declare function query(address: string, edition: Edition): Promise<McStatus>;

export declare function clearCache(): Promise<void>;