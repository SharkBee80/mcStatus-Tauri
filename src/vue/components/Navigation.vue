<template>
	<div class="bar sticky z-50 bottom-0 px-3 py-2 flex items-center gap-1 overflow-auto"
		:class="vertical ? ('flex-col max-w-12 ' + (config.UI.verticalDockerFull ? 'justify-around' : 'justify-end')) : 'min-h-14 h-auto justify-around'">
		<template v-for="item in items" :key="item.id">
			<div @click="switchView(item.id)" class="item flex flex-col gap-y-1 w-full items-center justify-center"
				:class="vertical ? '' : 'flex-1 h-full min-w-20'">
				<div class="btn flex flex-col items-center justify-center h-10 p-2 
            cursor-pointer">
					<i class="w-6 aspect-square relative text-2xl!"
						:class="item.icon, appStatus.currentPage === item.id ? 'text-yellow-300' : ''"></i>
				</div>
				<a v-show="config?.UI.showtext" class="text-xs leading-none text-center whitespace-nowrap">
					{{ item.text ? item.text : '&nbsp;' }}
				</a>
			</div>
		</template>
	</div>
</template>
<script setup lang="ts">
	import { reactive } from 'vue'
	import { config, appStatus } from '@/provider'
	import { Tabbar } from '@/modules'

	defineProps<{ vertical: boolean }>()

	const items = reactive<Tabbar[]>([
		{ id: 1, icon: 'xicon-fluent xicon-fluent-Home24Filled', text: '首页', route: '/', routeable: false },
		{ id: 2, icon: 'xicon-fluent xicon-fluent-AppsListDetail24Regular', text: '详情', route: '/info', routeable: false },
		{ id: 3, icon: 'xicon-fluent xicon-fluent-EmojiSmileSlight24Regular', text: '－O－', route: '/other', routeable: true },
		{ id: 4, icon: 'xicon-fluent xicon-fluent-Settings24Filled', text: '设置', route: '/set', routeable: true },
	])

	function switchView(index: number) {
		appStatus.exPage = appStatus.currentPage;
		appStatus.currentPage = index;
	}

</script>
<style scoped>

	/* .btn {
		box-shadow: inset rgb(24, 24, 24) 0px 0px 40px 0px;
	}*/
	/* rounded-xl backdrop-blur-lg  */
	.item:hover .btn {
		/* background-color: rgba(128, 255, 0, 0.5); */
		color: oklch(90.5% 0.182 98.111);
	}

</style>