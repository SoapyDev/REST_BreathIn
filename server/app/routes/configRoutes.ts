import express from 'express';
import { createConfiguration, updateConfiguration, deleteConfiguration, getConfigurations, getActualConfig } from "../controllers/configuration.controller.js";

const configRouter = express.Router();

configRouter.post('/profile', createConfiguration);
configRouter.put('/profile/:id', updateConfiguration);
configRouter.delete('/profile/:id', deleteConfiguration);
configRouter.post('/profile', getConfigurations)
configRouter.post('/configuration', getActualConfig);

export default configRouter;
