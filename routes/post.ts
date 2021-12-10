import { Router, Response } from 'express';
import FileSystem from '../class/file-system';
import { FileUpload } from '../interfaces/file-upload';
import { verifyToken } from '../middlewares/authentication';
import { Post } from '../models/post.models';

const postRoutes = Router();
const fileSystem = new FileSystem();

// getPaginationPost
postRoutes.get('/', async (req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
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

    // const imagenes = fileSystem.imagesTempForPost( req.usuario._id );
    // body.imgs = imagenes;



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


// Servicios for Upload file

postRoutes.post('/upload', [verifyToken], async (req: any, res: Response) => {


    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo'
        });
    }

    const file: FileUpload = req.files.image;

    if (!file) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo - image'
        });
    }

    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subio no es una imagen'
        });
    }

    await fileSystem.saveImageTemp(file, req.user._id);

    res.json({
        ok: true,
        file: file.mimetype
    });
});


// postRoutes.get('/imagen/:userid/:img', (req: any, res: Response) => {

//     const userId = req.params.userid;
//     const img    = req.params.img;

//     const pathFoto = fileSystem.getFotoUrl( userId, img );

//     res.sendFile( pathFoto );

// });


export default postRoutes;