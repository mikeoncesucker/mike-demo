import { init } from '@rematch/core';
import { intl } from './models/intl';
import { common } from './models/common';
import { user } from './models/user';
import { portal } from './models/portal';
import { search } from './models/search';
import { notice } from './models/notice';

const store = init({
  models: {
    intl,
    common,
    user,
    portal,
    search,
    notice
  }
});
export { store };
