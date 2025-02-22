import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../pagestyling/Intro.css";

const Intro = ({ToForm }) => {
  const [start, setStart] = useState(false);

  return (
    <AnimatePresence>
      {!start && (
        <motion.div 
          className="intro"
          initial={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 90 }} 
          transition={{ duration: 0.9 }} 
        >
          <div className="intro-div">
            <div className="contents">
              <h1>Welcome to <span className="smart">SmartFert!</span></h1>
              <p>Optimize your farming with SmartFert, an advanced fertilizer recommendation system designed to help you make the best choices for your crops. By analyzing soil type, crop selection, and essential nutrients, SmartFert provides accurate, science-backed fertilizer suggestions to enhance productivity and sustainability. Say goodbye to guesswork and embrace smarter, data-driven agriculture for healthier crops and higher yields! </p>
              <motion.button 
                className="intro-btn" 
                onClick={() => {
                    setStart(true);
                    setTimeout(() => {
                        ToForm()
                    }, 300);
                }}
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Intro;
