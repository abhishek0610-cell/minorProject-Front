import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import confetti from "canvas-confetti"; // Import the canvas-confetti library

const Quizzes = () => {
  // Quiz data organized semester-wise and subject-wise
  const quizData = {
    "Semester 1": {
      BEE: [
        {
          question: "What is the SI unit of electric current?",
          options: ["Volt", "Stack", "Ampere", "Watt"],
          answer: "Ampere",
        },
        {
          question: "What does a capacitor store?",
          options: [
            "Electric charge",
            "Magnetic flux",
            "Current",
            "Resistance",
          ],
          answer: "Electric charge",
        },
      ],
      "Communication and Skills": [
        {
          question:
            "Which of the following is a key component of effective communication?",
          options: [
            "Listening",
            "Speaking loudly",
            "Ignoring feedback",
            "Avoiding questions",
          ],
          answer: "Listening",
        },
      ],
    },
    "Semester 2": {
      "Operating Systems": [
        {
          question: "Which of the following is not an OS?",
          options: ["Linux", "Windows", "Oracle", "MacOS"],
          answer: "Oracle",
        },
      ],
    },
  };

  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
    setSelectedSubject("");
    setAnswers({});
    setScore(null);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setAnswers({});
    setScore(null);
  };

  const handleOptionChange = (questionIndex, selectedOption) => {
    setAnswers({ ...answers, [questionIndex]: selectedOption });
  };

  const handleSubmit = () => {
    if (!selectedSemester || !selectedSubject) return; // Prevent submission if not selected

    const questions = quizData[selectedSemester][selectedSubject];
    let calculatedScore = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.answer) calculatedScore++;
    });

    setScore(calculatedScore);
  };

  // Confetti effect when the score is full
  useEffect(() => {
    if (score === quizData[selectedSemester]?.[selectedSubject]?.length) {
      // Trigger confetti when score is full
      confetti({
        particleCount: 600,
        spread: 250,
        origin: { y: 0.4 , x:0.5},
        colors: ["#ff0", "#ff5a5f", "#a2ff0a", "#00f"],
      });
    }
  }, [score, selectedSemester, selectedSubject]);

  return (
    <Layout>
      <div className="quiz-container bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg rounded-xl p-8 max-w-3xl mx-auto mt-8">
        <h1 className="quiz-title text-4xl font-extrabold text-center text-blue-700 mb-10">
          B.Tech CSE Quiz
        </h1>

        {/* Semester Selection */}
        <div className="quiz-select mb-6">
          <label className="text-lg font-semibold text-gray-800 block mb-2">
            Select Semester:
          </label>
          <select
            onChange={handleSemesterChange}
            value={selectedSemester}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200"
          >
            <option value="">--Select--</option>
            {Object.keys(quizData).map((semester) => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Selection */}
        {selectedSemester && (
          <div className="quiz-select mb-6">
            <label className="text-lg font-semibold text-gray-800 block mb-2">
              Select Subject:
            </label>
            <select
              onChange={handleSubjectChange}
              value={selectedSubject}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200"
            >
              <option value="">--Select--</option>
              {selectedSemester &&
                Object.keys(quizData[selectedSemester]).map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Questions */}
        {selectedSubject && (
          <div className="quiz-questions mt-10 space-y-8">
            {quizData[selectedSemester]?.[selectedSubject]?.map((q, index) => (
              <div
                key={index}
                className="question-card p-6 bg-white rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {q.question}
                </h3>
                {q.options.map((option, i) => (
                  <label
                    key={i}
                    className="option-label block mb-3 text-gray-700 flex items-center cursor-pointer hover:text-blue-500"
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleOptionChange(index, option)}
                      className="mr-3 rounded-full text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
            <button
              className="submit-btn w-full p-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none transition-all duration-200"
              onClick={handleSubmit}
            >
              Submit Quiz
            </button>
          </div>
        )}

        {/* Score Display */}
        {score !== null && (
          <div className="score-display text-center mt-8 text-lg font-bold text-green-600">
            You scored <span className="text-2xl">{score}</span> out of{" "}
            <span className="text-2xl">{quizData[selectedSemester]?.[selectedSubject]?.length}</span>!
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Quizzes;
