<template>
	<div>
		<div class="col gap-4 mx-4">
			<!--  -->
			<Card :pt="{ root: { class: 'rounded-xl' } }">
				<template #title>UI</template>
				<template #content>
					<div class="col gap-2">
						<my-optionSet label="模式" description="选择主题模式">
							<SelectButton v-model="UI.theme" optionLabel="name" optionValue="value" :allowEmpty="false"
								:options="options">
								<template #option="slotProps">
									<i :class="slotProps.option.icon"></i>
								</template>
							</SelectButton>
						</my-optionSet>
						<my-optionSet label="<span>按钮文本</span><span>显示</span>">
							<ToggleButton v-model="UI.showtext" class="w-24" onLabel="显示"
								onIcon="xicon-fluent xicon-fluent-TextColor16Filled" offLabel="隐藏"
								off-icon="xicon-fluent xicon-fluent-TextColor16Regular" />
						</my-optionSet>
					</div>
				</template>
			</Card>
			<!--  -->
			<Card :pt="{ root: { class: 'rounded-xl' } }">
				<template #title>Home</template>
				<template #content>
					<div class="col gap-2">
						<my-optionSet label="每行x列数" :value="Home.eachLine">
							<Slider v-model="Home.eachLine" :step="1" :min="0" :max="4" class="cursor-grab min-w-20" />
						</my-optionSet>
						<my-optionSet label="查询线程" :value="Home.thread">
							<Slider v-model="Home.thread" :step="1" :min="0" :max="16" class="cursor-grab min-w-20" />
						</my-optionSet>
						<my-optionSet label="图片增强" description="esrgan-slim/4x">
							<ToggleSwitch v-model="Home.imgIncrease" />
						</my-optionSet>
					</div>
				</template>
			</Card>
			<!--  -->
			<Line label="设备信息" @click="Draw.deciveInfo = true">
				<Drawer v-model:visible="Draw.deciveInfo" header="设备信息">
					<deciveInfo />
				</Drawer>
			</Line>
			<!--  -->
			<div class="flex justify-center">
				<Button @click="resetConfirm()" class="w-30" label="重置" severity="danger" />
			</div>
			<!--  -->
			<div class="h-4"></div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import { reactive, defineAsyncComponent, computed } from 'vue'
	import Card from 'primevue/card';
	import SelectButton from 'primevue/selectbutton';
	import ToggleButton from 'primevue/togglebutton';
	import Button from 'primevue/button';
	import Slider from 'primevue/slider';
	import ToggleSwitch from 'primevue/toggleswitch';
	import { useConfirm } from "primevue/useconfirm";
	import { useToast } from "primevue/usetoast";
	import myOptionSet from '@/vue/commonComponents/option.set.vue'
	import Line from '@/vue/commonComponents/set.line.vue';
	import { config, resetConfig } from '@/provider'

	defineOptions({
		name: 'setPage'
	})
	const Drawer = defineAsyncComponent(() => import('@/vue/commonComponents/Drawer.vue'))
	const deciveInfo = defineAsyncComponent(() => import('@/vue/components/DeviceInfo.vue'))

	const options = [
		{ value: 'Auto', name: '系统', icon: 'xicon-fluent xicon-fluent-WeatherPartlyCloudyDay24Filled' },
		{ value: 'Light', name: '浅色', icon: 'xicon-fluent xicon-fluent-WeatherSunny24Filled' },
		{ value: 'Dark', name: '深色', icon: 'xicon-fluent xicon-fluent-WeatherMoon24Filled' }
	]
	const Home = computed(() => config.Home)
	const UI = computed(() => config.UI)
	const Draw = reactive({
		deciveInfo: false
	})
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