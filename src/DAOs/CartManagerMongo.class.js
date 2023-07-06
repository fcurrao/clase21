import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";
import { environment } from "../.env/environment.js";
import ProductManager from "./ProductManagerMongo.class.js"; 

export default class CartManager {
connection = mongoose.connect(environment.mongoConnection)
productManager = new ProductManager()


async createCart(){
    const result = await cartModel.create({products: []})
    return result
}
async getCartById(id){
 const result = await cartModel.findOne({_id:id})
 return result
}

async getAllCarts(){
 const result = await cartModel.find()
 return result
}

async addProductToCart(cid,pid){
    const product = await this.productManager.getProductById(pid)
    const cart = await this.getCartById(cid)
    cart.products.push({product: product})
    await cart.save()
    return 
}


async deleteProductFromCart(cid,pid){
    const cart = await this.getCartById(cid)
    const productIndex =  cart.products.findIndex(p=>p.product == pid)
    const carritoQueda = [...cart.products]
    carritoQueda.splice(productIndex, 1); 
    cart.products = carritoQueda
    await cart.save()
    return 
}

async deleteAllProductsFromCarts(cid){
    const cart = await this.getCartById(cid)
    cart.products = []
    await cart.save()
    return 
}

///////////////////////////////////

 

async updateQtyInProduct(cartId, productId, qty) { 
    const cart = await this.getCartById(cartId)
    const productIndex =  cart.products.findIndex(p=>p.product == productId) 
    
    
    console.log ("cart.products2", cart.products[productIndex])

    console.log ("cart.products", cart.products) 
    console.log ("cart.products2", cart.products[productIndex])
    console.log (" productIndex", productIndex)
    console.log (" cartId", cartId)
    console.log (" productId", productId)
    console.log (" qty", qty)
    console.log (" qty", cart.products[productIndex])

    // try { 
    //     console.log(cart.product[0].product.id)
    //     console.log(productId)
    //     const productIndex = cart.products.findIndex(p=>p.id ==productId)
        // if(productIndex !==-1){
        //     if(cart.products[productIndex].stock >= qty){
    //         cart.products[productIndex].other3 = qty
    //         await cart.save()
    //         return "cantidad actulizada"
    //         } else { return "no hay suficiente stock"}
    //     } else {
    //         return "no existe este producto en tu carro"
    //     }
    // } catch {
    //     return console.log("error en actualizar stock ")
    // }
    // let result = await cartModel.updateOne({_id: cartId   },{$set: productId.quantyty = qty})
    

  }
 
/////////////////////////////////
}
