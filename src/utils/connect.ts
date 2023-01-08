import mongoose from "mongoose";
import config from "config";

async function connect() {
    const dbUri = config.get<string>('dbUri');
    try{
        mongoose.set('strictQuery', true)
        await mongoose.connect(dbUri);
        console.log('Db Connected successfully...')
    }catch (e){
        console.log(e)
        console.error("There was a problem connecting to Db.");
        process.exit(1)
    }
}

export default connect;