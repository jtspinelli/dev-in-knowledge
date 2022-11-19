import { getKnowledges, populaCards, sortByDate } from './knowledge.js'

const formSearch = document.getElementById('form-search');
const cardsContainer = document.querySelector('.cards-container');
const searchInput = document.getElementById('search-input');

formSearch.addEventListener('submit', submitFormSearch);
formSearch.addEventListener('reset', limparFiltroSeAtivo);
searchInput.addEventListener('blur', limparFiltroSeVazio);

function submitFormSearch(event) {
    event.preventDefault();
    const searchString = normalized(event.target['search-input'].value);

    const filtrados = getKnowledges().filter(e => normalized(e.titulo).includes(searchString) || normalized(e.descricao).includes(searchString));
    cardsContainer.innerHTML = '';

    populaCards(filtrados);
}

function normalized(string) {
    return string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/gu, "");
}

function limparFiltroSeVazio() {
    if(searchInput.value.length === 0) {
        limpaFiltro();
    }
}

function limparFiltroSeAtivo() {
    if(searchInput.value.length > 0) {
        limpaFiltro();
    }
}

function limpaFiltro() {
    cardsContainer.innerHTML = '';
    populaCards(sortByDate(getKnowledges()));    
}