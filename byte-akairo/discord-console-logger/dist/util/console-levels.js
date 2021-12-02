"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
exports.getTime = () => {
    const time = new Date();
    const outputTime = (time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
    return outputTime;
};
exports.info = (text) => {
    return console.log(`${chalk_1.gray(exports.getTime())} ${chalk_1.bold(chalk_1.blueBright('INFO '))}${text}`);
};
exports.debug = (text) => {
    return console.log(`${chalk_1.gray(exports.getTime())} ${chalk_1.bold(chalk_1.greenBright('DEBUG '))}${text}`);
};
exports.warn = (text) => {
    return console.log(`${chalk_1.gray(exports.getTime())} ${chalk_1.bold(chalk_1.yellowBright('WARNING '))}${text}`);
};
exports.error = (text) => {
    return console.log(`${chalk_1.gray(exports.getTime())} ${chalk_1.bold(chalk_1.red('ERROR '))}${text}`);
};
exports.verbose = (text) => {
    return console.log(`${chalk_1.gray(exports.getTime())} ${chalk_1.bold(chalk_1.magenta('VERBOSE '))}${text}`);
};
exports.custom = (text, prefix) => {
    return console.log(`${chalk_1.gray(exports.getTime())} ${chalk_1.bold(prefix) + " "}${text}`);
};
