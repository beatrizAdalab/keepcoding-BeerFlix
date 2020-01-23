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
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
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

const renderBeers = (element, items, dateInputs) => {
    //se mapea el array de beers 
    const htmlBeers = items.map(item =>{
        //la fecha está entre start y end?

        if(dateInputs){
            validateDateBeers(item, dateInputs)? templateBeer(item): false;
        }else {
            return templateBeer(item)
        }

        
    }).join('');

     //se crea html final
    element.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2">
        ${htmlBeers}
    </div>`;
}



export const renderHomeBeers = async (text, dateObj)=>{
    const containerBeers = document.querySelector('.container-beers');
    containerBeers.innerHTML = `loading...`;

    //se introduce dentro del elemento, en este caso card-deck
    try {
        const beers = await getBeers(text);
        
        console.log(beers)

        renderBeers(containerBeers, beers, dateObj)
    } catch (err) {
        console.log(err)
    }
}

export default renderHomeBeers;