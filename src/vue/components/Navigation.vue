<template>
	<div class="sticky">
		<div class="bar z-50 bottom-0 px-3 py-2 flex items-center gap-1 overflow-auto h-full"
			:class="vertical ? ('flex-col max-w-20 justify-end') : 'min-h-14 justify-around'">
			<template v-for="(item, index) in items" :key="item.id">
				<div @click="switchView(index)" class="item flex flex-col gap-y-1 w-full items-center justify-center"
					:class="vertical ? config.UI.verticalDockerFull ? 'h-full' : '' : 'flex-1 h-full min-w-20'">
					<div class="btn flex flex-col items-center justify-center h-10 p-2 
            cursor-pointer">
						<i class="w-6 aspect-square relative text-2xl!"
							:class="item.icon, appStatus.currentPage === index ? 'text-yellow-300' : ''"></i>
					</div>
					<a v-show="config?.UI.showtext" class="text-xs leading-none text-center whitespace-nowrap">
						{{ item.text ? item.text : '&nbsp;' }}
					</a>
				</div>
			</template>
		</div>
		<div v-if="vertical" class="after"></div>
	</div>
</template>
<script setup lang="ts">
	import { reactive } from 'vue'
	import { config, appStatus } from '@/provider'
	import { Tabbar } from '@/modules'

	defineProps<{ vertical: boolean }>()

	const items = reactive<Tabbar[]>([
		{ icon: 'xicon-fluent xicon-fluent-Home24Filled', text: '首页', route: '/', routeable: false },
		{ icon: 'xicon-fluent xicon-fluent-AppsListDetail24Regular', text: '详情', route: '/info', routeable: false },
		{ icon: 'xicon-fluent xicon-fluent-EmojiSmileSlight24Regular', text: '－O－', route: '/other', routeable: true },
		{ icon: 'xicon-fluent xicon-fluent-Settings24Filled', text: '设置', route: '/set', routeable: true },
	])

	function switchView(index: number) {
		if (appStatus.isAdding || appStatus.isEditing) return;
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

	.after::after {
		--r: 0.75rem;
		--rr: calc(var(--r) * -1);
		content: "";
		position: absolute;
		top: 0;
		right: calc(var(--rr) * 2);
		/* 半径大小 */
		width: calc(var(--r) * 2);
		height: calc(var(--r) * 2);
		background: transparent;
		/* 关键：通过巨大的投影或边框反向绘制圆角 */
		border-radius: 50% 0 0 0;
		box-shadow: var(--rr) var(--rr) 0 var(--r) var(--bar-bg-color);
	}
</style>