import LevelHolder from "../LevelHolder";
import Tooltip from "../Tooltip";

const GameMathUI = ({
  currentLevel,
  levelFromUrl,
  sequence,
  optionsAns,
  isAnswered,
  feedback,
  handleOptionClick,
  handleNextLevel,
  handleRestart,
}) => {
  return (
    <div>
      <div className="pt-4 pl-5">
        <Tooltip
          title={"Completa la secuencia"}
          text={"Estimular el pensamiento logico-matematico"}
        />
      </div>

      <div className="flex justify-center items-center flex-col min-h-[80vh] bg-[#ededed]">
        
        <LevelHolder>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-2   flex flex-col items-center justify-center">
              <div>
                <p className="text-xl">Nivel:</p>
              </div>
              <div>
                <p className="text-2xl">{levelFromUrl}</p>
              </div>
            </div>
          </div>
        </LevelHolder>
        <div className="relative w-[600px] max-w-[800px] p-8 rounded-xl shadow-xl overflow-hidden bg-[#a3d6ff]">
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
              <h1 className="text-3xl font-extrabold text-center text-[#614d48] mb-6">
                ¡Completa la Secuencia Numérica!
              </h1>
              <div className="text-4xl text-center mb-8 text-[#614d48] flex justify-center mx-4">
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
                      className="text-5xl font-semibold text-[#614d48] mx-6 hover:text-yellow-600 transition-all duration-300"
                      key={index}
                    >
                      {num}
                    </span>
                  )
                )}
              </div>
              {!isAnswered && (
                <div className="flex justify-center space-x-6 mb-6">
                  {optionsAns.map((option, index) => (
                    <button
                      key={index}
                      className="bg-[#feca7a] text-white text-2xl py-3 px-6 rounded-xl hover:bg-yellow-500 transition-all duration-200"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              {isAnswered &&
                (currentLevel === 8 ? (
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-[#614d48] mb-6">
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
                  <div className="text-center mt-6">
                    <button
                      className="bg-green-600 text-white text-2xl py-3 px-6 rounded-xl hover:bg-green-500 transition-all duration-200"
                      onClick={handleNextLevel}
                    >
                      Siguiente Nivel
                    </button>
                    <div className="text-center text-xl text-black mt-4">
                      {feedback}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMathUI;
