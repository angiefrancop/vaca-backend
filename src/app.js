import express from 'express';
import cors from 'cors';
import routerGroups from './router/groups.router.js';

const app = express();
const corsOptions = {
  origin: '*'
};
const PORT = process.env.PORT || 3001;
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/groups', routerGroups);

app.listen(PORT, () => {
  console.info(`Express server running on port http://localhost:${PORT} 🚀`);
});
