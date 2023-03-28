import express from 'express';
import { createConfiguration, updateConfiguration, deleteConfiguration, getConfigurations, getConfiguration } from "../controllers/configuration.controller.js";

const configRouter = express.Router();

configRouter.post('/profile', createConfiguration);
configRouter.put('/profile/:id', updateConfiguration);
configRouter.delete('/profile/:id', deleteConfiguration);
configRouter.get('/profile', getConfigurations)
configRouter.get('/', getConfiguration);

export default configRouter;
