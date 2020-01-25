import api from './api.js';
import dateUser from './form.js'
const { getBeers } = api();

import storage from './storage.js';
const { getItem } = storage('lStorage');


const templateBeer = beer => {
    return `
    <div class='col mb-2'>
            <div class='card mb-3' >
                <div class='row no-gutters'>
                    <div class='col-md-3'>
                        <div class='card-container-img pt-3 d-flex align-items-center justify-content-center'>
                            <img src=${beer.image} class='card-img' alt='${beer.name}'>
                        </div>
                    </div>
                
                    <div class='col-md-9'>
                        <div class='card-body'>
                            <h5 class='card-title border-bottom color-primary-dark pb-2'>${beer.name}</h5>
                            <p class='card-text'>${beer.description}</p>
                        </div>
                    </div>
                </div>
                <div class='card-footer bg-white d-flex justify-content-between'>
                <div class='d-flex'>
                    <p class='card-text mr-3'><small class='text-muted'><i class='fas fa-thumbs-up'></i> ${beer.likes} </i></small></p>
                    <p class='card-text mr-3'><small class='text-muted'><i class='fas fa-comment'></i> ${beer.comments.length} </small></p>
                </div>
                <a href='/detail/${beer.beerId}' class='card-link color-secondary'>More information</a>
              </div>
            </div>
    </div>
    `;
};

//filtramos cervezas
const filterBeerDate = (items, dates) => {
    const { yearStart, yearEnd, monthStart, monthEnd } = dates.dateUser;

    const beerPassFilterDate = items.map(item => {
        const dateBeer = item.firstBrewed
        const yearBeer = parseInt(dateBeer.slice(-4));
        const monthBeer = parseInt(dateBeer.slice(0, 2));

        if (yearBeer >= yearStart && yearBeer <= yearEnd) {
            return item
        } else if (
            yearBeer == yearStart && monthBeer >= monthStart
        ) {
            return item
        } else if (yearBeer == yearEnd && monthBeer <= monthEnd) {
            return item
        } else {
            return false
        }
    });
    return beerPassFilterDate;
}





const renderHtmlBeers = (element, items) => {
    const htmlBeers = items.map(item => {
        if(item){
            return templateBeer(item)
        }else {
            return ''
        }
    }).join('');

    if(htmlBeers.length > 0){
        element.innerHTML= `
        <div class='container container-beers py-4'>  
            <div class='row row-cols-1'>
            ${htmlBeers}
             </div>
        </div>`
    } else {
        element.innerHTML= `
        <div class='container container-beers py-4'>  
            <div class='row row-cols-1'>
                <div class = 'd-flex justify-content-center align-items-center p-4'>
                    <p class='color-primary-dark'>Oops! there is no beer, try again...</p>
                </div>
            </div>
        </div>`
    }
};



const loading = (element) => {
    element.innerHTML=`<div class='d-flex justify-content-center p-5'>
    <div class='spinner-grow text-info' role='status'>
        <span class='sr-only'>Loading...</span>
    </div>
    <span class='color-primary-dark px-5'> Let's go for the beers...</span>
</div>`
}



export const renderHomeBeers = async (text) => {
    const dataStorage = JSON.parse(getItem('search-beers'));
    const containerBeers = document.querySelector('#listBeers');
    loading(containerBeers)

    console.log('datastorage',dataStorage)

    try {
        if (dataStorage) {
            const beers = await getBeers(dataStorage.text);
            const beerFilteredDate= filterBeerDate(beers, dateUser)
            renderHtmlBeers(containerBeers, beerFilteredDate)
            
        } else {
            const beers = await getBeers(text);
            const beerFilteredDate = filterBeerDate(beers, dateUser);
            renderHtmlBeers(containerBeers, beerFilteredDate)
        }

    } catch (err) {
        console.log(err)
    }
};

export default renderHomeBeers;