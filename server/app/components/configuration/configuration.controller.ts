import db  from "../../config/db.js"
import { Request, Response } from 'express';
import { Connection } from "../connections";
import { User } from "../users";

const createConfiguration = async (req: Request, res: Response) => {
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
            message: 'Some error occurred while creating the Configuration.',
        });
    }
};

const updateConfiguration = async (req: Request, res: Response) => {
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
            message: `Error updating configuration with id=${id}.`,
        });
    }
};

const deleteConfiguration = async (req: Request, res: Response) => {
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
            message: `Could not delete Configuration with id=${id}.`,
        });
    }
};

const getActualConfig = async (req: Request, res: Response) => {
    const token = req.body.token;
    try {

        let user_connection: Connection;

        user_connection = await db.Connection.findByPk(token)
        if (!user_connection) {
            res.status(404).send({
                message: `No configuration was found`
            })
            return;
        }

        let user: User;

        user = await db.User.findByPk(user_connection.user_id);

        if (!user) {
            res.status(404).send({
                message: `No configuration was found`
            })
            return;
        }



        const configuration = await db.Config.findOne({
            where: {
                user_id: user.id,
                current: true,
            }
        });

        if (!configuration) {
            res.status(404).send({
                message: `No configuration was found`
            })
            return;
        }
        res.status(200).send(configuration)

    } catch (err) {
        res.status(500).send({
            message: `No configuration was found`
        })
    }
};

const getConfigurations = async (req: Request, res: Response) => {

    const userId = req.body.userId;
    try {
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
            message: `No configurations couldn't be found with the current user`
        })
    }
};


export {
    getConfigurations,
    getActualConfig,
    deleteConfiguration,
    updateConfiguration,
    createConfiguration
}