<template>
	<div class="rounded-xl p-6 hover:dark:brightness-140 hover:brightness-80"
		style="background-color: var(--p-card-background); color: var(--p-card-color);">
		<slot></slot>
		<my-optionSet :label :description :divider>
			<i class="xicon-material xicon-material-ChevronRightRound"></i>
		</my-optionSet>
	</div>
</template>

<script setup lang="ts">
	import myOptionSet from '@/vue/commonComponents/option.set.vue'
	defineProps({
		label: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		divider: {
			type: Boolean,
			default: true,
		}
	})
</script>