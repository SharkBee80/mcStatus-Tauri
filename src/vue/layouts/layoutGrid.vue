<template>
	<div class="gridLayout grid gap-4 p-4"
		:style="{ '--eachLine': eachLine, '--minWidth': minwidth, '--maxWidth': maxwidth ?? '1fr' }">
		<slot></slot>
	</div>
</template>
<script lang="ts" setup>
	import { computed } from 'vue';

	const props = defineProps<{
		eachLine: string | number
		minwidth: string,
		maxwidth?: string
	}>()
	const eachLine = computed(() => {
		if (props.eachLine === '0' || props.eachLine === 0) {
			return 'auto-fit'
		} else {
			return props.eachLine
		}
	})
	////
</script>
<style scoped>
	.gridLayout {
		--minWidth: 240px;
		/* grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); */
		grid-template-columns: repeat(var(--eachLine), minmax(var(--minWidth), var(--maxWidth)));
	}
</style>