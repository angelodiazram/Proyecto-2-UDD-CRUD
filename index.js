//? VARIABLES GLOBALES:

const form      = document.querySelector('#form');
const listItems = document.querySelector('.list-container');
let arrayItems  = [];

//? FUNCIONES:

const createItem = (tecnology, description) => {
    
    let item = {
        tecnology: tecnology,
        description: description
    }

    arrayItems.push(item);

    return item;
}

const saveItem = () => {
    localStorage.setItem('tecnology', JSON.stringify(arrayItems));
    createSave();
}

const createSave = () => {
    listItems.innerHTML = 'Aun no se han creado elementos';

    arrayItems = JSON.parse(localStorage.getItem('tecnology'));

    if(arrayItems === null){
        arrayItems = [];
    }else{

        listItems.innerHTML = '';
        arrayItems.forEach(element => { 
            listItems.innerHTML += `
        <div class="list-container">
            <div class="text-container">
                <span class="item-1">${element.tecnology}</span>
                <span class="item-2">${element.description}</span>
            </div>
            <div class="btn-container">
                <button class="btn-list update"><span class="material-symbols-outlined">edit</span></button>
                <button class="btn-list delete"><span class="material-symbols-outlined">delete</span></button>
            </div>    
        </div>`
        });
    };
}

/*
* PRUEBA DE FUNCIONAMIENTO CREANDO DOS ITEMS 

let typescript = createItem('Typescript', 'me falta mucho por aprender');
let react = createItem('React', 'Me gusta mucho React');

console.log(typescript);
console.log(react);

console.log(arrayItems);
*/

//? EVENTLISTENERS:

/*
capturamos el evento submit del formulario y ejecutamos una
función cuando suceda el submit
*/

form.addEventListener('submit', (e) => {
    // metodo para que no refresque la aplicación
    e.preventDefault();
    //
    let inputValue = document.querySelector('#input-tecnology').value;
    let textareaValue = document.getElementById('description').value;

    createItem(inputValue, textareaValue);
    saveItem();

    form.reset();

    console.log(arrayItems);
});

document.addEventListener('DOMContentLoaded', createSave);

listItems.addEventListener('mousedown', (e) => {
    e.preventDefault();

    console.log(e);
});