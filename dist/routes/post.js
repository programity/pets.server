"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_system_1 = __importDefault(require("../class/file-system"));
const authentication_1 = require("../middlewares/authentication");
const post_models_1 = require("../models/post.models");
const postRoutes = (0, express_1.Router)();
const fileSystem = new file_system_1.default();
// getPaginationPost
postRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const posts = yield post_models_1.Post.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('user', '-password')
        .exec();
    res.json({
        ok: true,
        pagina,
        posts
    });
}));
// Create POST
postRoutes.post('/', [authentication_1.verifyToken], (req, res) => {
    const body = req.body;
    body.user = req.user._id;
    const imagenes = fileSystem.imagesTempForPost(req.user._id);
    body.imgs = imagenes;
    console.log(imagenes);
    post_models_1.Post.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield (yield postDB.populate('user', '-password'));
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
// Servicios for Upload file
postRoutes.post('/upload', [authentication_1.verifyToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo'
        });
    }
    const file = req.files.image;
    if (!file) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo - image'
        });
    }
    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subio no es una imagen'
        });
    }
    yield fileSystem.saveImageTemp(file, req.user._id);
    res.json({
        ok: true,
        file: file.mimetype
    });
}));
postRoutes.get('/imagen/:userid/:img', (req, res) => {
    const userId = req.params.userid;
    const img = req.params.img;
    // res.json({
    //     userId, img
    // });
    const pathPhoto = fileSystem.getPhotoUrl(userId, img);
    res.sendFile(pathPhoto);
});
exports.default = postRoutes;
