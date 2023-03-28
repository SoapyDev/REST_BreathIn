import { db } from "../models/index.js"
import { Request, Response } from 'express';

export const createConfiguration = async (req: Request, res: Response) => {
    try {

        // Validate request
        if (!req.body.name || !req.body.inhale || !req.body.exhale || !req.body.inhold || !req.body.exhold || !req.body.cycles || !req.body.currentColor) {
            res.status(404).send({
                message: 'Missing some configurations information',
            });
            return;
        }

        // Save configuration in the database
        const createdConfig = await db.Config.create(req.body);
        res.send(createdConfig);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Configuration.',
        });
    }
};

export const updateConfiguration = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const [num] = await db.Config.update(req.body, {
            where: { id },
        });

        if (num === 1) {
            res.send({
                message: 'Config was updated successfully.',
            });
        } else {
            res.status(404).send({
                message: `Cannot update configuration with id=${id}. Maybe Configuration was not found or req.body is empty!`,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || `Error updating configuration with id=${id}.`,
        });
    }
};

export const deleteConfiguration = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const num = await db.Config.destroy({
            where: { id },
        });

        if (num === 1) {
            res.send({
                message: 'Configuration was deleted successfully!',
            });
        } else {
            res.status(404).send({
                message: `Cannot delete Configuration with id=${id}. Maybe Configuration was not found!`,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || `Could not delete Configuration with id=${id}.`,
        });
    }
};

export const getConfiguration = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;

        if (!id) {
            res.status(404).send({
                message: "No id where given"
            })
            return;
        }

        const configuration = db.Config.findByPk(id);

        if (!configuration) {
            res.status(404).send({
                message: `No configuration has this id=${id}`
            })
            return;
        }

        res.status(400).send(configuration)
    } catch (err) {
        res.status(500).send({
            message: err.message || `No configuration has this id`
        })
    }
};

export const getConfigurations = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const configurations = await db.Config.findAll({
            where: {
                user_id: userId
            }
        })

        if (!configurations) {
            res.status(404).send({
                message: "No configurations was found for the current user"
            })
            return;
        }
        res.status(400).send(configurations);

    } catch (err) {
        res.status(500).send({
            message: err.message || `No configurations couldn't be found with the current user`
        })
    }
};