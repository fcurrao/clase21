import { Router } from "express"
import ProductManager from "../DAOs/ProductManagerMongo.class.js"
import __dirname from "../utils.js" 
import userModel from "../DAOs/models/users.model.js"

let productManager = new ProductManager()

const router = Router()

router.get('/', async (req, res) => {
  let limit = Number(req.query.limit) || undefined
  let page = Number(req.query.page) || undefined
  let sort = Number(req.query.sort) || undefined
  let filtro = req.query.filtro || undefined
  let filtroVal = req.query.filtroVal || undefined 
  let user = req.session.user
   
  let texto = ""
  let texto2 = ""
  let texto3 = ""
  if(user!=undefined &&  user.email === "adminCoder@coder.com" ) {
    texto = "rol: ADMINISTRADOR |||  bienvenido Coderhouse admin!!! GRACIAS POR SU CONTRIBUCION "
  } if (user != undefined && user.email !== "adminCoder@coder.com") {
    texto = "rol: user ||| " 
    texto2 = " --------------------------------------------"
    texto3 = " || "
  }
  // if(!page) page=1
  let products = await productManager.getProducts(limit,page,sort,filtro,filtroVal)
  products.prevLink = products.hasPrevPage?`http://localhost:8080/products?page=${products.prevPage}`:''
  products.nextLink = products.hasNextPage?`http://localhost:8080/products?page=${products.nextPage}`:''
  products.isValid = !(page<=0||page>products.totalPages)
  let listaProductos = products.docs; 
  console.log(listaProductos)
  listaProductos.map((cadauno) =>{ 
    cadauno.other3 = JSON.stringify(cadauno._id) 
  })
  
   res.render('products', { texto2: texto2,texto3: texto3, texto: texto, user: user, listaProductos: listaProductos, prev: products.prevLink , next: products.nextLink  , isValid: products.isValid }); 
})

// router.get('/products', async (req,res)=>{
//   let products = await productManager.getProducts(5, 1,0,null,null); 
//   console.log(products)
//   // res.render('products', {  products: products});
// })
router.get('/:pid', async (req, res) => {
  let id = req.params.pid
  let product = await productManager.getProductById(id)
  if (!product) {
    res.send("No se encontró el producto")
    return
  }
  res.send(product) // Se envian los productos en forma de objeto como pide la consigna
})

router.post('/', async (req, res) => {
  let newProduct = req.body
  await productManager.addProduct(newProduct)
  const products = await productManager.getProducts(10, 1,0,null,null)
  req.socketServer.sockets.emit('update-products', products)
  res.send({status: "success"})
})

router.put('/:pid', async (req, res) => {
  let id = req.params.pid
  let newProduct = req.body
  await productManager.updateProduct(id, newProduct)
  res.send({status: "success"})
})

router.delete('/:pid', async (req, res) => {
  let id = req.params.pid
  await productManager.deleteProduct(id)
  res.send({status: "success"})
})

export default router