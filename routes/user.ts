import { Router, Request, Response } from "express";
import { Users } from "../models/user.models";


const userRoutes = Router();

userRoutes.post('/create', (req: Request, res: Response) => {

    const users = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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

