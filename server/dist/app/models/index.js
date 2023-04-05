import { DataTypes, Sequelize } from 'sequelize';
import { config } from "../config/db.config.js";
import User from "./users.model.js";
import Text from "./texts.models.js";
import Config from './config.models.js';
import Connection from './connectionModels.js';
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: "",
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'Users',
    sequelize: sequelize,
});
Text.init({
    title: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lang: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'Texts',
    sequelize: sequelize
});
Config.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    inhale: {
        type: DataTypes.FLOAT(4, 2),
        allowNull: false
    },
    exhale: {
        type: DataTypes.FLOAT(4, 2),
        allowNull: false
    },
    inhold: {
        type: DataTypes.FLOAT(4, 2),
        allowNull: false
    },
    exhold: {
        type: DataTypes.FLOAT(4, 2),
        allowNull: false
    },
    cycles: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sound: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    currentColor: {
        type: DataTypes.STRING(7),
        allowNull: false,
    },
    color1: {
        type: DataTypes.STRING(7),
        allowNull: true,
    },
    color2: {
        type: DataTypes.STRING(7),
        allowNull: true,
    },
    color3: {
        type: DataTypes.STRING(7),
        allowNull: true,
    },
    theme: {
        type: DataTypes.ENUM('dark', 'light'),
        allowNull: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    shared: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    current: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'Configurations',
    sequelize: sequelize
});
Connection.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dateToDisconnect: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'Connections',
    sequelize: sequelize
});
const db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    User,
    Text,
    Config,
    Connection
};
export { sequelize, db };
