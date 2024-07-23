import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import Note from "../../pages/list/Note";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DataNotesStudent from "../../components/datatable/DataNotesStudent";
const Single = () => {
  const [dataStudent, setData] = useState([])
  const [filiere, setfiliere] = useState([])
  const { studentId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await axios.get(`http://localhost:3000/etudiant/${studentId}`);
        setData(studentResponse.data);
        const idfiliere = studentResponse.data.filiere?._path?.segments[1];
        if (idfiliere) {
          const filiereResponse = await axios.get(`http://localhost:3000/filiere/${idfiliere}`);
          setfiliere(filiereResponse.data.nom);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [studentId]);


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="data"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{dataStudent.nom} {dataStudent.prenom}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{dataStudent.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Date of birth:</span>
                  <span className="itemValue">{dataStudent.dateNaissance}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">CNE :</span>
                  <span className="itemValue">
                    {dataStudent.CNE}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">CIN:</span>
                  <span className="itemValue">{dataStudent.CIN}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Field:</span>
                  <span className="itemValue">{filiere}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart studentId={dataStudent.CNE} aspect={3 / 1} title="Students evolution by year" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Marks</h1>
          <DataNotesStudent studentId={dataStudent.CNE} />
        </div>
      </div>
    </div>
  );
};

export default Single;
