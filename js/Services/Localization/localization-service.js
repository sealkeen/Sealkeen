const LocalizationService = (function () {
    let instance;
    // Default language is English
    let defaultLanguage = 'en';
    const strings = {        
        'en': {}, 'ru': {}, 'de': {}
    };
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
                console.error('String not found: ' + key)
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
        function getDefaultLanguage(language) {
            return defaultLanguage;
        };
        function getLanguages(language) {
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