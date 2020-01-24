import api from './api.js';

const {getBeers} = api();

const test = 'test'

const templateBeer = beer => {
        //created template html  
    return `
    <div class="col mb-4">
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row no-gutters">
                    <div class="col-md-3">
                        <img src="..." class="card-img" alt="...">
                    </div>
                
                    <div class="col-md-9">
                        <div class="card-body">
                            <h5 class="card-title">${beer.name}</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                <small class="text-muted">Likes</small>
                <small class="text-muted">Comments</small>
                <a href="/detail/${beer._id} class="card-link">Card link</a>
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

     //se crea html final
    element.innerHTML = `
    <div class="container container-beers py-4 ">  
        <div class="row row-cols-1 row-cols-md-2">
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