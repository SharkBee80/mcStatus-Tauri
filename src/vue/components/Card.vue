<template>
	<div v-if="status" :uuid="uuid" @click="detail(uuid)"
		class='item rounded-xl bg-transparent shadow-lg shadow-black dark:shadow-black/50 p-0'>
		<div :class="appStatus.isDragging ? 'nohover' : ''" class="server-item flex gap-1 p-2 rounded-xl">
			<div class="icon relative aspect-square flex justify-center items-center">
				<img class="min-w-16 w-full rounded-lg" style="image-rendering:crisp-edges;"
					:src="setIcon(iconImg, status.edition)" alt="Icon"></img>
			</div>
			<div name="info" class="col flex-1 p-1">
				<div name="head" class="row justify-between">
					<div class="message col pointer-events-none">
						<div class="name font-bold text-base flex items-center text-left text-nowrap whitespace-nowrap" id="name">{{ status.name }}
						</div>
						<div name="address" class="text-[chartreuse] text-xs flex items-center text-left" id="address">
							{{ status.host }}</div>
					</div>
					<div name="status" class="row flex-wrap justify-end ml-auto gap-x-1 max-h-10">
						<popper v-show="online" :tooltip="playslist()">
							<a class="text-white text-sm/tight whitespace-nowrap place-self-end font-bold font-mono">{{ status.players
								?? 0 }} / {{ status.maxplayers ?? 20 }}</a>
						</popper>
						<popper :tooltip="online ? status.ping + 'ms' : ''">
							<img class="h-fit min-w-5" alt="" :src="getSignalUrl(refreshing[uuid], status.signal)">
						</popper>
					</div>
				</div>
				<div name="motd" class="flex h-full text-[burlywood] text-xs text-left
				 overflow-hidden items-start z-1 pointer-events-none" id="motd">
					<ellipsisText :showEnd="true">
						<motd :data="status.motd" />
					</ellipsisText>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import { computed, onMounted, reactive, ref, toRef, watch } from 'vue';
	import Popper from "@/vue/commonComponents/tooltip.vue";
	import motd from '@/vue/components/motd.vue'
	import ellipsisText from "@/vue/layouts/ellipsisText.vue";
	import { Status } from '@/modules';
	import { appStatus, serversStatus, refreshing } from '@/provider';
	import { map2str, Mcdata, setIcon, getSignalUrl } from '@/core/handle';
	import { IncreaseImage } from '@/utils';

	const props = defineProps<{ uuid: string }>()

	const status = reactive<Status>(toRef(serversStatus.find(i => i.uuid === props.uuid)).value!)
	const online = computed(() => status.status === 'online')
	let iconImg = ref(status?.icon);
	const increaseImg = new IncreaseImage(iconImg, props.uuid)
	onMounted(() => {
		Mcdata.queryOne(props.uuid)
	})

	watch(() => status, () => {
		increaseImg.run(status.icon)
	}, { deep: true })

	function playslist() {
		if (!status.onlines) return ''
		return map2str(status.onlines, { per: true, limit: true })
	}
	// 
	function detail(uuid: string) {
		if (appStatus.isDragging) return;
		appStatus.activeUUID = uuid
		appStatus.exPage = 1;
		appStatus.currentPage = 2
	}
</script>

<style scoped>
	.server-item {
		border: 3px solid transparent;
		aspect-ratio: calc(2 * 1.618);
		background-image: url("@/assets/img/stickers/light_dirt_background.png");
		background-repeat: repeat;
		background-size: auto;
	}

	.nohover {
		border: 3px solid transparent !important;
	}

	.server-item:hover {
		border: 3px solid rgba(0, 100, 255, 0.75);
	}

	.name {
		background-image: -webkit-linear-gradient(left, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 8.33%, rgb(0, 255, 0) 16.67%, rgb(0, 255, 255) 25%, rgb(0, 0, 255) 33.33%, rgb(255, 0, 255) 41.67%,
				rgb(255, 0, 0) 50%, rgb(255, 0, 255) 58.33%, rgb(0, 0, 255) 66.67%, rgb(0, 255, 255) 75%, rgb(0, 255, 0) 83.33%, rgb(255, 225, 0) 91.67%, rgb(255, 0, 0) 100%);
		-webkit-text-fill-color: transparent;
		background-clip: text;
		-webkit-background-clip: text;
		background-size: 200% 100%;
		-webkit-background-size: 200% 100%;
		animation: maskedAnimation 12s infinite linear;
		-webkit-animation: maskedAnimation 12s infinite linear;
	}

	@keyframes maskedAnimation {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: -200% 0;
		}

	}
</style>