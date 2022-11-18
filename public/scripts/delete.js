import { getId } from "./edit.js";
import { atualizarLocalStorage, getKnowledges } from "./knowledge.js";

export function confirmaExclusao(event) {
    if(confirm("Tem certeza que deseja excluir este knowledge?")) {
        excluirKnowledge(event);
    }
}

function excluirKnowledge(event) {
    const id = getId(event);
    const knowledge =  getKnowledges().find(e => e.id === id);
    const index = getKnowledges().findIndex(e => e.id === id);

    getKnowledges().splice(index, 1);
    atualizarLocalStorage();
    
    removeCard(id);
    decrementaContador(knowledge.categoria);
}

function removeCard(id) {
    document.querySelector(`article[id='${id}']`).remove();
}

function decrementaContador(categoria) {
    [...document.querySelectorAll('.counter')].forEach(counter => {
        if( ['Total', categoria].includes(counter.previousElementSibling.textContent) ) {
            counter.textContent--;
        }
    });
}