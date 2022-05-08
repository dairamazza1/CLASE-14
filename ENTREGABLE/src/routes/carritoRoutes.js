const express = require('express');
const { Router } = express;
const carritoRoutes = Router();

const { Carrito } = require('../models/Carrito');
const { Product } = require('../models/Productos');

let productClass = new Product();
let carritoClass = new Carrito();

carritoRoutes.get('/', (req, res) => {
    let carrito = carritoClass.getAll();

    res.json({Carrito: carrito});
});

carritoRoutes.get('/:id/productos', (req, res) => {
    let carritoID = req.params.id;
    let prodCart = carritoClass.getProductCartByID(carritoID);

    if(prodCart.length > 0){
        res.json({Productos: prodCart});
    }else{
        res.send("Productos no encontraos");
    }
});

carritoRoutes.post('/', (req, res) => {
    let carrito = req.body;
    if (carrito && carrito.name && carrito.description && carrito.code && carrito.thumbnail && carrito.price && carrito.stock) {
        carrito = carritoClass.save(carrito.name, carrito.description, carrito.code, carrito.thumbnail, carrito.price, carrito.stock);
        res.json({result: 'Carrito guardado', Id: carrito});
    } else {
        res.send({result: 'Carrito no fue guardado'});
    }
});

carritoRoutes.post('/:id/productos', (req, res) => {
    let carritoID = req.params.id;
    let producto = productClass.getProdById(req.body.id);
    
    if (carritoID && producto) {
        let carrito = carritoClass.addProductToCarrito(carritoID, producto);
        
        res.json({result: 'Producto agregado a carrito', carrito: carrito});
    } else {
        res.json({result: 'El producto no pudo ser agregado a carrito'});
    }
});

carritoRoutes.delete('/:id', (req,resp) => {
    const id = parseInt(req.params.id);
    try{       
        const prodAux = carritoClass.deleteById(id);
        resp.send('Carrito eliminado con exito')
    }catch(err){
        resp.send('No se encontró el carrito')
    }   
});

carritoRoutes.delete('/:id/productos/:id_prod', (req,resp) => {
    const idCart = parseInt(req.params.id);
    const idProd = parseInt(req.params.id_prod);
    try{       
        const prodAux = carritoClass.deleteProductById(idCart, idProd);
        resp.send('Producto eliminado con exito')
    }catch(err){
        resp.send('No se encontró el producto')
    }   
});

module.exports = carritoRoutes;