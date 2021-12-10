
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

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

userSchema.method('comparePassword', function (password: string = ''): boolean {

    if (bcrypt.compareSync(password, this.password)) {
        return true;
    } else {
        return false;
    }
});

interface IUser extends Document {
    name: string;
    avatar: string;
    email: string;
    password: string;

    comparePassword(password: string): boolean;
}

export const Users = model<IUser>('Users', userSchema);