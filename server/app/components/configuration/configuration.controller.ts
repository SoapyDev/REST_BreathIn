import db from "../../config/db.js";
import { Request, Response } from "express";
import { Connection } from "../connections";
import { User } from "../users";

const createConfiguration = async (req: Request, res: Response) => {
  const token = req.body.token;
  const config = req.body.config;
  try {
    const user_id = await findUserId(token);
    if (!user_id) {
      res.status(404).send({
        message: "No user use this connection.",
      });
      return;
    }
    // Validate request
    if (!config) {
      res.status(404).send({
        message: "Missing some configurations information",
      });
      return;
    }

    // Save configuration in the database
    const createdConfig = await db.Config.create({
      id: null,
      user_id: user_id,
      name: config.name,
      inhale: config.inhale,
      exhale: config.exhale,
      holdIn: config.holdIn,
      holdOut: config.holdOut,
      cycles: config.cycles,
      sound: config.sound,
      currentColor: config.currentColor,
      theme: config.theme,
      current: true,
    });

    const newConfig = await db.Config.findOne({
      where: {
        user_id: createdConfig.user_id,
        createdAt: createdConfig.createdAt,
      },
    });
    res.status(200).send({ config: newConfig });
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while creating the Configuration.",
    });
  }
};

const updateConfiguration = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  try {
    const [num] = await db.Config.update(req.body.config, {
      where: { id: id },
    });
    console.log(num);

    if (num === 1) {
      res.status(200).send({
        message: "Config was updated successfully.",
      });
    } else {
      res.status(404).send({
        message: `Cannot update configuration with id=${id}. Maybe Configuration was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Error updating configuration with id=${id}.`,
    });
  }
};

const deleteConfiguration = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const num = await db.Config.destroy({
      where: { id },
    });

    if (num === 1) {
      res.status(200).send({
        message: "Configuration was deleted successfully!",
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Configuration with id=${id}. Maybe Configuration was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Could not delete Configuration with id=${id}.`,
    });
  }
};

const getActualConfig = async (req: Request, res: Response) => {
  const token = req.body.token;
  try {
    const id = await findUserId(token);

    if (id === -1) {
      res.status(404).send({
        message: "User not found",
      });
    }

    const configuration = await db.Config.findOne({
      where: {
        user_id: id,
        current: true,
      },
    });

    if (!configuration) {
      res.status(404).send({
        message: "No configuration was found",
      });
      return;
    }
    res.status(200).send(configuration);
  } catch (err) {
    res.status(500).send({
      message: "No configuration was found",
    });
  }
};

const getConfigurations = async (req: Request, res: Response) => {
  const token = req.body.token;
  try {
    const id = await findUserId(token);

    if (id === -1) {
      res.status(404).send({
        message: "User not found",
      });
    }

    const configurations = await db.Config.findAll({
      where: {
        user_id: id,
      },
    });

    if (!configurations) {
      res.status(404).send({
        message: "No configurations was found for this user",
      });
      return;
    }

    res.status(200).send({ config: configurations });
  } catch (err) {
    res.status(500).send({
      message: `No configurations couldn't be found with the current user`,
    });
  }
};

const findUserId = async (token: string) => {
  const connection = await db.Connection.findByPk(token);

  if (!connection) {
    return null;
  }
  return connection.user_id;
};

export {
  getConfigurations,
  getActualConfig,
  deleteConfiguration,
  updateConfiguration,
  createConfiguration,
};
