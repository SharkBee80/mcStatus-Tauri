<template>
	<!-- 主要内容 -->
	<main class="overflow-hidden h-full w-full relative flex-1">
		<transition>
			<KeepAlive>
				<MainPage v-show="appStatus.currentPage < 2" id="MainPage"/>
			</KeepAlive>
		</transition>
		<transition>
			<OtherPage v-if="appStatus.currentPage === 2" class="body_inner" />
		</transition>
		<transition>
			<SetPage v-if="appStatus.currentPage === 3" class="body_inner" />
		</transition>
	</main>
</template>
<script setup lang="ts">
	import { defineAsyncComponent } from 'vue'
	import { appStatus } from '@/provider'

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