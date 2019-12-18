import { addLocaleData } from 'react-intl';
import store from 'store';

import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
addLocaleData([...en, ...zh]);  

let message:any = {
  en: require('../intl/en'),
  zh: require('../intl/zh')
};

const locale = store.get('local_language') || 'zh';
export const intl = {
  state: {
    locale: locale,
    message: message[locale]
  },
  reducers: {
    
  },
  effects: (dispatch:any) => ({
    
  })
};
