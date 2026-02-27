// https://i18ns.com/languagecode.html

// import { useTranslation } from 'i18next-vue';
// const { t } = useTranslation();
// $t('')
import HttpBackend from "i18next-http-backend"
// i18n
import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
import { Config } from "@/modules";

i18next
	.use(HttpBackend)
	.init({
		lng: 'en-US',
		fallbackLng: 'en-US',
		backend: {
			loadPath: '/locales/{{lng}}.json',
		},
	});

export function i18n(app: any) {
	app.use(I18NextVue, { i18next });
}

export const languages: { value: Config['UI']['language'], label: string }[] = [
	{ value: 'auto', label: ':\'(' },
	{ value: 'en-US', label: 'English' },
	{ value: 'zh-CN', label: '简体中文' },
];