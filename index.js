import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

import dotenv from "dotenv";
dotenv.config({path: "variables.env"});

const app = new express();

// Conectar a la base de datos
db.authenticate()
    .then( () => console.log("Base de Datos conectada"))
    .catch( error => console.log(error));

// Habilitar PUG
app.set("view engine", "pug");

// Obtener el año actual
app.use( (req, res, next) => {

    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";

    next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}));

// Definir la carpeta publica
app.use(express.static("public"));

// Agregar Router
app.use("/", router);

// Definir puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port, () => {

    console.log(`El Servidor esta funcionando en el puesto ${port}`);

});