import renderHomeBeers from './beers.js';




page('/', () => {
  console.log('Route /');
  renderHomeBeers();
});

page();
