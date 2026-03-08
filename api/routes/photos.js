import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret';

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads/');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'photo-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp|gif/;
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);
        if (extName && mimeType) return cb(null, true);
        cb(new Error('Lloji i skedarit nuk lejohet. Përdorni JPG, PNG, WebP ose GIF.'));
    }
});

// Middleware for JWT auth
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// GET all photos
router.get('/', async (req, res) => {
    const { user } = req.query;
    try {
        let query, params;
        if (user === 'me' && req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            query = `
            SELECT p.*, u.name as user_name 
            FROM user_photos p 
            JOIN users u ON p.user_id = u.id 
            WHERE p.user_id = ? 
            ORDER BY p.created_at DESC
        `;
            params = [decoded.id];
        } else {
            query = `
            SELECT p.*, u.name as user_name 
            FROM user_photos p 
            JOIN users u ON p.user_id = u.id 
            ORDER BY p.created_at DESC
        `;
            params = [];
        }

        const [photos] = await pool.execute(query, params);
        res.json({ success: true, data: photos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// POST upload photo
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
    const { city_name, caption } = req.body;
    const file = req.file;

    if (!city_name || !file) {
        return res.status(400).json({ success: false, errors: ['Zgjidhni qytetin dhe një foto.'] });
    }

    try {
        const imagePath = `uploads/${file.filename}`;
        const [result] = await pool.execute(
            'INSERT INTO user_photos (user_id, city_name, caption, image_path) VALUES (?, ?, ?, ?)',
            [req.user.id, city_name, caption || null, imagePath]
        );

        res.json({
            success: true,
            message: 'Foto u ngarkua me sukses!',
            photo: {
                id: result.insertId,
                city_name,
                caption,
                image_path: imagePath
            }
        });

    } catch (error) {
        console.error(error);
        if (file) fs.unlinkSync(file.path);
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

export default router;
