const ByteClient = require('./lib/structs/Byte')
const Byte = new ByteClient();

Byte.start();

Byte.logger.log('Client started!');

process.on("rejectionHandled", (err) => console.error(err));
process.on("unhandledRejection", (err) => console.error(err));
process.on("uncaughtException", (err) => console.error(err));
