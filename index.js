let listaPresentes = [];
let listaAusentes = [];
let alumnos = [];
let confirmar = document.getElementById("confirmar");
let liTotal = document.getElementById("listaTotal");
let liPresentes = document.getElementById("listaPresentes");
let liAusentes = document.getElementById("listaAusentes");
let nombres = document.getElementById("nombre");
nombres.classList.add("nombres");
let btnPresente = document.querySelectorAll(".checks"); 



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


    })
    .catch((error) => console.error(error));

   
}

limpiar.addEventListener("click", () => {
  localStorage.clear();
  listaPresentes = [];
  listaAusentes = [];
  alumnos = [];
  liTotal.innerHTML = "";
  liPresentes.innerHTML = "";
  liAusentes.innerHTML = "";
});

confirmar.addEventListener("click", () => {
  let btnPresente = document.querySelectorAll(".checks");
  btnPresente.forEach(function(checkbox) {
    if (checkbox.checked) {
      const index = parseInt(checkbox.id.substring(1));
      const alumno = document.getElementById(index).textContent;
      console.log(alumno + " ESTA PRESENTE");
      listaPresentes.push(alumno);
      localStorage.setItem("Alumnos Presentes: ", JSON.stringify(listaPresentes));

      nuevoPresente = document.createElement("li")
      nuevoPresente.textContent = alumno;
      liPresentes.appendChild(nuevoPresente)

    } else {
      const index = parseInt(checkbox.id.substring(1));
      const alumno = document.getElementById(index).textContent;
      listaAusentes.push(alumno);
      localStorage.setItem("Alumnos Ausentes: ", JSON.stringify(listaAusentes));

      nuevoAusente = document.createElement("li")
      nuevoAusente.textContent = alumno;
      liAusentes.appendChild(nuevoAusente)
    }
    
   
    
  });
})

reiniciar.addEventListener("click", () => {
  location.reload()
});




