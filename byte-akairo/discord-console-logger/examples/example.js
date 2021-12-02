const { DiscordConsoleLogger } = require("../dist/index");
/**
 * Create New Discord Console Logger
 */
const logger = new DiscordConsoleLogger({
    console: true,
    hookURL: process.env.EXAMPLE_URL,
    footer: "Test"
});
/**
 * Custom Log
 */
logger.custom({
    message: "Hello World",
}, {
    color: 0x3498db,
    prefix: 'CUSTOM'
});
/**
 * Info Log
 */
logger.info({
    message: "Hello World"
});
/**
 * Error Log
 */
logger.error({
    message: "Hello Error",
    error: new Error("Test Error")
});