import renderHomeBeers from './beers.js';
import { STORAGE_TYPE } from './form.js';
import {renderDetail, renderHome} from './ui.js';






page('/', () => {
  console.log('Route /');
  renderHome()
  renderHomeBeers();
});

page('/detail/:id', (ctx) => {
  console.log('Detail');
  const { params: { id } } = ctx;
  renderDetail();
});


page();
