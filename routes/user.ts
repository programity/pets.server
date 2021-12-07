import { Router, Request, Response } from "express";
import { Users } from "../models/user.models";
import bcrypt from 'bcrypt';

const userRoutes = Router();

userRoutes.post('/create', (req: Request, res: Response) => {

    const users = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar : req.body.avatar
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

