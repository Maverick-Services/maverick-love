import React, { useState } from 'react';
import { Heart, HeartCrack, Sparkles } from 'lucide-react';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      text: "How often do you think about them during the day?",
      options: ["All the time", "Often", "Sometimes", "Rarely"]
    },
    {
      id: 2,
      text: "Do you feel butterflies in your stomach when you see them?",
      options: ["Always", "Most times", "Occasionally", "Never"]
    },
    {
      id: 3,
      text: "Would you change your plans just to spend time with them?",
      options: ["Definitely", "Probably", "Maybe", "No"]
    },
    {
      id: 4,
      text: "Do you see a future with them?",
      options: ["Absolutely", "I think so", "Not sure", "Not really"]
    },
    {
      id: 5,
      text: "Does their happiness matter more than yours?",
      options: ["Always", "Usually", "Sometimes", "Never"]
    }
  ];

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate prediction
      const positiveAnswers = newAnswers.filter(
        (a) => ["Always", "Definitely", "Absolutely", "All the time"].includes(a)
      ).length;

      setTimeout(() => {
        setPrediction(positiveAnswers >= 3 ? "Love" : "Not Love");
        setShowResult(true);
      }, 1000);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setPrediction(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {!showResult ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-center mb-8">
              <Heart className="w-12 h-12 text-pink-500 animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Love Predictor
            </h1>
            <div className="space-y-6">
              <div className="text-center text-sm text-gray-500 mb-4">
                Question {currentStep + 1} of {questions.length}
              </div>
              <h2 className="text-xl text-center text-gray-700 mb-6">
                {questions[currentStep].text}
              </h2>
              <div className="space-y-3">
                {questions[currentStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="w-full py-3 px-6 text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500">
            <div className="flex flex-col items-center justify-center space-y-6">
              {prediction === "Love" ? (
                <>
                  <Heart className="w-24 h-24 text-pink-500 animate-bounce" />
                  <Sparkles className="w-8 h-8 text-yellow-400 absolute top-1/3 right-1/3 animate-spin" />
                  <Sparkles className="w-8 h-8 text-yellow-400 absolute top-1/3 left-1/3 animate-spin" />
                  <h2 className="text-4xl font-bold text-pink-500 animate-pulse">
                    It's Love! ❤️
                  </h2>
                  <p className="text-gray-600 text-center">
                    The stars align! Your heart speaks volumes of true love!
                  </p>
                </>
              ) : (
                <>
                  <HeartCrack className="w-24 h-24 text-gray-400 animate-pulse" />
                  <h2 className="text-4xl font-bold text-gray-500">
                    Not Quite Love
                  </h2>
                  <p className="text-gray-600 text-center">
                    Keep your heart open - the right love will find its way!
                  </p>
                </>
              )}
              <button
                onClick={resetQuiz}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
