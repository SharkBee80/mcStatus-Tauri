export * from './web'
export * from './tauri'

// import { TauriStorage } from './tauri'
// import { WebStorage, type StorageType } from './web'
// type Tauri = {
// 	Path: string
// }

// class Storage {
// 	private tauri?: TauriStorage
// 	private web?: WebStorage
// 	private key!: string
// 	constructor(tauri?: { Path: string }, web?: { type?: StorageType, prefix?: string, key: string }) {
// 		if (tauri) this.tauri = new TauriStorage(tauri.Path)
// 		if (web) {
// 			this.key = web.key
// 			this.web = new WebStorage(web.type, web.prefix)
// 		}
// 	}

// 	async load(which: 'tauri' | 'web' | 'both',) {
// 		let data = { 'tauri': null as any | null, 'web': null as any | null }
// 		if (which === 'tauri' || which === 'both') {
// 			if (this.tauri) data.tauri = await this.tauri.load()
// 		}
// 		if (which === 'web' || which === 'both') {
// 			if (this.web) data.web = await this.web.get(this.key)
// 		}
// 		return data
// 	}

// 	async save(data: any, which: 'tauri' | 'web' | 'both') {
// 		let result = { 'tauri': null as boolean | null, 'web': null as boolean | null }
// 		if (which === 'tauri' || which === 'both') {
// 			if (this.tauri) {
// 				try {
// 					await this.tauri.load()
// 					result.tauri = true
// 				} catch (error) {
// 					console.log(error)
// 					result.tauri = false
// 				}
// 			}
// 		}
// 		if (which === 'web' || which === 'both') {
// 			if (this.web) {
// 				this.web.set(this.key, data, null)
// 				result.web = true
// 			}
// 		}
// 		return result
// 	}
// }