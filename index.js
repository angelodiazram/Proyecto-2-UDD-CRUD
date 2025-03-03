//? VARIABLES GLOBALES:

const form      = document.querySelector('#form');
const listItems = document.querySelector('.list-container');
let arrayItems  = [];
const editForm = document.getElementById('editModal');

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
    arrayItems = JSON.parse(localStorage.getItem('tecnology'));

    if(arrayItems === null || arrayItems.length === 0){
        arrayItems = [];
        listItems.innerHTML = 'Aun no se han creado elementos';
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
                <button class="btn-list update" title="Editar"><span class="material-symbols-outlined">edit</span></button>
                <button class="btn-list delete" title="eliminar"><span class="material-symbols-outlined">delete</span></button>
            </div>    
        </div>`
        });
    };
}
const deleteItem = (tecnologyName) => {
    arrayItems = arrayItems.filter(item => item.tecnology !== tecnologyName);
    saveItem();
    createSave();
}
const updateItem = (tecnologyName) => {
    currentItem = arrayItems.find(item => item.tecnology === tecnologyName);
    document.querySelector('.title-tecnology').textContent = currentItem.tecnology;
    document.getElementById('editDescription').value = currentItem.description;
    editModal.style.display = 'block';
}

/*
* PRUEBA DE FUNCIONAMIENTO CREANDO DOS ITEMS 

let typescript = createItem('Typescript', 'me falta mucho por aprender');
let react = createItem('React', 'Me gusta mucho React');
*/

//? EVENTLISTENERS:

// Evento que se ejecuta cuando el documento ha sido cargado
document.addEventListener('DOMContentLoaded', createSave);
/*
capturamos el evento submit del formulario y ejecutamos una
función cuando suceda el submit
*/
// función para crear los datos
form.addEventListener('submit', (e) => {
    // metodo para que no refresque la aplicación
    e.preventDefault();
    //
    let inputValue = document.querySelector('#input-tecnology').value;
    let textareaValue = document.getElementById('description').value;

    createItem(inputValue, textareaValue);
    saveItem();

    form.reset();
});

// Función para aceptar guardar los cambios
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    currentItem.description = document.getElementById('editDescription').value;
    saveItem();
    closeModalFunc();
});

// Evento para eliminar o editar un item de la lista
listItems.addEventListener('click', (e) => {
    if (e.target.closest('.delete')) {
        let tecnologyName = e.target.closest('.list-container').querySelector('.item-1').textContent;
        deleteItem(tecnologyName);
    }

    if (e.target.closest('.update')) {
        let tecnologyName = e.target.closest('.list-container').querySelector('.item-1').textContent;
        updateItem(tecnologyName);
    }
});


// listItems.addEventListener('mousedown', (e) => {
//     e.preventDefault();
// });






//? MODAL:
// Funcion para cerrar el modal de editar (por cancelar o aceptar)
const closeModalFunc = () => {
    editModal.style.display = 'none';
}

// Cerrar el modal con el boton de cerrar
document.getElementById('cancelBtn').addEventListener('click', () => {
    closeModalFunc();
});