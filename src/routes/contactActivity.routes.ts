import express, { Router } from 'express';
import { validateCreateContactActivity } from '../middlewares/contactActivity.middleware';
import { createContactActivity } from '../controllers/contactActivity.controller';

const router: Router = express.Router();

router.post('/', validateCreateContactActivity, createContactActivity);

export default router;
