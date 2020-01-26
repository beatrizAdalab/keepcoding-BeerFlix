import api from './api.js';
import {showCommentsForm} from './ui.js';

const { addLike } = api();

const templateBeerDetail = (beer) => {
    return `
    <div class="container">
        <div class="row no-gutters bg-white">
            <div class="col-12 col-md-4">
                <div class="container py-4 detail-container-view d-flex justify-content-center align-items-center">
                    <div class="detail-container-image bg-light d-flex justify-content-center align-items-center">
                        <img src=${beer.image} class="detail-container-img" alt="Responsive image">
                    </div> 
                </div>
            </div>
            <div class="col-12 col-md-8">
                <div class="container py-4">
                    <h2 class="detail-tittle"><strong>${beer.name}</strong></h2>
                    
                    <div class="d-flex pt-3">
                        <p><strong>Price: </strong> <strong class="color-secondary">${beer.price} $</strong></p>
                    </div>
                    <p class="pb-2"><strong>First brewed: </strong>${beer.firstBrewed}</p>
                
                    <p class="color-primary" py-2">Description</p>
                    <p class="pb-4">${beer.description}</p>

                    <p class="color-primary" py-2">Brewers tips</p>
                    <p>${beer.brewersTips}</p>

                    <div class="d-flex justify-content-start align-items-center pt-4">
                        <button type="button" class="mr-3 btn btn-light btn-like">Add like</button>
                        <p class="card-text mr-3"><small class="text-muted"><i class="fas fa-thumbs-up"></i></small></p>
                    </div>

                </div>
            </div>
        </div>
    </div>`
};

const handlerBtnLike = async (id) => {
    const likeIcon = document.querySelector('.fa-thumbs-up');
    likeIcon.classList.add('color-primary')
    await addLike(id);
};

const renderDetail = (item, id) => {
    const containerBeers = document.querySelector('#detailBeer');
    containerBeers.innerHTML = templateBeerDetail(item);
    
    showCommentsForm();

    const btnLike = document.querySelector('.btn-like');
    btnLike.addEventListener('click', () => {
        handlerBtnLike(id)
    });
};

export default renderDetail;