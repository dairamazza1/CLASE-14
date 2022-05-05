const { Contenedor } = require('./Contenedor');

class Product extends Contenedor {
    constructor() {
        super('./src/data/products.txt');
        let products = this.getAll();
        this.id = (products.length > 0) ? products.length + 1 : 1;
    }

    save(timestamp, name, description, code, thumbnail, price, stock) {
        let products = this.getAll();
        let player = {id:this.id, timestamp: timestamp, name: name, description: description, code: code, thumbnail: thumbnail, price: price, stock: stock}
        products.push(player);
        this.saveInFile(products);
        this.id++;
    }

    getAll() {
        let products = this.getContentFile();

        return products;
    }
    
}

module.exports = { Product }