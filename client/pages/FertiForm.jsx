import { useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import '../pagestyling/FertiForm.css';
import Intro from './Intro.jsx'

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

  const [showForm, setShowForm] = useState(false);

  const [prediction, setPrediction] = useState("");
  const [description, setDescription] = useState("");
  const [showPdfButton, setShowPdfButton] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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
      const reqdata = { ...formData, usertoken };
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

      setShowPopup(true);
      setShowPdfButton(true);
    } catch (error) {
      console.error("Error predicting fertilizer:", error);
    }
  };

  const ToIntro = () => {
    setShowForm(false);
  }

  return (
    <>
      {!showForm ? (
        <>
          <Intro ToForm={() => setShowForm(true)} />
          {console.log(showForm)}
        </>
      ) : (
        <div className="ferti-form-div">
          <h2>Fertilizer Recommendation</h2>
          <form onSubmit={handleSubmit} className="ferti-form">
            <input
              type="number"
              name="temperature"
              placeholder="Temperature ℃"
              onChange={handleChange}
              required
              className="input"
            />
            <select name="soilType" onChange={handleChange} required className="input">
              <option value="">Select Soil Type</option>
              {soilTypes.map((soil) => (
                <option key={soil} value={soil}>
                  {soil}
                </option>
              ))}
            </select>

            <select name="cropType" onChange={handleChange} required className="input">
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
              className="input"
            />
            <input
              type="number"
              name="phosphorus"
              placeholder="Phosphorus (P)"
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="number"
              name="potassium"
              placeholder="Potassium (K)"
              onChange={handleChange}
              required
              className="input"
            />

            <button type="submit" className="ferti-btn">Predict Fertilizer</button>
            <button onClick={ToIntro} className="ferti-btn">Back</button>
          </form>

          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h3>Recommended Fertilizer: {prediction}</h3>
                <p>{description}</p>
                <a href={pdfUrl} download>
                  <button className="download-btn">Download Fertilizer PDF</button>
                </a>
                <button className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
              </div>
            </div>
          )}

        </div>
      )}
    </>
  );
};

export default Form;
