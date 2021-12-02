import { gray, bold, blueBright, greenBright, yellowBright, red, magenta } from "chalk";

export const getTime = (): string => {
    const time = new Date();
    const outputTime = (time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
    return outputTime;
}

export const info = (text: string): void => {
	return console.log(`${gray(getTime())} ${bold(blueBright('INFO '))}${text}`);
}

export const debug = (text: string): void => {
    return console.log(`${gray(getTime())} ${bold(greenBright('DEBUG '))}${text}`);
}

export const warn = (text: string): void => {
    return console.log(`${gray(getTime())} ${bold(yellowBright('WARNING '))}${text}`);
}

export const error = (text: string): void => {
    return console.log(`${gray(getTime())} ${bold(red('ERROR '))}${text}`);
}

export const verbose = (text: string): void => {
    return console.log(`${gray(getTime())} ${bold(magenta('VERBOSE '))}${text}`);
}

export const custom = (text: string, prefix: string) : void => {
    return console.log(`${gray(getTime())} ${bold(prefix) + " "}${text}`);
}