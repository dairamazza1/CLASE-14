const { Contenedor } = require('./Contenedor');
const fs = require('fs');

class Product extends Contenedor {
    constructor() {
        super('./src/data/products.txt');
        let products = this.getAll();
        this.id = (products.length > 0) ? products.length + 1 : 1;
        this.timestamp = Date.now();
    }

     save(name, description, code, thumbnail, price, stock) {
        let products =  this.getAll();
        let player = {id:this.id, timestamp: this.timestamp, name: name, description: description, code: code, thumbnail: thumbnail, price: price, stock: stock}
        products.push(player);
        this.saveInFile(products);
        this.id++;
        
    }

     getAll() {
        const prod =   this.getContentFile()
        return prod;
    }

    updateByID(number,req){
        try {
            const jsonObj = this.getAll();
            for (let key in jsonObj) {
                if (jsonObj[key].id === number) {
                    jsonObj[key] = {
                        id: number,
                        timestamp: this.timestamp,
                        name: req.name,
                        description: req.description,
                        code: req.code,
                        thumbnail: req.thumbnail,
                        price: req.price,
                        stock: req.stock
                    }
                }
            }
           // sobreescribir
           this.saveInFile(jsonObj);

        } catch (error) {
            console.log(error);
        }
    }
    getProdById(id) {
        let products = this.getAll();
        let prod = null;

        if(products.length > 0) {
            let element = products.find(elem => elem.id == id);
            if(element) {
                prod = element;              
            }
        }
        return prod;
    }
    
}

module.exports = { Product }