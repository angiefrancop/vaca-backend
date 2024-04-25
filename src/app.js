import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mainRouter from './router/async.router.js';

const app = express();
const corsOptions = {
  origin: '*'
};
const PORT = process.env.PORT || 3001;
app.use(cors(corsOptions));
app.use(express.json());
app.use(mainRouter());

app.listen(PORT, () => {
  console.info(`Express server running on port http://localhost:${PORT} 🚀`);
});
