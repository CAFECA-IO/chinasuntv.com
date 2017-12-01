import i18n from 'i18next';
import Backend from 'i18next-node-fs-backend';
import { LanguageDetector } from 'i18next-express-middleware';

i18n.use(Backend)
    .use(LanguageDetector)
    .init(
    {
        whitelist: ['ja', 'zh', 'en'],

        fallbackLng: 'zh',

        preload: ['ja', 'zh', 'en'],

        // have a common namespace used around the full app
        ns: [
            'common',
            'index',
            'slider'
        ],
        defaultNS: 'common',

        debug: false,

        load: 'currentOnly',

        interpolation:
        {
            escapeValue: false, // not needed for react!!
        },

        backend:
        {
            loadPath: 'locales/{{lng}}/{{ns}}.json',
            jsonIndent: 2
        }
    });

export default i18n;
