import { useState } from "react";
import axios from "axios";
import {useSelector} from 'react-redux';

const Form = () => {
  
  const user = useSelector((state) => state.userInfo.user);
  const usertoken = user?.token;

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
  const [pdfUrl, setPdfUrl] = useState("");

  // Options for dropdowns
  const soilTypes = ["Sandy", "Loamy", "Clayey", "Red", "Black", "Alluvial"];
  const cropTypes = [
    "Rice", "Wheat", "Millets", "Cotton", "Sugarcane", "Barley", "Tobacco", 
    "Oil seeds", "Pulses", "Ground Nuts", "Corn"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reqdata = {...formData,usertoken};
      const response = await axios.post("http://localhost:5001/predict", reqdata);

      console.log(response);

      setPrediction(response.data.fertilizer);

      setDescription(
        `For ${formData.cropType}, 
        The ${response.data.fertilizer} fertilizer is recommended, 
        applied at ${response.data.percentage}% of the total amount 
        for the first application, over a period of ${response.data.days} days. 
        ${response.data.irrigation} 
        ${response.data.additionalTips}`
      );

      setPdfUrl(`http://localhost:5001/download-pdf/${response.data.pdfid}`);

      setShowPdfButton(true); 
    } catch (error) {
      console.error("Error predicting fertilizer:", error);
    }
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
        <a href={pdfUrl} download>
          <button>Download Fertilizer PDF</button>
        </a>
      )}
    </div>
  );
};

export default Form;
