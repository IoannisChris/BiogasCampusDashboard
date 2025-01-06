import React from "react";
import { useNavigate } from "react-router-dom";

const EducationalTools = () => {
  const navigate = useNavigate();

  return (
    <div className="educational-tools-page">
      <header className="page-header">
        <h1>Educational Tools</h1>
        <p>Learn more about biogas systems and their environmental benefits.</p>
      </header>

      <main className="educational-content">
        <section className="overview">
          <h2>What is a Biogas System?</h2>
          <p>
            A biogas system converts organic waste into renewable energy through anaerobic digestion.
            It reduces methane emissions and contributes to sustainability.
          </p>
        </section>

        <section className="benefits">
          <h2>Environmental Benefits</h2>
          <ul>
            <li>Reduces organic waste in landfills.</li>
            <li>Generates renewable energy.</li>
            <li>Prevents methane emissions.</li>
          </ul>
        </section>

        <section className="quiz">
          <h2>Test Your Knowledge</h2>
          <p>Take a short quiz to test what you've learned about biogas systems!</p>
          <button className="btn-quiz" onClick={() => navigate("/quiz")}>Start Quiz</button>
        </section>
      </main>

      <footer className="page-footer">
        <p>Empowering sustainability through education.</p>
      </footer>
    </div>
  );
};

export default EducationalTools;
