<template>
	<div
		class="rounded-2xl flex justify-center items-center dark:bg-[#27272a] bg-[#f1f5f9] text-surface-800 dark:text-surface-0">
		<avatar v-show="image || icon" :class="pt?.avatar?.class ?? 'size-6'" :image :backupImage :imgerror :icon
			:rounded="pt?.avatar?.rounded" />
		<span class="ml-2">{{ props.label }}</span>
	</div>
</template>
<script setup lang="ts">
	const props = defineProps<{
		label: string,
		image?: string,
		backupImage?: string,
		imgerror?: string,
		icon?: string
		pt?: {
			avatar?: {
				class?: string,
				rounded?: boolean
			}
		}
	}>()
	import avatar from '@/vue/components/avatar.vue';
</script>