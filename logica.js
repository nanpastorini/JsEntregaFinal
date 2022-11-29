const carrito = [];
let contenedor = document.getElementById("misprods");

obtenerProductos()
ObtenerTragoRandom()

/***********************FUNCIONES!!************************************************ */
function renderizarTragos(trago){
  console.log(trago.drinks[0]);
  let insertarTragos=document.getElementById('SeccionTrago');
  let nombreTrago = document.createElement('h2');
  nombreTrago.innerHTML = trago.drinks[0].strDrink;
  insertarTragos.appendChild(nombreTrago);

  let imagen=document.createElement('img');
  imagen.src=trago.drinks[0].strDrinkThumb;
  insertarTragos.appendChild(imagen);
}

function renderizarProductos() {
  for (const producto of productos){
    contenedor.innerHTML += `
    <div class="card col-sm-2">
        <img class="card-img-top" src="${producto.foto}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${producto.id}</h5>
            <p class="card-text">${producto.nombre}</p>
            <p class="card-text"> $ ${producto.precio}</p>
            <button id="btn${producto.id}" class="btn btn-primary"> comprar </button>
        </div>
    </div>
    `;
  }

  /***********************************************EVENTOS*********************************** */
  productos.forEach((producto) => {
    document.getElementById(`btn${producto.id}`).addEventListener("click", function () {
        agregarAlCarrito(producto);
      });
  });
}


function agregarAlCarrito(productoAComprar) {
  carrito.push(productoAComprar);
  console.table(carrito);
  swal({
    title: "Producto " + productoAComprar.nombre,
    text: "agregado al carrito",
    icon: "success",
  });
  document.getElementById("tablabody").innerHTML += `
    <tr>
        <td>${productoAComprar.id}</td>
        <td>${productoAComprar.nombre}</td>
        <td>${productoAComprar.precio}</td>
    </tr>
    `;

    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio,0);
    let infoTotal = document.getElementById("total");
    infoTotal.innerText="Total a pagar $: "+totalCarrito;
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////APIS DE TRAGOS RANDOMS/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function ObtenerTragoRandom(){
const urlTrago="https://www.thecocktaildb.com/api/json/v1/1/random.php"
fetch(urlTrago).then(
    function(response) {
        if (response.status !== 200) {
        console.log('problemas con la API, Status Code: '+ response.status +
            response.status);
        return;
        }
        response.json().then(function(data) {
        console.log(data);
        renderizarTragos(data);
        });
    }
    )
    .catch(function(err) {
    console.log('Error', err);
    });
}
/*************************************************OBTENGO PRODUCTOS DE jSON******************************************************************** */
async function obtenerProductos() {
  const URLJSON="./producto.json";
  const resp = await fetch(URLJSON);
  const data = await resp.json();
  productos = data;
  renderizarProductos();
}


/**DARK MODE**/

// boton para cambiar el tema de la pagina y guardar el resultado en el storage local //
botonTema.onclick=()=>{

  if(tema=="claro"){
      document.body.className="oscuro";
      botonTema.innerText="Modo Claro";
      tema="oscuro";
      estiloCarta = "estilo-carta-oscuro";
      localStorage.setItem("modo-oscuro","true");
  }
  else{
      document.body.className = "claro";
      botonTema.innerText = "Modo Oscuro";
      tema = "claro";
      estiloCarta = "estilo-carta-claro";
      localStorage.setItem("modo-oscuro","false");
  }

}



// compruebo en el storage local si el modo oscuro esta seleccionado //
if (localStorage.getItem("modo-oscuro") === "true") {
  document.body.className="oscuro";
  botonTema.innerText="Modo Claro";
  tema="oscuro";
  estiloCarta = "estilo-carta-oscuro";
}else{
  document.body.className = "claro";
  botonTema.innerText = "Modo Oscuro";
  tema = "claro";
  estiloCarta = "estilo-carta-claro";
}

