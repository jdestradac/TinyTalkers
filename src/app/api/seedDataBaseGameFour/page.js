
'use client';

import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../googleinit.js';

export default function Page() {
  const seedDatabase = async () => {
    const documents = [
      {
        level: 1,
        sequence: [2, 4, 6, null, 10],
        correctAnswer: 8,
        answerOptions: [12, 10, 14, 8]
      },
      {
        level: 2,
        sequence: [1, 3, 5, null, 9],
        correctAnswer: 7,
        answerOptions: [7, 5, 9, 11]
      },
      {
        level: 3,
        sequence: [3, 6, 9, null, 15],
        correctAnswer: 12,
        answerOptions: [12, 13, 11, 14]
      },
      {
        level: 4,
        sequence: [4, 8, 12, null, 20],
        correctAnswer: 16,
        answerOptions: [16, 12, 18, 20]
      },
      {
        level: 5,
        sequence: [5, 10, 15, null, 25],
        correctAnswer: 20,
        answerOptions: [20, 18, 22, 19]
      },
      {
        level: 6,
        sequence: [1, 4, 9, null, 25],
        correctAnswer: 16,
        answerOptions: [16, 12, 14, 18],
      },
      {
        level: 7,
        sequence: [1, 2, 3, 5, null, 13],
        correctAnswer: 8,
        answerOptions: [8, 10, 6, 7],
      },
      {
        level: 8,
        sequence: [2, 6, 18, null, 162],
        correctAnswer: 54,
        answerOptions: [54, 36, 48, 60],
      }
    ]

    try {
      for (const docData of documents) {
        const docRef = doc(collection(db, 'gameFour'), String(docData.level));
        await setDoc(docRef, {
          sequence: docData.sequence,
          correctAnswer: docData.correctAnswer,
          answerOptions: docData.answerOptions,
          level: docData.level,
        });
      }

      alert('Base de datos inicializada correctamente');
    } catch (error) {
      console.error('Error llenando Firestore:', error);
      alert('Error llenando Firestore');
    }
  };

  return (
    <div>
      <h1>Inicializar Base de Datos</h1>
      <button onClick={seedDatabase} className="btn">
        Llenar Base de Datos
      </button>
    </div>
  );
}