import {v4 as uuid} from '/uuid/dist/esm-browser/index.js';
import { getKnowledges, addKnowledge } from './knowledge.js'

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

form.addEventListener('reset', limparCategoriaSelect);
form.addEventListener('submit', submitForm);

function limparCategoriaSelect() {
    $("#categoria").val('').trigger('change');
}

function getVideoIdFromUrl(youtubeVideoUrl) {
    return youtubeVideoUrl === '' ? null : youtubeVideoUrl.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{10,12})\b/)[1];
}

function submitForm(event) {
    event.preventDefault();

    const newKnowledge = {
        id: uuid(),
        dataCriacao: new Date(),
        titulo: event.target.titulo.value,
        linguagemSkill: event.target['linguagem-skill'].value,
        categoria: event.target.categoria.value,
        descricao: event.target.descricao.value,
        youtubeVideo: getVideoIdFromUrl(event.target['youtube-video'].value)
    }

    addKnowledge(newKnowledge);
}