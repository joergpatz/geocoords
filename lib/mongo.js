import mongojs from 'mongojs';

const host = process.env.MONGO_HOST || 'localhost';
const db = mongojs(host + '/geo', ['states', 'airports']);

db.on('error', err => {
    console.error('database error:', err);
});

db.on('connect', () => {
    console.log('database connected.');
});

export default db;
