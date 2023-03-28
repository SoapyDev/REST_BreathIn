import { db } from "../models/index.js"

export const create = async (req, res) => {
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

// Retrieve all Users from the database.
export const findAll = async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.send(users);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving users.',
        });
    }
};

// Find a single User with an id
export const findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await db.User.findByPk(id);

        if (!user) {
            res.status(404).send({
                message: `User with id=${id} was not found.`,
            });
            return;
        }

        res.send(user);
    } catch (err) {
        res.status(500).send({
            message: err.message || `Error retrieving User with id=${id}.`,
        });
    }
};

// Update a User by the id in

// Update a User by the id in the request
export const update = async (req, res) => {
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

// Delete a User with the specified id in the request
export const deleteOne = async (req, res) => {
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

