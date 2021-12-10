"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    ;
    saveImageTemp(file, userId) {
        return new Promise((resolve, reject) => {
            // create directory
            const path = this.createFolderUser(userId);
            // name file
            const fileName = this.generateNameUnique(file.name);
            // Move file of Temp a folder
            file.mv(`${path}/${fileName}`, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    generateNameUnique(nameOrigin) {
        const nameArr = nameOrigin.split('.');
        const extention = nameArr[nameArr.length - 1];
        const idUnique = (0, uniqid_1.default)();
        return `${idUnique}.${extention}`;
    }
    createFolderUser(userId) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = pathUser + '/temp';
        // console.log(pathUser);
        const exists = fs_1.default.existsSync(pathUser);
        if (!exists) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
    imagesTempForPost(userId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        const pathPost = path_1.default.resolve(__dirname, '../uploads/', userId, 'posts');
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathPost)) {
            fs_1.default.mkdirSync(pathPost);
        }
        const imagesTemp = this.getImagesTemp(userId);
        imagesTemp.forEach(imagen => {
            fs_1.default.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`);
        });
        return imagesTemp;
    }
    getImagesTemp(userId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        return fs_1.default.readdirSync(pathTemp) || [];
    }
    getPhotoUrl(userId, img) {
        // Path POSTs
        const pathPhoto = path_1.default.resolve(__dirname, '../uploads', userId, 'posts', img);
        // Si la imagen existe
        const exist = fs_1.default.existsSync(pathPhoto);
        if (!exist) {
            return path_1.default.resolve(__dirname, '../assets/400x250.jpg');
        }
        return pathPhoto;
    }
}
exports.default = FileSystem;
