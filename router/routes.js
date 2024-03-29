const express = require('express');
const routes = express.Router();
const path = require('path');
const user_controller = require('../controllers/user_controller');
const main_controller = require('../controllers/main_controller');
const movie_controller = require('../controllers/movie_controller');
const review_controller = require('../controllers/review_controller');
const comment_controller = require('../controllers/comment_controller');

//Carga el formulario de autenticacion
routes.get("/", main_controller.cargarFormularioLogin);
//Carga la pagina principal y verifica que el usuario se haya autenticado.
routes.get('/home', main_controller.cargarHome);
//Carga el formulario de registro
routes.get("/register-form", main_controller.cargarFormularioRegistro);
//Eliminar la sesion y redirecciona al usuario a la pagina inicial.
routes.get('/logout', main_controller.cerrarSesion);
//Obtiene la informacion de una pelicula a partir de un id
routes.get('/search', movie_controller.cargarPelicula);
//Toma un nombre y obtiene las peliculas que concuerden con el nombre.
routes.get('/search/movies', movie_controller.obtenerPeliculasPorNombre);
//Recupera las reseñas de una pelicula
routes.get('/movie/reviews', review_controller.obtenerReviewsByIdMovie);
//Recupera los comentarios de una reseña
routes.get('/movie/review/comments', comment_controller.obtenerCommentsByIdReview);
//Retorna las peliculas más populares
routes.get('/search/movies/popular', movie_controller.obtenerPeliculasPopulares);
//Renderiza el formulario de reseña y envia algunos datos de utilidad (idpeliculas e idusuario)
routes.get('/resena-form', main_controller.cargarFormularioResena);


routes.get('/user/history', main_controller.cargarHistorialResenas);
routes.get('/tendencias', main_controller.cargarTendencias);
routes.get('/statistics/movie', main_controller.cargarEstadisticasPelicula);
routes.get('/admin', main_controller.cargarTablaAdmin);


routes.get('/data/tendencias', main_controller.obtenerDatosTendencia);



//Toma los datos enviados en el formulario de registro y hace la insercion en la base de datos, si hay un error redirige al usuario al formulario e informa.
routes.post("/register", user_controller.registrarUsuario);
//Toma los datos enviados en el formulario de autenticacion y lo valida con los datos almacenados en la bd.
routes.post("/auth", user_controller.loginUser);
//Toma los datos enviados en el formulario de reseña y la crea, hace una validacion y luego redirige a la pelicula reseñada.
routes.post("/resena_create", review_controller.agregarReview);
//Peticion para crear el comentario
routes.post("/comment_create", comment_controller.agregarComment);
//Actualiza los contadores like, dislike y denuncia
routes.post('/update/review', review_controller.actualizarReview);
//Actualiza los contadores like, dislike y denuncia
routes.post('/update/comment', comment_controller.actualizarComment);
//Actualiza el rol del usuario
routes.post('/update/user/rol', user_controller.actualizarRolUser)

module.exports = routes;