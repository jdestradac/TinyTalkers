"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import useFetchGameLevel from "../../hooks/useFetchGameLevel"
import {encodeBase64} from "../../helpers/helper"


const ProgressView = () => {
  
  const { currentLevelGame, loading } = useFetchGameLevel();
  const router = useRouter();
  const searchParams = useSearchParams();

  const gameParam = searchParams.get("game");

  const handleLevelClick = (level) => {
    if (currentLevelGame >= level) {
      const encodedLevel = encodeBase64(level.toString());
      router.push(`/${gameParam}?level=${encodedLevel}`);
    }
  };

  const renderLevel = (level, additionalStyles = "") => (
    <div
      className={`relative ${additionalStyles}`}
      onClick={() => handleLevelClick(level)}
    >
      <Image
        src="/images/bee-logo.png"
        alt={`Nivel ${level}`}
        width={150}
        height={120}
        className={`${
          currentLevelGame >= level ? "cursor-pointer hover:opacity-75" : "grayscale"
        }`}
      />
      <span className="absolute top-0 left-0 text-xl font-bold text-white bg-black rounded-full w-8 h-8 flex items-center justify-center">
        {level}
      </span>
    </div>
  );
  const renderLevelRevert = (level, additionalStyles = "") => (
    <div
      className={`relative ${additionalStyles}`}
      onClick={() => handleLevelClick(level)}
    >
      <Image
        src="/images/bee-logo.png"
        alt={`Nivel ${level}`}
        width={150}
        height={120}
        className={`${
          currentLevelGame >= level ? "cursor-pointer hover:opacity-75" : "grayscale"
        }`}
      />
      <span className="absolute top-0 left-0 text-xl font-bold text-white bg-black scale-x-[-1] rounded-full w-8 h-8 flex items-center justify-center">
        {level}
      </span>
    </div>
  );

  if (loading) {
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
    <div className="relative flex flex-col items-center justify-center">
      {/* Primera fila de imágenes */}
      <div className="relative flex flex-wrap gap-8">
        {renderLevel(1)}
        {renderLevel(2, "mt-[30px] md:ml-[100px] lg:ml-[180px]")}
        {renderLevel(3, "mt-[70px] md:ml-[100px] lg:ml-[180px]")}
        {renderLevel(4, "mt-[250px] md:ml-[75px] lg:ml-[125px]")}
      </div>

      {/* Segunda fila de imágenes */}
      <div className="relative flex flex-wrap justify-center gap-8 mt-8 ">
        {renderLevelRevert(8, "transform scale-x-[-1] md:mr-12 lg:mr-24")}
        {renderLevelRevert(7, "mt-[120px] transform scale-x-[-1] md:mr-[100px] lg:mr-[200px]")}
        {renderLevelRevert(6, "mt-8 transform scale-x-[-1] md:mr-12 lg:mr-24")}
        {renderLevelRevert(5, "mt-4 transform scale-x-[-1] md:mr-6 lg:mr-12")}
      </div>
    </div>
  );
};

export default ProgressView;
