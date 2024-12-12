"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const App = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [levelFromUrl, setLevelFromUrl] = useState(1); // Default value for level
  const [feedback, setFeedback] = useState("");
  const [sequence, setSequence] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(levelFromUrl); // Use state to manage the level
  const [options, setOptions] = useState([]); // Store answer options

  useEffect(() => {
    const levelParam = searchParams.get("level");
    if (levelParam) {
      const level = parseInt(levelParam) || 1;
      setLevelFromUrl(level);
      setCurrentLevel(level);
    }
  }, [searchParams]);

  // Function to generate the sequence and predefined options based on the level
  const generateSequence = (level) => {
    let newSequence = [];
    let correctAns = 0;
    let answerOptions = []; // Predefined options

    switch (level) {
      case 1:
        newSequence = [3, 6, 9, null, 15];
        correctAns = 12;
        answerOptions = [12, 10, 14, 8];
        break;
      case 2:
        newSequence = [1, 3, 5, null, 9];
        correctAns = 7;
        answerOptions = [7, 5, 9, 11];
        break;
      case 3:
        newSequence = [3, 6, 9, null, 15];
        correctAns = 12;
        answerOptions = [12, 13, 11, 14];
        break;
      case 4:
        newSequence = [4, 8, 12, null, 20];
        correctAns = 16;
        answerOptions = [16, 12, 18, 20];
        break;
      case 5:
        newSequence = [5, 10, 15, null, 25];
        correctAns = 20;
        answerOptions = [20, 18, 22, 19];
        break;
      case 6: // Incrementing by squares
        newSequence = [1, 4, 9, null, 25];
        correctAns = 16; // 4^2
        answerOptions = [16, 12, 14, 18];
        break;
      case 7: // Fibonacci-like sequence
        newSequence = [1, 2, 3, 5, null, 13];
        correctAns = 8; // Sum of 3 + 5
        answerOptions = [8, 10, 6, 7];
        break;
      case 8: // Multiplying sequence
        newSequence = [2, 6, 18, null, 162];
        correctAns = 54; // Multiply by 3
        answerOptions = [54, 36, 48, 60];
        break;
    }

    setSequence(newSequence);
    setCorrectAnswer(correctAns);
    setOptions(shuffleArray(answerOptions)); // Shuffle options
  };

  // Function to shuffle the array of options
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    generateSequence(currentLevel);
  }, [currentLevel]);

  const handleOptionClick = (answer) => {
    if (answer === correctAnswer) {
      const updatedSequence = sequence.map((num) =>
        num === null ? answer : num
      );
      setSequence(updatedSequence);
      setIsAnswered(true); // Mark as answered
      setFeedback("¡Correcto! Has completado la secuencia.");
    } else {
      setFeedback("¡Incorrecto! Intenta de nuevo.");
    }
  };

  const handleNextLevel = () => {
    const nextLevel = currentLevel + 1; // Increment level
    setCurrentLevel(nextLevel);
    router.push(`?level=${nextLevel}`); // Update URL with next level
    setIsAnswered(false); // Reset state for the next level
    setFeedback(""); // Clear feedback
  };

  const handleRestart = () => {
    setCurrentLevel(1);
    router.push("/"); // Reset to level 1
    setFeedback(""); // Clear feedback
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 p-4">
      <div className="relative w-[600px] max-w-[800px] p-8 rounded-xl shadow-xl overflow-hidden bg-yellow-50">
        {currentLevel > 8 ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-700 mb-6">
              ¡Felicidades! Has completado todos los niveles.
            </h1>
            <button
              className="bg-blue-600 text-white text-2xl py-3 px-6 rounded-xl hover:bg-blue-500 transition-all duration-200"
              onClick={handleRestart}
            >
              Volver al Inicio
            </button>
          </div>
        ) : (
          <div>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                opacity: 0.2,
                backgroundImage:
                  "url(https://th.bing.com/th/id/R.7a767c00395390c1ab9b4aebbc0aac8a?rik=SFsmmmxnmbU5fQ&riu=http%3a%2f%2fst2.depositphotos.com%2f3580719%2f9679%2fv%2f950%2fdepositphotos_96793006-stock-illustration-seamless-background-with-formulas-and.jpg&ehk=hw87x%2bt3XMGJ%2bqDslepVDF3AicOtCTD7J%2btyyUBMJaI%3d&risl=&pid=ImgRaw&r=0)",
              }}
            ></div>

            <div className="relative z-10">
              <h1 className="text-3xl font-extrabold text-center text-black mb-6">
                ¡Completa la Secuencia Numérica!
              </h1>
              <div className="text-4xl text-center mb-8 text-black flex justify-center mx-4">
                {sequence.map((num, index) =>
                  num === null ? (
                    <span
                      className="font-bold text-5xl text-yellow-500 mx-4"
                      key={index}
                    >
                      _
                    </span>
                  ) : (
                    <span
                      className="text-5xl font-semibold text-yellow-700 mx-6 hover:text-yellow-600 transition-all duration-300"
                      key={index}
                    >
                      {num}
                    </span>
                  )
                )}
              </div>

              {!isAnswered && (
                <div className="flex justify-center space-x-6 mb-6">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      className="bg-yellow-600 text-white text-2xl py-3 px-6 rounded-xl hover:bg-yellow-500 transition-all duration-200"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {isAnswered && (
                <div className="text-center mt-6">
                  <button
                    className="bg-green-600 text-white text-2xl py-3 px-6 rounded-xl hover:bg-green-500 transition-all duration-200"
                    onClick={handleNextLevel}
                  >
                    Siguiente Nivel
                  </button>
                </div>
              )}

              <div className="text-center text-xl text-black mt-4">
                {feedback}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
