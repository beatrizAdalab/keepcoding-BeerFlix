import api from './api.js';

const {getBeers} = api();

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

const renderBeers = (element, items) => {
    //se mapea el array de beers 
    const htmlBeers = items.map(item =>{
        return templateBeer(item)
    }).join('');

     //se crea html final
    element.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2">
        ${htmlBeers}
    </div>`;
}

export const renderHomeBeers = async (text)=>{
    //activa loading
    const containerBeers = document.querySelector('.container-beers');

    containerBeers.innerHTML = `loading...`;

    //se introduce dentro del elemento, en este caso card-deck
    try {
        const beers = await getBeers(text);
        

        console.log(beers)

        renderBeers(containerBeers, beers)
    } catch (err) {
        console.log(err)
    }
    // esconde loader
}

export default renderHomeBeers;