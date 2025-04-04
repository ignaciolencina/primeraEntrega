import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.join(__dirname, "../../../");

export class GetController {
  static async getCart(req, res) {
    try {
      const filePath = path.join(rootPath, "data/carts.json");
      const data = await fs.promises.readFile(filePath, "utf-8");
      const carts = JSON.parse(data);
      const cart = carts.find((c) => c.id === req.params.id);

      if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }

      res.json({
        data: cart,
        message: "Carrito encontrado correctamente",
      });
    } catch (error) {
      res.status(500).json({ error: "Ocurrió un error al leer el carrito" });
    }
  }
}
