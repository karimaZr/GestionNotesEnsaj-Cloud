import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Widget = ({ title, moduleId, icon, counter, percentage }) => { // Ajoutez moduleId en tant que prop
    const { userId } = useParams();
    console.log(moduleId);

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{title}</span>
                <span className="title">{counter}</span>
                {/* Utilisez Link pour passer l'ID du module à la page StudentNotes */}
                <Link to={`/notesStudent/${moduleId}`} className="link">Voir les détails</Link>
            </div>
            <div className="right">
                <div className={`percentage ${percentage < 0 ? "negative" : "positive"}`}>
                    {percentage < 0 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                    {percentage !== null ? `${percentage.toFixed(2)}%` : ""}
                </div>
                {icon}
            </div>
        </div>
    );
};

const WidgetContainer = ({ userId }) => { // Prenez userId en tant que prop
    const [modules, setModules] = useState([]);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/etudiant/${userId}/modules`);
                setModules(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des modules de l\'étudiant:', error);
            }
        };

        fetchModules();
    }, []);

    return (
        <div className="widget-container">
            {modules.map((module) => (
                <Widget
                    key={module.id}
                    title={module.nom}
                    moduleId={module.id} // Passez l'ID du module comme prop
                    counter={module.code}
                    icon={<PersonOutlinedIcon className="icon" style={{ backgroundColor: "rgba(0, 0, 255, 0.2)", color: "blue" }} />}
                    percentage={null}
                />
            ))}
        </div>
    );
};

export default WidgetContainer;
