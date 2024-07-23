import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Sidebar from "../sidebarstd/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import WidgetContainer from '../../../components/widget/WidgetModule'; // Importez WidgetContainer

function StudentNotes() {  
  const { userId } = useParams();

  return (
    <div className="home">
      <Sidebar/>
      <div className="homeContainer">
        <Navbar/>
        <div  style={{ boxShadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)", padding: "10px", margin: "20px", display: "flex" }}>
          <h1 style={{ color: "lightgray", fontSize: "20px" }}>Votre Module </h1>
        </div>
        <div className="widgets">
          {/* Passez userId en tant que prop à WidgetContainer */}
          <WidgetContainer userId={userId} />
       </div>
      </div>
    </div>
  )
}

export default StudentNotes;
