import { getKnowledges } from "./knowledge.js";

const formFields = document.querySelectorAll('form#form-add-knowledge input, form#form-add-knowledge select, form#form-add-knowledge textarea');
const keysOrder = ['titulo', 'linguagemSkill', 'categoria', 'descricao', 'youtubeVideo'];
const formArea = document.getElementById('form-area');
const formTitle = document.getElementById('form-add-knowledge-title');
const formResetBtn = document.querySelector('form#form-add-knowledge button[type=reset]');

export function editarKnowledge(event) {
    const id = getId(event);   

    const knowledge = getKnowledges().find(e => e.id === id);

    popularForm(knowledge);
}

function popularForm(knowledgeOriginal) {
    const knowledge = {...knowledgeOriginal};

    if(temVideo(knowledge)) {
        knowledge.youtubeVideo = `https://www.youtube.com/watch?v=${knowledge.youtubeVideo}`;
    }

    for(let index in [...formFields]) {
        formFields[index].value = knowledge[keysOrder[index]];
    }

    $('#categoria').val(knowledge.categoria);
    $('#categoria').trigger('change');

    ativarModoEdicao(knowledge.id);

}

function ativarModoEdicao(idEmEdicao) {
    if(cardsEmEdicao().length > 0) {
        cardsEmEdicao().forEach(card => card.classList.remove('edit'));
    }

    const card = [...document.querySelectorAll('article.card')].filter(e => e.id === idEmEdicao)[0];
    card.classList.add('edit');

    formArea.classList.add('edit');
    formTitle.textContent = 'Editando';
    formResetBtn.textContent = 'Cancelar';
}

function cardsEmEdicao() {
    return document.querySelectorAll('article.card.edit');
}

function getId(event) {
    const clickNoIcon = event.target.localName === 'i';

    if(clickNoIcon) {
        return event.target.parentElement.parentElement.parentElement.id;
    } else {
        return event.target.parentElement.parentElement.id;
    }
}

function temVideo(knowledge) {
    return knowledge.youtubeVideo !== null;
}