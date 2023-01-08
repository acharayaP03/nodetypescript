import mongoose from "mongoose";
import config from "config";
import logger from './logger'

async function connect() {
    const dbUri = config.get<string>('dbUri');
    try{
        mongoose.set('strictQuery', true)
        await mongoose.connect(dbUri);
        logger.info('Db Connected successfully...')
    }catch (e){
        console.log(e)
        logger.error("There was a problem connecting to Db.");
        process.exit(1)
    }
}

export default connect;