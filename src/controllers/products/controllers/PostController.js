import fs from "fs";
import crypto from "crypto";
import { productsPath } from "../../../utils.js";

export class PostController {
  static async postProduct(req, res) {
    const {
      title,
      description,
      code,
      price,
      active,
      stock,
      category,
      thumbnails,
    } = req.body;

    try {
      const data = await fs.promises.readFile(productsPath, "utf8");
      const products = data ? JSON.parse(data) : [];

      if (products.some((product) => product.code === code)) {
        return res
          .status(400)
          .json({ error: `El código de producto "${code}" ya existe` });
      }

      const newProduct = {
        id: crypto.randomUUID(),
        title,
        description,
        code,
        price,
        active,
        stock,
        category,
        thumbnails,
      };

      products.push(newProduct);
      await fs.promises.writeFile(productsPath, JSON.stringify(products, null, 2));

      res.status(201).json({
        data: newProduct,
        message: "Producto agregado correctamente",
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al guardar el producto" });
    }
  }
}
