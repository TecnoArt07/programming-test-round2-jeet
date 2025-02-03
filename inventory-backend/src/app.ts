import express from 'express';
import cors from 'cors';
import inventoryRoutes from './routes/inventory.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/inventory', inventoryRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
