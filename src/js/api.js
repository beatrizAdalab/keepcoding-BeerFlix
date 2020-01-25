
const API_KEY = 'R8W0EC7-HJSMCH2-PWDZV05-C8D5RAA';

const api = (apiURL = 'https://beerflix-api.herokuapp.com/api/v1') => {
    const limitAPIResult = 10;

    return {
        getBeers: async text => {
            try {
                const URL = text ? `${apiURL}/beers?search=${text}&limit=${limitAPIResult}` : `${apiURL}/beers?limit=${limitAPIResult}`;
                const response = await fetch(URL, {
                    method: 'GET',
                    headers: {
                        'X-API-KEY': API_KEY,
                    }
                });
                if (!response.ok) {
                    throw new Error('Error retrieving beers');
                }
                const data = await response.json();
                const beers = data.beers;
                return beers
            } catch (err) {
                console.error(err.message);
                throw err;
            }
        },
        getBeerDetail: async id => {
            try {
                const URL = `${apiURL}/beers/${id}`;
                const response = await fetch(URL, {
                    method: 'GET',
                    headers: {
                        'X-API-KEY': API_KEY,
                    }
                });
                if (!response.ok) {
                    throw new Error(`Error retrieving beer ${id}`);
                }
                const data = await response.json();
                const beer = data.beer;
                return beer
            } catch (err) {
                console.error(err.message);
                throw err;
            }
        },
        addComment: async (id, text) => {
            try {
                const URL = `${apiURL}/beers/${id}/comment`;
                const response = await fetch(URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        comment: text,
                    }),
                    headers: {
                        'Content-type': 'application/json',
                        'X-API-KEY': API_KEY,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error create comment`);
                }
                const responseBody = await response.json();
                return responseBody
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        addLike: async (id) => {
            try {
                const URL = `${apiURL}/beers/${id}/like`;
                const response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'X-API-KEY': API_KEY,
                    },
                });
                console.log(response)
                if (!response.ok) {
                    throw new Error(`Error create comment`);
                }
                const responseBody = await response.json();
                console.log (responseBody)
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
    }
}

export default api;




