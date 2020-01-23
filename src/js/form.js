import renderHomeBeers from './beers.js';
import storage from './storage.js';

export const INPUT_STORAGE_ID = 'navbar-input';
export const STORAGE_TYPE = 'lStorage';

const { setItem, getItem } = storage(STORAGE_TYPE);

const searchForm = document.querySelector('#search-form');
const searchInputText = document.querySelector('#input-text-beer');
const searchInputStarting = document.querySelector('#input-starting-date');
const searchInputFinish = document.querySelector('#input-latest-date');



const resetForm = ()=>{
    searchInputText.value=''; 
    searchInputStarting.value='';
    searchInputFinish.value='';
}


searchInputText.addEventListener('keydown', evt => {
    evt.target.classList.remove('is-invalid');
} )

const validatedDate= (dateStart, dateEnd)=>{
    const yearStart = parseInt(dateStart.value.slice(0,4));
    const yearEnd = parseInt(dateEnd.value.slice(0,4));
    const monthStart = parseInt(dateStart.value.slice(-2));
    const monthEnd = parseInt(dateEnd.value.slice(-2));

   return yearEnd < yearStart? false: monthStart > monthEnd? false: true;
}


searchForm.addEventListener('submit', evt => {
    evt.preventDefault();
    
    if (!searchInputText.validity.valid) {
        searchInputText.classList.add('is-invalid') 
      } else if(
          !validatedDate(searchInputStarting, searchInputFinish)){
            return alert('Upss! the last date must be greater than the start date')
      } else {
        // Pintar shows con el filtro!
        renderHomeBeers(searchInputText.value);
        // almacenar en localstorage o cookie storage
        setItem(INPUT_STORAGE_ID, searchInputText.value);
        resetForm()
      }
});

