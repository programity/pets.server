import Server from "./class/server";
import mongoose from "mongoose";

import bodyParser from "body-parser";
import fileUpload from 'express-fileupload';

import userRoutes from "./routes/user";
import postRoutes from "./routes/post";

//instancia
const server = new Server();


// Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());


// FileUpload
server.app.use(fileUpload());

// Ruta de la app
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

//DB config
const url = "mongodb://localhost:27017/petsdb";
mongoose.connect(url,
    {
    //     useCreateIndex: true,
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    }, (err) => {
        if (err) throw err;
        console.log('Base de dato ONLINE');
    });


// const URI = process.env.MONGODB_URL;
// mongoose.connect(URI, {
//     useCreateIndex: true, 
//     useFindAndModify: false, 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true 
//  }, err => {
//     if(err) throw err;
//     console.log('Connected to MongoDB!!!')
//  })

// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en port ${server.port}`);

});