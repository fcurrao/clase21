
// import CartManager from "../../DAOs/CartManagerMongo.class.js"  
// import __dirname from "../../utils.js"


// let cartManager = new CartManager() 



function buttonAdd() {
    // carritoID = "6487ad36edaadc46114c63c1"
    alert ("agregado")
} 


function alert2(stock, id){
    // document.getElementById("inputADD").value = ""
    // cartManager.addProductToCart(carritoID,productoID) 
    alert("id" + id) 
    // (id="undefined") ? id= "6487ad20edaadc46114c3c84" : ""
    const input = document.getElementById(id) 
     
    let qtyToBuy = input.value 
    if( qtyToBuy <= stock){
        alert("Agregada")
        document.getElementById(id).value = ""
        
    } else {  
        alert("no hay suficiente stock, solo hay: " + stock)
    }
  }