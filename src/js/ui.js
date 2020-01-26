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


const showCommentsForm = () => {
  commentSection.innerHTML = `
  <h2 class='tittle-comments font-weight-bold p-3 color-secondary'>Comments:</h2>
      <form id='comment-form' novalidate>
        <div class='form-group'>
          <label for='input-text-comment' class='pb-2'>What do you think? <span class='text-muted'>
              *required</span></label>
          <textarea maxlength='300' rows='4' class='form-control' id='input-text-comment' required
            placeholder='write your comment'></textarea>
        </div>
        <div class='d-flex justify-content-center py-2'>
          <button type='submit' id='add-comment' class='btn btn-search'>Add comment</button>
        </div>
      </form>
      <div class='cards-comments py-4'>
      </div>
  `};


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

export { renderPageDetail, renderPageHome, showCommentsForm }