"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const dayjs_1 = __importDefault(require("dayjs"));
function getTime() { return dayjs_1.default().format('HH:mm:ss'); }
;
function info(text) {
    return console.log(`${chalk_1.gray(getTime())} ${chalk_1.bold(chalk_1.blueBright('INFO '))}${text}`);
}
exports.info = info;
;
function debug(text) {
    return console.log(`${chalk_1.gray(getTime())} ${chalk_1.bold(chalk_1.greenBright('DEBUG '))}${text}`);
}
exports.debug = debug;
;
function warn(text) {
    return console.log(`${chalk_1.gray(getTime())} ${chalk_1.bold(chalk_1.yellowBright('WARNING '))}${text}`);
}
exports.warn = warn;
;
function error(text) {
    return console.log(`${chalk_1.gray(getTime())} ${chalk_1.bold(chalk_1.red('ERROR '))}${text}`);
}
exports.error = error;
;
function verbose(text) {
    return console.log(`${chalk_1.gray(getTime())} ${chalk_1.bold(chalk_1.magenta('VERBOSE '))}${text}`);
}
exports.verbose = verbose;
