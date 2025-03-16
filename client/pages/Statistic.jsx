import React, { useState } from "react";
import DropDown from "./DropDown";
import MyPieChart from "./MyPieChart";
import '../pagestyling/Statistic.css';

const Statistic = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    district: "",
    block: "",
    N: 45,
    P: 25,
    K: 30,
  });

  const handleBlockSelect = ({ district, block, N, P, K }) => {
    const total = N + P + K;
    const N_percent = total ? ((N / total) * 100).toFixed(1) : "0.0";
    const P_percent = total ? ((P / total) * 100).toFixed(1) : "0.0";
    const K_percent = total ? ((K / total) * 100).toFixed(1) : "0.0";

    setSelectedLocation({
      district,
      block,
      N: parseFloat(N_percent),
      P: parseFloat(P_percent),
      K: parseFloat(K_percent),
    });
  };

  return (
    <div className="statistic">
      <p className="stat-dec">Here, you can explore the Nitrogen (N), Phosphorous (P), and Potassium (K) distribution in different districts and blocks.
      Start by selecting a district and block to see real-time data insights! 
      </p>
      <h2>Select Location</h2>
      <DropDown onBlockSelect={handleBlockSelect} />

      <div className="stat-outer">
      <div className="stat-main">
        <div className="stat-dis">
        {selectedLocation.district && <h3>District: {selectedLocation.district}</h3>}
        {selectedLocation.block && <h3>Block: {selectedLocation.block}</h3>}
        </div>

        <div className="chart">
        <MyPieChart
          data={[
            { name: "Nitrogen", value: selectedLocation.N },
            { name: "Phosphorous", value: selectedLocation.P },
            { name: "Potassium", value: selectedLocation.K },
          ]}
        />
        </div>

        {!selectedLocation.district && <h3>Tamil Nadu</h3>}
      </div>
      </div>
    </div>
  );
};

export default Statistic;

