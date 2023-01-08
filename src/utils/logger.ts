import pino from 'pino';
import dayjs from "dayjs";


/**
 * print nicely formatted message on terminal.
 */
const logger = pino({
    transport: {
        target: 'pino-pretty',
        options:{
            colorize: true,
            pid: false,
            destination: 2
        }
    },
});


export default logger;