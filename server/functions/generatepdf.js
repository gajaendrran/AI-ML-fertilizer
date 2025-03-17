const PDFDocument = require("pdfkit");
const pdfModel = require("../db/pdfModel");

async function generatepdf(cropobj) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const buffers = [];

        doc.on("data", (chunk) => buffers.push(chunk));
        doc.on("end", async () => {
            const pdfBuffer = Buffer.concat(buffers);

            const pdf = new pdfModel({
                userId: cropobj.userId,
                shortContent: `For ${cropobj.cropType}, 
                the recommended fertilizer is ${cropobj.fertilizer}, 
                applied over a period of ${cropobj.days} days. 
                ${cropobj.irrigation} 
                ${cropobj.additionalTips}`,
                pdfData: pdfBuffer
            });

            try {
                const savedPdf = await pdf.save();
                resolve(savedPdf._id);
            } catch (error) {
                reject(error);
            }
        });

        doc.on("error", (err) => {
            reject(err);
        });

        // Title
        doc.fontSize(18).text("Fertilizer Recommendation Report", { align: "center", underline: true });
        doc.moveDown(2);

        // Crop Details
        doc.fontSize(14).text(`Crop Type: ${cropobj.cropType}`);
        doc.moveDown();
        doc.text(`Recommended Fertilizer: ${cropobj.fertilizer}`);
        doc.moveDown();
        doc.text(`Days to Apply: ${cropobj.days}`);
        doc.moveDown(2);

        // Description
        doc.fontSize(14).text("Description:", { underline: true });
        doc.moveDown();
        doc.fontSize(12).text(
            `For ${cropobj.cropType}, the recommended fertilizer is ${cropobj.fertilizer}, ` +
            `applied over a period of ${cropobj.days} days.`
        );
        doc.moveDown(2);

        // Irrigation
        doc.fontSize(14).text("Irrigation Method:", { underline: true });
        doc.moveDown();
        doc.fontSize(12).text(`- ${cropobj.irrigation}`);
        doc.moveDown(2);

        // Additional Tips
        doc.fontSize(14).text("Additional Tips for Optimal Yield:", { underline: true });
        doc.moveDown();
        doc.fontSize(12).text(`- ${cropobj.additionalTips.split('. ').join('\n- ')}`); // Formats tips as bullet points
        doc.moveDown(2);

        // Footer
        doc.fontSize(12).text(`Generated on: ${new Date().toLocaleDateString()}`, { align: "right" });

        // Finalize PDF
        doc.end();
    });
}

module.exports = generatepdf;
