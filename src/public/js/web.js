 
function alert2(text ) {
  alert( text );
}

function home() {
  window.location.replace("/");
}

function register() {
  window.location.replace("/register");
}

function log() {
  window.location.replace("/login");
}
function chat() {
  window.location.replace("/chat");
}

function profile() {
  window.location.replace("/profile");
}
function logout() {
  window.location.replace("/logout");
}

function productos() {
  window.location.replace("/products");
}

function carts() {
  window.location.replace("/carts");
}

function cartsId() {
  window.location.replace("/carts/649d9aaff6ce2a37db59333f");
}

function cookies2() {
  window.location.replace("/cookies");
}

// VIENE DEL PRODUCT! VIEW

// router.post("/:cid/product/:pid", async (req, res) => {
//     let cartId = req.params.cid;
//     let productId = req.params.pid;
//     await cartManager.addProductToCart(cartId, productId);
//     res.send({ status: "success" });
//   });
 

function cambiarCantidad  (productId)  { 
    alert("cantidad actualizada")
    window.location.replace("/carts/649d9aaff6ce2a37db59333f");
    // en este producto productId, cambio other2 por other3 
 
    const qty = document.getElementById(productId).value 
    return fetch("http://localhost:8080/carts/649d9aaff6ce2a37db59333f/product/" + productId + "/" + qty, {
        method: 'put'
    })
    .then(response => response.json());
  } 


function agregarAlCarrito  (productId)  { 
    alert("se agrego al carrito!")
    window.location.replace("/carts/649d9aaff6ce2a37db59333f");
    return fetch("http://localhost:8080/carts/649d9aaff6ce2a37db59333f/product/" + productId, {
      method: 'post'
    })
    .then(response => response.json());
    
   
  } 
  

function borrarProducto (productId)  {  
    alert("producto borrado")
    window.location.replace("/carts/649d9aaff6ce2a37db59333f");
    return fetch("http://localhost:8080/carts/649d9aaff6ce2a37db59333f/product/" + productId, {
          method: 'delete'
        })
        .then(response => response.json());
        
      } 

      
function borrarCarrito(cartId)  { 
    
    alert("carrito borrado")
  window.location.replace("/products");
    return fetch("http://localhost:8080/carts/" + cartId , {
      method: 'delete'
    })
    .then(response => response.json());
  } 

 