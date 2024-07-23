import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const NewFiliere = ({ inputs, title }) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/filiere/', data);
      console.log(response.data); // Log the response from the backend
      // Optionally, you can navigate to another page or perform any other action after successful creation
      navigate(-1);
    } catch (error) {
      console.error('Error creating filiere:', error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleAdd}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label htmlFor={input.id}>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFiliere;
