const express = require('express');
const { spawn } = require('child_process');
const router = express.Router();
const cropTips = require('../cropdetails/crops');
const generatepdf = require('../functions/generatepdf');
const verifyToken = require('../functions/verifyToken');

let pythonProcess = null;

function startPythonProcess() {
    pythonProcess = spawn("python", ["predict.py"]);

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Python Error: ${data.toString()}`);
    });

    pythonProcess.on("exit", (code) => {
        console.error(`Python process exited with code ${code}`);
        pythonProcess = null;
        startPythonProcess();
    });

    console.log("Python process started");
}

startPythonProcess();

router.post('/', async (req, res) => {
    try {
        const {cropType, nitrogen, phosphorus, potassium, usertoken } = req.body;

        if (!pythonProcess) {
            return res.status(500).json({ error: "Python process is not running" });
        }

        const decodedToken = await verifyToken(usertoken);

        const useruid = decodedToken.uid;

        const input = JSON.stringify({cropType, nitrogen, phosphorus, potassium }) + "\n";

        let output = '';

        let cropobj;

        let resobj;

        const poutput = await new Promise((resolve, reject) => {
            pythonProcess.stdin.write(input, (err) => {
                if (err) reject(err);
            });

            pythonProcess.stdout.once("data", (data) => {
                output = data.toString().trim();
                resolve(output);
            });

            pythonProcess.stderr.once("data", (errData) => {
                reject(`Python Error: ${errData.toString()}`);
            });
        });

        console.log(output);

        const cropData = cropTips[cropType];

        cropobj = {
            cropType:cropType,
            userId: useruid,
            fertilizer: output,
            percentage: cropData.percentage,
            irrigation: cropData.irrigation,
            additionalTips: cropData.additionalTips,
            days: cropData.days
        }
        
        const pdfid = await generatepdf(cropobj);

        resobj = {
            pdfid: pdfid,
            cropType:cropType,
            fertilizer: output,
            percentage: cropData.percentage,
            irrigation: cropData.irrigation,
            additionalTips: cropData.additionalTips,
            days: cropData.days
        }

        res.json(resobj);

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
