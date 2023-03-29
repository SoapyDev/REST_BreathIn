import { DataTypes, Dialect, Sequelize } from 'sequelize'
import { config } from "../config/db.config.js"
import User from "./users.model.js";
import Text from "./texts.models.js";
import Config from './config.models.js';

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect as Dialect,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    })


User.init(
    {
        id: {
            type: DataTypes.CHAR(36),
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
    },
    {
        tableName: 'Users',
        sequelize: sequelize,
    },
);

Text.init(
    {
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
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'Texts',
        sequelize: sequelize
    }
)

Config.init(
    {
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
        user_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        shared: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        current: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            allowNull: true,
        },
    },
    {
        tableName: 'Configurations',
        sequelize: sequelize
    }
)

const db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    User,
    Text,
    Config,
};
export { sequelize, db };