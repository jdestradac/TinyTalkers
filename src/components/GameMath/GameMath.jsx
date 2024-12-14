"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useFetchOptions from "../../hooks/useFetchOptions";
import GameMathUI from "./GameMathUI";
import Image from "next/image";
import {updateLevelInFirestore, encodeBase64, decodeBase64} from "../../helpers/helper"

const GameMath = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [feedback, setFeedback] = useState("");
  const [sequence, setSequence] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [optionsAns, setOptionsAns] = useState([]);
  const { options, loading, currentLevelGame} = useFetchOptions("gameFour");

  const handleOptionClick = (answer) => {
    if (answer === correctAnswer) {
      const updatedSequence = sequence.map((num) =>
        num === null ? answer : num
      );
      setSequence(updatedSequence);
      setIsAnswered(true);
      setFeedback("¡Correcto! Has completado la secuencia.");
    } else {
      setFeedback("¡Incorrecto! Intenta de nuevo.");
    }
  };
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleNextLevel = async () => {
    const nextLevel = currentLevel + 1;
    if(currentLevelGame < nextLevel && nextLevel < 9){
      await updateLevelInFirestore(nextLevel, "GameFour")
    }
    setCurrentLevel(nextLevel);
    const encodedLevel = encodeBase64(nextLevel.toString());
    router.push(`?level=${encodedLevel}`);
    setIsAnswered(false);
    setFeedback("");
  };

  const generateSequence = (level) => {
    const levelData = options?.find((item) => item.level === level);
  
    if (!levelData) {
      console.log(`No data found for level ${level}`);
      return;
    }
    setSequence(levelData.sequence);
    setCorrectAnswer(levelData.correctAnswer);
    setOptionsAns(shuffleArray(levelData.answerOptions));
  };

  const handleRestart = () => {
    router.push("/");
    setFeedback("");
  };

  useEffect(() => {
    const levelParam = searchParams.get("level");
    if (levelParam) {
      const decodedLevel = parseInt(decodeBase64(levelParam), 10) || 1;
      setCurrentLevel(decodedLevel);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!loading) {
      generateSequence(currentLevel);
    }
  }, [currentLevel, loading]);


  if (loading) {
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
    <GameMathUI
      currentLevel={currentLevel}
      sequence={sequence}
      optionsAns={optionsAns}
      isAnswered={isAnswered}
      feedback={feedback}
      handleOptionClick={handleOptionClick}
      handleNextLevel={handleNextLevel}
      handleRestart={handleRestart}
    />
  );
};

export default GameMath;
