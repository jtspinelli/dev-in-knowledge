import { editarKnowledge } from './edit.js'

const FRONTEND = 'FrontEnd';
const BACKEND = 'BackEnd';
const FULLSTACK = 'FullStack';
const SOFTSKILLS = 'SoftSkills';

const cardsContainer = document.querySelector('section.cards-container');
const counters = document.querySelectorAll('.counter');
const knowledges = [
    {
        id: "e31704ca-cfc6-4361-842a-67e37410f9b3",
        dataCriacao: new Date('Wed Nov 16 2022 17:49:13 GMT-0300 (Brasilia Standard Time)'),
        titulo: "Título",
        linguagemSkill: "Algo",
        categoria: "BackEnd",
        descricao: "Mussum Ipsum, cacilds vidis litro abertis. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Aenean aliquam molestie leo, vitae iaculis nisl.Casamentiss faiz malandris se pirulitáat odio. Aenean aliquam molestie leo, vitae iaculis nisl.Casamentiss faiz malandris se pirulitá.",
        youtubeVideo: "HgWldi02m2E",
    },

    {
        id: "b74ac328-f9a6-4966-bacc-988331483cf0",
        dataCriacao: new Date('Wed Nov 16 2022 18:20:13 GMT-0300 (Brasilia Standard Time)'),
        titulo: "Outro título",
        linguagemSkill: "Alguma coisa",
        categoria: "FrontEnd",
        descricao: "Mussum Ipsum, cacilds vidis litro abertis. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Aenean aliquam molestie leo, vitae iaculis nisl.Casamentiss faiz malandris se pirulitáat odio. Aenean aliquam molestie leo, vitae iaculis nisl.Casamentiss faiz malandris se pirulitá.",
        youtubeVideo: null,
    }
];

window.addEventListener('load', init);

export function getKnowledges() {
    return knowledges;
}

export function addKnowledge(knowledge) {
    knowledges.push(knowledge);
    cardsContainer.insertBefore(populaCardHtml(knowledge), cardsContainer.firstChild);

    atualizaContadorTotal();
    atualizarContadorDaCategoria(knowledge.categoria);
}

function sortByDate() {
    knowledges.sort((a, b) => b.dataCriacao > a.dataCriacao ? 1 : -1);
}

function init() {
    populaContadores();
    populaCards();
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

function populaCards() {
    sortByDate();
    
    knowledges.forEach(knowledge => {
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
    buttonEditar.appendChild(iconeEditar);
    buttonEditar.className = 'btn-editar'
    buttonEditar.addEventListener('click', editarKnowledge);

    footer.appendChild(buttonExluir);
    footer.appendChild(buttonEditar);

    if(knowledge.youtubeVideo !== null) {
        const buttonVideo = document.createElement('button');
        const iconeVideo = document.createElement('i');
        iconeVideo.className = 'fa-solid fa-video';

        buttonVideo.appendChild(iconeVideo);

        footer.appendChild(buttonVideo);
    }    

    article.className = 'card';
    article.appendChild(header);
    article.appendChild(p);
    article.appendChild(footer);
    
    return article;
}