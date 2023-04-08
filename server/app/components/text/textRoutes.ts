import express from 'express';
import getTitles from './text.controller.js';

const textRouter = express.Router();

textRouter.post('/information', getTitles)

export default textRouter
