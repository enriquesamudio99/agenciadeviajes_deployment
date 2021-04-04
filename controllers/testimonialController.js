import { Testimoniales } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {

    // Validar
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if(nombre.trim() === "") {
        errores.push({mensaje: "El Nombre no puede ir vacío"});
    }

    if(correo.trim() === "") {
        errores.push({mensaje: "El Correo esta vacío o no es válido"});
    }

    if(mensaje.trim() === "") {
        errores.push({mensaje: "El Mensaje no puede ir vacío"});
    }

    if(errores.length > 0) {

        // Consultar BD
        const testimoniales = await Testimoniales.findAll();

        // Mostrar la vista con errores
        res.render("testimoniales", {
            pagina: "Testimoniales",
            errores,
            nombre, 
            correo,
            mensaje,
            testimoniales
        });

    } else {

        // Almacenar en la base de datos
        try {
            await Testimoniales.create({
                nombre,
                correo, 
                mensaje
            });

            res.redirect("/testimoniales");
        } catch (error) {
            console.log(error);   
        }

    }

}

export {
    guardarTestimonial
}