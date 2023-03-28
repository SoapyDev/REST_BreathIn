import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './app/models/index.js';
import dotenv from "dotenv"

dotenv.config();



const app = express();

const corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req: Request, res: Response) => {
    try {
        const users = await db.User.findAll();
        res.json(users);
        console.log("success");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on : ${PORT}`);
})