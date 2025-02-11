const express = require('express');
const router = express.Router();
const pdfModel = require('../db/pdfModel');
const verifyToken = require('../functions/verifyToken');

router.get('/', async (req, res) => {
    try {
        const token = req.headers.authorization?.split('Bearer ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        const decodedToken = await verifyToken(token);

        const useruid = decodedToken.uid;

        const items = await pdfModel.find({ userId: useruid },{pdfData:0,userId:0});

        res.json(items);
    } catch (err) {
        console.error("Error fetching history:", err);
    }
});

module.exports = router;
