// index.js
import 'dotenv/config';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

app.get('/', (c) => {
  return c.html('<h1>Tim Pengembang</h1><h2>Ibrahim</h2>');
});

// Jalankan Server
const port = 5000;
console.log(`Server is running on http://localhost:${port}`);
serve({ fetch: app.fetch, port });
