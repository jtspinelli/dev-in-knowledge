import { atualizarLocalStorage, getKnowledges, openVideo, getVideoButton } from "./knowledge.js";
import { getVideoIdFromUrl } from './form-new.js'

const formFields = document.querySelectorAll('form#form-add-knowledge input, form#form-add-knowledge select, form#form-add-knowledge textarea');
const keysOrder = ['id', 'titulo', 'linguagemSkill', 'categoria', 'descricao', 'youtubeVideo'];
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

export function salvarEdicao(event) {
    const knowledge = getKnowledges().find(e => e.id === event.target['knowledge-id'].value);

    knowledge.titulo = event.target.titulo.value;
    knowledge.linguagemSkill = event.target['linguagem-skill'].value;
    knowledge.categoria = event.target.categoria.value;
    knowledge.descricao = event.target.descricao.value;
    knowledge.titulo = event.target.titulo.value;
    knowledge.youtubeVideo = getVideoIdFromUrl(event.target['youtube-video'].value);

    atualizaCardHtml(event);
    atualizarLocalStorage();
}

function atualizaCardHtml(event) {
    const cardHtml = `.card[id='${event.target['knowledge-id'].value}']`;
    const knowledge = getKnowledges().find(e => e.id === event.target['knowledge-id'].value);
    const cardTitulo = document.querySelector(`${cardHtml} header > h1`);
    const cardLinguagemSkill = document.querySelector(`${cardHtml} header ul li:first-child`);
    const cardCategoria = document.querySelector(`${cardHtml} header ul li:last-child`);
    const cardDescricao = document.querySelector(`${cardHtml} > p`);

    cardTitulo.textContent = event.target.titulo.value;
    cardLinguagemSkill.textContent = event.target['linguagem-skill'].value;
    cardCategoria.textContent = event.target.categoria.value;
    cardDescricao.textContent = event.target.descricao.value;

    const cardPlayVideoBtn = document.querySelector(`${cardHtml} footer > button.play-video`);

    if(cardPlayVideoBtn === null && temVideo(knowledge)) {
        const footer = document.querySelector(`.card[id='${knowledge.id}'] footer`);
        footer.appendChild(getVideoButton(knowledge.youtubeVideo));
    } else if(cardPlayVideoBtn !== null && naoTemVideo(knowledge)) {
        cardPlayVideoBtn.remove();
    } else if(cardPlayVideoBtn !== null && temVideo(knowledge)) {
        const a = document.querySelector(`${cardHtml} footer > button.play-video a`);
        a.href = event.target['youtube-video'].value;
    }
}

function cardsEmEdicao() {
    return document.querySelectorAll('article.card.edit');
}

export function getId(event) {
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

function naoTemVideo(knowledge) {
    return !temVideo(knowledge);
}