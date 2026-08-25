const express = require('express');
const pool = require('../db/pool');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:imdbId', auth, async (req, res) => {
    const { imdbId } = req.params;
    const userId = req.user.id;

    try {
        const result = await pool.query(
            'SELECT score FROM scores WHERE user_id = $1 AND imdb_id = $2',
            [userId, imdbId]
        );

        res.json({ score: result.rows[0]?.score ?? null });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/:imdbId', auth, async (req, res) => {
    const { imdbId } = req.params;
    const { score } = req.body;
    const userId = req.user.id;

    if (!score || score < 1 || score > 10) {
        return res.status(400).json({ error: 'Score must be between 1 and 10' });
    }

    try {
        await pool.query(
            `INSERT INTO scores (user_id, imdb_id, score)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, imdb_id)
            DO UPDATE SET score = $3, updated_at = NOW()`,
            [userId, imdbId, score]
        );
        
        res.json({ success: true, score });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;