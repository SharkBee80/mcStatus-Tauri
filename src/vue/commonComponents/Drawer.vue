<template>

	<Drawer v-model:visible="visi" position="right" class="w-full" :pt="{
		header: { class: 'flex-row-reverse p-2' },
		content: { class: 'p-4 pt-0' }
	}" close-icon="xicon-material xicon-material-ChevronLeftRound">
		<template #header>
			<div class="w-12 aspect-square"></div>
			<div class="w-full flex justify-center items-center">
				<h1>{{ header }}</h1>
			</div>
		</template>
		<slot></slot>
	</Drawer>

</template>

<script setup lang="ts">
	import { defineAsyncComponent } from 'vue';
	const Drawer = defineAsyncComponent(() => import('primevue/drawer'))

	const visi = defineModel('visi', { default: false });
	defineProps<{
		header: string,
	}>();
</script>