import { getId } from "./edit.js";
import { atualizarLocalStorage, getKnowledges } from "./knowledge.js";
import { confirmacao, popularModal } from "./modal.js";

const modalConfirm = document.querySelector('.modal-container');

export async function confirmaExclusao(event) {
    const knowledge = getKnowledges().find(e => e.id === getId(event));
    popularModal(knowledge);

    modalConfirm.classList.toggle('hidden');

    const confirmaExclusao = await confirmacao().catch(err => {});
   
    if(confirmaExclusao) {
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