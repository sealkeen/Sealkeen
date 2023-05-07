import LocalizationService from './../Services/Localization/localization-service.js';

var lS = LocalizationService.getInstance();

export function CreateLocalization()
{
    // Add missing translations for each key
    const translations = {
        "nav-lnk-genres": {
            en: "Genres",               ru: "Жанры",    de: "Genres", sv: "Genrer" },
        "nav-lnk-albums": {
            en: "Albums",               ru: "Альбомы",  de: "Alben", sv: "Album" },
        "nav-lnk-compositions": {
            en: "Tracks",               ru: "Треки",    de: "Kompositionen", sv: "Kompositioner" },
        "nav-lnk-artists": {
            en: "Artists",              ru: "Исполнители", de: "Künstler", sv: "Artister" },
        "nav-lnk-sign-up,": {
           en: "Sign up",               ru: "Регистрация", de: "Registrieren", sv: "Registrera dig" },
        "nav-lnk-register": {
            en: "Register",             ru: "Регистрация", de: "Registrieren", sv: "Registrera dig" },
        "nav-lnk-login": {
            en: "Log in",               ru: "Вход",     de: "Einloggen", sv: "Logga in" },
        "nav-lnk-background": {
            en: "Background",           ru: "Фон",      de: "Hintergrund",sv: "Bakgrund" },
        "nav-lnk-about": {
            en: "About",                ru: "Исполнители",  de: "Über uns", sv: "Om oss" },
        'greeting_midnight': {  
            en: 'Good midnight',        ru: 'Доброй ночи',  de: 'Gute Nacht', sv: 'God natt' },
        'greeting_morning': { 
            en: 'Good morning',         ru: 'Доброе утро',  de: 'Guten Morgen', sv: 'God morgon' },
        'greeting_day': { 
            en: 'Good day',             ru: 'Добрый день',  de: 'Guten Tag', sv: 'God dag' },
        'greeting_early_afternoon': { 
            en: 'Good early afternoon', ru: 'Добрый день',  de: 'Guten frühen Nachmittag', sv: 'God tidig eftermiddag' },
        'greeting_late_afternoon': {
            en: 'Good late afternoon',  ru: 'Добрый день',  de: 'Guten späten Nachmittag', sv: 'God sen eftermiddag' },
        'greeting_early_evening': {
            en: 'Good early evening',   ru: 'Добрый вечер', de: 'Guten frühen Abend', sv: 'God tidig kväll' },
        'greeting_late_evening': {
            en: 'Good late evening',    ru: 'Добрый вечер', de: 'Guten späten Abend', sv: 'God sen kväll' },
        'lbl-srv-status': { 
            en: 'Server Status',        ru: 'Статус сервера', de: 'Serverstatus', sv: 'Serverstatus' },
        'nav-lnk-about': { 
            en: 'About',                ru: 'О нас',        de: 'Über uns', sv: 'Om oss' },
        'nav-lnk-home': { 
            en: 'Home',                 ru: 'Главная',      de: 'Startseite', sv: 'Hem' },
        'btn-submit': { 
            en: 'Submit',               ru: 'Отправить',    de: 'Absenden', sv: 'Skicka' },
        'navbar-brand': {
            en: 'MediaStreamer.WebApp', ru: 'Медиа.Поток', de: 'Medienstrom', sv: 'Mediaström' }
    };

    // Set the translations in local storage
    for (const key in translations) {
        const translationsForKey = translations[key];
        for (const lang in translationsForKey) {
            const translation = translationsForKey[lang];
            lS.setString(lang, key, translation);
        }
    }
}