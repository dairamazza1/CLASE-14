const { Contenedor } = require('./Contenedor');

class Carrito extends Contenedor {
    constructor() {
        super('./src/data/carrito.txt');
        let carrito = this.getAll();
        this.id = (carrito.length > 0) ? carrito.length + 1 : 1;
    }

    save(timestamp, name, description, code, thumbnail, price, stock) {
        let carrito = this.getAll();
        let carritoObj = {id:this.id, timestamp: timestamp, name: name, description: description, code: code, thumbnail: thumbnail, price: price, stock: stock, products: []}
        carrito.push(carritoObj);
        this.saveInFile(carritoObj);
        this.id++;

        return carritoObj;
    }

    getAll() {
        let carrito = this.getContentFile();

        return carrito;
    }

    addProductToCarrito(carritoID, product) {
        let carrito = this.getAll();
        let card = null;

        if(carrito.length > 0) {
            let element = carrito.find(elem => elem.id == carritoID);
            if(element) {
                element.products.push(product);
                card = element;
            }

            this.saveInFile(carrito);
        }

        return card;
    }
    
}

module.exports = { Carrito }