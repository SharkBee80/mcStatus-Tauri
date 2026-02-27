<template>
	<div class="col p-4 gap-y-2">
		<!-- 卡片 -->
		<div class="server-item flex gap-1 p-4 rounded-xl">
			<div class="icon relative aspect-square flex justify-center items-center">
				<serverIcon class="min-w-16 w-full rounded-lg" :Imgsrc="status.icon" alt="Icon" :edition="status.edition"
					:uuid />
			</div>
			<div name="info" class="col flex-1 p-1">
				<div name="head" class="row justify-between">
					<div class="message col">
						<div class="name font-bold text-base flex items-center text-left text-nowrap whitespace-nowrap" id="name">{{
							status.name }}
						</div>
						<div name="address" class="text-[chartreuse] text-xs flex items-center text-left" id="address">
							{{ status.host }}</div>
					</div>
					<div name="status" class="row flex-wrap justify-end ml-auto gap-x-1 max-h-10">
						<a v-show="online" class="text-white text-sm/tight whitespace-nowrap place-self-end font-bold">{{
							status.players ?? 0 }}/{{ status.maxplayers ?? 20 }}</a>
						<popper :tooltip="online ? status.ping + 'ms' : ''">
							<img class="h-fit min-w-5" alt="" :src="getSignalUrl(refreshing[uuid], status.signal)">
						</popper>
					</div>
				</div>
				<div class="flex h-full text-[burlywood] text-xs text-left overflow-hidden items-start z-1">
					<ellipsisText :showEnd="true">
						<motd :data="status.motd" />
					</ellipsisText>
				</div>
			</div>
		</div>
		<!-- 服务器信息 -->
		<Panel toggleable v-model:collapsed="collapsed.server"
			:pt="{ root: { class: 'rounded-xl' }, header: { class: 'bg-transparent border-0' }, content: { class: 'bg-transparent pt-0' } }">
			<template #header>
				<div class="flex items-center gap-1" @click="collapsed.server = !collapsed.server">
					<i class="xicon-material xicon-material-InfoRound" />
					<h1>{{ $t('info-server-info') }}</h1>
				</div>
			</template>
			<div class="col">
				<div class="grid gridColsT gap-x-2 break-all">
					<a class="a">{{ $t('info-server-name') }}</a><a>{{ status.name }}</a>
					<a class="a">{{ $t('info-server-address') }}</a><a>{{ status.address }}</a>
					<a class="a">{{ $t('info-server-addtime') }}</a><a>{{ status.addtime }}</a>
				</div>
				<div v-show="online">
					<Divider />
					<div class="flex items-center gap-1">
						<i class="xicon-material xicon-material-SpeedRound" />
						<h1>{{ $t('info-server-status') }}</h1>
					</div>
					<div class="grid gridColsT gap-x-2 break-all">
						<a class="a">{{ $t('info-server-edition') }}</a><a>{{ status.version }}</a>
						<a class="a">{{ $t('info-server-latency') }}</a><a>{{ (status.ping ?? '-1') + ' ms' }}</a>
						<a v-if="status.port" class="a">{{ $t('info-server-port') }}</a><a>{{ status.port }}</a>
						<a class="a">{{ $t('info-server-motd') }}</a>
						<motd :data="status.motd" />
					</div>
				</div>
			</div>
		</Panel>
		<!-- 玩家状态 -->
		<Panel toggleable v-model:collapsed="collapsed.player"
			:pt="{ root: { class: 'rounded-xl' }, header: { class: 'bg-transparent border-0' }, content: { class: 'bg-transparent pt-0' } }">
			<template #header>
				<div class="flex justify-between w-full items-center">
					<div class="flex items-center gap-1" @click="collapsed.player = !collapsed.player">
						<i class="xicon-material xicon-material-PeopleAltRound" />
						<h1>{{ $t('info-players-status') }}</h1>
					</div>
					<primevueIcon @click="collapsed.listmode = !collapsed.listmode"
						:pt="{ class: `text-2xl! xicon-material ${collapsed.listmode ? 'xicon-material-ViewListRound' : 'xicon-material-SupervisedUserCircleRound'}` }">
					</primevueIcon>
				</div>
			</template>
			<div class="row gap-2 justify-evenly max-w-200 mt-1 mx-auto">
				<div :class="status.players ? 'ring-green-400 bg-green-200/80' : 'ring-red-400 bg-red-200/80'"
					class="w-1/3 max-w-50 ring-2 aspect-4/3 rounded-2xl flex justify-center items-center text-5xl/tight">
					<a class="drop-shadow-sm dark:drop-shadow-black drop-shadow-white">{{ status.players ?? 0 }}</a>
				</div>
				<div
					class="w-1/3 max-w-50 bg-blue-200/80 ring-blue-400 ring-2 aspect-4/3 rounded-2xl flex justify-center items-center text-5xl/tight">
					<a class="drop-shadow-sm dark:drop-shadow-black drop-shadow-white">{{ status.maxplayers ?? 20 }}</a>
				</div>
			</div>
			<div v-show="status.onlines?.length">
				<Divider />
				<div class="flex items-center gap-1">
					<i class="xicon-material xicon-material-EmojiPeopleRound" />
					<h1>{{ $t('info-players-online') }}</h1>
				</div>
				<div v-if="!collapsed.listmode" class="chip card flex flex-wrap gap-1.5 justify-between">
					<Chip v-for="i in onlines" :key="i.id" :label="i.name" class="px-2.5 py-1"
						:pt="{ avatar: { rounded: config.Info.rounded } }" :image="config.Info.avatar ? headSrc(i.id) : undefined"
						:backupImage="headSrc(i.name)" :imgerror="DEFAULT_HEAD_URL" />
				</div>
				<!--  -->
				<div v-if="collapsed.listmode" class="list col gap-1">
					<div v-for="i in status.onlines" :key="i.id"
						class="col gap-1 rounded-lg px-1 dark:bg-[#27272a] bg-[#f1f5f9] text-surface-800 dark:text-surface-0">
						<div class="flex items-center gap-1">
							<avatar :image="config.Info.avatar ? headSrc(i.id) : undefined" :size="6" :backupImage="headSrc(i.name)"
								:imgerror="DEFAULT_HEAD_URL" :rounded="config.Info.rounded">
							</avatar>
							<span>{{ i.name }}</span>
						</div>
						<div v-if="config.Info.showUUID" class="break-all">
							<Divider class="m-0" />{{ i.id }}
						</div>
					</div>
				</div>
			</div>
		</Panel>
		<!-- 连接状态 -->
		<Panel toggleable v-model:collapsed="collapsed.connect"
			:pt="{ root: { class: 'rounded-xl' }, header: { class: 'bg-transparent border-0' }, content: { class: 'bg-transparent pt-0' } }">
			<template #header>
				<div class="flex items-center gap-1" @click="collapsed.connect = !collapsed.connect">
					<i :class="status.status === 'online' ? 'xicon-material xicon-material-CheckCircleRound text-green-600'
						: 'xicon-fluent xicon-fluent-DismissCircle24Filled text-red-600'" class="i"></i>
					<h1>{{ $t('info-connect-status') }}</h1>
				</div>
			</template>
			<div class="col">
				<div class="grid gridColsT gap-x-2">
					<a class="a">{{ $t('info-update-time') }}</a><a>{{ status.updatetime }}</a>
					<a class="a">{{ $t('info-query-time') }}</a><a>{{ (status.tasktime ?? '-1') + ' ms' }}</a>
				</div>
			</div>
		</Panel>
	</div>
</template>
<script lang="ts" setup>
	const props = defineProps<{ uuid: string }>()
	import motd from '@/vue/components/motd.vue';
	import ellipsisText from "@/vue/layouts/ellipsisText.vue";
	import Popper from "@/vue/commonComponents/tooltip.vue";
	import primevueIcon from '@/vue/components/primevueIcon.vue';
	import avatar from './avatar.vue';
	import { computed, onMounted, reactive, ref, toRef, watch } from 'vue';
	import Panel from 'primevue/panel';
	import Divider from 'primevue/divider';
	import Chip from '@/vue/components/chip.vue';
	import serverIcon from '@/vue/components/serverIcon.vue';
	import { serversStatus, refreshing, config } from '@/provider';
	import { Status } from '@/modules';
	import { getByteLength } from '@/utils';
	import { WebStorage } from '@/core/storage';
	import { Mcdata, getSignalUrl, DEFAULT_HEAD_URL, headSrc } from '@/core/handle';

	const status = reactive<Status>(toRef(serversStatus.find(i => i.uuid === props.uuid)).value!)
	const online = computed(() => status.status === 'online')
	const onlines = computed(() => [...status.onlines ?? []].sort((a, b) => a.name.length - b.name.length))
	const storage = new WebStorage();
	const STORE_KEY = 'collapsed';
	const collapsed = reactive<{ server: boolean, player: boolean, connect: boolean, listmode: boolean }>({ server: false, player: false, connect: false, listmode: false });
	Object.assign(collapsed, storage.get(STORE_KEY));
	const maxAWidth = ref('5rem');
	onMounted(() => {
		const labels = document.querySelectorAll('.gridColsT .a');
		let maxWidth = 0;
		labels.forEach(el => {
			const w = parseFloat(getComputedStyle(el).fontSize) / 2;
			maxWidth = Math.max(maxWidth, getByteLength(el.textContent) * w + 8);
		});
		maxWidth = maxWidth > window.innerWidth / 2 ? 80 : maxWidth;
		maxAWidth.value = `${maxWidth}px`;

		if (config.Info.refreshOnload) Mcdata.queryOne(props.uuid);
	})

	watch(() => collapsed, () => {
		storage.set(STORE_KEY, collapsed)
	}, { deep: true })

</script>
<style scoped>
	.server-item {
		/* aspect-ratio: calc(2 * 1.618); */
		min-width: 240px;
		height: calc(100vw / 2 / 1.618);
		max-height: 12rem;
		background-image: url("@/assets/img/stickers/light_dirt_background.png");
		background-repeat: repeat;
		background-size: auto;
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

	.gridColsT {
		grid-template-columns: v-bind(maxAWidth) 1fr;
	}

	.a {
		text-align-last: justify;
	}

	.a::after {
		content: ":";
	}

	i {
		font-size: 1.5rem;
	}

	.chip::after {
		content: " ";
		margin: auto;
	}
</style>