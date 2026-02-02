<template>
	<div class="row flex justify-between">
		<div class="col">
			<div v-html="label"></div>
			<i class="text-xs ml-4">{{ description }}</i>
		</div>
		<div class="row flex justify-center whitespace-nowrap">
			<Divider v-if="divider ? divider : true" layout="vertical" />
			<div class="row">
				<slot></slot>
				<div v-show="(value || value === 0) ? true : false" class="ml-4 w-2">{{ value }}</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	defineProps<{
		label?: string;
		description?: string;
		value?: string | number;
		divider?: boolean;
	}>();

	import Divider from 'primevue/divider';

</script>