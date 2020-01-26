import api from './api.js';
const { addComment } = api();

const templateComment = (item) => {
    return `
    <div class='card mb-3';'>
        <div class='card-body text-dark'>
            <p class='card-text'>${item.comment}</p>
        </div>
        <div class='text-muted card-footer bg-transparent'>${item.dateComment}</div>
        </div>
    </div>`
};


const showCommentsForm = () => {
const commentSection = document.querySelector('#comments');
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

const templateAllComments = (comments) => {
    const SectionComments = document.querySelector('.cards-comments');
    const htmlComments = comments.map((comment) => {
        return templateComment(comment);
    }).join('');
    
    SectionComments.innerHTML = ` <div> ${htmlComments} </div>`;
};

const handlerAddComment = async (id, text) => {
    const beerUpdate = await addComment(id, text);
    return await beerUpdate.beer.comments;
};


const renderComments = (beer, id) => {
    showCommentsForm();
    const formAddComment = document.querySelector('#comment-form');
    const inputComment = document.querySelector('#input-text-comment');

    formAddComment.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        if (!inputComment.validity.valid) {
            inputComment.classList.add('is-invalid')
        } else {
            const userComment = document.querySelector('#input-text-comment').value;
            const newsComments = await handlerAddComment(id, userComment);
            templateAllComments(newsComments)
        }
    });

    const allComments = beer.comments;
    templateAllComments(allComments)
};

export default renderComments;