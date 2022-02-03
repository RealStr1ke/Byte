const Client = require('./src/structs/Byte');
const Byte = new Client();

Byte.init();
Byte.start();

process.on('rejectionHandled', (err) => console.error(err));
process.on('unhandledRejection', (err) => console.error(err));
process.on('uncaughtException', (err) => console.error(err));
