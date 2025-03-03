//? VARIABLES GLOBALES:

const form      = document.querySelector('#form'); //formulario
const listItems = document.querySelector('.list-container'); //div contenedor de items
let arrayItems  = []; // arreglo que contendrá objetos con los datos ingresados

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
                <button class="btn-list update"><span class="material-symbols-outlined">edit</span></button>
                <button class="btn-list delete"><span class="material-symbols-outlined">delete</span></button>
            </div>    
        </div>`
        });
    };
}

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
        // capturación del primer campo de texto
    let textareaValue = document.getElementById('description').value;
        // capturación del segundo campo de texto
    createItem(inputValue, textareaValue);

    saveItem();

    form.reset();

    console.log(arrayItems);
});


/*
El metodo "DOMContentLoaded" se ejecuta en el momento en el que 
se carga el DOM por lo que se puede usar para ejecutar alguna función
al inicio de la carga de la App
*/
document.addEventListener('DOMContentLoaded', createSave);

    listItems.addEventListener('mousedown', (e) => {
        
    e.preventDefault();

    console.log(e);
});

const deleteItem = (tecnologyName) => {
    arrayItems = arrayItems.filter(item => item.tecnology !== tecnologyName);
    saveItem();
    createSave();
}

listItems.addEventListener('click', ({target}) => {

    if (target.closest('.delete')) {
        let tecnologyName = target.closest('.list-container').querySelector('.item-1').textContent;
        deleteItem(tecnologyName);
    }
});