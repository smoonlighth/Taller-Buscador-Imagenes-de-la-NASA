const btnBuscar = document.getElementById("btnBuscar");
const inputBuscar = document.getElementById("inputBuscar");

btnBuscar.addEventListener("click", function() {
    const searchTerm = inputBuscar.value;
    fetch(`https://images-api.nasa.gov/search?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            // Desestructuración de datos
            const { collection: { items } } = data;
            const contenedor = document.getElementById("contenedor");
            contenedor.innerHTML = ''; // Limpiar contenedor antes de agregar nuevas tarjetas

            items.forEach(item => {
                const { title, description, date_created } = item.data[0];
                const imageURL = item.links ? item.links[0].href : 'default-image.jpg';

                // Crear la tarjeta con los datos de cada ítem
                const card = `
                <div class="col-md-4">
                    <div class="card mb-4"> <!-- Clase card añadida aquí -->
                        <img src="${imageURL}" class="card-img-top" alt="${title}">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${description || "No hay descripción."}</p>
                            <p class="card-text"><small class="text-muted">${date_created}</small></p>
                            <a href="${imageURL}" target="_blank" class="btn btn-primary">Ver Imagen</a>
                        </div>
                    </div>
                </div>
            `;

                // Agregar la tarjeta al contenedor
                contenedor.innerHTML += card;
            });
        })
        .catch(error => console.error("Error al buscar:", error));
});
