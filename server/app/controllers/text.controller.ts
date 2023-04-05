import { db } from "../models/index.js"
import { Request, Response } from 'express';

export const getTitles = async (req: Request, res: Response) => {

    const lang = req.body.lang;
    try {
        const results = await db.Text.findAll({
            where: {
                lang: lang,
            }
        })
        if (!results) {
            res.status(404).send({ message: "No titles where found" })
        }
        res.status(200).send(results);
    } catch (err) {
        res.status(500).send({
            message: err.message || `Could not connect to the database.`
        })
    }

};
