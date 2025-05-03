import fs from "fs";
import { productsPath } from "../../../utils.js";

export class PutController {
  static async putProduct(req, res) {
    const {
      body,
      params: { id },
    } = req;

    try {
      const data = await fs.promises.readFile(productsPath, "utf-8");
      const products = data ? JSON.parse(data) : [];
      const index = products.findIndex((product) => product.id === id);

      if (index === -1) {
        return res
          .status(404)
          .json({ error: `El producto con Id "${id}" no existe` });
      }

      products[index] = { ...products[index], ...body, id };

      await fs.promises.writeFile(productsPath, JSON.stringify(products, null, 2));

      res.status(201).json({
        data: products[index],
        message: "Producto actualizado correctamente",
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al actualizar el producto" });
    }
  }
}
