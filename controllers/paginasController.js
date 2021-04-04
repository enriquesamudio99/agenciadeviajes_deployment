import { Viaje } from "../models/Viaje.js";
import { Testimoniales } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {

    const promiseDB = [];

    promiseDB.push( Viaje.findAll({ limit:3 }) );
    promiseDB.push( Testimoniales.findAll({ limit:3 }) );

    try {

        // Consultar 3 viajes del modelo Viaje y 3 testimoniales del modelo Testimoniales
        const resultado = await Promise.all(promiseDB);

        res.render("inicio", {
            pagina: 'Inicio',
            clase: "home",
            viajes: resultado[0],
            testimoniales: resultado[1]
        });

    } catch (error) { 
        console.log(error);
    }

    
}

const paginaNosotros = (req, res) => {
    res.render("nosotros", {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {

    // Consultar BD
    const viajes = await Viaje.findAll();

    res.render("viajes", {
        pagina: 'Próximos Viajes',
        viajes
    });

}

const paginaTestimoniales = async (req, res) => {

    try {

        // Consultar BD
        const testimoniales = await Testimoniales.findAll();

        res.render("testimoniales", {
            pagina: 'Testimoniales',
            testimoniales
        });

    } catch (error) {
        
        console.log(error);

    }
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {

    const { slug } = req.params;

    try {

        const viaje = await Viaje.findOne({ where : { slug } });

        res.render("viaje", {
            pagina: "Información Viaje",
            viaje
        })

    } catch (error) {

        console.log(error);

    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}