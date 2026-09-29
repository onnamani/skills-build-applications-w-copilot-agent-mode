import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';
import { createResourceRouter } from './resourceRouter.js';

const router = Router();

router.use('/users', createResourceRouter(User));
router.use('/teams', createResourceRouter(Team));
router.use('/activities', createResourceRouter(Activity));
router.use('/leaderboard', createResourceRouter(Leaderboard, { points: -1 }));
router.use('/workouts', createResourceRouter(Workout));

export default router;