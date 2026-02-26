<template>
	<HeadBar :page="appStatus.currentPage" />
	<div class="flex h-full w-full overflow-hidden" :class="vertical ? 'flex-row-reverse' : 'flex-col'">
		<BodyBar />
		<Navigation :vertical />
	</div>
</template>
<script setup lang="ts">
	import HeadBar from '@/vue/components/HeadBar.vue';
	import BodyBar from '@/vue/components/BodyBar.vue'
	import Navigation from '@/vue/components/Navigation.vue';

	import { appStatus, vertical } from '@/provider'

</script>