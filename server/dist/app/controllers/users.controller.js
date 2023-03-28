var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db } from "../models/index.js";
export const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const createdUser = yield db.User.create(user);
        res.send(createdUser);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the User.',
        });
    }
});
// Retrieve all Users from the database.
export const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db.User.findAll();
        res.send(users);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving users.',
        });
    }
});
// Find a single User with an id
export const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield db.User.findByPk(id);
        if (!user) {
            res.status(404).send({
                message: `User with id=${id} was not found.`,
            });
            return;
        }
        res.send(user);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || `Error retrieving User with id=${id}.`,
        });
    }
});
// Update a User by the id in
// Update a User by the id in the request
export const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const [num] = yield db.User.update(req.body, {
            where: { id },
        });
        if (num === 1) {
            res.send({
                message: 'User was updated successfully.',
            });
        }
        else {
            res.status(404).send({
                message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err.message || `Error updating User with id=${id}.`,
        });
    }
});
// Delete a User with the specified id in the request
export const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const num = yield db.User.destroy({
            where: { id },
        });
        if (num === 1) {
            res.send({
                message: 'User was deleted successfully!',
            });
        }
        else {
            res.status(404).send({
                message: `Cannot delete User with id=${id}. Maybe User was not found!`,
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err.message || `Could not delete User with id=${id}.`,
        });
    }
});
