let listaPresentes = [];
let listaAusentes = [];
let alumnos = [];
let limpiar = document.getElementById("limpiar");
let confirmar = document.getElementById("confirmar");
let liTotal = document.getElementById("listaTotal");
let liPresentes = document.getElementById("listaPresentes");
let liAusentes = document.getElementById("listaAusentes");
let nombres = document.getElementById("nombre");
nombres.classList.add("nombres");
let btnPresente = document.querySelectorAll(".checks");
let cantTotal = document.getElementById("cantTotal");
let cantPresente = document.getElementById("cantPresente");
let cantAusente = document.getElementById("cantAusente");

Swal.fire('Buenos dias! \n que tenga una excelente jornada!')
localStorage.clear();

for (let i = 0; i < 10; i++) {

  fetch("https://randomuser.me/api/")
    .then((response) => response.json())
    .then((data) => {

      const firstName = data.results[0].name.first;
      const lastName = data.results[0].name.last;
      console.log(firstName, lastName);

      const divElement = document.createElement("div");
      let contenidoN = document.createElement("span");
      contenidoN.textContent = firstName + " " + lastName;
      divElement.appendChild(contenidoN);
      contenidoN.setAttribute("id", i);
      contenidoN.setAttribute("class", "span");
      nombres.appendChild(divElement);


      let botonesPresente = document.createElement("input");
      botonesPresente.setAttribute("type", "checkbox");
      botonesPresente.setAttribute("id", "7" + i);
      botonesPresente.setAttribute("class", "checks")

      divElement.appendChild(botonesPresente);

      let nuevoElemento = document.createElement("li");
      nuevoElemento.appendChild(divElement);
      nombres.appendChild(nuevoElemento);
      nuevoTotal = document.createElement("li")
      nuevoTotal.textContent = firstName + " " + lastName;
      liTotal.appendChild(nuevoTotal)
      alumnos.push(nuevoTotal.textContent);
      localStorage.setItem("Lista Total: ", JSON.stringify(alumnos))
      cantTotal.innerText = alumnos.length;
    })
    .catch((error) => console.error(error));

}

limpiar.addEventListener("click", () => {
  localStorage.clear();
  listaPresentes = [];
  listaAusentes = [];
  alumnos = [];
  liPresentes.innerHTML = "";
  liAusentes.innerHTML = "";
  cantAusente.innerText = 0;
  cantPresente.innerText = 0;
});

confirmar.addEventListener("click", () => {
  let btnPresente = document.querySelectorAll(".checks");
  btnPresente.forEach(function (checkbox) {
    const index = parseInt(checkbox.id.substring(1));
    const alumno = document.getElementById(index).textContent;
    const estaSeleccionado = checkbox.checked;
    if (estaSeleccionado) {
      if (!listaPresentes.includes(alumno)) {
        listaPresentes.push(alumno);
        const index = listaAusentes.indexOf(alumno);
        if (index >= 0) {
          listaAusentes.splice(index, 1);
        }
      }
    } else {
      if (!listaAusentes.includes(alumno)) {
        listaAusentes.push(alumno);
        const index = listaPresentes.indexOf(alumno); 
        if (index >= 0) {
          listaPresentes.splice(index, 1);             // Si el alumno estaba antes en la lista de presentes, lo eliminamos
        }
      }
    }
  });
  
  localStorage.setItem("Alumnos Presentes: ", JSON.stringify(listaPresentes));
  localStorage.setItem("Alumnos Ausentes: ", JSON.stringify(listaAusentes));       // Actualizamos las listas y los contadores
  liPresentes.innerHTML = "";
  cantPresente.innerText = listaPresentes.length;
  liAusentes.innerHTML = "";
  cantAusente.innerText = listaAusentes.length;

  let presentes = JSON.parse(localStorage.getItem("Alumnos Presentes: "));       // Recuperamos los nombres de los alumnos presentes desde localStorage
  presentes.forEach(function (elementos) {                    // Recorrer elementos seleccionados y agregarlos a la lista
    if (listaPresentes.includes(elementos)) {
      console.log(elementos + " ESTA PRESENTE");
      let nuevaprueba = document.createElement("li");
      nuevaprueba.setAttribute("class", "span");
      nuevaprueba.textContent = JSON.stringify(elementos).replace('"', ' ');
      liPresentes.appendChild(nuevaprueba);
    }
  });

  // Recuperamos los nombres de los alumnos ausentes desde localStorage
  let Ausentes = JSON.parse(localStorage.getItem("Alumnos Ausentes: "));
  liAusentes.innerHTML = '';
  // Recorrer elementos seleccionados y agregarlos a la lista
  Ausentes.forEach(function (elemento) {
    if (listaAusentes.includes(elemento)) {
      console.log(elemento + " ESTA PRESENTE");
      let nuevaprueba = document.createElement("li");
      nuevaprueba.setAttribute("class", "span");
      nuevaprueba.textContent = JSON.stringify(elemento).replace('"', '');
      liAusentes.appendChild(nuevaprueba);
    }
  });
});

reiniciar.addEventListener("click", () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Estas seguro?',
    text: "La lista de nombres se va a reiniciar",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, reiniciar ',
    cancelButtonText: 'No, cancelar! ',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        location.reload(),
        'Reiniciado.'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Reinicio Cancelado'
      )
    }
  })
});















