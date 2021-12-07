"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_models_1 = require("../models/user.models");
const userRoutes = (0, express_1.Router)();
userRoutes.post('/create', (req, res) => {
    const users = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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
