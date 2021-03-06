"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./class/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const user_1 = __importDefault(require("./routes/user"));
const post_1 = __importDefault(require("./routes/post"));
//instancia
const server = new server_1.default();
// Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// FileUpload
// { useTempFiles: true }
server.app.use((0, express_fileupload_1.default)({ useTempFiles: true }));
// configurar CORS
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
// Ruta de la app
server.app.use('/user', user_1.default);
server.app.use('/posts', post_1.default);
//DB config
const url = "mongodb://localhost:27017/petsdb";
mongoose_1.default.connect(url, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
}, (err) => {
    if (err)
        throw err;
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
