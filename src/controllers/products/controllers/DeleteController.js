import fs from "fs";
import { productsPath } from "../../../utils.js";

export class DeleteController {
  static async deleteProduct(req, res) {
    const { id } = req.params;

    try {
      const data = await fs.promises.readFile(productsPath, "utf-8");
      const products = data ? JSON.parse(data) : [];

      const updatedProducts = products.filter((product) => product.id !== id);

      if (products.length === updatedProducts.length) {
        return res
          .status(404)
          .json({ error: `El producto con Id "${id}" no existe` });
      }

      await fs.promises.writeFile(
        productsPath,
        JSON.stringify(updatedProducts, null, 2)
      );

      res.status(201).json({
        message: "Producto eliminado correctamente",
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al intentar eliminar el producto" });
    }
  }
}
