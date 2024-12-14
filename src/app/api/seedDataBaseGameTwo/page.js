
'use client';

import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../googleinit.js';

export default function Page() {
  const seedDatabase = async () => {
    const documents = [
      {
        "id": "questionThirtyOne",
        "pregunta": "El globo sube hacia el ___",
        "respuesta": "cielo",
        "imagen": "https://example.com/images/globo.jpg",
        "categoria": "Objetos",
        "nivel": "1"
      },
      {
        "id": "questionThirtyTwo",
        "pregunta": "El chef cocina en la ___",
        "respuesta": "cocina",
        "imagen": "https://example.com/images/chef.jpg",
        "categoria": "Lugares",
        "nivel": "2"
      },
      {
        "id": "questionThirtyThree",
        "pregunta": "El conejo come ___",
        "respuesta": "zanahorias",
        "imagen": "https://example.com/images/conejo.jpg",
        "categoria": "Alimentos",
        "nivel": "1"
      },
      {
        "id": "questionThirtyFour",
        "pregunta": "El barco tiene muchas ___",
        "respuesta": "velas",
        "imagen": "https://example.com/images/barco_velas.jpg",
        "categoria": "Objetos",
        "nivel": "3"
      },
      {
        "id": "questionThirtyFive",
        "pregunta": "La bicicleta tiene dos ___",
        "respuesta": "ruedas",
        "imagen": "https://example.com/images/bicicleta.jpg",
        "categoria": "Objetos",
        "nivel": "2"
      },
      {
        "id": "questionThirtySix",
        "pregunta": "La rana salta en el ___",
        "respuesta": "charco",
        "imagen": "https://example.com/images/rana_charco.jpg",
        "categoria": "Lugares",
        "nivel": "2"
      },
      {
        "id": "questionThirtySeven",
        "pregunta": "El café es de color ___",
        "respuesta": "marrón",
        "imagen": "https://example.com/images/cafe.jpg",
        "categoria": "Colores",
        "nivel": "1"
      },
      {
        "id": "questionThirtyEight",
        "pregunta": "El cartero entrega ___",
        "respuesta": "cartas",
        "imagen": "https://example.com/images/cartero.jpg",
        "categoria": "Acciones",
        "nivel": "3"
      },
      {
        "id": "questionThirtyNine",
        "pregunta": "El niño se lava los ___",
        "respuesta": "dientes",
        "imagen": "https://example.com/images/nino_lavando_dientes.jpg",
        "categoria": "Acciones",
        "nivel": "1"
      },
      {
        "id": "questionForty",
        "pregunta": "El tren es más rápido que el ___",
        "respuesta": "carro",
        "imagen": "https://example.com/images/tren_carro.jpg",
        "categoria": "Comparaciones",
        "nivel": "2"
      },
      {
        "id": "questionFortyOne",
        "pregunta": "El pez nada en el ___",
        "respuesta": "río",
        "imagen": "https://example.com/images/pez_rio.jpg",
        "categoria": "Lugares",
        "nivel": "1"
      },
      {
        "id": "questionFortyTwo",
        "pregunta": "La pelota es de color ___",
        "respuesta": "verde",
        "imagen": "https://example.com/images/pelota_verde.jpg",
        "categoria": "Colores",
        "nivel": "1"
      },
      {
        "id": "questionFortyThree",
        "pregunta": "El oso hiberna durante el ___",
        "respuesta": "invierno",
        "imagen": "https://example.com/images/oso.jpg",
        "categoria": "Naturaleza",
        "nivel": "2"
      },
      {
        "id": "questionFortyFour",
        "pregunta": "El bebé duerme en una ___",
        "respuesta": "cuna",
        "imagen": "https://example.com/images/bebe_cuna.jpg",
        "categoria": "Objetos",
        "nivel": "1"
      },
      {
        "id": "questionFortyFive",
        "pregunta": "El tigre vive en la ___",
        "respuesta": "selva",
        "imagen": "https://example.com/images/tigre.jpg",
        "categoria": "Lugares",
        "nivel": "2"
      },
      {
        "id": "questionFortySix",
        "pregunta": "El día de Navidad es en ___",
        "respuesta": "diciembre",
        "imagen": "https://example.com/images/navidad.jpg",
        "categoria": "Tiempo",
        "nivel": "3"
      },
      {
        "id": "questionFortySeven",
        "pregunta": "El chocolate está hecho de ___",
        "respuesta": "cacao",
        "imagen": "https://example.com/images/chocolate.jpg",
        "categoria": "Alimentos",
        "nivel": "1"
      },
      {
        "id": "questionFortyEight",
        "pregunta": "El árbol pierde sus hojas en ___",
        "respuesta": "otoño",
        "imagen": "https://example.com/images/arbol_otono.jpg",
        "categoria": "Naturaleza",
        "nivel": "3"
      },
      {
        "id": "questionFortyNine",
        "pregunta": "El koala vive en ___",
        "respuesta": "Australia",
        "imagen": "https://example.com/images/koala.jpg",
        "categoria": "Lugares",
        "nivel": "2"
      },
      {
        "id": "questionFifty",
        "pregunta": "El niño toca el ___",
        "respuesta": "piano",
        "imagen": "https://example.com/images/nino_piano.jpg",
        "categoria": "Acciones",
        "nivel": "2"
      }
    ]
    
    
    
    

    try {
      for (const docData of documents) {
        const docRef = doc(collection(db, 'gameTwo'), docData.id);
        await setDoc(docRef, {
          question: docData.pregunta,
          category: docData.categoria,
          img: docData.imagen,
          answer: docData.respuesta,
          level: docData.nivel,
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