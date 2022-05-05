const express = require('express');
const { Router } = express;
const productRouter = Router();

const { Product } = require('../models/Productos');
let product = new Product();

productRouter.get('/', (req, res) => {
    let products = product.getAll();

    res.json({alProducts: products});
});
productRouter.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.json(product.getById(id));
});
productRouter.post('/', (req, res) => {
    let product = req.body;

    if (product && product.timestamp && product.name && product.description && product.code && product.thumbnail && product.price && product.stock) {
        prod = product.save(product.timestamp, product.name, product.description, product.code, product.thumbnail , product.price , product.stock);
        res.json({result: 'Producto cargardo', producto: prod});
    } else {
        res.json({result: 'No fue posible cargar el producto'});
    }
});
productRouter.put('/:id', (req,resp) => {
    const id = parseInt(req.params.id);
    try{
        const prodAux = product.updateByID(id,req.body)
         resp.send('Se actualizó correctamente');
    }catch(err){
        resp.status(500).send('No se puede actualizar el producto')
    }   
}) 
productRouter.delete('/:id', (req,resp) => {
    const id = parseInt(req.params.id);
    try{       
        const prodAux = product.deleteByID(id)
    }catch(err){
        resp.status(500).send('No se encontró el producto')
    }   
}) 

module.exports = productRouter;