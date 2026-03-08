import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all cities
router.get('/', async (req, res) => {
    const { id } = req.query;
    try {
        if (id) {
            const [rows] = await pool.execute('SELECT * FROM cities WHERE id = ?', [id]);
            if (rows.length === 0) return res.status(404).json({ success: false, error: 'City not found' });
            res.json({ success: true, data: rows[0] });
        } else {
            const [rows] = await pool.execute('SELECT * FROM cities ORDER BY id ASC');
            res.json({ success: true, data: rows });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

export default router;
