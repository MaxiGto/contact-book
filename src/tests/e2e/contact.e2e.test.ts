import request from 'supertest';
import httpStatus from 'http-status';

import app from '../../app';
import { setupTestDB } from '../db/setupTestDB';
import { newContact, updateContact } from '../mocks/contact.mock';
import { IPlainContact } from '../../interfaces/contact.interfaces';

setupTestDB();

const { firstName, lastName, dateOfBirth, email, phones, addresses } = newContact;

describe('POST /contacts', () => {
  it('should return 200 - Create a new contact', async () => {
    const response = await request(app).post('/api/v1/contacts').send(newContact);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        firstName,
        lastName,
        dateOfBirth,
        email,
        phones,
        addresses,
      }),
    );
  });

  it('should return 400 - Contact email already registered', async () => {
    const response = await request(app)
      .post('/api/v1/contacts')
      .send(newContact)
      .expect(httpStatus.BAD_REQUEST);

    expect(response.body.message).toBe('Contact email already registered');
  });
});

describe('GET /contacts', () => {
  let body: IPlainContact;
  beforeAll(async () => {
    const response = await request(app).post('/api/v1/contacts').send(newContact);
    body = response.body;
  });
  it('should return 200 - Fetch contact by query', async () => {
    const response = await request(app).get('/api/v1/contacts').query({
      email: body.email,
    });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.contacts).toBeDefined();
    expect(response.body.contacts.length).toBe(1);
    expect(response.body.contacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: body.id,
          firstName,
          lastName,
          dateOfBirth,
          email,
          phones,
          addresses,
        }),
      ]),
    );
    expect(response.body.count).toBe(response.body.contacts.length);
  });
});

describe('PATCH /contacts/:id', () => {
  let body: IPlainContact;
  beforeAll(async () => {
    const response = await request(app).post('/api/v1/contacts').send(newContact);
    body = response.body;
  });
  it('should return 200 - Update contact', async () => {
    const response = await request(app).patch(`/api/v1/contacts/${body.id}`).send(updateContact);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: body.id,
        firstName: updateContact.firstName,
        lastName: updateContact.lastName,
        phones: updateContact.phones!,
        addresses: updateContact.addresses!,
      }),
    );
  });
});

describe('DELETE /contacts/:id', () => {
  let body: IPlainContact;
  beforeAll(async () => {
    const response = await request(app).post('/api/v1/contacts').send(newContact);
    body = response.body;
  });
  it('should return 200 - Delete contact', async () => {
    const deleteResponse = await request(app).delete(`/api/v1/contacts/${body.id}`);
    const getResponse = await request(app).get('/api/v1/contacts').query({
      id: body.id,
    });

    expect(deleteResponse.status).toBe(httpStatus.OK);
    expect(getResponse.body.contacts.length).toBe(0);
  });

  it('should return 404 - Contact not found', async () => {
    const response = await request(app).delete('/api/v1/contacts/99999');
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body.message).toBe('Contact does not exist');
  });
});
