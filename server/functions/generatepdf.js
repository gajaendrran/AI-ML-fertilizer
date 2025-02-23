const pdfdoc = require("pdfkit");
const pdfModel = require('../db/pdfModel');

async function generatepdf(cropobj)
{
    return new Promise((resolve,reject) => {

        const doc = new pdfdoc({
            margin:50
        });
        const buffers = [];        

        doc.on("data", (chunk) => buffers.push(chunk));

        doc.on("end",async()=>{
            const pdfBuffer = Buffer.concat(buffers);

            const pdf = new pdfModel({
                userId:cropobj.userId,
                shortContent:`For ${cropobj.cropType}, 
                            The ${cropobj.fertilizer} fertilizer is recommended, 
                            applied at ${cropobj.percentage}% of the total amount 
                            for the first application, over a period of ${cropobj.days} days. 
                            ${cropobj.irrigation} 
                            ${cropobj.additionalTips}`,
                pdfData : pdfBuffer
            })
            try {
                const savedPdf = await pdf.save();
                resolve(savedPdf._id);
            } catch (error) {
                reject(error);
            }
        });

        const borderMargin = 20;
        doc.rect(borderMargin, borderMargin, doc.page.width - 2 * borderMargin, doc.page.height - 2 * borderMargin)
            .stroke();
        doc.fontSize(16).text("Crop Report", { align: "center" });
        doc.moveDown();
        doc.fontSize(12).text(`Fertilizer Recommendation: ${cropobj.fertilizer}`);
        doc.moveDown();
        doc.text(`Irrigation Tips: ${cropobj.irrigation}`);
        doc.moveDown();
        doc.text(`Additional Tips: ${cropobj.additionalTips}`);
        doc.moveDown();
        doc.text(`Days Required: ${cropobj.days}`);
        doc.end();
    })
}

module.exports = generatepdf;