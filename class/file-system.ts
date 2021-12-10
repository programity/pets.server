import { FileUpload } from "../interfaces/file-upload";

import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {

    constructor() { };

    saveImageTemp(file: FileUpload, userId: string) {

        return new Promise((resolve: any, reject: any) => {
            // create directory
            const path = this.createFolderUser(userId);

            // name file
            const fileName = this.generateNameUnique(file.name);

            // Move file of Temp a folder
            file.mv(`${path}/${fileName}`, (err: any) => {

                if (err) {
                    reject(err);
                } else {
                    resolve();
                }

            });
        });

    }


    private generateNameUnique(nameOrigin: string) {


        const nameArr = nameOrigin.split('.');
        const extention = nameArr[nameArr.length - 1];

        const idUnique = uniqid();

        return `${idUnique}.${extention}`;

    }


    private createFolderUser(userId: string) {

        const pathUser = path.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = pathUser + '/temp';
        // console.log(pathUser);

        const exists = fs.existsSync(pathUser);

        if (!exists) {
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }

        return pathUserTemp;

    }


    imagesTempForPost(userId: string) {

        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');
        const pathPost = path.resolve(__dirname, '../uploads/', userId, 'posts');

        if (!fs.existsSync(pathTemp)) {
            return [];
        }

        if (!fs.existsSync(pathPost)) {
            fs.mkdirSync(pathPost);
        }

        const imagesTemp = this.getImagesTemp(userId);

        imagesTemp.forEach(imagen => {
            fs.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`)
        });

        return imagesTemp;
    }


    private getImagesTemp(userId: string) {

        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');
        return fs.readdirSync(pathTemp) || [];
    }


    getPhotoUrl(userId: string, img: string) {

        // Path POSTs
        const pathPhoto = path.resolve(__dirname, '../uploads', userId, 'posts', img);


        // Si la imagen existe
        const exist = fs.existsSync(pathPhoto);
        if (!exist) {
            return path.resolve(__dirname, '../assets/400x250.jpg');
        }


        return pathPhoto;

    }


}