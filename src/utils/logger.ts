import pino from 'pino';
import dayjs from "dayjs";


/**
 * print nicely formatted message on terminal.
 */
const logger = pino({
    transport: {
        target: 'pino-pretty',
        options:{
            destination: 2
        }
    },
});


export default logger;