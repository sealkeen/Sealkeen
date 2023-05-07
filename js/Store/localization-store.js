import LocalizationService from './../Services/Localization/localization-service.js';

var lS = LocalizationService.getInstance();

export function CreateLocalization()
{
    // Greetings 
    lS.setString('en', 'greeting_midnight', 'Good midnight');
    lS.setString('ru', 'greeting_midnight', 'Спокойной ночи');
    lS.setString('de', 'greeting_midnight', 'Gute Nacht');
    lS.setString('sv', 'greeting_midnight', 'God natt');

    lS.setString('en', 'greeting_morning', 'Good morning');
    lS.setString('ru', 'greeting_morning', 'Доброе утро');
    lS.setString('de', 'greeting_morning', 'Guten Morgen');
    lS.setString('sv', 'greeting_morning', 'God morgon');

    lS.setString('en', 'greeting_day', 'Good day');
    lS.setString('ru', 'greeting_day', 'Добрый день');
    lS.setString('de', 'greeting_day', 'Guten Tag');
    lS.setString('sv', 'greeting_day', 'God dag');

    lS.setString('en', 'greeting_early_afternoon', 'Good early afternoon');
    lS.setString('ru', 'greeting_early_afternoon', 'Добрый день');
    lS.setString('de', 'greeting_early_afternoon', 'Guten frühen Nachmittag');
    lS.setString('sv', 'greeting_early_afternoon', 'God tidig eftermiddag');

    lS.setString('en', 'greeting_late_afternoon', 'Good late afternoon');
    lS.setString('ru', 'greeting_late_afternoon', 'Добрый день');
    lS.setString('de', 'greeting_late_afternoon', 'Guten späten Nachmittag');
    lS.setString('sv', 'greeting_late_afternoon', 'God sen eftermiddag');

    lS.setString('en', 'greeting_early_evening', 'Good early evening');
    lS.setString('ru', 'greeting_early_evening', 'Добрый вечер');
    lS.setString('de', 'greeting_early_evening', 'Guten frühen Abend');
    lS.setString('sv', 'greeting_early_evening', 'God tidig kväll');

    lS.setString('en', 'greeting_late_evening', 'Good late evening');
    lS.setString('ru', 'greeting_late_evening', 'Добрый вечер');
    lS.setString('de', 'greeting_late_evening', 'Guten späten Abend');
    lS.setString('sv', 'greeting_late_evening', 'God sen kväll');

    // Navigation Links
    lS.setString('ru', 'nav-lnk-genres', 'Жанры');
    lS.setString('ru', 'nav-lnk-albums', 'Альбомы');
    lS.setString('ru', 'nav-lnk-compositions', 'Треки');
    lS.setString('ru', 'nav-lnk-artists', 'Исполнители');
    lS.setString('ru', 'nav-lnk-sign-up,', 'Регистрация');
    lS.setString('ru', 'nav-lnk-register', 'Регистрация');
    lS.setString('ru', 'nav-lnk-login', 'Вход');
    lS.setString('ru', 'nav-lnk-background', 'Фон');
    lS.setString('ru', 'nav-lnk-about', 'Исполнители');

    lS.setString('en', 'nav-lnk-artists', 'Artists');
    lS.setString('en', 'nav-lnk-compositions', 'Compositions');
    lS.setString('en', 'nav-lnk-albums', 'Albums');
    lS.setString('en', 'nav-lnk-genres', 'Genres');
    lS.setString('en', 'nav-lnk-sign-up', 'Sign up');
    lS.setString('en', 'nav-lnk-register', 'Register');
    lS.setString('en', 'nav-lnk-login', 'Log in');
    lS.setString('en', 'nav-lnk-background', 'Background');
    lS.setString('en', 'nav-lnk-about', 'About');

    lS.setString('de', 'nav-lnk-artists', 'Künstler');
    lS.setString('de', 'nav-lnk-compositions', 'Kompositionen');
    lS.setString('de', 'nav-lnk-albums', 'Alben');
    lS.setString('de', 'nav-lnk-genres', 'Genres');
    lS.setString('de', 'nav-lnk-sign-up', 'Registrieren');
    lS.setString('de', 'nav-lnk-register', 'Registrieren');
    lS.setString('de', 'nav-lnk-login', 'Einloggen');
    lS.setString('de', 'nav-lnk-background', 'Hintergrund');
    lS.setString('de', 'nav-lnk-about', 'Über uns');

    lS.setString('sv', 'nav-lnk-artists', 'Artister');
    lS.setString('sv', 'nav-lnk-compositions', 'Kompositioner');
    lS.setString('sv', 'nav-lnk-albums', 'Album');
    lS.setString('sv', 'nav-lnk-genres', 'Genrer');
    lS.setString('sv', 'nav-lnk-sign-up', 'Registrera dig');
    lS.setString('sv', 'nav-lnk-register', 'Registrera dig');
    lS.setString('sv', 'nav-lnk-login', 'Logga in');
    lS.setString('sv', 'nav-lnk-background', 'Bakgrund');
    lS.setString('sv', 'nav-lnk-about', 'Om oss');
}