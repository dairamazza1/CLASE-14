const express = require('express');
const { Router } = express;
const carritoRoutes = Router();

const { Carrito } = require('../models/Carrito');
const { Product } = require('../models/Productos');

let productClass = new Product();
let carritoClass = new Carrito();

carritoRoutes.get('/', (req, res) => {
    let carrito = carritoClass.getAll();

    res.json({carrito: carrito});
});

carritoRoutes.post('/', (req, res) => {
    let carrito = req.body;

    if (carrito && carrito.timestamp, carrito.name, carrito.description, carrito.code, carrito.thumbnail, carrito.price, carrito.stock) {
        carrito = teamContainer.save(timestamp, name, description, code, thumbnail, price, stock);
        res.json({result: 'Carrito guardado', carrito: carrito});
    } else {
        res.json({result: 'Carrito no fue guardado'});
    }
});

carritoRoutes.post('/:id/productos', (req, res) => {
    let carritoID = req.params.id;
    let producto = productClass.getById(req.body.id);

    if (carritoID && producto) {
        let carrito = carritoClass.addProductToCarrito(carritoID, producto);
        
        res.json({result: 'Producto agregado a carrito', carrito: carrito});
    } else {
        res.json({result: 'El producto no pudo ser agregado a carrito'});
    }
});

module.exports = carritoRoutes;