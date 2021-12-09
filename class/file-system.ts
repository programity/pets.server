import { FileUpload } from "../interfaces/file-upload";

import path from 'path';
import fs from 'fs';


export default class FileSystem {

    constructor() { };

    saveImageTemp(file: FileUpload, userId: string) {


        const path = this.createFolderUser(userId);

    }


    private createFolderUser(userId: string) {

        const pathUser = path.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = pathUser + '/temp';
        console.log(pathUser);

        const exists = fs.existsSync(pathUser);

        if (!exists) {
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }

        return pathUserTemp;

    }

}