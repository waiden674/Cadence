import { Router } from 'express';
import authRouter from './auth';
import hackathonRouter from './hackathon';

const router = Router();

router.get('/', (req, res) => {
  res.send('API running');
});
router.use('/auth', authRouter);
router.use('/hackathons', hackathonRouter);

export default router;
