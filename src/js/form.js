import renderHomeBeers from './beers.js';
import storage from './storage.js';
const { setItem, getItem } = storage('lStorage');


export const INPUT_STORAGE_ID = 'search-beers';
export const STORAGE_TYPE = 'lStorage';

const searchForm = document.querySelector('#search-form');
const searchInputText = document.querySelector('#input-text-beer');
const searchInputStarting = document.querySelector('#input-starting-date');
const searchInputFinish = document.querySelector('#input-latest-date');



const initialForm = () => {
    const dataStorage = JSON.parse(getItem('search-beers'));
    if (dataStorage) {
        const { text, dateStart, dateFinish } = dataStorage;
        searchInputText.value = text;
        searchInputStarting.value = dateStart;
        searchInputFinish.value = dateFinish;
    }
};

const resetForm = () => {
    searchInputText.value = '';
    searchInputStarting.value = '';
    searchInputFinish.value = '';
};

//invalided is eliminated when the status of the input varies
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
};



const validatedDate = (date) => {
    const { yearStart, yearEnd, monthStart, monthEnd } = date;
    console.log(date)

    if (yearEnd < yearStart) {
        return false
    } else if (yearEnd === yearStart && monthStart > monthEnd) {
        return false
    } else {
        return true
    }
}

initialForm();

//consigeme las fechas
let dateUser = (getDates(searchInputStarting, searchInputFinish));


searchForm.addEventListener('submit', evt => {
    evt.preventDefault();
    dateUser = (getDates(searchInputStarting, searchInputFinish));

    if (!searchInputText.validity.valid) {
        searchInputText.classList.add('is-invalid')
    } else if(!validatedDate(dateUser)){
        console.log('validacion fecha',validatedDate(dateUser))
        alert('The end date must be greater than the start date')
    } else {
        const datesStorage = {
            text: searchInputText.value,
            dateStart: searchInputStarting.value,
            dateFinish: searchInputFinish.value
        }
        setItem(INPUT_STORAGE_ID, JSON.stringify(datesStorage));
        renderHomeBeers(searchInputText.value);
        //resetForm()
    }
});


export default {dateUser}