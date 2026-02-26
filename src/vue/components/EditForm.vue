<template>
	<div id="editform" class="fixed w-full h-full top-0 z-2000 pointer-events-none">
		<Toast position="top-center" />
		<Dialog v-model:visible="visible" modal :closable="false" :draggable="false"
			:appendTo="(config.Home.doublePage && doubleSwitch) ? '#MainPage' : '#editform'" :pt="{
				mask: { style: 'position: absolute;', class: 'reactive' },
				root: { class: 'w-1/2 min-w-75 max-w-100' },
				header: { class: 'p-4 pb-0' },
				content: { class: 'p-4' }
			}">
			<template #header>
				<span class="p-dialog-title">Edit</span>
				<span>{{ initialValues.edittime }}</span>
			</template>
			<Form v-slot="$form" :initialValues :resolver :validateOnBlur="true" @submit="onFormSubmit"
				class="flex flex-col gap-y-4 justify-center">
				<!--  -->
				<div class="flex flex-col gap-1">
					<label for="name">name</label>
					<FloatLabel variant="on">
						<InputText name="name" id="name" type="text" class="w-full" autocomplete="off" autofocus />
						<label for="name">MineCraft Servers</label>
					</FloatLabel>
					<Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{
						$form.name.error.message }}</Message>
				</div>
				<!--  -->
				<div class="flex flex-col gap-1">
					<label for="address">address</label>
					<FloatLabel variant="on">
						<InputText name="address" id="address" type='text' class="w-full" autocomplete="off" />
						<label for="address">mc.example.com</label>
					</FloatLabel>
					<Message v-if="$form.address?.invalid" severity="error" size="small" variant="simple">{{
						$form.address.error.message }}</Message>
				</div>
				<!--  -->
				<div class="flex flex-col gap-2">
					<RadioButtonGroup name="edition" class="flex flex-wrap gap-4">
						<div class="flex items-center gap-2">
							<RadioButton inputId="Java" value="Java" />
							<label for="Java">Java</label>
						</div>
						<div class="flex items-center gap-2">
							<RadioButton inputId="Bedrock" value="Bedrock" />
							<label for="Bedrock">Bedrock(beta)</label>
						</div>
					</RadioButtonGroup>
				</div>
				<!--  -->
				<div class="flex justify-evenly gap-2">
					<Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
					<Button type="submit" label="Save"></Button>
				</div>
			</Form>
		</Dialog>
	</div>
</template>
<script setup>
	const visible = defineModel()
	import { reactive, ref, useTemplateRef, onMounted } from 'vue'
	//
	import Dialog from 'primevue/dialog';
	import { Form } from '@primevue/forms';
	import FloatLabel from 'primevue/floatlabel';
	import Message from 'primevue/message';
	import Toast from 'primevue/toast';
	import InputText from 'primevue/inputtext';
	import Button from 'primevue/button';
	import RadioButton from 'primevue/radiobutton';
	import RadioButtonGroup from 'primevue/radiobuttongroup';
	import { useToast } from 'primevue/usetoast';
	//
	import { validateAddress, getByteLength } from '@/utils';
	import { Mcdata } from '@/core/handle';
	import { appStatus, config, doubleSwitch } from '@/provider';
	const toast = useToast();
	const initialValues = ref({
		name: '',
		address: '',
		edition: 'Java',
		edittime: ''
	})
	onMounted(() => {
		const { name, address, edition, edittime } = { ...Mcdata.getOne(appStatus.activeUUID) };
		initialValues.value = { name, address, edition, edittime };
	})

	const resolver = ({ values }) => {
		const errors = {};
		let x;
		if (!values.address) {
			errors.address = [{ message: 'Server address is required.' }];
		} else if (x = validateAddress(values.address)) {
			if (typeof x === 'string') {
				errors.address = [{ message: x }];
			} else if (!x) {
				errors.address = [{ message: 'Invalid server address.' }];
			}
		}
		if (getByteLength(values.name) > 16) {
			errors.name = [{ message: 'Name must be less than 16 characters.' }];
		}

		return {
			values,
			errors
		};
	};

	const onFormSubmit = ({ valid, values }) => {
		if (valid) {
			console.log('onFormSubmit', values);
			Mcdata.edit(appStatus.activeUUID, values);
			toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
			visible.value = false;
		}
	}
</script>

<style scoped></style>