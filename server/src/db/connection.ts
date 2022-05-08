import { Client } from 'pg';
require('dotenv').config();

const client = new Client({
  host: '127.0.0.1',
  user: process.env.DB_USER,
  port: 5432,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export default client;
