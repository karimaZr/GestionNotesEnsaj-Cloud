import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./Profile.scss";
import 'primeicons/primeicons.css';
import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";
import { confirmPopup } from 'primereact/confirmpopup';

const Profile = ({ title }) => {
  const [userData, setUserData] = useState(null);
  const { userId } = useParams();
  console.log("id",userId)
    const [profDetails, setProfDetails] = useState(null);
  const [file, setFile] = useState("");
  const [editedProfDetails, setEditedProfDetails] = useState({});
  const [visible, setVisible] = useState(false); // Définir la variable visible
  const [showAlert, setShowAlert] = useState(false); // Etat pour afficher l'alerte

  useEffect(() => {
    const fetchProfDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/admin/admin/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch professor details");
        }
        const data = await response.json();
        setProfDetails(data);
        // Initialize editedProfDetails with fetched data
        setEditedProfDetails({
          ...data,
          CIN: data.CIN // Ajouter le CIN extrait à editedProfDetails
        });
      } catch (error) {
        console.error("Error fetching professor details:", error);
      }
    };

    fetchProfDetails();
  }, [userId]);

  const confirmEdit = () => {
    confirmPopup({
        message: 'Are you sure you want to proceed with the edit?',
        icon: 'pi pi-exclamation-triangle',
        accept: handleEdit
    });
  };
  
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/admin/admin/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProfDetails),
      });
      if (!response.ok) {
        throw new Error("Failed to update professor details");
      }
      const updatedData = await response.json();
      setProfDetails(updatedData);
      setVisible(false); // Masquer la boîte de dialogue de confirmation après la mise à jour réussie
      setShowAlert(true); // Afficher l'alerte de succès // Masquer la boîte de dialogue de confirmation après la mise à jour réussie
    } catch (error) {
      console.error("Error updating professor details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Professeurs Details </h1>
        </div>
        <div className="bottom">
        {profDetails ? (
  <div className="left">
    <img
      src={
        file
          ? URL.createObjectURL(file) // Utilisez l'URL de la nouvelle image si elle existe
          : profDetails.photo          // Sinon, utilisez l'URL de l'image du profil de l'utilisateur
            ? profDetails.photo
            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
      }
      alt="User Profile"
    />
  </div>
) : (
  <p>Loading...</p>
)}

          <div className="right">
            <form onSubmit={handleEdit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {profDetails ? (
                <>
                  <div className="formInput">
                    <label>Nom</label>
                    <input
                      type="text"
                      name="nom"
                      value={editedProfDetails.nom}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Prénom</label>
                    <input
                      type="text"
                      name="prenom"
                      value={editedProfDetails.prenom}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editedProfDetails.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Numéro de téléphone</label>
                    <input
                      type="text"
                      name="telephone"
                      value={editedProfDetails.telephone}
                      onChange={handleChange}
                    />
                  </div>
                 
                  
                  <div className="formInput">
                    <label>Mot de passe</label>
                    <input
                      type="text"
                      name="motDePasse"
                      value={editedProfDetails.password}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : null}
              <button onClick={confirmEdit}>Edit</button>

{showAlert && (
              <Alert
                icon={<CheckIcon fontSize="inherit" />}
                severity="success"
                onClose={() => setShowAlert(false)}
              >
                votre information sont été mise a jour avec success
              </Alert>
            )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
