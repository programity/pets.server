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
        // create directory
        const path = this.createFolderUser(userId);
        // name file
        const fileName = this.generateNameUnique(file.name);
        console.log(file.name);
        console.log(fileName);
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
}
exports.default = FileSystem;
