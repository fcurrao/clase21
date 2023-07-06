import { Router } from "express";
import CartManager from "../DAOs/CartManagerMongo.class.js";
import ProductManager from "../DAOs/ProductManagerMongo.class.js"
import __dirname from "../utils.js";



let productManager = new ProductManager()
let cartManager = new CartManager();

const router = Router();

router.get("/", async (req, res) => {
  let carts = await cartManager.getAllCarts();
  if (!carts) {
    res.send("No se encontró carritos");
    return;
  }
  res.send(carts);
});
 
router.post("/", async (req, res) => {
  await cartManager.createCart();
  res.send({ status: "success" });
});

//////////////////////////////

router.get('/:cid', async (req,res)=>{
  let cartId = req.params.cid;
  let cartIdJSON = JSON.stringify(cartId)
  let todosLosProductos =  await productManager.getAllProducts()
  let cart = await cartManager.getCartById(cartId)  
  if (cart){
  let productosEnCarritos = []  
  let totalCarrito = 0  
if ( cart.products[0] != undefined) {   
  let toCart = cart.products.map((cadauno) => { 
    const productIndex = todosLosProductos.findIndex(p=>p.id == cadauno.product._id)
    todosLosProductos[productIndex].other = 1
    todosLosProductos[productIndex].other2 = todosLosProductos[productIndex].price * todosLosProductos[productIndex].other
    totalCarrito += todosLosProductos[productIndex].other2  
    todosLosProductos[productIndex].other3 = JSON.stringify(todosLosProductos[productIndex]._id)
    return todosLosProductos[productIndex]
    
   });
   productosEnCarritos.push(toCart) 
  } else { productosEnCarritos="no hay productos en tu carro"} 
  
  res.render('carts', {  totalCarrito:totalCarrito, productosEnCarritos:productosEnCarritos[0], cartId: cart._id ,cartIdJSON:cartIdJSON });  
}
else res.send('no existe este carrito')
})
 
 

/////////////////////
router.post("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  await cartManager.addProductToCart(cartId, productId);
  res.send({ status: "success" });
});

router.delete("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  await cartManager.deleteProductFromCart(cartId, productId);
  res.send({ status: "success" });
});

router.delete("/:cid", async (req, res) => {
  let cartId = req.params.cid;
  await cartManager.deleteAllProductsFromCarts(cartId);
  res.send({ status: "success" });
});

 

router.put("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  // let qty = req.params.qty;
  let qty = req.body;
  await cartManager.updateQtyInProduct(cartId, productId, qty);
  res.send({ status: "success" });
});
 
 
 
 
    
 

export default router;
