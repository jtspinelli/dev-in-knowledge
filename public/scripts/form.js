const selectCategoria = document.getElementById('categoria');

selectCategoria.addEventListener('change', () => {
    removerCategoria(selectCategoria, 'placeholder-prata');
})

function removerCategoria(elemento, categoria) {
    elemento.classList.remove(categoria);
}