import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../googleinit";


export const updateLevelInFirestore = async (newLevel , game) => {
    try {
      const docRef = doc(db, "juegos", game);
      await updateDoc(docRef, {
        currentLevel: newLevel, // Actualizar el campo
      });
      console.log("Nivel actualizado en Firestore:", newLevel);
    } catch (error) {
      console.error("Error actualizando nivel en Firestore:", error);
    }
  };

  export const encodeBase64 = (str) => {
    return btoa(str); // Codifica una cadena a base64
  };
  
  export const decodeBase64 = (str) => {
    return atob(str); 
  };