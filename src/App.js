import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Main from "./Main"; // Δημιούργησε το νέο component Main
import Admin from "./Admin"; // Δημιούργησε το νέο component Main


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Εμφάνιση Header για όλες τις διαδρομές εκτός από το /login */}
        <Route path="/login" element={<Login />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/admin" element={<Admin />} />

        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
               
              
                            </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};






export default App;
