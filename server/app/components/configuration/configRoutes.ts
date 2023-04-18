import express from "express";
import {
	createConfiguration,
	updateConfiguration,
	deleteConfiguration,
	getConfigurations,
	getActualConfig,
} from "./configuration.controller.js";

const configRouter = express.Router();

configRouter.post("/profile", createConfiguration);
configRouter.put("/profile/save/:id", updateConfiguration);
configRouter.delete("/profile/configuration/:id", deleteConfiguration);
configRouter.post("/profile/configurations", getConfigurations);
configRouter.post("/configuration", getActualConfig);

export default configRouter;
