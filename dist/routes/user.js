"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_models_1 = require("../models/user.models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../class/token"));
const authentication_1 = require("../middlewares/authentication");
const userRoutes = (0, express_1.Router)();
// Login
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    user_models_1.Users.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contrasena no son correctos'
            });
        }
        if (userDB.comparePassword(body.password)) {
            const tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                name: userDB.name,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contrasena no son correctos ***'
            });
        }
    });
});
// Create a user
userRoutes.post('/create', (req, res) => {
    const users = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    user_models_1.Users.create(users)
        .then(userDB => {
        const tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            name: userDB.name,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
// Update user
userRoutes.post('/update', authentication_1.verifyToken, (req, res) => {
    const user = {
        name: req.body.name || req.body.name,
        email: req.body.email || req.body.email,
        avatar: req.body.avatar || req.body.avatar
    };
    user_models_1.Users.findByIdAndUpdate(req.user._id, user, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: true,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        const tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            name: userDB.name,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    });
});
userRoutes.get('/', [authentication_1.verifyToken], (req, res) => {
    const user = req.user;
    res.json({
        ok: true,
        user
    });
});
exports.default = userRoutes;
