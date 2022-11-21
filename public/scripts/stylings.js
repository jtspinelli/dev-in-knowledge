import { taEmModoEdicao, desativaModoEdicao } from "./form-new.js";

const formArea = document.querySelector('#form-area');
const hamburguerBtn = document.querySelector('#menu-toggle');
const formResetBtn = document.querySelector('form#form-add-knowledge button[type=reset]');

hamburguerBtn.addEventListener('click', toggleOpened);

export function toggleOpened() {
    formArea.classList.toggle('opened');

    const fechou = formArea.classList.value.indexOf('opened') === -1;

    if(fechou && taEmModoEdicao()) {
        formResetBtn.click();
        if(taEmModoEdicao()) {
            desativaModoEdicao();
        }        
    }
}