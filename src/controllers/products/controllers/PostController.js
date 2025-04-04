import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.join(__dirname, "../../../");
const filePath = path.join(rootPath, "data/products.json");

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
      const data = await fs.promises.readFile(filePath, "utf8");
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
      await fs.promises.writeFile(filePath, JSON.stringify(products, null, 2));

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
