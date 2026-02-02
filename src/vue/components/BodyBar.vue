<template>
	<HeadBar :page="appStatus.currentPage" />
	<!-- 主要内容 -->
	<main class="overflow-hidden h-full w-full relative flex-1">
		<transition>
			<KeepAlive>
				<MainPage v-if="appStatus.currentPage < 3" :index="[appStatus.currentPage, appStatus.exPage]" />
			</KeepAlive>
		</transition>
		<transition>
			<OtherPage v-if="appStatus.currentPage === 3" class="body_inner" />
		</transition>
		<transition>
			<SetPage v-if="appStatus.currentPage === 4" class="body_inner" />
		</transition>
	</main>
</template>
<script setup lang="ts">
	import { defineAsyncComponent } from 'vue'
	import { appStatus } from '@/provider'

	const HeadBar = defineAsyncComponent(() => import('@/vue/components/HeadBar.vue'))
	const MainPage = defineAsyncComponent(() => import('@/vue/pages/MainPage.vue'))
	const OtherPage = defineAsyncComponent(() => import('@/vue/pages/OtherPage.vue'))
	const SetPage = defineAsyncComponent(() => import('@/vue/pages/SetPage.vue'))
</script>
<style>

	.v-enter-active {
		transition: opacity 0.3s ease-in-out;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
</style>