import renderHomeBeers from './beers.js';
import { STORAGE_TYPE } from './form.js';




page('/', () => {
  console.log('Route /');
  renderHomeBeers();
});


page();
