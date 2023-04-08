import express from "express";
import configRouter from "./app/components/configuration/configRoutes.js";
import textRouter from "./app/components/text/textRoutes.js";
import userRouter from "./app/components/users/userRoutes.js";
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv"
import rateLimit from 'express-rate-limit'
import helmet from "helmet";


dotenv.config();

const app = express();

const corsOptions = {
    origin: ['http://localhost:5173','http://localhost:4173']
};

const limiter = rateLimit({
	windowMs: 12 * 60 * 60 * 1000, // 12 hours
	max: 100, // Limit each IP to 100 requests per `window` (here, per 12 hours)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})



app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter);

app.use(textRouter);

app.use(configRouter);

app.use(limiter);

app.use(helmet());



export default app;