import i18n from 'i18next';

i18n.init(
    {
        whitelist: ['ja', 'zh', 'en'],
        fallbackLng: 'zh',

        debug: false,
        load: 'currentOnly',

        // have a common namespace used around the full app
        ns: [
            'common',
            'index',
            'slider'
        ],
        defaultNS: 'common',

        interpolation:
        {
            escapeValue: false // not needed for react!!
        }
    });

export default i18n;
