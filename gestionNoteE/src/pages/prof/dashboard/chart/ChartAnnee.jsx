import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import "./chart.scss";
import { useParams } from "react-router-dom";

const BarChartDemo = () => {
    const [profCIN, setProfCIN] = useState(null);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [dataLoading, setDataLoading] = useState(true); // État de chargement général
    const [profLoading, setProfLoading] = useState(true); // État de chargement des informations du professeur
    const { userId } = useParams();

    useEffect(() => {
        const fetchProfInfo = async () => {
            try {
                const response = await fetch(`http://localhost:3000/prof/${userId}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des informations du professeur');
                }
                const profData = await response.json();
                setProfCIN(profData.CIN);
                setProfLoading(false); // Marquer le chargement des informations du professeur comme terminé
            } catch (error) {
                console.error('Erreur lors de la récupération des informations du professeur:', error);
            }
        };

        fetchProfInfo();
    }, [userId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (profCIN) {
                    const elementsResponse = await axios.get(`http://localhost:3000/elementModule/prof/${profCIN}/elements`);
                    const elements = elementsResponse.data.elementsModule;
                    const uniqueCodes = new Set();
                    const datasets = [];
                    const promises = [];

                    for (const element of elements) {
                        uniqueCodes.add(element.code);
                        const anneeUniversitaire = element.AnneeUniversitaire;
                        const promise = axios.get(`http://localhost:3000/note/notes/${element.code}/${anneeUniversitaire}`);
                        promises.push(promise);
                    }

                    const noteResponses = await Promise.all(promises);

                    noteResponses.forEach((noteResponse, index) => {
                        const notes = noteResponse.data.notes;
                        const average = notes.reduce((acc, note) => acc + parseFloat(note.note), 0) / notes.length;
                        const element = elements[index];
                        const codeIndex = Array.from(uniqueCodes).indexOf(element.code);

                        const datasetIndex = datasets.findIndex(dataset => dataset.label === element.AnneeUniversitaire);
                        if (datasetIndex === -1) {
                            datasets.push({
                                label: element.AnneeUniversitaire,
                                backgroundColor: getRandomColor(),
                                data: [average]
                            });
                        } else {
                            datasets[datasetIndex].data[codeIndex] = average;
                        }
                    });

                    setChartData({ labels: Array.from(uniqueCodes), datasets });
                    setDataLoading(false); // Marquer le chargement général comme terminé
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, [profCIN]);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className="chart">
            { profLoading ? (
                <p>Chargement des informations du professeur...</p>
            ) : dataLoading ? (
                <p>Chargement des données...</p>
            ) : (
                <>
                    <h5>Moyenne des notes par année universitaire</h5>
                    <Chart type="bar" data={chartData} options={{ barThickness: 20 , categorySpacing: 5 }} style={{width: '100%', height: '50vh'}} />
                </>
            )}
        </div>
    );
};

export default BarChartDemo;
