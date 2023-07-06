import { Router } from 'express';
import __dirname from "../utils.js"
import ProductManager from '../DAOs/ProductManagerMongo.class.js';
import CartManager from '../DAOs/CartManagerMongo.class.js';


let productManager = new ProductManager()
let cartManager = new CartManager()

const router = Router();

// puse profile
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.render('logout');
})


router.get('/register', (req, res) => {
  res.render('register');
})


router.get('/restartPassword', (req, res) => {
  res.render('restartPassword');
})

router.get('/login', (req, res) => {
  res.render('login');
})
// puse profile
router.get('/profile', (req, res) => {
  let user = req.session.user
  let texto = ""
  if(!user){texto= `LOGUEASE: Ingrese usuario  `} else {texto = "TU PERFIL"}
    res.render('profile', {
      user: req.session.user,
      texto:  texto
  });
})



router.get('/', async (req,res)=>{
  let products = await productManager.getProducts(10, 1,0,null,null); 
  res.render('home', {
    title: "Inicio",
    products: products
  });
})

router.get('/realtimeproducts', async (req,res)=>{
  res.render('realTimeProducts');
})


router.get('/chat',async  (req,res)=>{ 
  await productManager.getProducts(10, 1,0,null,null).then(() => {
    req.socketServer.sockets.emit('update-products')
    res.render('chat', { style: "home.css", title: "Chat" })

  })
})


export default router;
 
