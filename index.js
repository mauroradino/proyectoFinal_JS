let listaPresentess = [];
let listaAusentes = [];
let alumnos = [];
let confirmar = document.getElementById("confirmar");
let liTotal = document.getElementById("listaTotal");
let listaPresentes = document.getElementById("listaPresentes");
let nombres = document.getElementById("nombre");
nombres.classList.add("nombres");


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
      botonesPresente.setAttribute("id","7"+i);
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
     
      let btnPresente = document.querySelectorAll(".checks");

btnPresente.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      console.log('Checkbox con id ' + this.id + ' está seleccionado');
     let mauro = document.getElementById(JSON.parse(this.id[1]))
     
     nuevoPresentes= document.createElement("li")
     nuevoPresentes.textContent = nuevoTotal.textContent;
     listaPresentes.appendChild(nuevoPresentes)
     listaPresentess.push(nuevoPresentes.textContent);
     localStorage.setItem("Lista Presentes: ", listaPresentess)


     console.log(listaPresentess.textContent)
     
     nuevo = document.createElement("li")
     nuevo.textContent = firstName + " " + lastName;
     listaPresentes.appendChild(nuevo)
     mauro.push(nuevo.textContent);
     localStorage.setItem("Lista Total: ", JSON.stringify(alumnos)) 
      // Agregar lógica aquí para agregar el alumno a la lista de presentes
    } else {
      console.log('Checkbox con id ' + this.id + ' no está seleccionado');
      // Agregar lógica aquí para quitar el alumno de la lista de presentes
    }
  });
});
    })
    .catch((error) => console.error(error));
}

limpiar.addEventListener("click", () => {
  localStorage.clear();
}); 

reiniciar.addEventListener("click", () => {
  location.reload()
});
