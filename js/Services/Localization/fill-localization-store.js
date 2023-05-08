import LocalizationService from './localization-service.js';
import { CreateLocalization } from './../../Store/localization-store.js'

var lS = LocalizationService.getInstance();

export function FillLocalizationStore()
{
    console.log('Call: FillLocalizationStore()');

    window.fillLocalizationStore = FillLocalizationStore;
    window.translateWebsite = Localize;
    window.applyLanguageTranslations = applyLanguageTranslations;
    window.translateGreetings = translateGreetings;

    CreateLocalization();
    AddLanguageDropDown();
    applyLanguageTranslations();

    console.log('Call ok.');
    return lS;
}

function Localize()
{
    applyLanguageTranslations();
    window.toggleBodyBackground();
}

function applyLanguageTranslations() {
    // ids
    const ids_A = ['nav-lnk-artists', 'nav-lnk-compositions', 'nav-lnk-albums', 'nav-lnk-genres', 'nav-lnk-sign-up', 'nav-lnk-register', 'nav-lnk-login', 'nav-lnk-background'];
    ids_A.forEach((id) => {
      const el = document.querySelector(`#${id} a`);
      if (el) {
        el.textContent = lS.getDefault(id);
      }
    });
    // classes
    const claasses = ['lbl-srv-status', 'nav-lnk-about', 'navbar-brand', 'nav-lnk-artists', 'nav-lnk-compositions', 'nav-lnk-albums', 'nav-lnk-genres', 'nav-lnk-background']
    claasses.forEach(id => {
        const el = document.querySelector(`.${id}`);
        if (el) {
          el.textContent = lS.getDefault(id);
        }
    });
  }

function translateGreetings(greetingKey)
{
    const greeting = lS.getDefault(greetingKey);
    $('#welcome').text(greeting);
}

function AddLanguageDropDown()
{  
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    if (dropdownToggles.length > 0) {
        return; // Exit the function
    }
    // Continue with the function
    console.log("No dropdown toggles found");

    // Create language combobox button
    const languageComboBoxButton = document.createElement('li');
    languageComboBoxButton.classList.add('nav-item', 'dropdown', 'language-combobox-button');

    const languageComboBoxButtonLink = document.createElement('a');
    languageComboBoxButtonLink.classList.add('nav-link', 'dropdown-toggle', 'text-dark', 'stroke-shadow-h3-white');
    languageComboBoxButtonLink.href = '#';
    languageComboBoxButtonLink.setAttribute('data-toggle', 'dropdown');
    languageComboBoxButtonLink.setAttribute('aria-haspopup', 'true');
    languageComboBoxButtonLink.setAttribute('aria-expanded', 'false');
    languageComboBoxButtonLink.textContent = lS.getDefaultLanguage();

    languageComboBoxButton.appendChild(languageComboBoxButtonLink);

    // Create language options dropdown menu
    const languageOptionsDropdownMenu = document.createElement('div');
    languageOptionsDropdownMenu.classList.add('dropdown-menu');

    lS.getLanguages().forEach((language) => {
        const languageOptionLink = document.createElement('a');
        languageOptionLink.classList.add('dropdown-item');
        languageOptionLink.textContent = language;

        languageOptionLink.addEventListener('click', () => {
            console.log('Setting default language: ' + language)
            lS.setDefaultLanguage(language);
            window.translateWebsite();
            // Get the language toggler and set its text to the default language
            const languageToggler = document.querySelector('.language-combobox-button .nav-link');
            languageToggler.textContent = language;
        });

        languageOptionsDropdownMenu.appendChild(languageOptionLink);
    });

    languageComboBoxButton.appendChild(languageOptionsDropdownMenu);

    const navbarUserRegisterLogin = document.querySelector('#navbar-nav-user-register-login');
    navbarUserRegisterLogin.insertBefore(languageComboBoxButton, navbarUserRegisterLogin.firstChild);
}
