import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { teamsRouter } from './routes/teams.js';
import { gamesRouter } from './routes/games.js';
import { recsRouter } from './routes/recommendations.js';

const app = express();
const log = pino();

app.use(cors());
app.use(express.json());

app.use('/sports/NFL/teams', teamsRouter);
app.use('/sports/NFL/games', gamesRouter);
app.use('/recommendations', recsRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => log.info(`API running on :${port}`));
