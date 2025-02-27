export const handleLogout = (navigate) => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    alert("Successfully logged out.");
    navigate("/");
  };

//Check if user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("token"); // Returns true if token exists
};

//Check if user is admin
export const isAdmin = () => {
  return localStorage.getItem("isAdmin") === "true"; // Convert to boolean
};

//Store user session
export const loginUser = (token, isAdminUser) => {
  localStorage.setItem("token", token);
  localStorage.setItem("isAdmin", isAdminUser ? "true" : "false");
};

//Logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isAdmin");
};
