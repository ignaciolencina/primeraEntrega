import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.join(__dirname, "../../../");
const filePath = path.join(rootPath, "data/carts.json");

export class PostController {
  static async postCart(req, res) {
    const { products } = req.body;

    try {
      const data = await fs.promises.readFile(filePath, "utf8");
      const carts = data ? JSON.parse(data) : [];

      const newCart = {
        c_id: crypto.randomUUID(),
        products: products || [],
      };

      carts.push(newCart);
      await fs.promises.writeFile(filePath, JSON.stringify(carts, null, 2));

      res.status(201).json({
        data: newCart,
        message: "Carrito creado correctamente",
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al intentar crear el carrito" });
    }
  }

  static async postAddProductToCart(req, res) {
    const { c_id, id } = req.params;

    try {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        const carts = data ? JSON.parse(data) : [];
  
        const cartIndex = carts.findIndex((c) => c.c_id === c_id);
        if (cartIndex === -1) {
          return res.status(404).json({ error: `Carrito con c_id "${c_id}" no encontrado` });
        }
  
        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex((p) => p.product === id);
  
        if (productIndex !== -1) {
          cart.products[productIndex].quantity += 1;
        } else {
          cart.products.push({ product: id, quantity: 1 });
        }
  
        carts[cartIndex] = cart;
  
        await fs.promises.writeFile(filePath, JSON.stringify(carts, null, 2));
  
        res.status(200).json({
          data: cart,
          message: `Producto agregado al carrito ${c_id}`,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al agregar el producto al carrito' });
      }
  }
}
