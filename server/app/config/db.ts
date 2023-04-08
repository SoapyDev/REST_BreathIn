import { sequelize } from "./db.connection.js";
import { Config } from "../components/configuration/index.js";
import { Sequelize } from 'sequelize';
import { Connection } from "../components/connections/index.js";
import { User } from "../components/users/index.js";
import { Text } from "../components/text/index.js";




const db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    Config,
    Connection,
    User,
    Text
};

export default db;

