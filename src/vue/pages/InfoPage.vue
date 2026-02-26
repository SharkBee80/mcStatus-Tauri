<template>
	<div v-if="!appStatus.activeUUID">
		<div class="col p-4 gap-y-2">
			<div class="flex gap-1">
				<Skeleton border-radius="0.75rem" size="6rem"></Skeleton>
				<div class="col flex-1 p-1">
					<div class="row justify-between">
						<div class="col">
							<Skeleton width="8rem" class="mb-2"></Skeleton>
							<Skeleton width="4rem" class="mb-2"></Skeleton>
						</div>
						<div class="row justify-end ml-auto gap-x-1">
							<Skeleton width="2rem" class="mb-2"></Skeleton>
							<Skeleton width="2rem" class="mb-2"></Skeleton>
						</div>
					</div>
					<Skeleton width="10rem" class="mb-2"></Skeleton>
				</div>
			</div>
			<div class="flex justify-center">
				<a>!选择以查看详情!</a>
			</div>
			<Skeleton width="100%" height="150px"></Skeleton>
			<Skeleton width="100%" height="150px"></Skeleton>
			<Skeleton width="100%" height="150px"></Skeleton>
		</div>
	</div>
	<div v-if="appStatus.activeUUID">
		<info-pannel :uuid="appStatus.activeUUID" :key="'Info' + appStatus.activeUUID"></info-pannel>
	</div>
	<!-- space -->
	<div :class="(config.Home.doublePage && doubleSwitch) ? 'h-20' : 'h-4'"></div>
	<edit-form v-if="appStatus.isEditing" v-model="appStatus.isEditing"></edit-form>
	<scroll-top v-if="!(config.Home.doublePage && doubleSwitch)" target="parent" :threshold="100"></scroll-top>
</template>
<script setup lang="ts">
	import { defineAsyncComponent } from 'vue';
	import ScrollTop from 'primevue/scrolltop';
	import Skeleton from 'primevue/skeleton';
	import { appStatus, config, doubleSwitch } from '@/provider';
	const EditForm = defineAsyncComponent(() => import('@/vue/components/EditForm.vue'))
	const infoPannel = defineAsyncComponent(() => import('@/vue/components/InfoPannel.vue'))
</script>