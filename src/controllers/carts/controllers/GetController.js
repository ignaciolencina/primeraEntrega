import fs from "fs";
import { cartsPath } from "../../../utils.js";

export class GetController {
  static async getCart(req, res) {
    try {
      const data = await fs.promises.readFile(cartsPath, "utf-8");
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
