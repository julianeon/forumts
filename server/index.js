const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'postbase',
    password: 'admin1000',
    port: 5432,
});

const app = express();
app.use(cors());
app.use(express.json());

// Define your API endpoints here

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
