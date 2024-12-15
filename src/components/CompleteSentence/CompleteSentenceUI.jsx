import React from "react";
import BlueCard from "../BlueCard";
import YellowCard from "../YellowCard";
import Tooltip from "../Tooltip";
import LevelHolder from "../LevelHolder";
import Image from "next/image";

const CompleteSentenceUI = ({
  question,
  img,
  level,
  feedback,
  options,
  checkOptions,
  currentLevel,
  handleRestart,
}) => {
  console.log(options);

  return (
    <div>
      <div className="pt-4 pl-5">
        <Tooltip
          title={"Completa la oracion"}
          text={
            "Estimular el uso de vocabulario descriptivo y la comprensión de preguntas"
          }
        />
      </div>
      <LevelHolder>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-2   flex flex-col items-center justify-center">
            <div>
              <p className="text-xl text-[#614d48]">Nivel:</p>
            </div>
            <div>
              <p className="text-2xltext-[#614d48]">{level}</p>
            </div>
          </div>
        </div>
      </LevelHolder>

      {currentLevel > 6 ? (
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
        <>
          <div className="flex flex-col items-center gap-4 mt-3">
            <div className="flex justify-center gap-[300px]">
              {img && (
                <YellowCard key="index">
                  <img src={img} alt="example" width={160} height={60} />
                </YellowCard>
              )}
            </div>

            <div>
              <p className="text-3xl text-[#614d48] ">{question}</p>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-10">
            {options?.map((option, index) => (
              <BlueCard key={index}>
                <button
                  onClick={() => checkOptions(option)}
                  className="text-white text-xl py-2 px-4 rounded"
                >
                  {option}
                </button>
              </BlueCard>
            ))}
          </div>
        </>
      )}
      <div className="flex justify-center items-center mt-8">
        {" "}
        {feedback && <div className="feedback-message text-lg">{feedback}</div>}
      </div>
    </div>
  );
};
export default CompleteSentenceUI;
