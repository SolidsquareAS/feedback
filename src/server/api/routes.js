import express from 'express';
import { router as commentRouter } from './comment';

const router = express.Router();

router.use('/comments', commentRouter);

export default router;
