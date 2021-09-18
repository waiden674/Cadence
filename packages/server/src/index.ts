import express from 'express';
import cors from 'cors';
import routes from './routes';
import { User } from '@prisma/client';

const app = express();

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);
app.use(express.json());

app.use('/', routes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
