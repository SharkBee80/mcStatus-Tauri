import { getCurrentWebview } from '@tauri-apps/api/webview';
import { getCurrentWindow } from '@tauri-apps/api/window';

import { deviceInfo, type DeviceInfo, config, isMobile } from '@/provider';

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

isMobile ?
	getCurrentWebview().listen('tauri://theme-changed', async (event) => {
		deviceInfo.theme = event.payload as DeviceInfo['theme']
	}) :
	getCurrentWindow().listen('tauri://theme-changed', async (event) => {
		deviceInfo.theme = event.payload as DeviceInfo['theme']
	})

darkModeMediaQuery.addEventListener('change', (event) => {
	deviceInfo.webviewIsDark = event.matches
})

///////////////////////////////////////
import { computed, watch } from 'vue'
const theme = computed(() => config.UI.theme)
switchTheme(null, theme.value);

// 监听主题变化
watch(theme, (newTheme) => {
	switchTheme(newTheme, newTheme)
})
watch(deviceInfo, (newInfo, oldInfo) => {
	if (newInfo.theme !== oldInfo.theme) {
		switchTheme(theme.value, deviceInfo.theme)
	}
})

///////////////////////////////////////
// function
// type RefTheme = typeof theme
// 主题切换
async function switchTheme(mode: string | undefined | null, theme: "Light" | "Dark" | "Auto" | null) {
	await new Promise(resolve => setTimeout(resolve, 50))
	// if (isRef(theme)) theme = theme.value;
	if (mode === 'Auto' || theme === 'Auto') {
		toggleDark(deviceInfo.theme === 'Dark')
	}
	else if (theme === 'Light' || theme === 'Dark') {
		toggleDark(theme === 'Dark')
	}
	// else if (theme === null) {
	// 	toggleDark(false)
	// }
}

function toggleDark(isDark: boolean) {
	document.documentElement.classList.toggle('dark', isDark)
}