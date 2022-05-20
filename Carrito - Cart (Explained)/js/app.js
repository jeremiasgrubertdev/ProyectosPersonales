//Variables utilizadas 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar Al Carrito" // When you add a course with "add to cart" button.
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar cursos del carrito // Remove course from cart
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito con boton 

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Reseteamos el arreglo
        limpiarHTML(); // Eliminamos todo el html 
    })
}



                                                    //FUNCIONES

function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {                   //Nos aseguramos que el usuario presione "Agregar Carrito"
        const cursoSeleccionado = e.target.parentElement.parentElement;        //Accedemos al div que tiene el contenido del curso
        leerDatosCurso(cursoSeleccionado);
    } 
};

//Elimina un curso del carrito 
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}


//Lee el contenido del HTML al que le dimos  click y extrae la info del curso

function leerDatosCurso(curso){                                            //Leemos los datos del curso y creamos un objeto con los datos que requerimos
    // console.log(curso);

    //Creo un objeto con el contenido del curso

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,               //Objeto con los datos que necesitamos en este caso
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
   
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if ( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; // retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        
             //agrega los elementos al arreglo de carrito
             articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito)
    
    carritoHTML();
};


//Muestra el carrito de compras en el HTML

function carritoHTML() {

    //Limpiamos el HTML 
    limpiarHTML();

    //Recorremos el carrito y generamos el HTML
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');               //La funcion va a crear un tableRow(tr) en el html
        row.innerHTML = `
            <td> <img src='${curso.imagen}' width=100> </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td> <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a> </td>
        `;

        contenedorCarrito.appendChild(row);
    });

};

function limpiarHTML() {
    // contenedorCarrito.innerHTML = '';           //FORMA LENTA, no recomiendo

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)     //Forma GOD!
    }
};

