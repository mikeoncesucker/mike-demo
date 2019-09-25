import { addLocaleData } from 'react-intl';
import * as _ from 'lodash';
import store from 'store';

let translations = {
  en: require('../translations/en'),
  zh: require('../translations/zh')
};

const enData = require('react-intl/locale-data/en');
const zhData = require('react-intl/locale-data/zh');
addLocaleData(enData);
addLocaleData(zhData);

let detectBrowserLanguage = () => {
  let browserLanguagePropertyKeys = [
    'languages',
    'language',
    'browserLanguage',
    'userLanguage',
    'systemLanguage'
  ];

  let availableLanguages: any = ['zh', 'en'];

  let detectedLocale = _.chain(window.navigator)
    .pick(browserLanguagePropertyKeys) // Get only language properties
    .values() // Get values of the properties
    .flatten() // flatten all arrays
    .compact() // Remove undefined values
    .map(function(x: any) {
      return x.substr(0, 2); // Shorten strings to use two chars (en-US -> en)
    })
    .find(function(x) {
      return _.includes(availableLanguages, x); // Returns first language matched in available languages
    })
    .value();
    
  return detectedLocale || 'en'; // If no locale is detected, fallback to 'en'
};

let getTranslations = (locale) => {
  if (_.has(translations, locale)) {
    return translations[locale];
  } else {
    return translations['en'];
  }
};

const locale = store.get('local_language') ? store.get('local_language') : detectBrowserLanguage();
store.set('local_language', locale)
export const intl = {
  state: {
    locale: locale,
    translations: getTranslations(locale)
  },
  reducers: {
    _changeLocale(state, payload) {
      store.set('local_language', payload)
      return Object.assign({}, state, { locale: payload, translations: getTranslations(payload) });
    },

  },
  effects: (dispatch) => ({
    async changeLocale(val, rootState) {
      dispatch.intl._changeLocale(val);
    }
  })
};
