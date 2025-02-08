const express = require('express');
const cors = require('cors');
const predictRoutes = require('./routes/predict');
const pdfRoutes = require('./routes/pdf');
const connectDB = require('./db/connect');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
app.use('/predict', predictRoutes);
app.use('/download-pdf',pdfRoutes);


app.listen(5001, () => {
    console.log("Server running at http://localhost:5001");
});
