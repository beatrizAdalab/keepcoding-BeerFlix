const remove = (el) => {
  el.classList.add('hidden')
}

const add = (el) => {
  el.classList.remove('hidden')
}

const form = document.querySelector('#formSection');
const imageHome = document.querySelector('.image-home');
const detailBeer = document.querySelector('#detailBeer');
const listBeers = document.querySelector('#listBeers');
const commentSection = document.querySelector('#comments');





const renderPageHome = () => {
  add(imageHome);
  add(form);
  add(listBeers);
  remove(detailBeer);
  remove(commentSection);
}

const renderPageDetail = () => {
  remove(imageHome);
  remove(form);
  remove(listBeers);
  add(detailBeer);
  add(commentSection)
}

export { renderPageDetail, renderPageHome }