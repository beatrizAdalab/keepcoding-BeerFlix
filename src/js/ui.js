

  const remove = (el) => {
    el.classList.add('hidden')
}

const add = (el) => {
  el.classList.remove('hidden')
}

  const form = document.querySelector('#formSection');
  const imageHome = document.querySelector('.image-home');
  const commentSection = document.querySelector('#commentSection');

const renderDetail=() => {
    remove(imageHome);
    remove(form);
    add(commentSection)
}

const renderHome = () => {
    add(imageHome);
    add(form);
    remove(commentSection)
}

export {renderDetail, renderHome}