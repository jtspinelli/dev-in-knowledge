import { getKnowledges, populaCards, sortByDate } from './knowledge.js'

const formSearch = document.getElementById('form-search');
const cardsContainer = document.querySelector('.cards-container');
const searchInput = document.getElementById('search-input');
const filtroCounter = document.getElementById('filtro-counter');

formSearch.addEventListener('submit', submitFormSearch);
formSearch.addEventListener('reset', limparFiltroSeAtivo);
searchInput.addEventListener('blur', limparFiltroSeVazio);

function submitFormSearch(event) {
    event.preventDefault();
    const searchString = normalized(event.target['search-input'].value);
    const searchStringNaoVazia = searchString.length > 0;

    if(searchStringNaoVazia) {
        const filtrados = getKnowledges().filter(e => normalized(e.titulo).includes(searchString) || normalized(e.descricao).includes(searchString));
        cardsContainer.innerHTML = '';

        filtroCounter.style = '';
        filtroCounter.textContent = `(${filtrados.length})`;

        if(filtrados.length > 0) {
            populaCards(filtrados);
            const message = filtrados.length === 1 ? `${filtrados.length} item encontrado.` : `${filtrados.length} itens encontrados.`;
            Toastify({                
                text: message,        
                duration: 3000,
                className: "sucesso",
                gravity: "top",
                position: "right",
                offset: {
                    y: -6
                  },
            }).showToast();
        } else {
            cardsContainer.innerHTML = `<p>Nenhum item para exibir.</p>`
            Toastify({                
                text: "nada encontrado",        
                duration: 3000,
                className: "sucesso",
                gravity: "top",
                position: "right",
                offset: {
                    y: -6
                  },
            }).showToast();
        }
    } else {
        const temFiltroAtivo = filtroCounter.style !== '';
        if(temFiltroAtivo) limpaFiltro();
    }
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

    filtroCounter.style.display = "none";
}