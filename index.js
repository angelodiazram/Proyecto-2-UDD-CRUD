//? VARIABLES GLOBALES:

const form                = document.querySelector('#form');
const listItems           = document.querySelector('.list-container');
const inputTecnology      = document.querySelector('#input-tecnology');
const textareaDescription = document.getElementById('description');
let arrayItems            = [];
let currentItemIndex      = null;

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
        /*
        tomamos los datos almacenados en el localStorage y los 
        almacenamos en la variable arrayItems
        */

    if (arrayItems.length === 0) {
        arrayItems = [];
        listItems.innerHTML = 'Aun no se han creado elementos';
    } else {

        listItems.innerHTML = '';
        arrayItems.forEach(element => {
            listItems.innerHTML += `
                <div class="text-container">
                    <span class="item-1">${element.tecnology}</span>
                    <span class="item-2">${element.description}</span>
                </div>
                <div class="btn-container">
                    <button class="btn-list update" title="Editar"><span class="material-symbols-outlined">edit</span></button>
                    <button class="btn-list delete" title="eliminar"><span class="material-symbols-outlined">delete</span></button>
                </div>`
        });
    };
}


//! Función para eliminar elementos en el listado 
const deleteItem = (tecnologyName) => {

    arrayItems = arrayItems.filter(item => item.tecnology !== tecnologyName);
        /*
        al usar el filter() recorremos el arreglo con los datos gaurdados
        y se devolvera un nuevo arreglo con los elemntos que cumplan la condición.
        En este caso estamos devilviendo un nuevo arreglo excluyendo el elemento
        tecnologyName que capturamos en el listener del botón borrar. 
        */

    saveItem();
    createSave();
}

const updateItem = () => {
                                   
};

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

//! EVENTO para tomar los valores del formulario y guardarlos
form.addEventListener('submit', (e) => {
    e.preventDefault();
        // metodo para que no refresque la aplicación

    let inputValue = document.querySelector('#input-tecnology').value;
        // capturación del primer campo de texto

    let textareaValue = document.getElementById('description').value;
        // capturación del segundo campo de texto

    createItem(inputValue, textareaValue);

    saveItem();

    form.reset();
});


listItems.addEventListener('click', ({ target }) => {
    /*
    usamos un listener de tipo click en el listItems para donde se encuentra el
    botón eliminar clickeado
    */

    if (target.closest('.delete')) { //! "si se clickea un botón con la clase .delete se ejecuta lo de abajo"
    

        let tecnologyName = target.closest('.list-container').querySelector('.item-1').textContent;
            /*
            ! "target.closest('.list-container')" seria como nuestro "document"
            usando el metodo closest() se pueden encontrar los elementos HTML
            recorriendo los nodos hasta llegar al tag especificado, en este caso es
            muy útil ya que los renderizados no tienen un ID expecifico para poder identificarlos
            por lo que usamos el elemento click para llegar alli e identificamos el elemento por
            el "item-1" leyendo su contenido con el metodo textContent
            */

        console.log(`Esta es la referencia encontrada por el metodo closest(): ${tecnologyName}`)

        deleteItem(tecnologyName);
            /*
            ejecutamos la función para borrar entregandole la referencia de texto 
            encontrada.
            */
    } else if (target.closest('.update')) {
        console.log('se ha presionado el botón de "update"');
    }
    
    
});




