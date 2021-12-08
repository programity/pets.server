

import { Router, Response } from 'express';
import { verifyToken } from '../middlewares/authentication';
import { Post } from '../models/post.models';

const postRoutes = Router();

// getPaginationPost
postRoutes.get('/', async (req: any, res: Response) => {

    let pagina =  Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;


    const posts = await Post.find()
        .sort({ _id: - 1 })
        .skip(skip)
        .limit(10)
        .populate('user', '-password')
        .exec();

    res.json({
        ok: true,
        pagina,
        posts
    });
});


// Create POST
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