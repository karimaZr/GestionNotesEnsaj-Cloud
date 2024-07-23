import { createContext, useEffect, useReducer } from "react";

// Créer le contexte d'authentification
export const AuthContext = createContext();

// État initial du contexte
const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  userId: JSON.parse(localStorage.getItem("userId")) || null,
};

// Réducteur pour gérer les actions liées à l'authentification
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("userId", JSON.stringify(action.payload.userId));
      return {
        ...state,
        currentUser: action.payload.user,
        userId: action.payload.userId,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      return {
        ...state,
        currentUser: null,
        userId: null,
      };
    default:
      return state;
  }
};

// Fournisseur de contexte pour AuthContext
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // Mettre à jour le localStorage à chaque changement d'état
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
    localStorage.setItem("userId", JSON.stringify(state.userId));
  }, [state.currentUser, state.userId]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, userId: state.userId, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
