"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  updateLevelInFirestore,
  encodeBase64,
  decodeBase64,
} from "../../helpers/helper";
import CompleteSentenceUI from "./CompleteSentenceUI";
import useFetchOptions from "../../hooks/useFetchOptions";
import Image from "next/image";

const CompleteSentence = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ question , setQuestion] = useState ()
  const { options, loading, currentLevelGame } = useFetchOptions("gameTwo");
  const [feedback, setFeedback] = useState("");
  const [currentLevel, setCurrentLevel] = useState(1);
  console.log(options)

  const getDataForLevel = (level) => {
    const filteredData = options.filter((item) => item.level === level);
    if (filteredData.length === 0) {
      console.log("No se encontraron datos para el nivel proporcionado");
      return;
    }
  
    const ramdomNumber = Math.floor(Math.random() * filteredData.length);
    console.log(ramdomNumber);
    const randomElement = filteredData[ramdomNumber];
  
   
    const otherAnswers = options.filter(
      (item) => item.id !== randomElement.id
    );
    const selectedAnswers = [];
  
    // Asegúrate de que no entres en un ciclo infinito si no hay suficientes elementos en otherAnswers
    while (selectedAnswers.length < 2 && otherAnswers.length > 0) {
      const ramdomNumber2 = Math.floor(Math.random() * otherAnswers.length);  // Cambiado a otherAnswers.length
      const randomAnswer = otherAnswers[ramdomNumber2];
      console.log(randomAnswer);
      if (randomAnswer && !selectedAnswers.includes(randomAnswer?.answer)) {
        selectedAnswers.push(randomAnswer?.answer);
        otherAnswers.splice(ramdomNumber2, 1);  // Elimina la respuesta seleccionada para evitar duplicados
      }
    }
  
    selectedAnswers.push(randomElement.answer);
  
    return {
      categoria: randomElement?.category,
      pregunta: randomElement?.question,
      respuesta: randomElement?.answer,
      imagen: randomElement?.img,
      otrasRespuestas: selectedAnswers,
      nivel: randomElement?.level,
    };
  };

  useEffect(() => {
    if (!loading && options.length > 0) {
      const quest = getDataForLevel(currentLevel.toString());
      setQuestion(quest)
    }
  }, [loading, currentLevel]);

  const handleNextLevel = async () => {
    const nextLevel = currentLevel + 1;
    if(currentLevelGame < nextLevel && nextLevel < 7){
      await updateLevelInFirestore(nextLevel, "completaLaFrase")
    }
    setCurrentLevel(nextLevel);
    const encodedLevel = encodeBase64(nextLevel.toString());
    router.push(`?level=${encodedLevel}`);
    setFeedback("");
  };

  const checkOptions = async (userAns) => {
    if (userAns = question.respuesta) {
      setFeedback("¡Correcto! Adivinaste.");
      setTimeout(() => {
        setFeedback(null);
      }, 3000);

      await handleNextLevel()

    } else {
      setFeedback("¡No te rindas! Intenta de nuevo.");
      setTimeout(() => {
        setFeedback(null);
      }, 2000);
      console.log("Incorrecto");
    }
  };

  useEffect(() => {
    const levelParam = searchParams.get("level");
    if (levelParam) {
      const decodedLevel = parseInt(decodeBase64(levelParam), 10) || 1;
      setCurrentLevel(decodedLevel);
    }
  }, [searchParams]);

  const handleRestart = () => {
    router.push("/");
    setFeedback("");
  };


  return (
    <>
    {loading ? (
      <div className="flex justify-center items-center h-screen">
        <Image
          width={100}
          height={100}
          src="/bee.png"
          alt="Loading..."
          className="animate-spin"
        />
      </div>
    ) : (
      <CompleteSentenceUI
        question={question?.pregunta}
        img={question?.imagen}  // Added optional chaining for safety
        level={question?.nivel}  // Added optional chaining for safety
        options={question?.otrasRespuestas} 
        checkOptions={checkOptions}
        feedback={feedback}
        currentLevel={currentLevel}
        handleRestart={handleRestart}
      />
    )}
    </>
  );
};

export default CompleteSentence;
