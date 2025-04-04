import express from "express";
import { Products } from "../../controllers/products/index.js";

export const productRouter = express.Router();

productRouter.get("/", Products.GetController.getProducts);
productRouter.get("/:id", Products.GetController.getProduct);

productRouter.post("/", Products.PostController.postProduct);

productRouter.put("/:id", Products.PutController.putProduct);

productRouter.delete("/:id", Products.DeleteController.deleteProduct);
