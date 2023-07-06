import CartManager from "./classes/CartManager.class.js";
import ProductManager from "./classes/ProductManager.class.js";
import __dirname from "./utils.js"

// Agrego dos funciones, una para agregar 10 productos al json y otra para ver si el limit al 
// obtener productos funciona correctamente

async function agregar_10_productos_al_json() {
  let productManager = new ProductManager(__dirname + "/files/products.json")

  await productManager.addProduct({title: "Manzana", description: "Soy una Manzana", price: 10, thumbnails: ["manza_img"], code: 5, stock: 10, category: "Verduras", status: true});

  await productManager.addProduct({title: "Banana", description: "Soy una Banana", price: 4, thumbnails: ["banana_img"], code: 9, stock: 12, category: "Verduras", status: true});

  await productManager.addProduct({title: "Pera", description: "Soy una Pera", price: 4, thumbnails: ["pera_img"], code: 12, stock: 11, category: "Verduras", status: true});

  await productManager.addProduct({title: "Mandarina", description: "Soy una Mandarina", price: 5, thumbnails: ["mandarina_img"], code: 8, stock: 3, category: "Verduras", status: true});

  await productManager.addProduct({title: "Pepino", description: "Soy un pepino", price: 21, thumbnails: ["pepino_img"], code: 51, stock: 2, category: "Verduras", status: true});

  await productManager.addProduct({title: "Naranja", description: "Soy una naranja", price: 17, thumbnails: ["naranja_img"], code: 3, stock: 2, category: "Verduras", status: true});

  await productManager.addProduct({title: "Ciruela", description: "Soy una ciruela", price: 17, thumbnails: ["ciruela_img"], code: 6, stock: 3, category: "Verduras", status: true});

  await productManager.addProduct({title: "Tomate", description: "Soy un tomate", price: 87, code: 1, stock: 15, category: "Verduras", status: true}); // No le paso thumbnails

  await productManager.addProduct({title: "Lechuga", description: "Soy una lechuga", price: 24, thumbnails: ["lechuga_img_1","Lechuga_img_2"], code: 34, stock: 5, category: "Verduras", status: true}); // Le paso 2 thumbnails

  await productManager.addProduct({title: "Zapallo", description: "Soy un zapallo", price: 38, thumbnails: ["zapallo_img"], code: 39, stock: 2, category: "Verduras", status: true});
}

async function agregar_3_carritos_al_json() {
  let cartManager = new CartManager(__dirname + "/files/carts.json")

  await cartManager.createCart()

  await cartManager.createCart()

  await cartManager.createCart()
}

async function imprimir_productos(limit = null) {
  let productManager = new ProductManager(__dirname + "/files/products.json")

  console.log(await productManager.getProducts(limit))
}

//agregar_10_productos_al_json()

//imprimir_productos(3)

//agregar_3_carritos_al_json()