const botonBuscar = document.getElementById("buscar"); // Busca el botón por ID
const inputNombre = document.getElementById("nombre"); // Busca el input por ID

botonBuscar
  .addEventListener("click", function () {
    const nombreIngresado = inputNombre.value;
    console.log("Nombre ingresado por el usuario", nombreIngresado);

    const url = "https://hp-api.onrender.com/api/characters"; // url de la api publica

    fetch(url)
      .then(function (respuesta) {
        return respuesta.json();
      })
      .then(function (personajes) {
        //  filtrado
        const textoBusqueda = nombreIngresado.toLowerCase();

        const personajesFiltrados = personajes.filter(function (personaje) {
          return personaje.name.toLowerCase().includes(textoBusqueda);
        });

        // Seleccionar el div donde se mostrarán los resultados
        const divResultados = document.getElementById("resultados");
        // Limpiar el div para que no se acumulen resultados de búsquedas anteriores
        divResultados.innerHTML = "";

        // Si no hay personajes filtrados, mostramos el mensaje correspondiente "No se ha encontrado personaje"
        if (personajesFiltrados.length === 0) {
          divResultados.innerHTML = "Personaje no encontrado";
          return; // Salimos de la función
        }

        // Recorremos cada personaje filtrado y lo mostramos en el div
        personajesFiltrados.forEach(function (personaje) {
          // Creamos un elemento contenedor para cada personaje
          const personajeDiv = document.createElement("div");
          personajeDiv.classList.add("personaje");

          // Mostramos el nombre
          const nombre = document.createElement("h3");
          nombre.textContent = personaje.name;

          // Mostramos la casa o "Sin casa" si está vacía
          const casa = document.createElement("p");
          casa.textContent = "Casa: " + (personaje.house || "Sin casa");

          // Mostramos la imagen (si no hay, usamos una por defecto)
          const imagen = document.createElement("img");
          imagen.src =
            personaje.image ||
            "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
          imagen.alt = personaje.name;
          imagen.width = 100; // tamaño básico

          // Agregamos los elementos al contenedor de personaje
          personajeDiv.appendChild(imagen);
          personajeDiv.appendChild(nombre);
          personajeDiv.appendChild(casa);

          // Agregamos el personaje al div de resultados
          divResultados.appendChild(personajeDiv);
        });
      });

    // Mostramos los personajes filtrados en consola
    console.log("Personajes filtrados:", personajesFiltrados);
  })

  .catch(function (error) {
    console.error("Error al obtener personajes:", error);
  });
