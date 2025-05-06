import fs from "fs/promises";
import { productsPath } from "../../../utils.js";


export class GetController {
  static async getProducts(_, res) {
    try {
      const data = await fs.readFile(productsPath, "utf-8");
      const products = JSON.parse(data);
      res.render("products", {
        title: "Catálogo de Productos",
        products,
      });
    } catch (error) {
      //   console.log(error);
      res.status(500).send("Error al cargar los productos");
    //   res.render({ msg: "Hubo un error al cargar los productos" });
    }
  }

  static async getRealTimeProducts(_, res) {
    try {
      const data = await fs.readFile(productsPath, "utf-8");
      const products = JSON.parse(data);
      res.render("realTimeProducts", { products });
    } catch (error) {
      //   console.log(error);
      res.status(500).send("Error al cargar los productos");
    //   res.render({ msg: "Hubo un error al cargar los productos" });
    }
  }
}


