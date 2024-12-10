// import Tooltip from "../../components/Tooltip";


// export default function GameOne() {



//     return (

//         <>
            
//             <div className="pt-4 pl-5">            
//                 <Tooltip
//                 title={"Completa la frase"}
//                 text={"Comprensión Lógica y Resolución de Problemas, comprensión del Contexto y Sintaxis"}
//             />
//             </div>

//         </>

//     );
// }
'use client';

import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../googleinit';

export default function Page() {
  const seedDatabase = async () => {
    const documents = [
      {
        id: 'gameOne',
        name: 'Gato',
        category: 'Animales',
        hints: ['Es un animal', 'Tiene bigotes', 'Dice miau'],
        correctImage: 'https://example.com/gato.jpg',
        level: '1',
      },
      // Agrega más datos aquí...
      {
                id: 'gameThree',
                name: 'León',
                category: 'Animales',
                hints: ['Es el rey de la selva', 'Tiene melena', 'Ruge'],
                correctImage: 'https://example.com/leon.jpg',
                level: '2',
              },
              {
                id: 'gameFour',
                name: 'Auto',
                category: 'Vehículos',
                hints: [
                  'Tiene ruedas',
                  'Puede ser de diferentes colores',
                  'Se usa para transportarse',
                ],
                correctImage: 'https://example.com/auto.jpg',
                level: '1',
             },
    ];

    try {
      for (const docData of documents) {
        const docRef = doc(collection(db, 'GameOne'), docData.id);
        await setDoc(docRef, {
          name: docData.name,
          category: docData.category,
          hints: docData.hints,
          correctImage: docData.correctImage,
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