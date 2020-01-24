import api from './api.js';

const {getBeers} = api();

const templateBeer = beer => {
    return `
    <div class="col mb-4">
            <div class="card mb-3" >
                <div class="row no-gutters">
                    <div class="col-md-3">
                        <div class="card-container-img d-flex align-items-center justify-content-center">
                            <img src=${beer.image} class="card-img" alt="${beer.name}">
                        </div>
                    </div>
                
                    <div class="col-md-9">
                        <div class="card-body">
                            <h5 class="card-title border-bottom color-primary-dark pb-2">${beer.name}</h5>
                            <p class="card-text">${beer.description}</p>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                <div class="d-flex">
                    <p class="card-text mr-3"><small class="text-muted"><i class="fas fa-thumbs-up"></i> ${beer.likes} </i></small></p>
                    <p class="card-text mr-3"><small class="text-muted"><i class="fas fa-comment"></i> ${beer.comments.length} </small></p>
                </div>
                <a href="/detail/${beer.beerId}" class="card-link color-secondary">More information</a>
              </div>
            </div>
    </div>
    `;   
}


const validateDateBeers = (dateBeer, dateInputs)=>{
    const yearBeer = parseInt(dateBeer.firstBrewed.slice(-4));
    const monthBeer = parseInt(dateBeer.firstBrewed.slice(0, 2));
    const { yearStart, yearEnd, monthStart, monthEnd } = dateInputs;

    yearBeer < yearStart || yearBeer > yearEnd ? false: monthBeer < monthStart || monthBeer > monthEnd ? false : true 
}

const renderBeers = (element, items) => {
    //se mapea el array de beers 
    const htmlBeers = items.map(item =>{

        return templateBeer(item)
        //la fecha está entre start y end?

        // if(dateInputs){
        //     validateDateBeers(item, dateInputs)? templateBeer(item): false;
        // }else {
        //     return templateBeer(item)
        // }

        
    }).join('');

    element.innerHTML = `
    <div class="container container-beers py-4 ">  
        <div class="row row-cols-1 row-cols-lg-2">
            ${htmlBeers}
        </div>
      </div>
    `;
}



export const renderHomeBeers = async (text)=>{
    const containerBeers = document.querySelector('#showSection');
    containerBeers.innerHTML = `loading...`;

    //se introduce dentro del elemento, en este caso card-deck
    try {
        const beers = await getBeers(text);
        console.log(beers)
        renderBeers(containerBeers, beers)
    } catch (err) {
        console.log(err)
    }
}

export default renderHomeBeers;