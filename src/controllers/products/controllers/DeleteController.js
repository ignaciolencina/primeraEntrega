import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.join(__dirname, "../../../");
const filePath = path.join(rootPath, "data/products.json");

export class DeleteController {
  static async deleteProduct(req, res) {
    const { id } = req.params;

    try {
      const data = await fs.promises.readFile(filePath, "utf-8");
      const products = data ? JSON.parse(data) : [];

      const updatedProducts = products.filter((product) => product.id !== id);

      if (products.length === updatedProducts.length) {
        return res
          .status(404)
          .json({ error: `El producto con Id "${id}" no existe` });
      }

      await fs.promises.writeFile(
        filePath,
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
