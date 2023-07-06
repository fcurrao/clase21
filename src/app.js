import express from 'express'
import cookieParser from 'cookie-parser' 
import session from 'express-session'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import routerProducts from './routes/products.router.js' 
import routerCarts from './routes/carts.router.js'
import routerViews from './routes/views.router.js'
import sessionRouter from './routes/session.routes.js'
import { Server } from "socket.io";
import ProductManager from './DAOs/ProductManagerMongo.class.js'
import MongoStore from 'connect-mongo' 
import mongoose from 'mongoose'  
import { initializePassport } from './config/passport.config.js'
// import initializePassport from './config/passport.config.js'
// import { initializePassport } from './config/passport.config.js'
import  initialize  from 'passport'
import passport from 'passport'
import { environment } from './.env/environment.js'

// initial configuration
const app = express(); // inicializo el servidor 
// 
const connection = mongoose.connect(environment.mongoConnection, 
{useNewUrlParser: true, useUnifiedTopology:true}) 

app.use(express.json()); //json
app.use(express.urlencoded({ extended: true }));  // 
app.use(express.static(__dirname + "/public")); // static


app.use(cookieParser("firmaDeLaCookie"))  // cookies  
initializePassport()
app.use(
  session({
    store: new MongoStore({
      mongoUrl:
      environment.mongoConnection,
    }),
    secret: "mongoSecret",
    resave: true,
    saveUninitialized: false,
  })
);
  
app.use(passport.initialize())


// app.get('/user', (req,res)=>{
//   req.session.user = req.query.name 
//   res.send('session set')
// })





// handlebars
app.set("views", __dirname + "/views"); // seteo la carpeta vistas
app.set("view engine", "handlebars"); // seteo la carpeta engine.
app.engine("handlebars", handlebars.engine({
  extname: 'handlebars', 
  runtimeOptions:{allowProtoPropertiesByDefault:true,
  allowedProtoMethodsByDefault:true}
})); 
 

// routers

app.get('/session', (req, res)=>{
  const name = req.query.name
  if(!req.session.user){
    req.session.user = name
    req.session.contador = 1
    return res.send('bienvenido ' + req.session.user)
  } else{
    req.session.contador++
    return res.send('Es tu visita numero: ' + req.session.contador)
  }
})

app.get('/cookies', (req, res)=>{
  res.render('cookies')
})

app.post('/cookies2', (req, res)=>{
  const data = req.body
  res.cookie(data.name, data.email, {maxAge:10000} , {signed:true} ).send({status: 'succes'})
})

app.get('/cookies2', (req, res)=>{
  console.log("res.cookie", req.cookies) //  cookies2
  res.end()
})


app.use((req,res,next)=>{
  req.socketServer = socketServer
  next()
})

// Mas routers
app.use("/", routerViews); //

app.use("/api/sessions", sessionRouter); //
app.use("/products", routerProducts);
app.use("/carts", routerCarts);

// server start and socket io
const expressServer = app.listen(8080, () => console.log("Servidor levantado")) // levanto servidor
const socketServer = new Server(expressServer)  //servidor con socket

socketServer.on("connection", async (socket) => {
  console.log("Estas conectado " + socket.id)

  let productManager = new ProductManager()

  // Se envian todos los productos al conectarse
  socket.emit("update-products", await productManager.getProducts(10, 1,0,null,null))

  // Se agrega el producto y se vuelven a renderizar para todos los sockets conectados
  socket.on("add-product", async (productData) => {
    await productManager.addProduct(productData)
    socketServer.emit("update-products", await productManager.getProducts(10, 1,0,null,null))
  })

  // Se elimina el producto y se vuelven a renderizar para todos los sockets conectados
  socket.on("delete-product", async (productID) => {
    await productManager.deleteProduct(productID)
    socketServer.emit("delete-products", await productManager.getProducts(10, 1,0,null,null))
  }) 
  
    // socketServer.emit('deleteProduct', product.id)


const mensajes = [];
 socket.on("message", (data) => {
    console.log("data,",data)
    mensajes.push({ socketId: socket.id, message: data });
    console.log("mensajes", mensajes)
    socketServer.emit("imprimir", mensajes);
  });
})


