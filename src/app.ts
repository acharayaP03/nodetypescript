import express from 'express';
import config from 'config';
import connect from "./utils/connect";
const port = config.get<number>('port')

const app = express();

app.listen(port, async () =>{
    await connect()
    console.log(`Server is running on port ${port}`)
})
