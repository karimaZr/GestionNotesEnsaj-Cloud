import React from 'react';
import { Card, CardContent, Button, Typography } from '@mui/material';
import './CourseCard.scss'; // Importez votre fichier CSS pour les styles des cartes de cours

const CourseCard = ({ course }) => {
  const { nom, description } = course;

  return (
    <Card className="course-card">
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {nom}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Button
  size="small"
  variant="contained"
  href={`/details/${course.id}`}
>
  Détails
</Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
