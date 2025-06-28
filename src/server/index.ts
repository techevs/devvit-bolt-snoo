import express from 'express';
import { createServer, getServerPort } from '@devvit/server';

const app = express();

app.use(express.json());

const router = express.Router();

router.get('/api/hello', async (_req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.use(router);

const port = getServerPort();
const server = createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));