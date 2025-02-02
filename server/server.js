const express = require("express");
const { spawn } = require("child_process");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/predict", (req, res) => {
    try {
        const { temperature, soilType, cropType, nitrogen, phosphorus, potassium } = req.body;

        // Spawn Python process
        const python = spawn("python", ["predict.py"]);

        // Handle Python process input
        python.stdin.write(JSON.stringify({ temperature, soilType, cropType, nitrogen, phosphorus, potassium }));
        python.stdin.end();

        let output = "";

        // Read output from Python script
        python.stdout.on("data", (data) => {
            output += data.toString();
        });

        // Handle process close event
        python.on("close", (code) => {
            if (code === 0) {
                res.json({ fertilizer: output.trim() }); // ✅ Send response only ONCE
            } else {
                res.status(500).json({ error: "Error processing prediction" });
            }
        });

        // Handle process errors
        python.on("error", (err) => {
            console.error("Python error:", err);
            res.status(500).json({ error: "Failed to execute prediction script" });
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(5001, () => {
    console.log("Server running at http://localhost:5001");
});
