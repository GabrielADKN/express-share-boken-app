const request = require("supertest");
const express = require("express");
const axios = require('axios');
const app = express();
const uRoutes = require('./users');

jest.mock('axios');

app.use(express.json());
app.use('/', uRoutes);


describe('POST /', () => {
    test('responds with json containing a list of user data', async () => {
        const mockUsers = [
            { name: 'John Doe', bio: 'Developer' },
            { name: 'Jane Doe', bio: 'Developer too' }
        ];

        axios.get.mockResolvedValueOnce({ data: { name: 'John Doe', bio: 'Developer' } });
        axios.get.mockResolvedValueOnce({ data: { name: 'Jane Doe', bio: 'Developer too' } });

        const response = await request(app)
            .post('/')
            .send({ developers: ['johndoe', 'janedoe'] })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.users).toEqual(mockUsers);
        expect(axios.get).toHaveBeenCalledTimes(2);
    });

    test('returns an error for invalid input', async () => {
        const response = await request(app)
            .post('/')
            .send({ developers: [] })
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toEqual({
            error: expect.any(Object),
            message: 'Invalid input: developers must be an array',
        });
    });
});
