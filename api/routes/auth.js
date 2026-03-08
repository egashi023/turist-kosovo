import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret';

// Register
router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ success: false, errors: ['Të gjitha fushat janë të detyrueshme.'] });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, errors: ['Fjalëkalimet nuk përputhen.'] });
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, errors: ['Fjalëkalimi duhet të ketë së paku 6 karaktere.'] });
    }

    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ success: false, errors: ['Ky email është i regjistruar tashmë.'] });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.execute('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        res.status(201).json({ success: true, message: 'Regjistrimi u krye me sukses!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, errors: ['Email dhe fjalëkalimi janë të detyrueshëm.'] });
    }

    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ success: false, errors: ['Email ose fjalëkalimi nuk është i saktë.'] });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ success: false, errors: ['Email ose fjalëkalimi nuk është i saktë.'] });
        }

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

// Get current user (me)
router.get('/me', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Not authenticated' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ success: true, user: decoded });
    } catch (error) {
        res.status(401).json({ success: false, error: 'Invalid token' });
    }
});

export default router;
