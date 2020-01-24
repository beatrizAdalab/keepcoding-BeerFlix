import api from './api.js';

const { getBeerDetail, addComment, addLike } = api();

const templateBeerDetail = (beer) => {
    return `
    <div class="row no-gutters bg-white">
        <div class="col-12 col-sm-4">
            <div class="container detail-container-view d-flex justify-content-center align-items-center">
                <div class="detail-container-image bg-light d-flex justify-content-center align-items-center">
                    <img src=${beer.image} class="detail-container-img" alt="Responsive image">
                </div> 
            </div>
        </div>
        <div class="col-12 col-sm-8">
            <div class="container py-4">
                <p class="detail-tittle"><strong>${beer.name}</strong></p>
                
                <div class="d-flex pt-3">
                    <p><strong>Price: </strong> <strong class="color-secondary">${beer.price} $</strong></p>
                </div>
                <p class="pb-2"><strong>First brewed: </strong>${beer.firstBrewed}</p>
            
                <div class="d-flex justify-content-start align-items-center pb-4">
                    <button type="button" class="mr-3 btn btn-light btn-like">Add like</button>
                    <p class="card-text mr-3"><small class="text-muted"><i class="fas fa-thumbs-up"></i> ${beer.likes} </i></small></p>
                    <p class="card-text mr-3"><small class="text-muted"><i class="fas fa-comment"></i> ${beer.comments.length} </small></p>
                </div>

                <p class="color-primary" py-2">Description</p>
                <p class="pb-4">${beer.description}</p>

                <p class="color-primary" py-2">Brewers tips</p>
                <p>${beer.brewersTips}</p>
            </div>
        </div>
    </div>`
    
}

const handlerBtnLike = async (id)=>{
    await addLike(id);
    location.reload();
}

const renderBeerDetail = async id => {
    try {
        const containerBeers = document.querySelector('#showSection');

        const beer = await getBeerDetail(id)
        console.log(beer)

        containerBeers.innerHTML = templateBeerDetail(beer)
        const btnLike = document.querySelector('.btn-like');
        btnLike.addEventListener('click', ()=>{
            handlerBtnLike(id)
        });

    } catch (err) {
        console.error(err);
    }


};


export default renderBeerDetail;