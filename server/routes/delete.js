const express = require('express');
const router = express.Router();
const pdfModel = require('../db/pdfModel');

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPdf = await pdfModel.findByIdAndDelete(id);
        
        if (!deletedPdf) {
            return res.status(404).json({ msg: "PDF not found" });
        }

        res.status(200).json({ msg: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting PDF:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = router;
