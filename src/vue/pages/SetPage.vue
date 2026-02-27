<template>
	<div>
		<div class="col gap-4 mx-4 pt-4">
			<!--  -->
			<Panel toggleable header="UI"
				:pt="{ root: { class: 'rounded-xl' }, header: { class: 'bg-transparent border-0' }, content: { class: 'bg-transparent pt-0' } }">
				<div class="col gap-2">
					<my-optionSet :label="$t('set-UI-theme')">
						<SelectButton v-model="UI.theme" optionLabel="name" optionValue="value" :allowEmpty="false"
							:options="options">
							<template #option="slotProps">
								<i :class="slotProps.option.icon"></i>
							</template>
						</SelectButton>
					</my-optionSet>
					<my-optionSet :label="$t('set-UI-language')">
						<Select v-model="UI.language" class="min-w-30" :options="languages" :option-label="((data) => data.label)"
							:option-value="((data) => data.value)"></Select>
					</my-optionSet>
					<my-optionSet :label="$t('set-UI-btn-text-display')">
						<ToggleButton v-model="UI.showtext" class="w-24" :onLabel="$t('set-UI-btn-text-show')"
							onIcon="xicon-fluent xicon-fluent-TextColor16Filled" :offLabel="$t('set-UI-btn-text-hide')"
							off-icon="xicon-fluent xicon-fluent-TextColor16Regular" />
					</my-optionSet>
					<my-optionSet :label="$t('set-UI-vertical-docker')">
						<ToggleSwitch v-model="UI.vertical" />
					</my-optionSet>
					<my-optionSet v-if="pf === 'Desktop'" :label="$t('set-UI-vertical-docker-full')">
						<ToggleSwitch v-model="UI.verticalDockerFull" />
					</my-optionSet>
					<my-optionSet v-if="pf === 'Desktop'" :label="$t('set-UI-vertical-docker-force')">
						<ToggleSwitch v-model="UI.forceVerticalOnDesktop" />
					</my-optionSet>
				</div>
			</Panel>
			<!--  -->
			<Panel toggleable header="Home"
				:pt="{ root: { class: 'rounded-xl' }, header: { class: 'bg-transparent border-0' }, content: { class: 'bg-transparent pt-0' } }">

				<div class="col gap-2">
					<my-optionSet :label="$t('set-Home-minWidth')" :value="Home.minWidth">
						<Slider v-model="Home.minWidth" :step="1" :min="300" :max="600" class="cursor-grab min-w-20" />
					</my-optionSet>
					<my-optionSet :label="$t('set-Home-x')" :value="Home.eachLine">
						<Slider v-model="Home.eachLine" :step="1" :min="0" :max="4" class="cursor-grab min-w-20" />
					</my-optionSet>
					<my-optionSet :label="$t('set-Home-query-thread')" :value="Home.thread">
						<Slider v-model="Home.thread" :step="1" :min="0" :max="16" class="cursor-grab min-w-20" />
					</my-optionSet>
					<my-optionSet :label="$t('set-Home-icon-enhance')" description="esrgan-slim/4x">
						<ToggleSwitch v-model="Home.imgIncrease" />
					</my-optionSet>
					<my-optionSet :label="$t('set-Home-double-page')" :description="$t('set-Home-double-page-desc')">
						<ToggleSwitch v-model="Home.doublePage" />
					</my-optionSet>
				</div>
			</Panel>
			<!--  -->
			<Panel toggleable header="Info"
				:pt="{ root: { class: 'rounded-xl' }, header: { class: 'bg-transparent border-0' }, content: { class: 'bg-transparent pt-0' } }">

				<div class="col gap-2">
					<my-optionSet :label="$t('set-Info-refresh')" :description="$t('set-Info-refresh-desc')">
						<ToggleSwitch v-model="Info.refreshOnload" />
					</my-optionSet>
					<my-optionSet :label="$t('set-Info-avatar')" description="https://minotar.net/">
						<ToggleSwitch v-model="Info.avatar" />
					</my-optionSet>
					<my-optionSet :label="$t('set-Info-avatar-type')">
						<ToggleSwitch v-model="Info.rounded" />
					</my-optionSet>
					<my-optionSet :label="$t('set-Info-show-uuid')">
						<ToggleSwitch v-model="Info.showUUID" />
					</my-optionSet>
				</div>
			</Panel>
			<!--  -->
			<Line :label="$t('set-device-info')" @click="Draw.deciveInfo = true">
				<Drawer v-model:visible="Draw.deciveInfo" :header="$t('set-device-info')">
					<deciveInfo />
				</Drawer>
			</Line>
			<!--  -->
			<div class="flex justify-center gap-4">
				<Button @click="clearCache()" class="min-w-30 w-full max-w-50" :label="$t('set-clear-DNS')" severity="danger" />
				<Button @click="resetConfirm()" class="min-w-30 w-full max-w-50" :label="$t('set-reset')" severity="danger" />
			</div>
			<!--  -->
			<div class="h-4"></div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import { reactive, defineAsyncComponent, computed } from 'vue';
	import Panel from 'primevue/panel';
	import Select from 'primevue/select';
	import SelectButton from 'primevue/selectbutton';
	import ToggleButton from 'primevue/togglebutton';
	import Button from 'primevue/button';
	import Slider from 'primevue/slider';
	import ToggleSwitch from 'primevue/toggleswitch';
	import { useConfirm } from "primevue/useconfirm";
	import { useToast } from "primevue/usetoast";
	import myOptionSet from '@/vue/commonComponents/option.set.vue'
	import Line from '@/vue/commonComponents/set.line.vue';
	import { config, resetConfig, pf } from '@/provider';
	import { languages } from '@/utils';
	import { clearCache } from '@/core/mc-status/'
	import { useTranslation } from 'i18next-vue';
	const { t } = useTranslation();
	defineOptions({
		name: 'setPage'
	})
	const Drawer = defineAsyncComponent(() => import('@/vue/commonComponents/Drawer.vue'))
	const deciveInfo = defineAsyncComponent(() => import('@/vue/components/DeviceInfo.vue'))

	const options = [
		{ value: 'Auto', name: t('set-UI-theme-system'), icon: 'xicon-fluent xicon-fluent-WeatherPartlyCloudyDay24Filled' },
		{ value: 'Light', name: t('set-UI-theme-light'), icon: 'xicon-fluent xicon-fluent-WeatherSunny24Filled' },
		{ value: 'Dark', name: t('set-UI-theme-dark'), icon: 'xicon-fluent xicon-fluent-WeatherMoon24Filled' }
	]

	const UI = computed(() => config.UI)
	const Home = computed(() => config.Home)
	const Info = computed(() => config.Info)

	const Draw = reactive({
		deciveInfo: false
	})
	// 
	const reset = useConfirm();
	const toast = useToast();
	const resetConfirm = () => {
		reset.require({
			message: 'Are you sure?',
			header: 'Confirmation',
			icon: 'xicon-material xicon-material-WarningRound',
			rejectProps: {
				label: 'Cancel',
				severity: 'secondary',
				outlined: true
			},
			acceptProps: {
				label: 'Reset',
				severity: 'danger'
			},
			accept: () => {
				resetConfig();
				toast.add({ severity: 'success', summary: 'Confirmed', detail: 'You have reset, 强制刷新', life: 3000 });
			},
			// reject: () => {
			// }
		});
	};
</script>
<style scoped></style>