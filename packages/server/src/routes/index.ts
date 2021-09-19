import { Router } from 'express';
import authRouter from './auth';
import hackathonRouter from './hackathon';
import projectRouter from './project';
import recommendationRouter from './recommendation';

const router = Router();

router.get('/', (req, res) => {
  res.send('API running');
});
router.use('/auth', authRouter);
router.use('/hackathons', hackathonRouter);
router.use('/projects', projectRouter);
router.use('/recommendations', recommendationRouter);

export default router;
