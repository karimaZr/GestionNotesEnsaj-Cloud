import React, { useState, useEffect } from 'react';
import './adminwork.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";

const AdminWork = () => {
    

    return (
        <div>
            <div className="list">
                <Sidebar />
                <div className="listContainer">
                    <Navbar />
                    <div className="datatable"> 
                    <iframe
                        src="https://script.google.com/macros/s/AKfycbzX875LxPMvMO9U6idrMEsKpoeD1Z9ch2ZaV5l50H7d6iyJ8CQigyftA0KMW62bmU6V/exec"
                        title="Your Google Apps Script Page"
                        width="100%"
                        height="600px"
                    ></iframe>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminWork;