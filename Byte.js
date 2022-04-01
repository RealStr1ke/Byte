const Client = require('./src/structs/Byte');
const Byte = new Client();

Byte.init();
Byte.start();

process.on('rejectionHandled', (err) => console.log(err));
process.on('unhandledRejection', (err) => console.log(err));
process.on('uncaughtException', (err) => console.log(err));

// process.on('rejectionHandled', (err) => Byte.logger.fail(err.message));
// process.on('unhandledRejection', (err) => Byte.logger.fail(err.message));
// process.on('uncaughtException', (err) => Byte.logger.fail(err.message));