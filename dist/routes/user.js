"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_models_1 = require("../models/user.models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRoutes = (0, express_1.Router)();
userRoutes.post('/create', (req, res) => {
    const users = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    user_models_1.Users.create(users)
        .then(userDB => {
        res.json({
            ok: true,
            users: userDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = userRoutes;
