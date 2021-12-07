import { Router, Request, Response } from "express";
import { Users } from "../models/user.models";
import bcrypt from 'bcrypt';
import Token from "../class/token";

const userRoutes = Router();


// Login
userRoutes.post('/login', (req: Request, res: Response) => {

    const body = req.body;

    Users.findOne({ email: body.email }, (err: any, userDB: any) => {
        if (err) throw err;

        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contrasena no son correctos'
            });
        }

        if (userDB.comparePassword(body.password)) {

            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                name: userDB.name,
                email: userDB.email,
                avatar: userDB.avatar
            });

            res.json({
                ok: true,
                token: tokenUser
            });

        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contrasena no son correctos ***'
            });
        }
    });

});

// Create a user
userRoutes.post('/create', (req: Request, res: Response) => {

    const users = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };

    Users.create(users)
        .then(userDB => {

            const tokenUser = Token.getJwtToken({
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
            })
        })
});

export default userRoutes;

