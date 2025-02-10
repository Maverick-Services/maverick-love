import React, { useState } from 'react';
import { Heart, HeartCrack, Sparkles, ArrowLeft, Gift, ExternalLink, Send } from 'lucide-react';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [partnerEmail, setPartnerEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [sendStatus, setSendStatus] = useState('');

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

  const giftSuggestions = {
    love: [
      {
        id: 'l1',
        title: "Elegant Heart Necklace",
        description: "A stunning heart-shaped pendant symbolizing your deep connection and everlasting love.",
        price: "$7 - $9",
        link: "https://shopdew.com/product-category/nacklace/"
      },
      {
        id: 'l2',
        title: "Crystal Drop Ear Rings",
        description: "Beautifully crafted crystal earrings that add a touch of sparkle to every moment shared together.",
        price: "$5 - $9",
        link: "https://shopdew.com/product-category/ear-rings/"
      },
      {
        id: 'l3',
        title: "Personalized Name Bracelet",
        description: "A delicate bracelet engraved with both your names, a token of your growing bond.",
        price: "$4 - $7",
        link: "https://shopdew.com/product-category/bras-let/"
      }
    ],
    oneSided: [
      {
        id: 'o1',
        title: "Elegant Heart Necklace",
        description: "A stunning heart-shaped pendant symbolizing your deep connection and everlasting love.",
        price: "$7 - $9",
        link: "https://shopdew.com/product-category/nacklace/"
      },
      {
        id: 'o2',
        title: "Crystal Drop Ear Rings",
        description: "Beautifully crafted crystal earrings that add a touch of sparkle to every moment shared together.",
        price: "$5 - $9",
        link: "https://shopdew.com/product-category/ear-rings/"
      },
      {
        id: 'o3',
        title: "Personalized Name Bracelet",
        description: "A delicate bracelet engraved with both your names, a token of your growing bond.",
        price: "$4 - $7",
        link: "https://shopdew.com/product-category/bras-let/"
      }
    ]
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
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
    setShowGifts(false);
  };

  const handleSendGift = (gift) => {
    setSelectedGift(gift);
    setShowForm(true);
  };

  const handleSubmitGift = (e) => {
    e.preventDefault();
    setSendStatus('sending');
    
    // Simulate sending gift
    setTimeout(() => {
      setSendStatus('sent');
      setTimeout(() => {
        setShowForm(false);
        setSelectedGift(null);
        setPartnerEmail('');
        setMessage('');
        setSendStatus('');
      }, 2000);
    }, 1500);
  };

  const GiftSection = ({ type }) => {
    const gifts = type === "Love" ? giftSuggestions.love : giftSuggestions.oneSided;
    
    return (
      <div className="mt-8 space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 text-center">
          {type === "Love" ? "Perfect Gifts to Express Your Love" : "Thoughtful Gifts for Your Special Someone"}
        </h3>
        <div className="grid gap-6 mt-4">
          {gifts.map((gift) => (
            <div key={gift.id} className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800">{gift.title}</h4>
                  <p className="text-gray-600 mt-1">{gift.description}</p>
                  <p className="text-purple-600 font-medium mt-2">{gift.price}</p>
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => handleSendGift(gift)}
                      className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Send Gift
                    </button>
                    <a
                      href={gift.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center p-4">
      {showForm && selectedGift && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-semibold mb-4">Send "{selectedGift.title}"</h3>
            <form onSubmit={handleSubmitGift} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient's Email
                </label>
                <input
                  type="email"
                  required
                  value={partnerEmail}
                  onChange={(e) => setPartnerEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="partner@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Personal Message
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 h-32"
                  placeholder="Write a heartfelt message..."
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={sendStatus !== ''}
                  className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:bg-gray-400"
                >
                  {sendStatus === 'sending' ? 'Sending...' : 
                   sendStatus === 'sent' ? 'Sent! ✨' : 'Send Gift'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedGift(null);
                    setPartnerEmail('');
                    setMessage('');
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`py-2 px-2 mt-4 text-left flex items-center justify-center rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ${
                  currentStep === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-500 text-white hover:bg-gray-600"
                }`}
              >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
              </button>
              <h2 className="text-xl text-center text-gray-700 mb-6">
                {questions[currentStep].text}
              </h2>
              <div className="space-y-3">
                {questions[currentStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="w-full py-3 px-6 text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform sm:hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
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
              
              {!showGifts && (
                <button
                  onClick={() => setShowGifts(true)}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  <Gift className="w-5 h-5" />
                  Show Gift Ideas
                </button>
              )}

              {showGifts && <GiftSection type={prediction} />}

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