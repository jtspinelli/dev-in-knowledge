const modalConfirm = document.querySelector('.modal-container');
const knowledgeTitle = document.querySelector('.modal-content h4');
const knowledgeCategoria = document.querySelector('.modal-content p');
const cancelBtn = document.querySelector('.modal-cancel-btn');
const confirmaBtn = document.querySelector('.modal-confirm-btn');


function fechaModal() {
    modalConfirm.classList.add('hidden');
}

export function confirmacao() {
    return new Promise((confirma, cancela) => {
        cancelBtn.addEventListener('click', () => {
            cancela(false);
            fechaModal();
        });

        modalConfirm.addEventListener('click', (event) => {
            const clicouFora = event.target.localName === 'section';
             if(clicouFora) {
                cancela(false);
                fechaModal();
             }
        });

        confirmaBtn.addEventListener('click', () => {
            confirma(true);
            fechaModal();
        });
    });
}

export function popularModal(knowledge) {
    knowledgeTitle.textContent = knowledge.titulo;
    knowledgeCategoria.textContent = knowledge.categoria;
}