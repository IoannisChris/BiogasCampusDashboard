import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "./assets/images/images.png";


const QuizPage = () => {
    const AppBar = () => {
        return (
          <header className="app-bar">
            <div className="logo-container">
              <img src={logoImage} alt="Λογότυπο" className="logo-image" />
              <div className="logo-text">
                <h1>Campus Farm Waste-to-Energy</h1>
                <h2>Biogas System Dashboard</h2>
              </div>
            </div>
            <nav className="nav">
              <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
       
          
                <li><Link to="/contact">Επικοινωνία</Link></li>
              </ul>
            </nav>
          </header>
        );
      };

  const questions = [
    {
      question: "What is a biogas system?",
      options: [
        "A system that uses fossil fuels",
        "A system that converts organic waste into energy",
        "A system that generates electricity from water",
      ],
      answer: 1, // Index of the correct answer
    },
    {
      question: "Which gas does biogas help reduce?",
      options: ["Methane", "Oxygen", "Carbon Dioxide"],
      answer: 0,
    },
    {
      question: "What is one benefit of biogas?",
      options: [
        "Increases waste in landfills",
        "Prevents methane emissions",
        "Generates nuclear energy",
      ],
      answer: 1,
    },
    {
      question: "What process generates biogas?",
      options: ["Anaerobic digestion", "Combustion", "Electrolysis"],
      answer: 0,
    },
    {
      question: "What type of waste is used in biogas systems?",
      options: ["Organic waste", "Plastic waste", "Metal waste"],
      answer: 0,
    },
    {
      question: "Which of the following is a byproduct of biogas production?",
      options: ["Methane", "Carbon Dioxide", "Both Methane and Carbon Dioxide"],
      answer: 2,
    },
    {
      question: "How does biogas contribute to sustainability?",
      options: [
        "By reducing fossil fuel usage",
        "By increasing landfill waste",
        "By creating non-renewable energy",
      ],
      answer: 0,
    },
    {
      question: "What is the primary component of biogas?",
      options: ["Methane", "Oxygen", "Nitrogen"],
      answer: 0,
    },
    {
      question: "What is a key environmental benefit of biogas?",
      options: [
        "Prevention of methane release into the atmosphere",
        "Increased water pollution",
        "Creation of hazardous waste",
      ],
      answer: 0,
    },
    {
      question: "What energy source does biogas replace?",
      options: ["Fossil fuels", "Solar energy", "Hydroelectric energy"],
      answer: 0,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (index) => {
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-page">
      <AppBar />
      {!showResult ? (
        <div className="quiz-container">
          <h2>{questions[currentQuestion].question}</h2>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleAnswerClick(index)}
                className="quiz-option"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="quiz-result">
          <h2>Your Score: {score}/{questions.length}</h2>
          <button onClick={() => window.location.reload()}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
