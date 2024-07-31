
import { enUS, es, pt } from 'date-fns/locale';
const localeMap: any = {
    en: enUS,
    es: es,
    pt: pt,
};
export const getLocale = () => {
    const language = localStorage.getItem('language') ?? "en";
    return localeMap[language]
}

