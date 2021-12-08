

import { Router, Response } from 'express';
import { verifyToken } from '../middlewares/authentication';
import { Post } from '../models/post.models';

const postRoutes = Router();


postRoutes.post('/', [verifyToken], (req: any, res: Response) => {

    const body = req.body;
    body.user = req.user._id

    Post.create(body).then(async (postDB) => {

        await (await postDB.populate('user', '-password'));

        res.json({
            ok: true,
            post: postDB
        });
    }).catch(err => {
        res.json(err)
    });
});



export default postRoutes;