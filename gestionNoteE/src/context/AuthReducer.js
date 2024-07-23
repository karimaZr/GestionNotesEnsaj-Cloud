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

export default AuthReducer;
