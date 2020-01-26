import api from './api.js';
import renderDetail from './detail.js';
import renderComments from './comments.js'


const { getBeerDetail } = api();

const loading = (elementDetail) => {
    elementDetail.innerHTML = `<div class='d-flex justify-content-center p-5'>
    <div class='spinner-grow text-info' role='status'>
        <span class='sr-only'>Loading...</span>
    </div>
    <span class='color-primary-dark px-5'> Let's go for your beer...</span>
</div>`;
};

const renderBeer = async (id) => {
    const containerBeers = document.querySelector('#detailBeer');
    loading(containerBeers);
    try {
        const beer = await getBeerDetail(id);
        renderDetail(beer, id);
        renderComments(beer, id)
    } catch (err) {
        console.error(err);
    }  
};

export default renderBeer;