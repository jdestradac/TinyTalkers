
"use client";
import React, { useState, useEffect } from "react";
import Tooltip from "../../components/Tooltip";
import Image from 'next/image';
import YellowCard from "../../components/YellowCard";
import { db } from "../../../googleinit.js";
import { doc, getDoc, getDocs, where, query, limit, collection, updateDoc } from "firebase/firestore";
import BlueCard from "../../components/BlueCard";
import LevelHolder from "../../components/LevelHolder"

export default function GameOne() {
  const [question, setQuestion] = useState("");
  const [img, setImg] = useState("");
  const [level, setLevel] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetchQuestion();
  }, [level]);

  const fetchCurrentLevel = async () => {
    try {
      const docRef = doc(db, "juegos", "completaLaFrase");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const firestoreLevel = docSnap.data().currentLevel;
        console.log("Nivel en Firestore:", firestoreLevel);

        // Solo actualiza el estado si es diferente
        if (firestoreLevel !== level) {
          setLevel(firestoreLevel);
          console.log("Nivel actualizado localmente:", firestoreLevel);
        }
      } else {
        console.error("El documento no existe en Firestore.");
      }
    } catch (error) {
      console.error("Error obteniendo nivel desde Firestore:", error);
    }
  };

  useEffect(() => {
    const initializeGame = async () => {
      await fetchCurrentLevel(); // Asegura que el nivel está sincronizado con Firestore
      await fetchQuestion(); // Luego obtiene las preguntas
    };

    initializeGame();
  }, [score]);

  const fetchQuestion = async () => {
    let questions = [];
    try {


      const queryRef = query(
        collection(db, 'gameTwo'),
        where('level', '==', level),
        limit(8)
      );
      const snapShot = await getDocs(queryRef);

      if (!snapShot.empty) {
        questions = snapShot.docs.map((doc) => doc.data());
        console.log("Preguntas obtenidas:", questions);
      } else {
        console.log("No se encontraron preguntas para este nivel.");
        return;
      }
    } catch (error) {
      console.error("Error fetching question data:", error);
      return;
    }

    if (questions.length === 0) {
      console.error("No questions found; exiting function.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedQuestion = questions[randomIndex];
    setQuestion(selectedQuestion.question);
    setImg(selectedQuestion.img)
    const category = selectedQuestion.category;

    try {
      const queryRef = query(
        collection(db, 'gameTwo'),
        where("category", "==", category),
        limit(8)
      );
      const differentOptionsSnapShot = await getDocs(queryRef);

      if (!differentOptionsSnapShot.empty) {
        const filteredDocs = differentOptionsSnapShot.docs.filter(
          (doc) => doc.data().answer !== selectedQuestion.answer
        );

        const differentOptions = filteredDocs.slice(0, 2).map((doc) => ({
          options: doc.data().answer,
          isCorrect: false,
        }));

        const optionsArray = [
          { options: selectedQuestion.answer, isCorrect: true },
          ...differentOptions,
        ];

        setOptions(shuffleArray(optionsArray));
        console.log("Array final de opciones:", optionsArray);
      } else {
        console.log("No matching documents found in the second query.");
      }
    } catch (error) {
      console.error("Error fetching different images:", error);
    }
  };


  // const checkOptions = async (isCorrect) => {
  //   if (isCorrect) {
  //     setFeedback("¡Correcto! Adivinaste.");
  //     setTimeout(() => {
  //       setFeedback(null); 
  //     }, 3000); 
  //     setScore((prevScore) => {
  //       const newScore = prevScore + 1;
  //       console.log("El score es",newScore)
  //       if ((newScore) % 3 === 0) {

  //         const nextLevel = String(Number(level) + 1); 
  //         setLevel(nextLevel); 
  //         updateLevelInFirestore(nextLevel); 
  //       }

  //       return newScore; 
  //     });
  //   } else {
  //     setFeedback("¡No te rindas! Intenta de nuevo.");
  //     setTimeout(() => {
  //       setFeedback(null); 
  //     }, 2000); 
  //     console.log("Incorrecto");
  //   }
  // };


  // const updateLevelInFirestore = async (newLevel) => {
  //   try {
  //     const docRef = doc(db, "juegos", "adivinaQuien");
  //     await updateDoc(docRef, {
  //       currentLevel: newLevel, // Actualizar el campo
  //     });
  //     console.log("Nivel actualizado en Firestore:", newLevel);
  //   } catch (error) {
  //     console.error("Error actualizando nivel en Firestore:", error);
  //   }
  // };
  const checkOptions = async (isCorrect) => {
    if (isCorrect) {
      setFeedback("¡Correcto! Adivinaste.");
      setTimeout(() => {
        setFeedback(null);
      }, 3000);
      setScore((prevScore) => {
        const newScore = prevScore + 1;

        if ((newScore) % 3 === 0) {
          // Actualiza el nivel solo cuando el puntaje sea múltiplo de 3
          const nextLevel = String(Number(level) + 1);
          setLevel(nextLevel);
          updateLevelInFirestore(nextLevel);
        }

        return newScore;
      });
    } else {
      setFeedback("¡No te rindas! Intenta de nuevo.");
      setTimeout(() => {
        setFeedback(null);
      }, 2000);
      console.log("Incorrecto");
    }
  };

  const updateLevelInFirestore = async (newLevel) => {
    try {
      const docRef = doc(db, "juegos", "adivinaQuien");
      await updateDoc(docRef, {
        currentLevel: newLevel, // Actualizar el campo
      });
      console.log("Nivel actualizado en Firestore:", newLevel);
    } catch (error) {
      console.error("Error actualizando nivel en Firestore:", error);
    }
  };

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

