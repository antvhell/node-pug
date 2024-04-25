import express from "express";
import csrf from "csurf";
import usuarioRoutes from "./routes/usuariosRoutes.js";
import db from "./config/db.js";
import cookieParser from "cookie-parser";

//Crear la app
const app = express();

// Habilitar lectura de datos de formulario
app.use(express.urlencoded({ extended: true }));

// Habilitar Cookie Parser
app.use(cookieParser());

// Habilitar CSRF
app.use(csrf({ cookie: true }));

// Conexion a la base de datos
try {
  await db.authenticate();
  db.sync();
  console.log("Conexion correcta a la Base de datos");
} catch (error) {
  console.log(error);
}

// Routing
app.use("/auth", usuarioRoutes);

// Habilitar Pug
app.set("view engine", "pug");
app.set("views", "./views");

// Carpeta Pública
app.use(express.static("public"));

// Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
