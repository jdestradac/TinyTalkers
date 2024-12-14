import GameMath from "../../components/GameMath/GameMath";
import { Suspense } from 'react';

const GameFour = () => {
  return (
    <div className="relative">
      <Suspense fallback={<div>Loading...</div>}>
        <GameMath leve={1} />
      </Suspense>
    </div>
  );
};

export default GameFour;
