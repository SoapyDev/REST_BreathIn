import express, { Request, Response, text } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv"
import router from "./app/routes/userRoutes.js"
import textRouter from "./app/routes/textRoutes.js"
import configRouter from './app/routes/configRoutes.js';
import { db } from './app/models/index.js';

dotenv.config();



const app = express();

const corsOptions = {
    origin: 'http://localhost:8081'
};



app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use(textRouter);

app.use(configRouter);

app.get("/", async (req: Request, res: Response) => {
    try {
        await db.sequelize.authenticate();
        res.status(400).send({
            message: "Connected successfully"
        })

    } catch (err) {
        res.status(500).send({ message: `Could not connect to the database : ${err.message}` });
    }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on : ${PORT}`);
})