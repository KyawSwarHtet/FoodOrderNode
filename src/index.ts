import express from 'express';
import App from './services/ExpressApp'
import {config} from "dotenv" 
import dbConnection from './services/Database'



const StartServer = async () => {
    const app = express();
    config()
    await dbConnection()

    await App(app);

    const PORT = process.env.PORT || 5000

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
}

StartServer();