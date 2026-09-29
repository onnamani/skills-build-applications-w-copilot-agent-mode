import express from 'express';
import mongoose from 'mongoose';
import './config/database.js';
import apiRouter from './routes/index.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  const connected = mongoose.connection.readyState === 1;

  response.status(connected ? 200 : 503).json({
    api: 'ok',
    database: connected ? 'connected' : 'disconnected',
    baseUrl: apiBaseUrl,
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`);
});

///step 3 done