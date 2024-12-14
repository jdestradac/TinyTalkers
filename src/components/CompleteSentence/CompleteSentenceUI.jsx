import React from "react";
import BlueCard from "../BlueCard";
import YellowCard from "../YellowCard";
import Tooltip from "../Tooltip";
import LevelHolder from "../LevelHolder";
import Image from "next/image";


const CompleteSentenceUI = ({ question, img, level, feedback, options, checkOptions }) => {

    if (!img.length) {
        return (
          <div className="flex justify-center items-center h-screen">
            <Image
              width={100}
              height={100}
              src="/bee.png"
              alt="Loading..."
              className="animate-spin"
            />
          </div>
        );
      }
      
  return (
    <div>
    <div className="pt-4 pl-5">
      <Tooltip title={"Completa la oracion"} text={"Estimular el uso de vocabulario descriptivo y la comprensión de preguntas"} />
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
    <div className="flex flex-col items-center gap-4 mt-3">
      <div className="flex justify-center gap-[300px]">
        <YellowCard key="index">
          <img
            key="card"
            src={img}
            alt="example"
            style={{ cursor: 'pointer', margin: '10px', width: '150px' }}
          />
        </YellowCard>
      </div>

      <div >
        <p className="text-3xl text-[#614d48] ">{question}</p>
      </div>
    </div>
    <div className="flex justify-center gap-4 mt-10">
      {options.map((option, index) => (
        <BlueCard key={index}>
          <button
            onClick={() => checkOptions(option.isCorrect)}
            className=" text-white text-xl py-2 px-4 rounded"
          >
            {option.options}
          </button>
        </BlueCard>
      ))}
    </div>
    <div className="flex justify-center items-center mt-8"> {feedback && <div className="feedback-message text-lg">{feedback}</div>}</div>
  </div>
  );
}
export default CompleteSentenceUI;