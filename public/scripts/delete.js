import { getId } from "./edit.js";
import { getKnowledges } from "./knowledge.js";

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
    
    removeCard(id);
    decrementaContador(knowledge.categoria);
}

function removeCard(id) {
    document.querySelector(`article[id='${id}']`).remove();
}

function decrementaContador(categoria) {
    [...document.querySelectorAll('.counter')].forEach(counter => {
        if(counter.previousElementSibling.textContent === categoria || counter.previousElementSibling.textContent === 'Total') {
            counter.textContent--;
        }
    });
}