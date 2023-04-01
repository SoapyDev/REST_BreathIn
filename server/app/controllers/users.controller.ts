import { db } from "../models/index.js"
import { Request, Response } from 'express';



export const createUser = async (req: Request, res: Response) => {
    try {
        // Validate request
        if (!req.body.email || !req.body.name || !req.body.password) {
            res.status(400).send({
                message: 'Content can not be empty!',
            });
            return;
        }

        // Create a User
        const user = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password

        };

        // Save User in the database
        const [_instance, created] = await db.User.findOrCreate({
            where: { email: user.email },
            defaults: user
        })
        res.status(200).send(created);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the User.',
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const [num] = await db.User.update(req.body, {
            where: { id },
        });

        if (num === 1) {
            res.status(200).send({
                message: 'User was updated successfully.',
            });
        } else {
            res.status(404).send({
                message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || `Error updating User with id=${id}.`,
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const _numConnection = await db.Connection.destroy({
            where: { user_id: id }
        })
        const _numConfig = await db.Config.destroy({
            where: { user_id: id },
        });
        const numUser = await db.User.destroy({
            where: { id },
        });

        if (numUser === 1) {
            res.status(200).send({
                message: 'User was deleted successfully!',
            });
        } else {
            res.status(404).send({
                message: `Cannot delete User with id=${id}. Maybe User was not found!`,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || `Could not delete User with id=${id}.`,
        });
    }
};




export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400).send({
                message: "Need an email and a password to login"
            })
            return;
        }

        const user = await db.User.findOne({
            where: {
                email: email
            }
        })

        if (!user || password != user.password.toString()) {
            res.status(401).send({
                message: `User with email ${email} and the given password was not found.`,
            });
            return;
        }

        const [instance, _created] = await db.Connection.findOrCreate({
            where: {
                user_id: user.id,
            }
        })
        res.status(201).send({ id: instance.id });

    } catch (err) {
        res.status(500).send({
            message: err.message || `Could not find user with email=${email} and password=${password}`
        })

    }
}

export const isLoggedIn = async (req: Request, res: Response) => {

    const token = req.body.token;

    try {
        if (!token) {
            res.status(400).send({
                message: "Need a token to validate the login state."
            })
            return;
        }

        const connection = await db.Connection.findOne({
            where: {
                id: token
            }
        })

        if (!connection) {
            res.status(401).send(false);
            return;
        }
        res.status(201).send(true);

    } catch (err) {
        res.status(500).send({
            message: err.message || `Could not find connection with given token.`
        })
    }
}
export const logout = async (req: Request, res: Response) => {

    const token = req.params.id;

    try {
        if (!token) {
            res.status(400).send({
                message: "Need a token to disconnect."
            })
            return;
        }


        const disconnected = await db.Connection.destroy({
            where: {
                id: token
            }
        })

        if (disconnected >= 1) {
            res.status(200).send({
                message: 'Connection was deleted successfully!',
            });
        } else {
            res.status(404).send({
                message: 'Could not find the connection'
            });
        }

    } catch (err) {
        res.status(500).send({
            message: err.message || `Could not find connection with given token.`
        })
    }
}