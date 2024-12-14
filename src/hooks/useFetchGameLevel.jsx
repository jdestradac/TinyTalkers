import { useState, useEffect } from 'react';
import { collection, query, limit, getDocs } from 'firebase/firestore';
import { db } from '../../googleinit';

const useFetchGameLevel = () => {
  const [currentLevelGame, setCurrentLevelGame] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameLevel = async () => {
      setLoading(true);
      setError(null);

      try {
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

        setCurrentLevelGame(level);
      } catch (err) {
        console.error("Error fetching game level:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGameLevel();
  }, []);

  return { currentLevelGame, loading, error };
};

export default useFetchGameLevel;
