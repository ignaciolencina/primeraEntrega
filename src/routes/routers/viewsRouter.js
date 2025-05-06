import express from 'express';
import { Views } from '../../controllers/views/index.js';

export const viewsRouter = express.Router();

viewsRouter.get("/", Views.GetController.getProducts);
viewsRouter.get("/realTimeProducts", Views.GetController.getRealTimeProducts);
