const { Contenedor } = require('./Contenedor');

class Carrito extends Contenedor {
    constructor() {
        super('./src/data/carrito.txt');
        let carrito = this.getAll();
        this.id = (carrito.length > 0) ? carrito.length + 1 : 1;
        this.timestamp = Date.now();
    }

     save(name, description, code, thumbnail, price, stock) {
        let carrito = this.getContentFile();
        let idCart= this.id;
        let carritoObj = {id: idCart, timestamp: this.timestamp, name: name, description: description, code: code, thumbnail: thumbnail, price: price, stock: stock, products: []}          
        carrito.push(carritoObj);
        this.saveInFile(carrito);
        this.id++;
        
        return idCart;
    }

     getAll() {
        const cart =  this.getContentFile()
        return cart;
        
    }

    getByIdCart(id) {
        let cart = this.getAll();
        let carrito = null;

        if(cart.length > 0) {
            let element = cart.find(elem => elem.id == id);
            if(element) {
                carrito = element;
            }
        }
        return carrito;
    }


    getProductCartByID(idCart){
        let  cartProducts = [];
        const cart = this.getByIdCart(idCart)
        
        cart.products.forEach(item => {
            cartProducts.push(item);
        });
        return cartProducts;
    }

    addProductToCarrito(carritoID, product) {
        let carrito = this.getAll();
        let cart = null;

        if(carrito.length > 0) {
            let element = carrito.find(elem => elem.id == carritoID);
            if(element) {
                element.products.push(product);
                cart = element;
            }
            this.saveInFile(carrito);
        }
        return cart;
    }

    deleteProductById(cartID, productID){
        try {
            const carrito = this.getAll();
            if(carrito.length > 0) {
                for (let key in carrito) {
                    if (carrito[key].id === cartID) {                       
                        for (let item in carrito[key].products) {
                            if (carrito[key].products[item].id === productID) {
                                carrito[key].products.splice(item,1)
                                break;
                            }
                        }
                    }
                }
                this.saveInFile(carrito);
            }
        } catch (error) {
            console.log(error);
        }   
    }
    
}

module.exports = { Carrito }