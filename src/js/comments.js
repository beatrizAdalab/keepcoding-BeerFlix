import api from './api.js';

const { addComment } = api();

const templateBeerComment = (item) => {
    return `
    <div class='card mb-3';'>
        <div class='card-body text-dark'>
            <p class='card-text'>${item.comment}</p>
        </div>
        <div class='text-muted card-footer bg-transparent'>${item.dateComment}</div>
        </div>
    </div>`
};

const templateAllComments = (comments) => {
    const SectionComments = document.querySelector('.cards-comments');
    const htmlComments = comments.map((comment) => {
        return templateBeerComment(comment);
    }).join('');

    SectionComments.innerHTML = ` <div> ${htmlComments} </div>`;
};

const handlerAddComment = async (id, text) => {
    const beerUpdate = await addComment(id, text);
    return await beerUpdate.beer.comments;
};


const renderComments = (beer, id) => {

    const formAddComment = document.querySelector('#comment-form');
    const lastComment = document.querySelector('#last-comment');

    formAddComment.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const userComment = document.querySelector('#input-text-comment').value;
        const newsComments = await handlerAddComment(id, userComment);
        templateAllComments(newsComments)
    })

    const allComments = beer.comments;
    templateAllComments(allComments)
};


export default renderComments;