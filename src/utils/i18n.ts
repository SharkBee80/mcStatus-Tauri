// https://i18ns.com/languagecode.html

// import { useTranslation } from 'i18next-vue';
// const { t } = useTranslation();
// $t('')
import HttpBackend from "i18next-http-backend"
// i18n
import i18next from 'i18next';
import I18NextVue from 'i18next-vue';

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

const code = ['af-ZA', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-OM', 'ar-QA', 'ar-SA', 'ar-SY', 'ar-TN', 'ar-YE', 'az-AZ', 'be-BY', 'bg-BG', 'bs-BA', 'ca-ES', 'cs-CZ', 'cy-GB', 'da-DK', 'de-AT', 'de-CH', 'de-DE', 'de-LI', 'de-LU', 'dv-MV', 'el-GR', 'en-AU', 'en-BZ', 'en-CA', 'en-CB', 'en-GB', 'en-IE', 'en-IN', 'en-JM', 'en-NZ', 'en-PH', 'en-TT', 'en-US', 'en-ZA', 'en-ZW', 'es-AR', 'es-BO', 'es-CL', 'es-CO', 'es-CR', 'es-DO', 'es-EC', 'es-ES', 'es-GT', 'es-HN', 'es-MX', 'es-NI', 'es-PA', 'es-PE', 'es-PR', 'es-PY', 'es-SV', 'es-UY', 'es-VE', 'et-EE', 'eu-ES', 'fa-IR', 'fi-FI', 'fo-FO', 'fr-BE', 'fr-CA', 'fr-CH', 'fr-FR', 'fr-LU', 'fr-MC', 'gl-ES', 'gu-IN', 'he-IL', 'hi-IN', 'hr-BA', 'hr-HR', 'hu-HU', 'hy-AM', 'id-ID', 'is-IS', 'it-CH', 'it-IT', 'ja-JP', 'ka-GE', 'kk-KZ', 'kn-IN', 'ko-KR', 'ky-KG', 'lt-LT', 'lv-LV', 'mi-NZ', 'mk-MK', 'mn-MN', 'mr-IN', 'ms-BN', 'ms-MY', 'mt-MT', 'nb-NO', 'nl-BE', 'nl-NL', 'nn-NO', 'ns-ZA', 'pa-IN', 'pl-PL', 'pt-BR', 'pt-PT', 'qu-BO', 'qu-EC', 'qu-PE', 'ro-RO', 'ru-RU', 'sa-IN', 'se-FI', 'se-NO', 'se-SE', 'sk-SK', 'sl-SI', 'sq-AL', 'sr-BA', 'sr-SP', 'sv-FI', 'sv-SE', 'sw-KE', 'ta-IN', 'ta-LK', 'te-IN', 'th-TH', 'tl-PH', 'tn-ZA', 'tr-TR', 'tt-RU', 'uk-UA', 'ur-PK', 'uz-UZ', 'vi-VN', 'xh-ZA', 'zh-CN', 'zh-HK', 'zh-MO', 'zh-SG', 'zh-TW', 'zu-ZA'] as const;
type Language = typeof code[number];
export const getLanguageSelfNames = (localeCode: Language) => {
	const langName = new Intl.DisplayNames([localeCode, 'en-US'], { type: 'language' });
	return langName.of(localeCode);
};

export const getLanguageUniqueNames = (localeCode: Language, uniqueCode = 'en-US') => {
	const langName = new Intl.DisplayNames([uniqueCode, 'en-US', 'zh-CN'], { type: 'language', });
	return langName.of(localeCode);
};

const language: ('auto' | Language)[] = ['auto', 'en-US', 'zh-CN']
export const languages: { value: 'auto' | Language, label: string }[] = Array.from(language).map(lang => {
	return {
		value: lang,
		label: lang === 'auto' ? ':\'(' : lang + ' | ' + getLanguageSelfNames(lang)!,
	}
});