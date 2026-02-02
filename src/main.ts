// Vue
import { createApp } from "vue";
import App from "@/App.vue";

// PrimeVue
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Lara from '@primeuix/themes/lara';

// Self
import "@/assets/main.css";
import '@/watcher';

/// App
const app = createApp(App)
app.use(PrimeVue, {
	theme: {
		preset: Lara,
		options: {
			darkModeSelector: '.dark',
			cssLayer: {
				name: 'primevue',
				order: 'theme, base, primevue'
			}
		},
	},
})
app.use(ToastService)
app.use(ConfirmationService)
app.mount("#app");
