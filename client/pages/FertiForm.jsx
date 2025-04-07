import { useState, useEffect } from "react";

import DropDown from "./DropDown.jsx";
import axios from "axios";
import { useSelector } from 'react-redux';
import '../pagestyling/FertiForm.css';
import Intro from './Intro.jsx'
import crops from "../data/CropTypes";

const FertiForm = () => {

  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const user = useSelector((state) => state.userInfo.user);
  const usertoken = user?.token;

  useEffect(() => {
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  
    return () => {
      
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);
  
  

  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reqdata = { ...formData, usertoken };
      const response = await axios.post(`${serverUrl}/predict`, reqdata);

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

      setPdfUrl(`${serverUrl}/download-pdf/${response.data.pdfid}`);

      setShowPopup(true);
      setShowPdfButton(true);
    } catch (error) {
      console.error("Error predicting fertilizer:", error);
    }
  };

  const handleBlockSelect = (npkValues) => {
    setFormData({
      ...formData,
      nitrogen: npkValues.N || 0,
      phosphorus: npkValues.P || 0,
      potassium: npkValues.K || 0,
    });
  };

  const ToIntro = () => {
    setShowForm(false);
  }
  
  return (
    <>
      {!showForm ? (
        <>
          <Intro ToForm={() => setShowForm(true)} />
        </>
      ) : (
        <div className="ferti-form-div">
          <form onSubmit={handleSubmit} className="ferti-form">
                <h2>Fertilizer Recommendation</h2>
            <div className="f-form">
            <DropDown onBlockSelect={handleBlockSelect} /> 
            <select name="cropType" onChange={handleChange} required className="input">
              <option value="">Select Crop Type</option>
              {crops.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="nitrogen"
              placeholder="Available Nitrogen (N) (kg/ha)"
              value={formData.nitrogen}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="number"
              name="phosphorus"
              placeholder="Available Phosphorus (P) (kg/ha)"
              value={formData.phosphorus}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="number"
              name="potassium"
              placeholder="Available Potassium (K) (kg/ha)"
              value={formData.potassium}
              onChange={handleChange}
              required
              className="input"
            />

            <button type="submit" className="ferti-btn">Predict Fertilizer</button>
            <button onClick={ToIntro} className="ferti-btn">Back</button>
            </div>
          </form>
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h3>Recommended Fertilizer: {prediction}</h3>
                <p>{description}</p>
                <a href={pdfUrl} download>
                  <button className="download-btn">Download PDF</button>
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

export default FertiForm;
