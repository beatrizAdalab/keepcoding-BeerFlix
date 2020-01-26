import renderHomeBeers from './beers.js';
import renderBeer from './beer.js';
import {renderPageDetail, renderPageHome} from './ui.js';
import renderComments from './comments.js'

page('/', () => {
  console.log('Route /');
  renderPageHome()
  renderHomeBeers();
});

page('/detail/:id', (ctx) => {
  console.log('Detail');
  const { params: { id } } = ctx;
  renderPageDetail();
  renderBeer(id);
});

page();
