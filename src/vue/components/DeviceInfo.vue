<template>
	<div class="grid grid-cols-[auto_1fr] gap-x-1 p-1 bg-amber-700">
		<h1 class="font-extrabold text-xl">操作系统</h1><br>
		<a class="a">家族</a><a>{{ deviceInfo.family }}</a>
		<a class="a">平台</a><a>{{ deviceInfo.platform }}</a>
		<a class="a">终端</a><a>{{ pf() }}</a>
		<a class="a">版本</a><a>{{ deviceInfo.version }}</a>
		<a class="a">类型</a><a>{{ deviceInfo.type }}</a>
		<a class="a">架构</a><a>{{ deviceInfo.arch }}</a>
		<a class="a">语言</a><a>{{ deviceInfo.locale }}</a>
		<a class="a">主题</a><a>{{ deviceInfo.theme }}</a>
		<h1 class="font-extrabold text-xl">Webview</h1><br>
		<template v-for="(item, index) in browserData" :key="index">
			<a class="a">{{ item.name }}</a><a>{{ item.value }}</a>
		</template>
	</div>
</template>
<script setup lang="ts">
	import { deviceInfo, isMobile, isDesktop } from '@/provider';
	import { computed } from 'vue';
	import { useWindowSize, useNow } from '@vueuse/core';

	// 定义浏览器信息接口
	interface BrowserInfo {
		name: string;
		value: any;
	}

	const pf = () => {
		if (isMobile && !isDesktop) return 'Mobile';
		if (isDesktop && !isMobile) return 'Desktop';
		return 'Unknown';
	}

	const browserData = computed<BrowserInfo[]>(() => {
		return [
			{ name: '主题', value: deviceInfo.webviewIsDark ? 'Dark' : 'Light' },
			{ name: '语言', value: navigator.language },
			{ name: '平台/操作系统', value: navigator.platform },
			{ name: '名称', value: navigator.appName },
			{ name: 'UA', value: navigator.userAgent },
			{ name: '版本', value: navigator.appVersion },
			{ name: '代码', value: navigator.appCodeName },
			{ name: '供应商', value: navigator.vendor + ' ' + navigator.vendorSub },
			{ name: '网络状态', value: navigator.onLine },
			// @ts-ignore
			{ name: '网络', value: navigator.connection.effectiveType },
			{ name: '产品名称', value: navigator.product + ' ' + navigator.productSub },
			{ name: 'Cookie启用', value: navigator.cookieEnabled },

			{ name: '显示器尺寸', value: `${window.screen.width} x ${window.screen.height}` },
			{ name: '视窗尺寸', value: `${width.value} x ${height.value}` },
			{ name: '颜色深度', value: window.screen.colorDepth },
			{ name: '硬件并发数', value: navigator.hardwareConcurrency || '未知' },
			{ name: '设备像素比', value: window.devicePixelRatio },
			{ name: '时区', value: Intl.DateTimeFormat().resolvedOptions().timeZone + ' ' + ((timeZone >= 0) ? '+' + timeZone : timeZone) },
			{ name: '时钟', value: useNow().value },
		]
	});
	const { width, height } = useWindowSize();
	const timeZone = (new Date().getHours() - new Date().getUTCHours());
</script>
<style scoped>

	/* .a {
		text-align-last: justify;
	} */
	a {
		background: #fff;
		border-bottom: #000 1px solid;
		padding-inline: 2px;
		user-select: all !important;
	}

	html.dark a {
		background: #000;
		border-bottom: #fff 1px solid;
	}

	.a::after {
		content: ":";
	}
</style>