import express from 'express';
import { getTitles, getText } from '../controllers/text.controller.js';

const textRouter = express.Router();

textRouter.post('/information', getTitles)
textRouter.get('/information/:title', getText);

export default textRouter
