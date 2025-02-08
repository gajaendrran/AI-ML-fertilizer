const express = require('express');
const router = express.Router();
const pdfModel = require('../db/pdfModel');

router.get('/:pdfId', async (req, res) => {
    const { pdfId } = req.params;
    console.log(pdfId)
    try
    {
        const record = await pdfModel.findById(pdfId);
        if(!record)
        {
            return res.status(404).send('PDF not found!!');
        }
        res.setHeader('Content-Disposition', `attachment; filename=SmartFert.pdf`);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(record.pdfData);
    }

    catch(error)
    {
        console.log(error);
    }
});

module.exports = router;
