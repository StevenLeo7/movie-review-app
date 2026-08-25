require('dotenv').config();
const express = require('express');
const cors = require('cors');

const header = require('./middleware/header');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const scoreRoutes = require('./routes/scores');

const app = express();
app.use(cors());
app.use(express.json());
app.use(header);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/scores', scoreRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => 
    console.log(`Backend running on port ${PORT}`)
);