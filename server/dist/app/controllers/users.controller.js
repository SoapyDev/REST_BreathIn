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
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const [_instance, created] = yield db.User.findOrCreate({
            where: { email: user.email },
            defaults: user
        });
        res.status(200).send(created);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the User.',
        });
    }
});
export const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const [num] = yield db.User.update(req.body, {
            where: { id },
        });
        if (num === 1) {
            res.status(200).send({
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
export const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const _numConnection = yield db.Connection.destroy({
            where: { user_id: id }
        });
        const _numConfig = yield db.Config.destroy({
            where: { user_id: id },
        });
        const numUser = yield db.User.destroy({
            where: { id },
        });
        if (numUser === 1) {
            res.status(200).send({
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
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).send({
                message: "Need an email and a password to login"
            });
            return;
        }
        const user = yield db.User.findOne({
            where: {
                email: email
            }
        });
        if (!user || password != user.password.toString()) {
            res.status(401).send({
                message: `User with email ${email} and the given password was not found.`,
            });
            return;
        }
        const [instance, _created] = yield db.Connection.findOrCreate({
            where: {
                user_id: user.id,
            }
        });
        res.status(201).send({ id: instance.id });
    }
    catch (err) {
        res.status(500).send({
            message: err.message || `Could not find user with email=${email} and password=${password}`
        });
    }
});
export const isLoggedIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    try {
        if (!token) {
            res.status(400).send({
                message: "Need a token to validate the login state."
            });
            return;
        }
        const connection = yield db.Connection.findOne({
            where: {
                id: token
            }
        });
        if (!connection) {
            res.status(401).send(false);
            return;
        }
        res.status(201).send(true);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || `Could not find connection with given token.`
        });
    }
});
export const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.params.token;
    try {
        if (!token) {
            res.status(400).send({
                message: "Need a token to disconnect."
            });
            return;
        }
        yield db.Connection.destroy({
            where: {
                id: token
            }
        });
        res.status(200).send({ message: "The user is disconnected" });
    }
    catch (err) {
        res.status(500).send({
            message: err.message || `Could not find connection with given token.`
        });
    }
});
