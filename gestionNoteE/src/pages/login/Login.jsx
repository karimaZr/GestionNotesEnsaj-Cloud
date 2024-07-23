import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase"// Assurez-vous d'importer la référence à votre instance de base de données
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Correction de la variable navigate

  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Authentification de l'utilisateur
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Récupérer les données de l'utilisateur depuis le backend
      const response = await fetch(`http://localhost:3000/admin/users/${user.uid}`);
      const userData = await response.json();
  const id=userData.id;
      console.log("Données utilisateur :", userData);
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: userData, userId: id } });

      // Vérifier si l'utilisateur existe et a un rôle
      if (userData && userData.role) {
        const role = userData.role;
        console.log("Rôle de l'utilisateur :", role);
        // Rediriger l'utilisateur en fonction de son rôle
        if (role === "admin") {
          navigate("/admin1");
        } else if (role === "prof") {
          navigate(`/dash/${id}`);
        } else if (role === "etudiant") {
          navigate(`/profile2/${id}`);
        } else {
          navigate("/login");
        }
      } else {
        setError("Le rôle de l'utilisateur n'a pas été trouvé");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setError(true);
    }
  };
  
  

  return (
    <div style={{
      backgroundImage: 'url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgAGOtPzcg7mrNztuw60oiu4PoVpc3KuiwwJImZ0IfHSx5Y2ORfZ9zC7nWMEW638RM9EQiCwRN9LOEJBy_IWL-IxtHS0iVwNAQ666t1kYHJW8ahDSIzeuciJmw6zMjfOekDNdqzt7eVhsL5/s1600/Concours+d%25E2%2580%2599acc%25C3%25A8s+%25C3%25A0+la+1%25C3%25A8re+ann%25C3%25A9e+du+Cycle+Ing%25C3%25A9nieur+Ann%25C3%25A9e+Universitaire+2020-2021.png")',
      
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100vh'
    }}>

      <div className="container">
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <image  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-qrWUaeJVHZ9CfC-nwK0iYcrwAPlKUIgLNB1i21h_ag&s" alt="" />
            <h1>Welcome back</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <span className='text-red-600 font-bold'>{error}</span>
            )}
            <button type="submit">
              Sign In
            </button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-right">
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
