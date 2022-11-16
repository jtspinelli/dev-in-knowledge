const cardsContainer = document.querySelector('section.cards-container');
const knowledges = [
    {
        id: "e31704ca-cfc6-4361-842a-67e37410f9b3",
        titulo: "Agaga título",
        linguagemSkill: "Agaga skill",
        categoria: "BackEnd",
        descricao: "Esta é uma descrição de teste que estou fazendo.",
        youtubeVideo: "HgWldi02m2E"
    }
];

window.addEventListener('load', populaCards);

export function getKnowledges() {
    return knowledges;
}

export function addKnowledge(knowledge) {
    knowledges.push(knowledge);
}

function populaCards() {
    knowledges.forEach(knowledge => {
        cardsContainer.appendChild(populaCardHtml(knowledge));
    })
}

function populaCardHtml(knowledge) {
    const article = document.createElement('article');
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
    const buttonVideo = document.createElement('button');
    const iconeVideo = document.createElement('i');    

    h1.textContent = knowledge.titulo;
    liSkill.textContent = knowledge.linguagemSkill;
    liCategoria.textContent = knowledge.categoria;
    p.textContent = knowledge.descricao;
    iconeLixeira.className = 'fa-solid fa-trash';
    iconeEditar.className = 'fa-solid fa-pen-to-square';
    iconeVideo.className = 'fa-solid fa-video';
    
    ul.appendChild(liSkill);
    ul.appendChild(liCategoria);

    header.appendChild(h1);
    header.appendChild(ul);

    buttonExluir.appendChild(iconeLixeira);
    buttonEditar.appendChild(iconeEditar);
    buttonVideo.appendChild(iconeVideo);

    footer.appendChild(buttonExluir);
    footer.appendChild(buttonEditar);
    footer.appendChild(buttonVideo);

    article.className = 'card';
    article.appendChild(header);
    article.appendChild(p);
    article.appendChild(footer);
    
    return article;
}