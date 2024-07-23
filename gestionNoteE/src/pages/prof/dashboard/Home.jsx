import React, { useState } from "react";
import Sidebar from "../sidebar1/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../widget/Widget";
import Featured from "../../../components/featured/Featured";
import Chart from "./chart/Chart2";
import { useParams } from "react-router-dom";

import Widget2 from "../widget/EtudiantWidget";
import ProfCourses from "../course/ProfCourses";
import ModuleDropdown from "./chart/DropDown"; 
import PolarAreaChart from "./PolarAreaChart";
import ChartAnne from './chart/ChartAnnee';
const Home = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const { userId } = useParams();
console.log("id",userId)
  const handleModuleSelect = (elementModuleCode, elementModuleId) => {
    setSelectedModule({ code: elementModuleCode, id: elementModuleId });
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget />
          <Widget2 />

                  
          <ModuleDropdown onSelect={handleModuleSelect}  style={{ boxShadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)", padding: "10px", margin: "20px", display: "flex" }}/>
        </div>
        <div className="charts">
          <PolarAreaChart/>
          <ChartAnne/>
          {selectedModule && <Chart title="note Etudiants" aspect={2 / 1} selectedModule={selectedModule} />}
        </div>
      
        <div >
          <ProfCourses/>
        </div>
      </div>
    </div>
  );
};

export default Home;
