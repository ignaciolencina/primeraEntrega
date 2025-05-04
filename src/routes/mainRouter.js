import express from 'express';

import { productRouter } from './routers/productRouter.js';
import { cartRouter } from './routers/cartRouter.js';

import fs from "fs/promises";
import { productsPath } from '../utils.js';

export const mainRouter = express.Router();

mainRouter.use('/products', productRouter);
mainRouter.use('/carts', cartRouter);

// Ruta para mostrar los productos
mainRouter.get('/view/products', async (_, res) => {
    try {
      const data = await fs.readFile(productsPath, 'utf-8');
      const products = JSON.parse(data);
      res.render('products', {
        title: 'Catálogo de Productos',
        products,
      });
    } catch (error) {
        console.log(error)
      res.status(500).send('Error al cargar los productos');
    }
  });