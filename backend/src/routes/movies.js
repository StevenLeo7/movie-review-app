const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');

const router = express.Router();
const OMDB_BASE = 'https://www.omdbapi.com/';

router.get('/search', auth, async (req, res) => {
    const { q, page = 1 } = req.query;

    if (!q) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
        const response = await axios.get(OMDB_BASE, {
            params: { apikey: process.env.OMDB_API_KEY, s: q, page },
        });

        if (response.data.Response === 'False') {
            // No match berati tidak ada film nya bukan error
            return res.json({ results: [], totalResults: 0, noMatches: true });
        }

        res.json({
            results: response.data.Search,
            totalResults: parseInt(response.data.totalResults, 10),
            noMatches: false,
        });
    } catch (err) {
        console.error(err.message);
        res.status(502).json({ error: 'Failed to fetch data from OMDb' });
    }
});

router.get('/:imdbId', auth, async (req, res) => {
    const { imdbId } = req.params;

    try {
        const response = await axios.get(OMDB_BASE, {
            params: { apikey: process.env.OMDB_API_KEY, i: imdbId, plot: 'full' },
        });

        if (response.data.Response === 'False') {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(502).json({ error: 'Failed to fetch movie detail' });
    }
});

module.exports = router;