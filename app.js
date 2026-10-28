const inputBusqueda = document.getElementById('input-busqueda');
const btnCargar = document.getElementById('btn-cargar');
const estadoMensaje = document.getElementById('estado-mensaje');
const contenedorUsuarios = document.getElementById('contenedor-usuarios');

const API_URL = 'https://randomuser.me/api/?results=6';

async function obtenerUsuarios() {
    contenedorUsuarios.innerHTML = '';
    estadoMensaje.className = 'estado-mensaje info';
    estadoMensaje.textContent = 'Cargando usuarios desde la API...';

    try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status} ${respuesta.statusText}`);
        }

        const datos = await respuesta.json();

        estadoMensaje.textContent = '';
        
        console.log('Datos recibidos con éxito:', datos.results);
        return datos.results;

    } catch (error) {
        console.error('Detalle del error:', error);
        estadoMensaje.className = 'estado-mensaje error';
        estadoMensaje.textContent = 'Ocurrió un error al cargar los usuarios. Revisa tu conexión e inténtalo de nuevo.';
        return [];
    }
}

btnCargar.addEventListener('click', obtenerUsuarios);