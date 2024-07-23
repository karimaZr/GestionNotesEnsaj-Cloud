import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../src/context/AuthContext'; // Assurez-vous d'importer le contexte approprié

const NotFound = () => {
  const { userId } = useContext(AuthContext); // Récupérez userId depuis le contexte AuthContext

  // Déterminez la redirection en fonction du rôle de l'utilisateur
  const determineRedirect = () => {
    const currentUserRole = ""; // Récupérez le rôle de l'utilisateur depuis le contexte ou ailleurs

    // Logique de redirection en fonction du rôle de l'utilisateur
    if (currentUserRole === 'admin') {
      return '/template';
    } else if (currentUserRole === 'prof' || currentUserRole === 'etudiant') {
      // Redirigez l'utilisateur vers sa page principale
      return `/student`; // Utilisez userId pour la redirection
    } else {
      // Si aucun rôle n'est défini ou si c'est un rôle inconnu, redirigez-le vers la page de connexion
      return '/';
    }
  };

  // Obtenez la page non autorisée
  const unauthorizedPage = determineRedirect();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>403 - Page non autorisée</h1>
      <p style={styles.message}>Vous n'êtes pas autorisé à accéder à la page</p>
      {/* Redirigez l'utilisateur vers sa page principale */}
      <Link to={unauthorizedPage} style={styles.link}>Retour à la page d'accueil</Link>
    </div>
  );
};

// Styles CSS-in-JS
const styles = {
  container: {
    textAlign: 'center',
    margin: 'auto',
    paddingTop: '50px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '20px',
  },
  link: {
    fontSize: '20px',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default NotFound;
