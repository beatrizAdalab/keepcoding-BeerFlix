

  const remove = (el) => {
    el.classList.add('hidden')
}

const add = (el) => {
  el.classList.remove('hidden')
}

  const form = document.querySelector('#formSection');
  const imageHome = document.querySelector('.image-home');

const renderDetail=() => {
    remove(imageHome);
    remove(form);
}

const renderHome = () => {
    add(imageHome);
    add(form);
}

export {renderDetail, renderHome}