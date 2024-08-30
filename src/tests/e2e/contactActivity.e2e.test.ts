import request from 'supertest';
import httpStatus from 'http-status';

import app from '../../app';
import { setupTestDB } from '../db/setupTestDB';
import { newContact } from '../mocks/contact.mock';
import { sameTypeContactActivities, newContactActivity } from '../mocks/contactActivity.mock';
import { IPlainContact } from '../../interfaces/contact.interfaces';
import { clearDatabase } from '../../config/db';

setupTestDB();

describe('POST /activities', () => {
  it('should return 200 - Create new contact activity', async () => {
    const createResponse = await request(app).post('/api/v1/contacts').send(newContact);
    const { id, firstName, lastName, dateOfBirth, email }: IPlainContact = createResponse.body;
    newContactActivity.personId = id;
    const { status, body } = await request(app).post('/api/v1/activities').send(newContactActivity);
    const { personId, ...activity } = newContactActivity;

    expect(status).toBe(httpStatus.CREATED);
    expect(body).toMatchObject({
      ...activity,
      id: body.id,
      contact: {
        firstName,
        lastName,
        dateOfBirth,
        email,
      },
    });
  });
});

describe('Get /activities/:personId', () => {
  beforeEach(async () => {
    await clearDatabase();
  });
  it('should return 200 - Fetch contact activities by type', async () => {
    const createResponse = await request(app).post('/api/v1/contacts').send(newContact);
    const { id, firstName, lastName, dateOfBirth, email }: IPlainContact = createResponse.body;
    sameTypeContactActivities[0]!.personId = id;
    sameTypeContactActivities[1]!.personId = id;
    await request(app).post('/api/v1/activities').send(sameTypeContactActivities[0]);
    await request(app).post('/api/v1/activities').send(sameTypeContactActivities[1]);
    const { status, body } = await request(app).get(`/api/v1/activities/${id}`).query({
      type: sameTypeContactActivities[0]?.activityType,
    });

    const activitiesWithoutPersonId = sameTypeContactActivities.map(({ personId, ...rest }) => rest);

    expect(status).toBe(httpStatus.OK);
    expect(body).toMatchObject({
      contactActivities: activitiesWithoutPersonId,
      contact: {
        firstName,
        lastName,
        dateOfBirth,
        email,
      },
    });
  });
});
