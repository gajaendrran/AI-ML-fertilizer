const express = require('express');
const router = express.Router();
const pdfModel = require('../db/pdfModel');

router.get('/:userid', async (req, res) => {
    try {
        const { userid } = req.params;

        const items = await pdfModel.find({ userId: userid});

        res.json(items);
    } catch (err) {
        console.error("Error fetching history:", err);
    }
});

module.exports = router;
