import {v4 as uuid} from '/uuid/dist/esm-browser/index.js';
import { addKnowledge } from './knowledge.js'
import { salvarEdicao } from './edit.js'

$('#categoria').select2({
    placeholder: {
        id: '',
        text: "Selecione uma categoria"
    },
    language: {
        noResults: function (params) {
          return "Não encontrado.";
        }
    },
    minimumResultsForSearch: -1 //esconde searchbar
});

const form = document.getElementById('form-add-knowledge');
const formArea = document.getElementById('form-area');
const formTitle = document.getElementById('form-add-knowledge-title');
const formResetBtn = document.querySelector('form#form-add-knowledge button[type=reset]');

form.addEventListener('reset', resetForm);
form.addEventListener('submit', submitForm);

function resetForm() {
    limparCategoriaSelect();

    if(taEmModoEdicao()) {
        desativaModoEdicao();
    }
}

function taEmModoEdicao() {
    return formArea.classList.value.includes('edit');
}

function limparCategoriaSelect() {
    $("#categoria").val('').trigger('change');
}

function desativaModoEdicao() {
    const btnEditar = document.querySelector('article.edit button.btn-editar');
    btnEditar.style.transition = '1s';

    const articleEmEdicao = document.querySelector('article.edit');
    articleEmEdicao.classList.remove('edit');

    setTimeout( () => { btnEditar.style = ''; }, 1000);    

    formArea.classList.remove('edit');
    formTitle.textContent = 'Novo Knowledge';
    formResetBtn.textContent = 'Limpar';
}

export function getVideoIdFromUrl(youtubeVideoUrl) {
    return youtubeVideoUrl === '' ? null : youtubeVideoUrl.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{10,12})\b/)[1];
}

function submitForm(event) {
    event.preventDefault();

    if(taEmModoEdicao()) {
        salvarEdicao(event);
    } else {
        const newKnowledge = {
            id: uuid(),
            dataCriacao: new Date().toISOString(),
            titulo: event.target.titulo.value,
            linguagemSkill: event.target['linguagem-skill'].value,
            categoria: event.target.categoria.value,
            descricao: event.target.descricao.value,
            youtubeVideo: getVideoIdFromUrl(event.target['youtube-video'].value)
        }
    
        addKnowledge(newKnowledge);
    }

    formResetBtn.click();
}