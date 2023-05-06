let listaPresentes = [];
      let listaAusentes = [];
      let alumnos = [];
      let totales;
      let nombre = document.getElementById("nombre");
      let apellido = document.getElementById("apellido");
      let presente = document.getElementById("presente");
      let ausente = document.getElementById("ausente");
      let confirmar = document.getElementById("confirmar");
      let totalAlumnos = document.getElementById("totalAlumnos");
      let liAusentes = document.getElementById("listaAusentes");
      let liPresentes = document.getElementById("listaPresentes");
      let liTotal = document.getElementById("listaTotal");
      let porcentaje = document.getElementById("porcentaje");
      let nombres = document.getElementById("nombre");
      nombres.classList.add("nombres");
      let btnPresente = document.getElementById("presentismo");
   /*    
      ausente.addEventListener("change", () => {
        if (ausente.checked) {
          presente.checked = false;
        }
      });

      presente.addEventListener("change", () => {
        if (presente.checked) {
          ausente.checked = false;
        }
      }); */

      confirmar.addEventListener("click", () => {
        let alumno = {
          nombre: "",
          apellido: "",
          presentismo: "",
        };

        alumno.nombre = nombre.value;
        alumno.apellido = apellido.value;

        if (presente.checked) {
          alumno.presentismo = "presente";
          listaPresentes.push(alumno);

          let nuevoElemento = document.createElement("li");
          nuevoElemento.textContent = alumno.nombre + " " + alumno.apellido;
          liPresentes.appendChild(nuevoElemento);

        } else if (ausente.checked) {
          alumno.presentismo = "ausente";
          listaAusentes.push(alumno);
          

          let nuevoElemento = document.createElement("li");
          nuevoElemento.textContent = alumno.nombre + " " + alumno.apellido;
          liAusentes.appendChild(nuevoElemento);
          
        } else {
          alert("presentismo invalido");
        }

        alumnos.push(alumno);
        nombre.value = "";
        apellido.value = "";
        localStorage.setItem("alumno", JSON.stringify(alumnos));

       
      });

limpiar.addEventListener("click", () => {
  localStorage.clear();
  alumnos.splice(0, alumnos.length);
  presente.checked = false;
  ausente.checked = false;
  liTotal.remove()
  liAusentes.remove()
  liPresentes.remove()    
});

for(let i = 0; i < 10; i++){
  fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => {
      const firstName = data.results[0].name.first;
      const lastName = data.results[0].name.last;
      console.log(firstName, lastName);

    contenidoN = nombres.appendChild(document.createElement("li"))
    contenidoN.textContent = firstName + " " +lastName;
    
    let botonesPresente = btnPresente.appendChild(document.createElement("input"))
    botonesPresente.setAttribute("type", "checkbox");

    let nuevoElemento = document.createElement("li");
    nuevoElemento.textContent = firstName + " " + lastName;
    liTotal.appendChild(nuevoElemento);

    })
    .catch(error => console.error(error));
}
