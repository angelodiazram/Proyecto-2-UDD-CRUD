//? VARIABLES GLOBALES:

const form      = document.querySelector('#form');
const listItems = document.querySelector('.list-container');
let arrayItems  = [];
const editForm = document.getElementById('editModal');

//? FUNCIONES:

const createItem = (tecnology, description) => {

    /*
    Esta función crea un objeto con los datos ingresados por medio del formulario
    HTML
    */
    
    let item = {
        tecnology: tecnology,
        description: description
    }

    arrayItems.push(item); // se agrega el objeto creado al array "arrayItems"

    return item; // se retorna el nuevo objeto "item"
}
const saveItem = () => {
    /*
    El localStorage almacena datos en "clave/valor" pero primero cualquier
    dato que se vaya a almacenar en el localStorage se debe transformar en un 
    string
    */

    localStorage.setItem('tecnology', JSON.stringify(arrayItems)); 
        /*
        setItem recibe dos argumento:
        1. el nombre de la clave almacenada
        2. el valor de esa clave en diferentes tipos de datos transformados en string
        */

    createSave();
        /*
        llamado a la función que crea en el DOM items con los datos guardados
        en el localStorage
        */ 
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
        // capturación del primer campo de texto
    let textareaValue = document.getElementById('description').value;
        // capturación del segundo campo de texto
    createItem(inputValue, textareaValue);

    saveItem();

    form.reset();
});


/*
El metodo "DOMContentLoaded" se ejecuta en el momento en el que 
se carga el DOM por lo que se puede usar para ejecutar alguna función
al inicio de la carga de la App
*/
document.addEventListener('DOMContentLoaded', createSave);

    listItems.addEventListener('mousedown', (e) => {
        
// Función para aceptar guardar los cambios
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    currentItem.description = document.getElementById('editDescription').value;
    saveItem();
    closeModalFunc();
});

    console.log(e);
});


listItems.addEventListener('click', ({target}) => {

    if (target.closest('.delete')) {
        let tecnologyName = target.closest('.list-container').querySelector('.item-1').textContent;
        deleteItem(tecnologyName);
    }
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



