"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido!']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es requerido!']
    },
    password: {
        type: String,
        required: [true, 'La contrasena es requerida!']
    }
});
exports.Users = (0, mongoose_1.model)('User', userSchema);
