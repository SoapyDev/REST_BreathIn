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
import * as bcrypt from 'bcrypt';
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
            res.status(400).send({ message: 'Email, name, and password are required' });
            return;
        }
        const notUnique = yield db.User.findOne({
            where: {
                email: email,
            }
        });
        if (notUnique) {
            res.status(201).send({ message: "User already exists" });
        }
        // Hash the password before saving it to the database
        const hashedPassword = yield bcrypt.hash(password, 10);
        // Try to create the user in the database
        const created = yield db.User.create({
            email: email,
            name: name,
            password: hashedPassword,
        });
        if (created) {
            res.status(201).send(true);
        }
        else {
            res.status(200).send({ message: 'User already exists' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error creating user' });
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
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
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
        if (!user) {
            res.status(401).send({
                message: `User with email ${email} not found.`
            });
            return;
        }
        const hash = Buffer.from(user.dataValues.password).toString('utf8');
        const isSame = yield bcrypt.compare(password, hash);
        if (!isSame) {
            res.status(401).send({
                message: `User with email ${email} and the given password was not found.`,
            });
            return;
        }
        const isConnected = yield db.Connection.findOne({
            where: {
                user_id: user.dataValues.id,
            }
        });
        if (isConnected) {
            res.status(200).send({ id: isConnected.id });
            return;
        }
        const instance = yield db.Connection.create({
            user_id: user.dataValues.id,
        });
        if (!instance) {
            res.status(500).send({
                message: `Failed to create connection.`
            });
            return;
        }
        res.status(200).send({ id: instance.id });
    }
    catch (err) {
        res.status(500).send({
            message: err.message || `Could not find user with email=${email} and password=${password}`
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
