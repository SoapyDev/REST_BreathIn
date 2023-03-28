var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import router from "./app/routes/userRoutes.js";
import textRouter from "./app/routes/textRoutes.js";
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
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.sequelize.authenticate();
        res.status(400).send({
            message: "Connected successfully"
        });
    }
    catch (err) {
        res.status(500).send({ message: `Could not connect to the database : ${err.message}` });
    }
}));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on : ${PORT}`);
});
