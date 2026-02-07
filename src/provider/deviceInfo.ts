import { platform, family, version, type, arch, locale } from '@tauri-apps/plugin-os';
import type { Platform, OsType, Arch, Family } from '@tauri-apps/plugin-os';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { reactive } from 'vue';
// // 获取当前操作系统家族
// const osFamily = family();
// // 获取当前操作系统平台
// const osPlatform = platform();
// // 获取当前操作系统版本
// const osVersion = version();
// // 获取当前操作系统类型
// const osType = type();
// // 获取当前操作系统架构
// const osArch = arch();
// // 获取当前操作系统语言
// const osLocale = await locale();
// // 获取当前操作系统主题
// const osTheme = await getCurrentWindow().theme()
// 判断当前操作系统是否为深色主题
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

export const isMobile = platform() === 'android' || platform() === 'ios';
export const isDesktop = platform() === 'linux' || platform() === 'windows' || platform() === 'macos';
export const pf: 'Mobile' | 'Desktop' | 'Unknown' = (isMobile && !isDesktop) ? 'Mobile' : (isDesktop && !isMobile) ? 'Desktop' : 'Unknown';
// export const deviceInfo = {
// 	family: osFamily,
// 	platform: osPlatform,
// 	version: osVersion,
// 	type: osType,
// 	arch: osArch,
// 	locale: osLocale,
// 	theme: osTheme,
// 	isDark: isDark
// }
export type DeviceInfo = {
	family: Family,
	platform: Platform,
	version: string,
	type: OsType,
	arch: Arch,
	locale: string | null,
	theme: 'Light' | 'Dark' | null,
	webviewIsDark: boolean
};

const os: DeviceInfo = {
	family: family(),
	platform: platform(),
	version: version(),
	type: type(),
	arch: arch(),
	locale: await locale(),
	theme: isMobile ? darkModeMediaQuery.matches ? 'Dark' : 'Light' : await getCurrentWindow().theme().then(theme => theme ? ((theme.charAt(0).toUpperCase() + theme.slice(1)) === 'Dark' ? 'Dark' : 'Light') : null),
	webviewIsDark: darkModeMediaQuery.matches
}

// export type DeviceInfo = typeof os;

export const deviceInfo = reactive<DeviceInfo>(os)
console.log('deviceInfo', os)
