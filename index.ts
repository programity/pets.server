import Server from "./class/server";

const server = new Server();


// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en port ${server.port}`);
    
});