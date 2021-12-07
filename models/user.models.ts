


import { Schema, model, Document } from 'mongoose';

const userSchema = new Schema({
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

interface IUser extends Document {
    name: string;
    avatar: string;
    email: string;
    password: string;
}

export const Users = model<IUser>('User', userSchema);