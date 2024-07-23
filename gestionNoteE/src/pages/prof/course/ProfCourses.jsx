import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard'; // Importez votre composant de carte de cours
import { useParams } from "react-router-dom";

const ProfCourses = ({  }) => {
  const [courses, setCourses] = useState([]);
  const [profCIN, setProfCIN] = useState(null);
  const { userId } = useParams();
  useEffect(() => {
    // Effectuez une requête pour récupérer les informations du professeur
    const fetchProfInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/prof/${userId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des informations du professeur');
        }
        const profData = await response.json();
        setProfCIN(profData.CIN); // Extrayez le CIN du professeur de la réponse
      } catch (error) {
        console.error('Erreur lors de la récupération des informations du professeur:', error);
      }
    };

    fetchProfInfo(); // Appelez la fonction pour récupérer les informations du professeur
  }, [userId]);

  useEffect(() => {
    // Si le CIN du professeur est défini, effectuez une requête pour récupérer les cours associés
    if (profCIN) {
      const fetchCourses = async () => {
        try {
          const response = await fetch(`http://localhost:3000/elementModule/elementModules/prof/${profCIN}/2023-2024`);
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des cours');
          }
          const data = await response.json();
          setCourses(data); // Mettez à jour l'état avec les données des cours récupérées
        } catch (error) {
          console.error('Erreur lors de la récupération des cours:', error);
        }
      };

      fetchCourses(); // Appelez la fonction de récupération des cours
    }
  }, [profCIN]);

  return (
    <div className="listContainer2">
      <div className="listTitle">Cours</div>
      <div className="course-cards-container">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default ProfCourses;
