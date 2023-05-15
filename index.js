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
          listaAusentes.splice(index, 1);               // Si el alumno estaba antes en la lista de ausentes, lo eliminamos
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

  let presentes = JSON.parse(localStorage.getItem("Alumnos Presentes: "));       // Leemos los nombres de los alumnos presentes desde localStorage
  
  presentes.forEach(function (elementos) {                    // Recorremos elementos seleccionados y los agregamos a la lista
    if (listaPresentes.includes(elementos)) {
      let nuevaprueba = document.createElement("li");
      nuevaprueba.setAttribute("class", "span");
      nuevaprueba.textContent = JSON.stringify(elementos).replace(/"/g, '');
      liPresentes.appendChild(nuevaprueba);
    }
  });
  
  let Ausentes = JSON.parse(localStorage.getItem("Alumnos Ausentes: "));     // Leemos los nombres de los alumnos ausentes desde localStorage
  liAusentes.innerHTML = '';
  Ausentes.forEach(function (elemento) {         // Recorremos los elementos seleccionados y los agregamos a la lista
    if (listaAusentes.includes(elemento)) {
      let nuevaprueba = document.createElement("li");
      nuevaprueba.setAttribute("class", "span");
      nuevaprueba.textContent = JSON.stringify(elemento).replace(/"/g, '');
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
        setTimeout(() => {
          location.reload()
        }, 1000),
      
        'Reiniciado.'
      )
    }  else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Reinicio Cancelado'
      )
    }
  })
});





















