const PDFDocument = require("pdfkit");
const pdfModel = require("../db/pdfModel");

async function generatepdf(cropobj) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const buffers = [];

        doc.on("data", (chunk) => buffers.push(chunk));
        doc.on("end", async () => {
            const pdfBuffer = Buffer.concat(buffers);
            let des = "";
            if (cropobj.fertilizer === "Well Balanced Soil") {
                des = `${cropobj.irrigation} 
                ${cropobj.additionalTips}`
            }
            else {
                des = `For ${cropobj.cropType}, 
                the recommended fertilizer is ${cropobj.fertilizer}, 
                applied over a period of ${cropobj.days} days. 
                ${cropobj.irrigation} 
                ${cropobj.additionalTips}`
            }
            const pdf = new pdfModel({
                userId: cropobj.userId,
                shortContent: des,
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

        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;
        const margin = 20;

        doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin)
            .strokeColor('#000000')
            .lineWidth(1)
            .stroke();

        // Title
        doc.fontSize(18).text("Fertilizer Recommendation Report", { align: "center", underline: true });
        doc.moveDown(2);

        // Crop Details
        doc.fontSize(14).text(`Crop Type: ${cropobj.cropType}`);
        doc.moveDown();
        if (cropobj.fertilizer !== "Well Balanced Soil") {
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
        }
        else {
            doc.text(`Well Balanced Soil`);
            doc.moveDown(2);
        }

        // Irrigation
        doc.fontSize(14).text("Irrigation Method:", { underline: true });
        doc.moveDown();
        doc.fontSize(12).text(`- ${cropobj.irrigation}`);
        doc.moveDown(2);

        // Additional Tips
        doc.fontSize(14).text("Additional Tips for Optimal Yield:", { underline: true });
        doc.moveDown();
        doc.fontSize(12).text(`- ${cropobj.additionalTips.split('. ').join('\n- ')}`); // Formats tips as bullet points
        doc.moveDown(4);

        // Footer
        doc.fontSize(12).text(`Generated on: ${new Date().toLocaleDateString("en-GB")}`, { align: "right" });

        // Finalize PDF
        doc.end();
    });
}

module.exports = generatepdf;
