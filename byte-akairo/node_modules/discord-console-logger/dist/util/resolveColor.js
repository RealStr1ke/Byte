"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
exports.resolveColor = (color) => {
    if (typeof color === 'string') {
        if (color === 'RANDOM')
            return Math.floor(Math.random() * (0xffffff + 1));
        if (color === 'DEFAULT')
            return 0;
        // @ts-ignore
        color = chalk_1.default[color] || parseInt(color.replace('#', ''), 16);
    }
    else if (Array.isArray(color)) {
        color = (color[0] << 16) + (color[1] << 8) + color[2];
    }
    if (color < 0 || color > 0xffffff)
        throw new RangeError('COLOR_RANGE');
    else if (color && isNaN(color))
        throw new TypeError('COLOR_CONVERT');
    return color;
};
