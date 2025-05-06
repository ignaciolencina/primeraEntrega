import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { mainRouter } from "./routes/mainRouter.js";
import { __dirname } from "./utils.js";
import { disconnect } from "process";

console.clear();
console.log("⌛ Inicializando servidor...");

const app = express();
const server = createServer(app);
const io = new Server(server);

// Cofiguracion de Handlebars
app.engine("handlebars", engine());
app.set("views", `${__dirname}/views`);// ACA PODEMOS ESTAR ERRANDOLE
app.set("view engine", "handlebars");

//Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use((req, _, next) => {
  req.io = io;
  next();
});
app.use(express.json());// Para peticiones con JSON

// Rutas
app.use("/api/v1", mainRouter);

//Socket
io.on("connection", (socket) => {
  console.log("Cliente conectado", socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id)
  })

  // socket.on("addProduct", async (product) => {
  //   try {
  //     const data = await fs.promises.readFile(productsPath, "utf-8");
  //     const products = JSON.parse(data);
  //     products.push(product);
  //     await fs.promises.writeFile(
  //       productsPath,
  //       JSON.stringify(products, null, 2)
  //     );
  //     io.emit("productsUpdated", products);
  //   } catch (error) {
  //     console.error("Error al agregar producto desde socket:", error);
  //   }
  // });

  // socket.on("deleteProduct", async (id) => {
  //   try {
  //     const data = await fs.promises.readFile(productsPath, "utf-8");
  //     let products = JSON.parse(data);
  //     products = products.filter((p) => p.id !== id);
  //     await fs.promises.writeFile(
  //       productsPath,
  //       JSON.stringify(products, null, 2)
  //     );
  //     io.emit("productsUpdated", products);
  //   } catch (error) {
  //     console.error("Error al eliminar producto desde socket:", error);
  //   }
  // });
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🥟 El servidor está arriba y en el puerto ${PORT}`);
});
