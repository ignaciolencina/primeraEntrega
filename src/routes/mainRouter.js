import express from 'express';

import { productRouter } from './routers/productRouter.js';
import { cartRouter } from './routers/cartRouter.js';

export const mainRouter = express.Router();

mainRouter.use('/products', productRouter);
mainRouter.use('/carts', cartRouter);