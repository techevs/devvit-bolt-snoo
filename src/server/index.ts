import express from 'express';
import { createServer, getServerPort } from '@devvit/server';

const app = express();

app.use(express.json());

const router = express.Router();

router.get('/api/hello', async (_req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Get total clicks from Redis
router.get('/api/total-clicks', async (req, res) => {
  try {
    // Access Redis through the request context
    const redis = req.context?.redis;
    if (!redis) {
      console.log('Redis not available in context');
      return res.json({ totalClicks: 0 });
    }
    
    const totalClicks = await redis.get('total_clicks');
    const count = totalClicks ? parseInt(totalClicks) : 0;
    console.log('Retrieved total clicks from Redis:', count);
    res.json({ totalClicks: count });
  } catch (error) {
    console.error('Error getting total clicks:', error);
    res.status(500).json({ error: 'Failed to get total clicks' });
  }
});

// Add clicks to Redis
router.post('/api/add-clicks', async (req, res) => {
  try {
    const { clicks } = req.body;
    if (typeof clicks !== 'number' || clicks < 0) {
      return res.status(400).json({ error: 'Invalid clicks value' });
    }
    
    // Access Redis through the request context
    const redis = req.context?.redis;
    if (!redis) {
      console.log('Redis not available in context');
      return res.status(500).json({ error: 'Redis not available' });
    }
    
    const newTotal = await redis.incrby('total_clicks', clicks);
    console.log(`Added ${clicks} clicks to Redis. New total:`, newTotal);
    res.json({ totalClicks: newTotal });
  } catch (error) {
    console.error('Error adding clicks:', error);
    res.status(500).json({ error: 'Failed to add clicks' });
  }
});

app.use(router);

const port = getServerPort();
const server = createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));