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
            password: req.body.password,
        };

        // Save User in the database
        const createdUser = await db.User.create(user);
        res.send(createdUser);
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
            res.send({
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
        const num = await db.User.destroy({
            where: { id },
        });

        if (num === 1) {
            res.send({
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

export const isValidEmail = async (req: Request, res: Response) => {
    const email = req.body.email;

    try {
        if (!email) {
            res.status(400).send({ message: "Need an email" });
            return;
        }
        const { count } = await db.User.findAndCountAll({
            where: { email: email }
        });
        if (count === 1) {
            res.status(400).send({ message: `The email ${email} exist in the database.` })
        } else if (count > 1) {
            res.status(400).send({
                message: `Multiple email with those characters where found. There is probably an error in the email : ${email}`
            })
        } else {
            res.status(400).send({ message: `There is no such email : ${email}` });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || `Could not find User with an email=${email}`
        })
    }

};

export const login = async (req: Request, res: Response) => {

    const email = req.body.email;
    const password = req.body.email;

    try {
        if (!email || !password) {
            res.status(400).send({
                message: "Need an email and a password to login"
            })
            return;
        }

        const user = db.User.findOne({
            where: {
                email: email,
                password: password
            }
        })

        if (!user) {
            res.status(404).send({
                message: `User with email ${email} and password ${password} was not found.`,
            });
            return;
        }

        res.status(400).send(user)
    } catch (err) {
        res.status(500).send({
            message: err.message || `Could not find user with email=${email} and password=${password}`
        })

    }
};