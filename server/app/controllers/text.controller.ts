import { db } from "../models/index.js"
import { Request, Response } from 'express';

export const getTitles = async (req: Request, res: Response) => {

    try {
        const results = await db.Text.findAll()
        if (!results) {
            res.status(404).send({ message: "No titles where found" })
        }
        const titles = results.map(result => result.title);

        res.status(200).send(titles);
    } catch (err) {
        res.status(500).send({
            message: err.message || `Could not connect to the database.`
        })
    }

};

export const getText = async (req: Request, res: Response) => {

    const title = req.params.title;

    try {
        const result = await db.Text.findByPk(title);
        if (!result) {
            res.status(404).send({ message: 'No text found for the given title' });
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Could not connect to the database.',
        });
    }
};