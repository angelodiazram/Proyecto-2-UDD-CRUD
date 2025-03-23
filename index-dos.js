//? VARIABLES GLOBALES:

const form                = document.querySelector('#form');
const listItems           = document.querySelector('.list-container');
const inputTecnology      = document.querySelector('#input-tecnology');
const textareaDescription = document.getElementById('description');
let arrayItems            = JSON.parse(localStorage.getItem('tecnology')) || [];
let currentItemIndex      = null;

//? FUNCIONES:

const createItem = (tecnology, description) => {
    let item = {
        tecnology: tecnology,
        description: description
    };
    arrayItems.push(item);
    saveItem();
};

const saveItem = () => {
    localStorage.setItem('tecnology', JSON.stringify(arrayItems));
    createSave();
};

const createSave = () => {
    listItems.innerHTML = '';

    if (arrayItems.length === 0) {
        listItems.innerHTML = 'Aún no se han creado elementos';
    } else {
        arrayItems.forEach((element, index) => {
            listItems.innerHTML += `
                <div class="item" data-index="${index}">
                    <div class="text-container">
                        <span class="item-1">${element.tecnology}</span>
                        <span class="item-2">${element.description}</span>
                    </div>
                    <div class="btn-container">
                        <button class="btn-list update" data-index="${index}" title="Editar">
                            <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button class="btn-list delete" data-index="${index}" title="Eliminar">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </div>`;
        });
    }
};

//! Función para eliminar elementos en el listado 
const deleteItem = (index) => {
    arrayItems.splice(index, 1);
    saveItem();
};

//! Función para actualizar elementos en el listado
const updateItem = () => {
    if (currentItemIndex !== null) {
        arrayItems[currentItemIndex].tecnology = inputTecnology.value;
        arrayItems[currentItemIndex].description = textareaDescription.value;
        saveItem();
        currentItemIndex = null;
        form.reset();
    }
};

//? EVENTLISTENERS:

document.addEventListener('DOMContentLoaded', createSave);

//! Evento para manejar la creación y actualización de items
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputValue = inputTecnology.value.trim();
    let textareaValue = textareaDescription.value.trim();
    
    if (inputValue === "" || textareaValue === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    if (currentItemIndex === null) {
        createItem(inputValue, textareaValue);
    } else {
        updateItem();
    }
    saveItem();
    form.reset();
});

listItems.addEventListener('click', ({ target }) => {
    
    let itemElement = target.closest('.item');

    if (!itemElement) return;

    let index = itemElement.dataset.index;

    console.log(`Este es el index encontrado: ${index}`);

    if (target.closest('.delete')) {
        deleteItem(index);
    } else if (target.closest('.update')) {
        currentItemIndex = index;
        inputTecnology.value = arrayItems[index].tecnology;
        textareaDescription.value = arrayItems[index].description;
    }
});
