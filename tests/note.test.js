const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Note = require('../models/note');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Note API', () => {
  it('should create a new note', async () => {
    const res = await request(app).post('/api/notes').send({ title: 'Test Note', body: 'This is a test note' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should fetch a note by ID', async () => {
    const note = await Note.create({ title: 'Another Test Note', body: 'This is another test note' });
    const res = await request(app).get(`/api/notes/${note._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Another Test Note');
  });

  // Add more test cases as needed
});
