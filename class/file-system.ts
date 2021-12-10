import { FileUpload } from "../interfaces/file-upload";

import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {

    constructor() { };

    saveImageTemp(file: FileUpload, userId: string) {

        // create directory
        const path = this.createFolderUser(userId);

        // name file
        const fileName = this.generateNameUnique(file.name);
        console.log(file.name);
        console.log(fileName);


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

}