import Server from "./class/server";
import userRoutes from "./routes/user";
import mongoose from "mongoose";

const server = new Server();

// Ruta de la app
server.app.use('/user', userRoutes);

//Conectar DB

mongoose.connect('mongodb://localhost:27017/petsdb', async (err) => {
    if (err) throw err;
    console.log("conncted to db")
});



// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en port ${server.port}`);

});