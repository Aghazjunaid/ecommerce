const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Expose app in server.js
const Category = require('../models/Category');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/ecommerce_test');
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('Category API', () => {
    it('should create a new category', async () => {
        const response = await request(app)
            .post('/api/categories')
            .send({ name: 'Women', parentId: null });
        
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Women');
    });

    it('should get categories in tree structure', async () => {
        const response = await request(app).get('/api/categories');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should update a category', async () => {
        const category = await Category.create({ name: 'Men', parentId: null });
        const response = await request(app)
            .put(`/api/categories/${category._id}`)
            .send({ name: 'Men\'s Fashion' });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Men\'s Fashion');
    });

    it('should delete a category', async () => {
        const category = await Category.create({ name: 'Footwear', parentId: null });
        const response = await request(app).delete(`/api/categories/${category._id}`);
        
        expect(response.status).toBe(204);
    });
});