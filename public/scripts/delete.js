import { getId } from "./edit.js";
import { atualizarLocalStorage, getKnowledges } from "./knowledge.js";

export function confirmaExclusao(event) {
    const titulo = getKnowledges().find(e => e.id === getId(event)).titulo;
    
    if(confirm(`Tem certeza que deseja excluir "${titulo}"?`)) {
        excluirKnowledge(event);

        Toastify({
            text: "Knowledge excluído com sucesso!",        
            duration: 3000,
            className: "sucesso",
            gravity: "top",
            position: "right",
            offset: {
                y: -6
              },
        }).showToast();
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