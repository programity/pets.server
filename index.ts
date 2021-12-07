import Server from "./class/server";
import userRoutes from "./routes/user";

const server = new Server();


// Ruta de la app
server.app.use('/user', userRoutes)


// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en port ${server.port}`);
    
});