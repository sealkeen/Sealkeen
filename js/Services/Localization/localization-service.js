const LocalizationService = (function () {
    let instance;
    const strings = {        
        'en': {}, 'de': {}, 'ru': {}, 'sv' : {}
    };
    // Default language is English
    let defaultLanguage = 'en';
    // If no other specified
    const language = (navigator.language || navigator.userLanguage).substring(0, 2);
    if (Object.keys(strings).includes(language)) {
        defaultLanguage = language;
    }

    function init() { 
        return { getString, setString, setDefaultLanguage, getDefaultLanguage, getLanguages, getDefault };
        function getDefault(key)
        {
            return getString(defaultLanguage, key);
        };
        function getString(language, key) {
            var value;
            if (strings[language] && strings[language][key]) {
                value = strings[language][key];
            } else if (strings[defaultLanguage] && strings[defaultLanguage][key]) {
                value = strings[defaultLanguage][key];
            } else {
                value = key;
                console.log('String not found: ' + key)
            }
            return value;
        };
        function setString(language, key, value) {
            if (!language) return;
            if (!strings[language]) {
                strings[language] = {};
            }
            strings[language][key] = value;
        };
        function setDefaultLanguage(language) {
            defaultLanguage = language;
        };
        function getDefaultLanguage() {
            return defaultLanguage;
        };
        function getLanguages() {
            return Object.keys(strings);
        };
    }
    return {
        getInstance: function () {
            if (!instance) { instance = init(); }
            return instance;
        },
    };
})();
  
export default LocalizationService;