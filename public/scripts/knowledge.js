import { getDefaultKnowledges } from './default.js';
import { confirmaExclusao } from './delete.js';
import { editarKnowledge, getId } from './edit.js'

const FRONTEND = 'FrontEnd';
const BACKEND = 'BackEnd';
const FULLSTACK = 'FullStack';
const SOFTSKILLS = 'SoftSkills';

const cardsContainer = document.querySelector('section.cards-container');
const counters = document.querySelectorAll('.counter');
const knowledges = getDefaultKnowledges();

window.addEventListener('load', init);

export function getKnowledges() {
    return knowledges;
}

export function addKnowledge(knowledge) {
    knowledges.push(knowledge);
    cardsContainer.insertBefore(populaCardHtml(knowledge), cardsContainer.firstChild);

    atualizaContadorTotal();
    atualizarContadorDaCategoria(knowledge.categoria);
    atualizarLocalStorage();

    setTimeout(() => {alert("Knowledge criado com sucesso!")});
}

export function atualizarLocalStorage() {
    localStorage.setItem('knowledges', JSON.stringify(knowledges));
}

export function sortByDate(array) {
    return array.sort((a, b) => b.dataCriacao > a.dataCriacao ? 1 : -1);
}

function init() {
    getKnowledgesFromLocalStorage();
    populaContadores();
    populaCards(knowledges);
}

function getKnowledgesFromLocalStorage() {
    const localStoragePopulated = localStorage.getItem('knowledges') !== null;

    if(localStoragePopulated) {
        knowledges.length = 0;
        JSON.parse(localStorage.getItem('knowledges')).forEach(knowledge => {
            knowledges.push(knowledge);
        })
    }
}

function atualizaContadorTotal() {
    counters[0].textContent = knowledges.length;
}

function atualizarContadorDaCategoria(categoria) {
    const contadorHtml = [...counters].filter(e => e.previousElementSibling.textContent === categoria)[0];
    const qtdeDaCategoria = knowledges.filter(e => e.categoria === categoria).length;

    contadorHtml.textContent = qtdeDaCategoria;
}

function populaContadores() {
    const qtdeFrontEnd = knowledges.filter(e => e.categoria === FRONTEND).length;
    const qtdeBackEnd = knowledges.filter(e => e.categoria === BACKEND).length;
    const qtdeFullStack = knowledges.filter(e => e.categoria === FULLSTACK).length;
    const qtdeSoftSkills = knowledges.filter(e => e.categoria === SOFTSKILLS).length;

    const categoriasCount = [knowledges.length, qtdeFrontEnd, qtdeBackEnd, qtdeFullStack, qtdeSoftSkills];

    for(let index in [...counters]) {
        counters[index].textContent = categoriasCount[index];
    }
}

export function populaCards(knowledges) {
    const sorted = sortByDate(knowledges);
    
    sorted.forEach(knowledge => {
        cardsContainer.appendChild(populaCardHtml(knowledge));
    });
}

function populaCardHtml(knowledge) {
    const article = document.createElement('article');
    article.id = knowledge.id;

    const header = document.createElement('header');
    const footer = document.createElement('footer');
    const h1 = document.createElement('h1');
    const ul = document.createElement('ul');
    const liSkill = document.createElement('li');
    const liCategoria = document.createElement('li');
    const p = document.createElement('p');
    const buttonExluir = document.createElement('button');
    const iconeLixeira = document.createElement('i');
    const buttonEditar = document.createElement('button');
    const iconeEditar = document.createElement('i');

    h1.textContent = knowledge.titulo;
    liSkill.textContent = knowledge.linguagemSkill;
    liCategoria.textContent = knowledge.categoria;
    p.textContent = knowledge.descricao;
    iconeLixeira.className = 'fa-solid fa-trash';
    iconeEditar.className = 'fa-solid fa-pen-to-square';   
    
    ul.appendChild(liSkill);
    ul.appendChild(liCategoria);

    header.appendChild(h1);
    header.appendChild(ul);

    buttonExluir.appendChild(iconeLixeira);
    buttonExluir.className = 'btn-excluir';
    buttonExluir.addEventListener('click', confirmaExclusao)
    buttonEditar.appendChild(iconeEditar);
    buttonEditar.className = 'btn-editar'
    buttonEditar.addEventListener('click', editarKnowledge);

    footer.appendChild(buttonExluir);
    footer.appendChild(buttonEditar);

    if(knowledge.youtubeVideo !== null) {
        footer.appendChild(getVideoButton(knowledge.youtubeVideo))
    }    

    article.className = 'card';
    article.appendChild(header);
    article.appendChild(p);
    article.appendChild(footer);
    
    return article;
}

export function getVideoButton(videoId) {
    const buttonVideo = document.createElement('button');
    buttonVideo.className = 'play-video';

    const a = document.createElement('a');
    a.href = `https://www.youtube.com/watch?v=${videoId}`;
    a.target = '_blank';

    const iconeVideo = document.createElement('i');
    iconeVideo.className = 'fa-solid fa-video';

    buttonVideo.appendChild(iconeVideo);
    buttonVideo.appendChild(a);
    buttonVideo.addEventListener('click', openVideo);

        return buttonVideo;
}

export function openVideo(event) {
    const knowledgeId = getId(event); 
    
    if(knowledgeId !== '') {
        const a = document.querySelector(`.card[id='${knowledgeId}'] footer > button.play-video a`);

        a.click();
    }  
}