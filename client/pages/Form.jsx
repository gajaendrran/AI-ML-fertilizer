import { useState } from "react";
import jsPDF from "jspdf";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    temperature: "",
    soilType: "",
    cropType: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
  });

  const [prediction, setPrediction] = useState("");
  const [description, setDescription] = useState("");
  const [showPdfButton, setShowPdfButton] = useState(false);

  // Options for dropdowns
  const soilTypes = ["Sandy", "Loamy", "Clayey", "Red", "Black", "Alluvial"];
  const cropTypes = [
    "Rice", "Wheat", "Millets", "Cotton", "Sugarcane", "Barley", "Tobacco", 
    "Oil seeds", "Pulses", "Ground Nuts", "Corn"
  ];

  // Crop Tips and Recommendations based on Indian agricultural practices
  const cropTips = {
    Rice: {
      fertilizer: "Balanced Nitrogen-based Fertilizer",
      days: 30,
      percentage: 25,
      irrigation: "Flood irrigation is commonly used for rice. Ensure adequate water during tillering and panicle initiation.",
      additionalTips: "Avoid waterlogging; monitor soil moisture and apply organic fertilizers for better soil health.",
    },
    Wheat: {
      fertilizer: "Phosphorus and Nitrogen blend",
      days: 25,
      percentage: 30,
      irrigation: "Moderate irrigation during early growth stages; avoid over-irrigation.",
      additionalTips: "Rotate crops regularly to maintain soil fertility. Apply fertilizers in split doses.",
    },
    Millets: {
      fertilizer: "NPK balanced fertilizer",
      days: 20,
      percentage: 20,
      irrigation: "Millets are drought-resistant and require minimal irrigation. However, ensure adequate moisture during flowering.",
      additionalTips: "Millets grow well in less fertile soils. Use organic compost to improve soil health.",
    },
    Cotton: {
      fertilizer: "NPK 14-35-14",
      days: 20,
      percentage: 20,
      irrigation: "Drip irrigation helps to maintain water efficiency and reduces disease spread.",
      additionalTips: "Monitor for pests, and use integrated pest management. Opt for crop rotation to preserve soil nutrients.",
    },
    Sugarcane: {
      fertilizer: "Urea and MOP combination",
      days: 40,
      percentage: 35,
      irrigation: "Frequent irrigation, especially during flowering, using drip or furrow methods.",
      additionalTips: "Ensure proper spacing between plants for healthy growth and minimize weed competition.",
    },
    Barley: {
      fertilizer: "Nitrogen-phosphorus blend",
      days: 20,
      percentage: 30,
      irrigation: "Barley requires moderate irrigation, especially during seedling and tillering stages.",
      additionalTips: "Plant barley in well-drained soils. Proper weed management is crucial for barley yield.",
    },
    Tobacco: {
      fertilizer: "High nitrogen and potassium fertilizers",
      days: 30,
      percentage: 25,
      irrigation: "Moderate irrigation is required. Avoid over-watering, as it can cause leaf diseases.",
      additionalTips: "Monitor tobacco plants for pest damage. Regular pruning helps improve air circulation and leaf quality.",
    },
    "Oil seeds": {
      fertilizer: "Balanced NPK",
      days: 25,
      percentage: 25,
      irrigation: "Oilseeds require regular watering, especially during flowering and pod formation stages.",
      additionalTips: "Ensure proper spacing for air circulation. Monitor for pest damage and control accordingly.",
    },
    Pulses: {
      fertilizer: "Low nitrogen fertilizer with phosphorous and potassium",
      days: 20,
      percentage: 20,
      irrigation: "Pulses need moderate irrigation during flowering. Avoid excess watering, as it may reduce yield.",
      additionalTips: "Pulses are nitrogen-fixing crops. Crop rotation is recommended to ensure optimal soil health.",
    },
    "Ground Nuts": {
      fertilizer: "Balanced NPK with calcium",
      days: 25,
      percentage: 30,
      irrigation: "Groundnuts require light irrigation during early growth. Ensure adequate moisture during flowering and pod formation.",
      additionalTips: "Prevent waterlogging, which can lead to fungal diseases. Rotate with legumes for soil improvement.",
    },
    Corn: {
      fertilizer: "High nitrogen fertilizer",
      days: 25,
      percentage: 30,
      irrigation: "Corn requires consistent irrigation, especially during tasseling and cob formation.",
      additionalTips: "Keep an eye out for pests and weeds. Crop rotation with legumes can enhance soil fertility.",
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/predict", formData);
      setPrediction(response.data.fertilizer);
      
      // Fetch details based on the fertilizer recommended and crop type
      const selectedCrop = cropTips[formData.cropType];
      
      // Update the description with the predicted fertilizer
      setDescription(
        `For ${formData.cropType}, The ${response.data.fertilizer} fertilizer is recommended, applied at ${selectedCrop.percentage}% of the total amount 
        for the first application, over a period of ${selectedCrop.days} days. ${selectedCrop.irrigation} ${selectedCrop.additionalTips}`
      );

      setShowPdfButton(true); // Show PDF button after prediction
    } catch (error) {
      console.error("Error predicting fertilizer:", error);
    }
  };

  // Function to generate PDF with irrigation methods and additional tips
  const generatePDF = () => {
    const doc = new jsPDF();
    const selectedCrop = cropTips[formData.cropType];

    doc.setFontSize(18);
    doc.text("Fertilizer Recommendation Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Crop Type: ${formData.cropType}`, 20, 30);
    doc.text(`Recommended Fertilizer: ${prediction}`, 20, 40);  {/* Use predicted fertilizer */}
    doc.text(`Days to Apply: ${selectedCrop.days}`, 20, 50);
    doc.text(`Percentage of Fertilizer: ${selectedCrop.percentage}%`, 20, 60);

    doc.text("Description:", 20, 70);
    doc.setFontSize(10);
    doc.text(
      `For ${formData.cropType}, a ${selectedCrop.fertilizer} is recommended, applied at ${selectedCrop.percentage}% of the total amount for the first application, over a period of ${selectedCrop.days} days. ${selectedCrop.irrigation} ${selectedCrop.additionalTips}`,
      20,
      80,
      { maxWidth: 170 }
    );

    // Adding Irrigation Method Section
    doc.setFontSize(12);
    doc.text("Irrigation Method:", 20, 100);
    doc.setFontSize(10);
    doc.text(
      selectedCrop.irrigation,
      20,
      110,
      { maxWidth: 170 }
    );

    // Adding Additional Tips Section
    doc.setFontSize(12);
    doc.text("Additional Tips for Optimal Yield:", 20, 130);
    doc.setFontSize(10);
    doc.text(
      selectedCrop.additionalTips,
      20,
      140,
      { maxWidth: 170 }
    );

    doc.save(`${formData.cropType}_fertilizer_recommendation.pdf`);
  };

  return (
    <div>
      <h2>Fertilizer Recommendation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="temperature"
          placeholder="Temperature ℃"
          onChange={handleChange}
          required
        />

        <select name="soilType" onChange={handleChange} required>
          <option value="">Select Soil Type</option>
          {soilTypes.map((soil) => (
            <option key={soil} value={soil}>
              {soil}
            </option>
          ))}
        </select>

        <select name="cropType" onChange={handleChange} required>
          <option value="">Select Crop Type</option>
          {cropTypes.map((crop) => (
            <option key={crop} value={crop}>
              {crop}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="nitrogen"
          placeholder="Nitrogen (N)"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="phosphorus"
          placeholder="Phosphorus (P)"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="potassium"
          placeholder="Potassium (K)"
          onChange={handleChange}
          required
        />

        <button type="submit">Predict Fertilizer</button>
      </form>

      {prediction && <h3>Recommended Fertilizer: {prediction}</h3>}

      {/* Displaying the description of fertilizer and crop before PDF generation */}
      {description && <div className="description">{description}</div>}

      {showPdfButton && (
        <button onClick={generatePDF}>Generate Fertilizer PDF</button>
      )}
    </div>
  );
};

export default Form;
