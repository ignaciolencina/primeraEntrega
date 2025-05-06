import express from "express";
import http from "http";
import path from "path";
import fs from "fs";
import { mainRouter } from "./routes/mainRouter.js";
import { __dirname, productsPath } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";

console.clear();
console.log("⌛ Inicializando servidor...");

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Cofiguracion de Handlebars
app.engine("handlebars", engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

//Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use((req, _, next) => {
  req.io = io;
  next();
});

// Para peticiones con JSON
app.use(express.json());

// Rutas
app.use("/api/v1", mainRouter);

//Socket
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("addProduct", async (product) => {
    try {
      const data = await fs.promises.readFile(productsPath, "utf-8");
      const products = JSON.parse(data);
      products.push(product);
      await fs.promises.writeFile(
        productsPath,
        JSON.stringify(products, null, 2)
      );
      io.emit("productsUpdated", products);
    } catch (error) {
      console.error("Error al agregar producto desde socket:", error);
    }
  });

  socket.on("deleteProduct", async (id) => {
    try {
      const data = await fs.promises.readFile(productsPath, "utf-8");
      let products = JSON.parse(data);
      products = products.filter((p) => p.id !== id);
      await fs.promises.writeFile(
        productsPath,
        JSON.stringify(products, null, 2)
      );
      io.emit("productsUpdated", products);
    } catch (error) {
      console.error("Error al eliminar producto desde socket:", error);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🥟 El servidor está arriba y en el puerto ${PORT}`);
});
