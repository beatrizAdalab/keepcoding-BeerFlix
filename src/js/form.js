import renderHomeBeers from './beers.js';
import storage from './storage.js';

export const INPUT_STORAGE_ID = 'navbar-input';
export const STORAGE_TYPE = 'lStorage';

const { setItem, getItem } = storage(STORAGE_TYPE);

const searchForm = document.querySelector('#search-form');
const searchInputText = document.querySelector('#input-text-beer');
const searchInputStarting = document.querySelector('#input-starting-date');
const searchInputFinish = document.querySelector('#input-latest-date');



const resetForm = () => {
    searchInputText.value = '';
    searchInputStarting.value = '';
    searchInputFinish.value = '';
}


searchInputText.addEventListener('keydown', evt => {
    evt.target.classList.remove('is-invalid');
});

const getDates = (dateStart, dateEnd) => {
    return {
        yearStart: parseInt(dateStart.value.slice(0, 4)),
        yearEnd: parseInt(dateEnd.value.slice(0, 4)),
        monthStart: parseInt(dateStart.value.slice(-2)),
        monthEnd: parseInt(dateEnd.value.slice(-2)),
    }
}


const validatedDate = (date) => {
    const { yearStart, yearEnd, monthStart, monthEnd } = date;

    if (yearEnd >= yearStart) {
        if (monthStart < monthEnd) {
            return true
        } else {
            return false
        }
    }else {
        return false
    }
}


searchForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const date = getDates(searchInputStarting, searchInputFinish);

    if (!searchInputText.validity.valid) {
        searchInputText.classList.add('is-invalid')
    }
    else if (!validatedDate(date)) {
        return alert('Upss! the last date must be greater than the start date')
    }
    else {
        // Pintar shows con el filtro!
        renderHomeBeers(searchInputText.value, date);
        // almacenar en localstorage o cookie storage
        setItem(INPUT_STORAGE_ID, searchInputText.value);
        resetForm()
    }
});

