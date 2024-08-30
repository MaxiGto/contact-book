import express, { Router } from 'express';
import { createContact, getContacts, removeContact, updateContact } from '../controllers/contact.controller';
import {
  validateCreateContact,
  validateDeleteContact,
  validateGetContact,
  validateUpdateContact,
} from '../middlewares/contact.middleware';

const router: Router = express.Router();

router.get('/', validateGetContact, getContacts);

router.post('/', validateCreateContact, createContact);

router.patch('/:id', validateUpdateContact, updateContact);

router.delete('/:id', validateDeleteContact, removeContact);

export default router;
