"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { PiMathOperationsBold } from "react-icons/pi";
import { TbVocabulary } from "react-icons/tb";
import { LuBrain } from "react-icons/lu";
import ProgressView from "./ProgressView"
import Image from 'next/image'

const ProgressSelect = () => {

  const router = useRouter();

  const searchParams = useSearchParams();
  const gameParam = searchParams.get("game");

  const handleLevelClick = (game) => {
      router.push(`?game=${game}`);

  };

  if (gameParam) {
    return (<ProgressView/>)
  }

  return (
    <div 
    className="flex flex-wrap gap-60 items-center justify-center h-screen p-4 relative" 
    style={{
      backgroundImage: 'url(/images/panel_bee.png)', 
      backgroundSize: 'cover',  // La imagen principal ocupa toda la pantalla
      backgroundPosition: 'center',  // Centrado de la imagen
      backgroundAttachment: 'fixed'  // Fija la imagen al fondo
    }}
  >
    {/* Pseudo-elemento para la imagen repetida con opacidad */}
    <div 
      className="absolute inset-0 z-[-1]" 
      style={{
        backgroundImage: 'url(/images/IconProject.png)',
        backgroundSize: '300px 200px', // Aumenta el tamaño de la imagen repetida
        backgroundRepeat: 'repeat',  // Hace que la imagen se repita
        backgroundPosition: 'center',
        opacity: 0.2  // Aplica opacidad del 30%
      }}
    ></div>
  
    {/* Primera columna */}
    <div className="flex flex-col items-center gap-4 px-4 pt-20">
      <span className="font-bold text-[18px] md:text-[25px] mb-6">
        Comprensión
      </span>
      <div className="hexagon shadow-2xl bg-red-500 w-45 h-45 flex items-center justify-center">
        <LuBrain size={60} className="rotate-[-90deg] ml-3" />
        <button className="bg-[#f2d99b] hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded rotate-[-90deg]">
          Progreso
        </button>
      </div>
    </div>
  
    {/* Segunda columna */}
    <div className="flex flex-col items-center gap-4 p-4">
      <span className="font-bold text-[18px] md:text-[25px] mb-6">
        Vocabulario
      </span>
      <div className="hexagon shadow-2xl bg-red-500 w-32 h-32 flex items-center justify-center">
        <TbVocabulary size={60} className="rotate-[-90deg] ml-3" />
        <button className="bg-[#f2d99b] hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded rotate-[-90deg]">
          Progreso
        </button>
      </div>
    </div>
  
    {/* Tercera columna */}
    <div className="flex flex-col items-center gap-4 px-4 pt-4 md:pt-20">
      <span className="font-bold text-[18px] md:text-[25px] mb-6">
        Lógica
      </span>
      <div className="hexagon shadow-2xl bg-red-500 w-32 h-32 flex items-center justify-center">
        <PiMathOperationsBold size={60} className="rotate-[-90deg] ml-3" />
        <button className="bg-[#f2d99b] hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded rotate-[-90deg]" onClick={() => handleLevelClick('GameFour')}>
          Progreso
        </button>
      </div>
    </div>
  </div>
  

  );
};

export default ProgressSelect;
