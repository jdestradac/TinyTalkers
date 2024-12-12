import { db } from '../../../googleinit';
import { doc, getDoc } from 'firebase/firestore';

async function testFirebaseConnection() {
  try {
    // Crea una referencia a un documento de prueba
    const testDocRef = doc(db, "testCollection", "testDocument");

    // Intenta obtener el documento
    const docSnap = await getDoc(testDocRef);

    if (docSnap.exists()) {
      console.log("Conexión exitosa: ", docSnap.data());
    } else {
      console.log("No se encontró el documento. Asegúrate de tener datos en Firestore.");
    }
  } catch (error) {
    console.error("Error al conectar con Firebase: ", error);
  }
}

testFirebaseConnection();