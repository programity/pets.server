import { Response, Request, NextFunction } from 'express';
import Token from '../class/token';


export const verifyToken = (req: any, res: Response, next: NextFunction) => {

    const userToken = req.get('x-token') || '';

    Token.checkToken(userToken)
        .then((decoded: any) => {
            console.log('Decoded', decoded);
            req.user = decoded.user;
            next();
        })
        .catch(err => {
            res.json({
                ok: false,
                mensaje: 'Token no es correcto'
            });
        });
}