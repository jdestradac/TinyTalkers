
 "use client";
import React, { useState, useEffect } from "react";
import Tooltip from "../../components/Tooltip";
import Image from 'next/image';
import YellowCard from "../../components/YellowCard";
import { db } from "../../../googleinit";
import { doc,getDoc, getDocs, where, query, limit, collection,updateDoc  } from "firebase/firestore";
import BlueCard from "../../components/BlueCard";
import LevelHolder from "../../components/LevelHolder"

export default function GameOne() {
  const [question, setQuestion] = useState(null);
  const [hint, setHints] = useState([]);
  const [level, setLevel] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [image, setImage] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetchQuestion();
  }, [score,level]); 

  const fetchCurrentLevel = async () => {
    try {
      const docRef = doc(db, "juegos", "adivinaQuien");
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
      console.log("Level value:", level);
  
      // Consulta para obtener hasta 3 preguntas del mismo nivel
      const queryRef = query(
        collection(db, 'gameOne'),
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
  
    // Selecciona una pregunta aleatoria de las obtenidas
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedQuestion = questions[randomIndex];
    setHints(selectedQuestion.hints);
  
    const category = selectedQuestion.category;
  
    try {
      const queryRef = query(
        collection(db, 'gameOne'),
        where("category", "==", category),
        limit(3)
      );
      const differentImagesSnapShot = await getDocs(queryRef);
  
      if (!differentImagesSnapShot.empty) {
        const filteredDocs = differentImagesSnapShot.docs.filter(
          (doc) => doc.data().name !== selectedQuestion.name
        );
  
        const differentImages = filteredDocs.slice(0, 2).map((doc) => ({
          url: doc.data().correctImage,
          isCorrect: false,
        }));
  
        const imagesArray = [
          { url: selectedQuestion.correctImage, isCorrect: true },
          ...differentImages,
        ];
  
        setImage(shuffleArray(imagesArray));
        console.log("Final images array:", imagesArray);
      } else {
        console.log("No matching documents found in the second query.");
      }
    } catch (error) {
      console.error("Error fetching different images:", error);
    }
  };
  
  const checkImage = async (isCorrect) => {
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
  if (!image.length || !hint.length) {
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
        <Tooltip title={"Adivina Quién o Qué Soy"} text={"Estimular el uso de vocabulario descriptivo y la comprensión de preguntas"} />
      </div>
<LevelHolder>
<div className="absolute inset-0 flex items-center justify-center">
  <div className="p-2   flex flex-col items-center justify-center">
    <div>
      <p className="text-xl">Nivel:</p>
    </div>
    <div>
      <p className="text-2xl">{level}</p>
    </div>
  </div>
</div>

</LevelHolder>

      <div className="flex flex-col items-center gap-4 mt-3">

        <div className="flex justify-center gap-[300px]">
          {hint.map((hint, index) => (index !== 1 ? (
            <BlueCard key={index} className=" ">
              <div className="">
                <p className="text-lg ">{hint}</p>
              </div>
            </BlueCard>
          ) : null))}
        </div>
        <BlueCard >
          <div >
            <p className="text-lg ">{hint[1]}</p>
          </div>
        </BlueCard>
      </div>

      <div className="flex justify-center gap-4 mt-10">
        {image.map((image, index) => (
          <YellowCard key={index}>
            <img
              key={index}
              src={image.url}
              onClick={() => checkImage(image.isCorrect)}
              style={{ cursor: 'pointer', margin: '10px', width: '150px' }}
            />
          </YellowCard>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8"> {feedback && <div className="feedback-message text-lg">{feedback}</div>}</div>
     
      
    </div>
  );
}

