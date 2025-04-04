import express from "express";
import { Carts } from "../../controllers/carts/index.js";

export const cartRouter = express.Router();

cartRouter.post("/", Carts.PostController.postCart);
cartRouter.post(
  "/:c_id/products/:id",
  Carts.PostController.postAddProductToCart
);

cartRouter.get("/:c_id", Carts.GetController.getCart);
