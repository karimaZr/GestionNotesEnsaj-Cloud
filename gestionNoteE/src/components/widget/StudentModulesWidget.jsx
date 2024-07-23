import React, { useState, useEffect } from "react";
import axios from "axios";
import "./widget.scss";

const ModuleWidget = ({ etudiantId }) => {
    // États pour stocker les données, le chargement et les erreurs
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Effectuer une requête API pour récupérer les modules de l'étudiant
    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/elementmodule/`);
                
                // Mettre à jour l'état avec les données reçues
                setModules(response.data);
            } catch (err) {
                // Mettre à jour l'état en cas d'erreur
                setError(err);
            } finally {
                // Arrêter le chargement une fois la requête terminée
                setLoading(false);
            }
        };

        // Appeler la fonction fetchModules
        fetchModules();
    }, [etudiantId]);

    // Afficher un message de chargement si les données sont en cours de chargement
    if (loading) {
        return <div className="widget">Chargement des modules...</div>;
    }

    

    // Rendre la liste des modules
    return (
        <div className="widget">
            <h5>Modules de l'étudiant</h5>
            
            <h5><ul>
                {modules.map((module) => (
                    <li key={module.id}>{module.nom}</li>
                ))}
            </ul></h5>

        </div>
    );
};

export default ModuleWidget;
