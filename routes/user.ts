import { Router, Request, Response } from "express";
import { Users } from "../models/user.models";
import bcrypt from 'bcrypt';

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

        if ( userDB.comparePassword(body.password)) {
            res.json({
                ok: true,
                token: 'AJHHJAGDHJAGJHDAGHFFHGGHH'
            })
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
            res.json({
                ok: true,
                users: userDB
            });
        }).catch(err => {
            res.json({
                ok: false,
                err
            })
        })
});

export default userRoutes;

