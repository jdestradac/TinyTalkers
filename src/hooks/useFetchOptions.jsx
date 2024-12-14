import { useState, useEffect } from 'react';
import { collection, query, limit, getDocs } from 'firebase/firestore';
import { db } from '../../googleinit';

const useFetchOptions = (collectionDb) => {
  const [options, setOptions] = useState([]); 
  const [currentLevelGame, setCurrentLevelGame] = useState(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryRef = query(
          collection(db, collectionDb),
          limit(8)
        );
        const snapshot = await getDocs(queryRef);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const queryRef2 = query(
          collection(db, "juegos"),
          limit(8)
        );
        const snapshot2 = await getDocs(queryRef2);
        const games = snapshot2.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        const gameFour = games.find(game => game.id === "GameFour");
        const level = gameFour ? gameFour.currentLevel : null;
        console.log(games)
        setCurrentLevelGame(level)
        setOptions(data);
      } catch (err) {
        console.error("Error fetching different options:", err);
        setError(err); // Manejar el error
      } finally {
        setLoading(false); // Finalizar el estado de carga
      }
    };

    fetchOptions(); // Llamar a la función para obtener los datos
  }, []);

  // Retornar los datos, estado de carga y error
  return { options, loading, currentLevelGame, error };
};

export default useFetchOptions;
