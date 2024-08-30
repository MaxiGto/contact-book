import express, { Router } from 'express';
import {
  validateCreateContactActivity,
  validateGetContactActivities,
} from '../middlewares/contactActivity.middleware';
import { createContactActivity, getContactActivity } from '../controllers/contactActivity.controller';

const router: Router = express.Router();

router.get('/:personId', validateGetContactActivities, getContactActivity);

router.post('/', validateCreateContactActivity, createContactActivity);

export default router;
