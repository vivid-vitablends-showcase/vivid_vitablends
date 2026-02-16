import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import config from './config/index.js';
import logger from './utils/logger.js';
import { requestLogger } from './middleware/requestLogger.js';
import healthRoutes from './routes/health.js';

dotenv.config();

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(requestLogger);

app.use('/api', healthRoutes);
app.use('/', healthRoutes);

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
});
