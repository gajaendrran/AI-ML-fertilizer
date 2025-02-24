import React, { useEffect,useState } from 'react'
import "../pagestyling/About.css"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const About = () => {

  const captions = [
    "Right Fertilizer, Right Time, Right Yield!",
    "Smart Farming, Smarter Future!",
    "Precision Farming Made Simple with AI!",
  ]
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % captions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % captions.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + captions.length) % captions.length);
  };

  return (
    <>
    <div className='outer'>

      <div className='about'>
        <div className='about1'>
          <h3>About Us</h3>
        </div>
        <div className='about2'>
            <div className='about2-inner'>
              <h3>Revolutionizing Agri with AI</h3>
              <p>At Smart Fert Advisor, we are dedicated to empowering farmers with cutting-edge AI technology to enhance crop yields, optimize fertilizer usage, and promote sustainable farming. Our platform provides personalized fertilizer recommendations based on soil health, crop type, weather conditions, and other crucial factors—helping farmers make data-driven decisions with ease.</p>
            </div>
        </div>
      </div>

      <div className='about-mission'>
        <h2>Our Mission</h2>
        <div className='about-mission-inner'>
          <div className='about-mission1'>
            <p>
            We aim to bridge the gap between traditional farming and modern technology, ensuring that every farmer has access to smart, efficient, and sustainable agricultural solutions. Our goal is to maximize productivity while preserving the environment for future generations.
            </p>
            <p>
            At Smart Fert Advisor, our mission is to empower farmers with AI-driven insights to enhance productivity and sustainability. We strive to reduce fertilizer waste, improve soil health, and maximize crop yields through intelligent recommendations. By bridging technology and agriculture, we aim to create a greener, more efficient, and farmer-friendly future.
            </p>
          </div>
          <div className='about-mission2'>
            <img src="../image/aboutferti(1).webp" alt="photo" />
          </div>
        </div>
      </div>

    

      <div className='about-corousel'>
        <div className="carousel-container">
        <div className="carousel-slide">
          <p className="carousel-caption">{captions[currentIndex]}</p>
          
        </div>
        <div className="carousel-indicators">
          {captions.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
      </div>

      <div className="about-footer">
        <center>
          <div>
          © 2025 Smart Fert | Developed by Team GCE
          </div>
        </center>
      </div>

    </div>
    
    
    </>
  )
}

export default About