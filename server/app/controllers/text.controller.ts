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

    const title = req.body.title;

    try {
        if (!title) {
            res.status(400).send({
                message: "Need a selected title"
            })
            return;
        }

        const text = db.Text.findOne({
            where: {
                title: title
            }
        })

        if (!text) {
            res.status(404).send({
                message: `No text with this title was found`,
            });
            return;
        }

        res.status(400).send(text)
    } catch (err) {
        res.status(500).send({
            message: err.message || `Could not find a text with the title ${title}`
        })
    }
};