export const isAuthed = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.role === "admin";
  };
  
  export const isAuthenticated = () => {
    const accessToken = localStorage.getItem("access_token");
    const user = JSON.parse(localStorage.getItem("user"));
    return accessToken && user;
  };
  