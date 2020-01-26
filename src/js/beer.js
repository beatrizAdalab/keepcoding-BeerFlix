import api from './api.js';
import renderDetail from './detail.js'
import renderComments from './comments.js'

const { getBeerDetail } = api();

const renderBeer = async id => {
    try {
        const beer = await getBeerDetail(id);
        renderDetail(beer, id);
        renderComments(beer, id)
    } catch (err) {
        console.error(err);
    }
};

export default renderBeer;