const express = require('express');
const { Router } = express;
const productRouter = Router();

const { Product } = require('../models/Productos');
let product = new Product();

productRouter.get('/', (req, res) => {
    // let products = product.getAll().then(obj => {
    //     console.log("testtttt",obj);
    //     res.json({allProducts: obj});       
    // });

    let products = product.getAll(); 
    res.json({allProducts: products});       
    
});
productRouter.get("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let getId = product.getByID(id)
    res.json(getId);  
});
productRouter.post('/', (req, res) => {
    let products = req.body;
    
    if (products && products.name && products.description && products.code && products.thumbnail && products.price && products.stock) {
        prod = product.save( products.name, products.description, products.code, products.thumbnail , products.price , products.stock);
        res.json({result: 'Producto cargardo', producto: prod});
    } else {
        res.json({result: 'No fue posible cargar el producto'});
    }
});
productRouter.put('/:id', (req,resp) => {
    const id = parseInt(req.params.id);
    try{
        const prodAux = product.updateByID(id,req.body)
         resp.send(product.getById(id));
    }catch(err){
        resp.send('No se puede actualizar el producto')
    }   
}) 
productRouter.delete('/:id', (req,resp) => {
    const id = parseInt(req.params.id);
    try{       
        const prodAux = product.deleteById(id);
        resp.send('Producto eliminado con exito')
    }catch(err){
        resp.send('No se encontró el producto')
    }   
}) 

module.exports = productRouter;