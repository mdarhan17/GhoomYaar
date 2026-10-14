import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';

const app = createApp();
describe('public API', () => {
  it('responds with health status', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
  it('includes all 28 states and 8 union territories', async () => {
    const res = await request(app).get('/api/v1/states');
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(36);
    expect(res.body.data.filter((item: {kind: string}) => item.kind === 'state')).toHaveLength(28);
    expect(res.body.data.filter((item: {kind: string}) => item.kind === 'union-territory')).toHaveLength(8);
  });
  it('filters states by region', async () => {
    const res = await request(app).get('/api/v1/states').query({ region: 'South India' });
    expect(res.status).toBe(200);
    expect(res.body.data.every((item: {region: string}) => item.region === 'South India')).toBe(true);
  });
  it('blocks browser mutation from an untrusted origin', async () => {
    const res = await request(app).post('/api/v1/auth/logout').set('Origin', 'https://untrusted.example');
    expect(res.status).toBe(403);
  });
  it('returns a structured 404', async () => {
    const res = await request(app).get('/api/v1/unknown-route');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Endpoint not found');
  });
});