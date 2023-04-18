import  db  from "../../config/db.js"
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import 'dotenv/config'


const createUser = async (req: Request, res: Response) => {
    try {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            res.status(400).send({ message: 'Email, name, and password are required' });
            return;
        }

        const notUnique = await db.User.findOne({
            where: {
                email: email,
            }
        })

        if (notUnique) {
            res.status(201).send({ message: "User already exists" });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

        // Try to create the user in the database
        const created = await db.User.create({
            email: email,
            name: name,
            password: hashedPassword,
        });

        if (created) {
            res.status(201).send(true);
        } else {
            res.status(200).send({ message: 'User already exists' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error creating user' });
    }
};



const updateUser = async (req: Request, res: Response) => {
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
            message: `Error updating User with id=${id}.`,
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
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
            message:  `Could not delete User with id=${id}.`,
        });
    }
};




const login = async (req: Request, res: Response) => {

    const email = req.body.email;
    const password = req.body.password;

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

        if (!user) {
            res.status(401).send({
                message: `User with email ${email} not found.`
            });
            return;
        }


        const isSame = await bcrypt.compare(password, user.password);

        if (!isSame) {
            res.status(401).send({
                message: `User with email ${email} and the given password was not found.`,
            });
            return;
        }

        const isConnected = await db.Connection.findOne({
            where: {
                user_id: user.dataValues.id,
            }
        })

        if (isConnected) {
            res.status(200).send({ id: isConnected.id });
            return;
        }

        const instance = await db.Connection.create({
            user_id: user.dataValues.id,
        })


        if (!instance) {
            res.status(500).send({
                message: `Failed to create connection.`
            });
            return;
        }

        if(instance.id != null){
            res.status(200).send({id: instance.id})
            return;
        }

        const connection = await db.Connection.findOne({
            where:{
                user_id: instance.user_id
            }
        })

        res.status(200).send({ id: connection.id });

    } catch (err) {
        res.status(500).send({
            message:  `Could not find user with email=${email} and password=${password}`
        })

    }
}


const isLoggedIn = async (req: Request, res: Response) => {

    const token = req.body.token;


    try {
        if (!token) {
            res.status(400).send({
                message: "Need a token to login"
            })
            return;
        }

        const connection = await db.Connection.findOne({
            where: {
                id: token
            }
        })

        if (!connection) {
            res.status(401).send({
                message: `You are not connected`
            });
            return;
        }

        res.status(200).send({ id: connection.id })

    } catch (err) {
        res.status(500).send({
            message:  `Could not find any connection using this token.`
        })

    }
}
const logout = async (req: Request, res: Response) => {

    const token = req.params.token;

    try {
        if (!token) {
            res.status(400).send({
                message: "Need a token to disconnect."
            })
            return;
        }

        await db.Connection.destroy({
            where: {
                id: token
            }
        })
        res.status(200).send({ message: "The user is disconnected" });

    } catch (err) {
        res.status(500).send({
            message:  `Could not find connection with given token.`
        })
    }
}

export default {login,isLoggedIn ,logout, createUser, deleteUser, updateUser}