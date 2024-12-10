
'use client';

import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../googleinit';

export default function Page() {
  const seedDatabase = async () => {
    const documents = [
      
{
  id: 'questionTwentyOne',
  name: 'Caballo',
  category: 'Animales',
  hints: ['Se usa para montar', 'Relincha', 'Corre rápido'],
  correctImage: 'https://example.com/caballo.jpg',
  level: '1',
},
{
  id: 'questionTwentyTwo',
  name: 'Helicóptero',
  category: 'Vehículos',
  hints: ['Vuela', 'Tiene hélices', 'Es usado en rescates'],
  correctImage: 'https://example.com/helicoptero.jpg',
  level: '3',
},
{
  id: 'questionTwentyThree',
  name: 'Fresa',
  category: 'Frutas',
  hints: ['Es roja', 'Es pequeña', 'Tiene semillas en la superficie'],
  correctImage: 'https://example.com/fresa.jpg',
  level: '1',
},
{
  id: 'questionTwentyFour',
  name: 'Leopardo',
  category: 'Animales',
  hints: ['Tiene manchas', 'Es rápido', 'Caza en la selva'],
  correctImage: 'https://example.com/leopardo.jpg',
  level: '4',
},
{
  id: 'questionTwentyFive',
  name: 'Tren',
  category: 'Vehículos',
  hints: ['Corre sobre rieles', 'Transporta pasajeros y carga', 'Hace chuuu'],
  correctImage: 'https://example.com/tren.jpg',
  level: '2',
},
{
  id: 'questionTwentySix',
  name: 'Piña',
  category: 'Frutas',
  hints: ['Es amarilla por dentro', 'Tiene una cáscara dura', 'Es tropical'],
  correctImage: 'https://example.com/pina.jpg',
  level: '3',
},
{
  id: 'questionTwentySeven',
  name: 'Rinoceronte',
  category: 'Animales',
  hints: ['Tiene un cuerno', 'Es muy pesado', 'Vive en la sabana'],
  correctImage: 'https://example.com/rinoceronte.jpg',
  level: '5',
},
{
  id: 'questionTwentyEight',
  name: 'Submarino',
  category: 'Vehículos',
  hints: ['Va bajo el agua', 'Tiene forma cilíndrica', 'Se usa en investigaciones'],
  correctImage: 'https://example.com/submarino.jpg',
  level: '4',
},
{
  id: 'questionTwentyNine',
  name: 'Cereza',
  category: 'Frutas',
  hints: ['Es pequeña', 'Es roja o negra', 'Viene en pares'],
  correctImage: 'https://example.com/cereza.jpg',
  level: '2',
},
{
  id: 'questionThirty',
  name: 'Cocodrilo',
  category: 'Animales',
  hints: ['Tiene dientes afilados', 'Vive en ríos y lagos', 'Es un reptil'],
  correctImage: 'https://example.com/cocodrilo.jpg',
  level: '3',
},
{
  id: 'questionThirtyOne',
  name: 'Patineta',
  category: 'Vehículos',
  hints: ['Tiene ruedas', 'Se usa para deportes', 'Se maneja con equilibrio'],
  correctImage: 'https://example.com/patineta.jpg',
  level: '1',
},
{
  id: 'questionThirtyTwo',
  name: 'Mango',
  category: 'Frutas',
  hints: ['Es dulce', 'Es tropical', 'Es amarillo o rojo'],
  correctImage: 'https://example.com/mango.jpg',
  level: '3',
},
{
  id: 'questionThirtyThree',
  name: 'Lobo',
  category: 'Animales',
  hints: ['Aúlla', 'Es carnívoro', 'Vive en manadas'],
  correctImage: 'https://example.com/lobo.jpg',
  level: '4',
},
{
  id: 'questionThirtyFour',
  name: 'Carro de bomberos',
  category: 'Vehículos',
  hints: ['Es rojo', 'Tiene una sirena', 'Se usa para apagar incendios'],
  correctImage: 'https://example.com/carro_bomberos.jpg',
  level: '2',
},
{
  id: 'questionThirtyFive',
  name: 'Kiwi',
  category: 'Frutas',
  hints: ['Es verde por dentro', 'Tiene cáscara marrón', 'Es ácido y dulce'],
  correctImage: 'https://example.com/kiwi.jpg',
  level: '2',
},
{
  id: 'questionThirtySix',
  name: 'Oso polar',
  category: 'Animales',
  hints: ['Es blanco', 'Vive en el Ártico', 'Come pescado'],
  correctImage: 'https://example.com/oso_polar.jpg',
  level: '5',
},
{
  id: 'questionThirtySeven',
  name: 'Camión de basura',
  category: 'Vehículos',
  hints: ['Recoge residuos', 'Es grande', 'Es verde o naranja'],
  correctImage: 'https://example.com/camion_basura.jpg',
  level: '3',
},
{
  id: 'questionThirtyEight',
  name: 'Guayaba',
  category: 'Frutas',
  hints: ['Es verde o amarilla', 'Tiene muchas semillas', 'Es tropical'],
  correctImage: 'https://example.com/guayaba.jpg',
  level: '2',
},
{
  id: 'questionThirtyNine',
  name: 'Jirafa',
  category: 'Animales',
  hints: ['Tiene un cuello muy largo', 'Es amarilla con manchas', 'Come hojas'],
  correctImage: 'https://example.com/jirafa.jpg',
  level: '3',
},
{
  id: 'questionForty',
  name: 'Tractor',
  category: 'Vehículos',
  hints: ['Se usa en granjas', 'Tiene ruedas grandes', 'Es lento'],
  correctImage: 'https://example.com/tractor.jpg',
  level: '2',
},
{
  id: 'questionFortyOne',
  name: 'Pera',
  category: 'Frutas',
  hints: ['Es verde o amarilla', 'Es dulce', 'Tiene forma de gota'],
  correctImage: 'https://example.com/pera.jpg',
  level: '1',
},
{
  id: 'questionFortyTwo',
  name: 'Pez payaso',
  category: 'Animales',
  hints: ['Es pequeño', 'Es naranja con blanco', 'Vive en el agua'],
  correctImage: 'https://example.com/pez_payaso.jpg',
  level: '4',
},
{
  id: 'questionFortyThree',
  name: 'Autobús',
  category: 'Vehículos',
  hints: ['Transporta pasajeros', 'Es grande', 'Tiene muchas ventanas'],
  correctImage: 'https://example.com/autobus.jpg',
  level: '1',
},
{
  id: 'questionFortyFour',
  name: 'Coco',
  category: 'Frutas',
  hints: ['Es marrón por fuera', 'Tiene agua adentro', 'Es tropical'],
  correctImage: 'https://example.com/coco.jpg',
  level: '2',
},
{
  id: 'questionFortyFive',
  name: 'Panda',
  category: 'Animales',
  hints: ['Es blanco y negro', 'Come bambú', 'Es muy tranquilo'],
  correctImage: 'https://example.com/panda.jpg',
  level: '5',
},
{
  id: 'questionFortySix',
  name: 'Moto acuática',
  category: 'Vehículos',
  hints: ['Va en el agua', 'Es rápida', 'Se usa en playas'],
  correctImage: 'https://example.com/moto_acuatica.jpg',
  level: '3',
},
{
  id: 'questionFortySeven',
  name: 'Melón',
  category: 'Frutas',
  hints: ['Es grande', 'Es dulce', 'Tiene cáscara gruesa'],
  correctImage: 'https://example.com/melon.jpg',
  level: '2',
},
{
  id: 'questionFortyEight',
  name: 'Cangrejo',
  category: 'Animales',
  hints: ['Tiene pinzas', 'Camina de lado', 'Vive en la playa'],
  correctImage: 'https://example.com/cangrejo.jpg',
  level: '4',
},
{
  id: 'questionFortyNine',
  name: 'Limón',
  category: 'Frutas',
  hints: ['Es amarillo', 'Es ácido', 'Se usa en bebidas'],
  correctImage: 'https://example.com/limon.jpg',
  level: '1',
},
{
  id: 'questionFifty',
  name: 'Zorro',
  category: 'Animales',
  hints: ['Es astuto', 'Tiene una cola esponjosa', 'Es de color anaranjado'],
  correctImage: 'https://example.com/zorro.jpg',
  level: '5',
},

      
    ];

    try {
      for (const docData of documents) {
        const docRef = doc(collection(db, 'gameOne'), docData.id);
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