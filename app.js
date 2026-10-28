const inputBusqueda = document.getElementById('input-busqueda');
const btnCargar = document.getElementById('btn-cargar');
const estadoMensaje = document.getElementById('estado-mensaje');
const contenedorUsuarios = document.getElementById('contenedor-usuarios');

const API_URL = 'https://randomuser.me/api/?results=6';

let listaUsuariosGlobal = [];

function renderizarUsuarios(usuarios) {
    if (usuarios.length === 0) {
        contenedorUsuarios.innerHTML = '';
        estadoMensaje.className = 'estado-mensaje info';
        estadoMensaje.textContent = 'No se encontraron usuarios que coincidan con la búsqueda.';
        return;
    }

    estadoMensaje.textContent = '';
    
    const tarjetasHTML = usuarios.map(usuario => {
        const { picture, name, email, phone, location } = usuario;
        const nombreCompleto = `${name.first} ${name.last}`;

        return `
            <article class="card-usuario">
                <img src="${picture.large}" alt="Foto de ${nombreCompleto}">
                <h3>${nombreCompleto}</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${phone}</p>
                <span class="pais">${location.country}</span>
            </article>
        `;
    }).join('');

    contenedorUsuarios.innerHTML = tarjetasHTML;
}

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

        listaUsuariosGlobal = datos.results;

        renderizarUsuarios(listaUsuariosGlobal);

    } catch (error) {
        console.error('Detalle del error:', error);
        estadoMensaje.className = 'estado-mensaje error';
        estadoMensaje.textContent = 'Ocurrió un error al cargar los usuarios. Revisa tu conexión e inténtalo de nuevo.';
        return [];
    }
}

function filtrarUsuarios() {
    const textoBusqueda = inputBusqueda.value.toLowerCase().trim();

    const usuariosFiltrados = listaUsuariosGlobal.filter(usuario => {
        const nombreCompleto = `${usuario.name.first} ${usuario.name.last}`.toLowerCase();
        return nombreCompleto.includes(textoBusqueda);
    });

    renderizarUsuarios(usuariosFiltrados);
}

btnCargar.addEventListener('click', obtenerUsuarios);
inputBusqueda.addEventListener('input', filtrarUsuarios);