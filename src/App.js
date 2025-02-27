import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Main from "./Main";
import Admin from "./Admin";
import EducationalTools from "./EducationalTools";
import QuizPage from "./QuizPage";
import ContactUs from "./ContactUs"; 
import UserManagement from "./UserManagement"; 
import SignUp from './SignUp';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/educational-tools" element={<EducationalTools />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/contact" element={<ContactUs />} /> 
        <Route path="/user-management" element={<UserManagement />} /> 
        <Route path="/signup" element={<SignUp />} />
        
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>{/* Προσθέστε nested routes εδώ αν χρειάζεται */}</Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
