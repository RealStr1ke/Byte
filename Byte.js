const Client = require('./src/structs/Byte');
const Byte = new Client();

Byte.init();
Byte.start();

process.on('rejectionHandled', (err) => Byte.logger.error(err.message));
process.on('unhandledRejection', (err) => Byte.logger.error(err.message));
process.on('uncaughtException', (err) => Byte.logger.error(err.message));
