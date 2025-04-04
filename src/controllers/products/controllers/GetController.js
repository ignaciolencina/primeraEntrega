import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.join(__dirname, "../../../");

export class GetController {
  static async getProducts(_, res) {
    try {
      const filePath = path.join(rootPath, "data/products.json");
      const data = await fs.promises.readFile(filePath, "utf-8");
      const products = JSON.parse(data);
      res.json({
        data: products,
        message: "Productos encontrados correctamente",
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al leer la lista de productos" });
    }
  }

  static async getProduct(req, res) {
    try {
      const filePath = path.join(rootPath, "data/products.json");
      const data = await fs.promises.readFile(filePath, "utf-8");
      const products = JSON.parse(data);
      const product = products.find((p) => p.id === req.params.id);

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.json({
        data: product,
        message: 'Producto encontrado correctamente'
      });
      
    } catch (error) {
      res.status(500).json({ error: "Ocurrió un error al leer el producto" });
    }
  }
}
