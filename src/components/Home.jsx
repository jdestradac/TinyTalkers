"use client"
import Image from "next/image";
import { PiMathOperationsBold } from "react-icons/pi";
import { TbVocabulary } from "react-icons/tb";
import { LuBrain } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { encodeBase64 } from "../helpers/helper"

const Home = () => {
  const router = useRouter();

  const handleLevelClick = (game) => {
    router.push(`/${game}?level=${encodeBase64(1)}`);
  };

  return (
    <div className="flex items-center space-x-8">
      <div className="relative m-2">
        <Image
          src="/images/bee-logo.png"
          alt="Descripción de la imagen"
          width={200}
          height={200}
          className="absolute z-10 mt-20 ml-40"
        />
        <Image
          src="/images/panel-bee.png"
          alt="Descripción de la imagen"
          width={350}
          height={400}
          className="relative z-8"
        />
      </div>
      <div className="flex flex-col items-center">
        <div>
          <h2
            className="text-[50px] sm:text-[60px] md:text-[100px] lg:text-[120px] font-extrabold text-[#f6f2e9] flex flex-col items-center leading-tight z-10"
            style={{
              textShadow: "5px 5px 0px #feca7a",
              fontFamily: "'Comic Sans MS', sans-serif",
            }}
          >
            <span>Bienvenido</span>
            <span>TinyTalker</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-20 items-center justify-center h-auto md:h-[50vh] p-4">
          {/* Primera columna */}
          <div className="flex flex-col items-center gap-4 px-4 pt-20">
            <span className="font-bold text-[18px] md:text-[25px] mb-6">
              Comprensión
            </span>
            <div className="hexagon shadow-2xl bg-red-500 w-45 h-45 flex items-center justify-center">
              <LuBrain size={60} className="rotate-[-90deg]" />
              <button className="bg-[#f2d99b] hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded rotate-[-90deg]" onClick={()=>handleLevelClick("/gameTwo")} >
                Jugar
              </button>
            </div>
          </div>

          {/* Segunda columna */}
          <div className="flex flex-col items-center gap-4 p-4">
            <div className="hexagon shadow-2xl bg-red-500 w-32 h-32 flex items-center justify-center">
              <button className="bg-[#f2d99b] hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded rotate-[-90deg]" onClick={()=>handleLevelClick("/gameOne")}>
                Jugar
              </button>
              <TbVocabulary size={60} className="rotate-[-90deg]" />
            </div>
            <span className="font-bold text-[18px] md:text-[25px] mt-6">
              Vocabulario
            </span>
          </div>

          {/* Tercera columna */}
          <div className="flex flex-col items-center gap-4 px-4 pt-4 md:pt-20">
            <span className="font-bold text-[18px] md:text-[25px] mb-6">
              Lógica
            </span>
            <div className="hexagon shadow-2xl bg-red-500 w-32 h-32 flex items-center justify-center">
              <PiMathOperationsBold size={60} className="rotate-[-90deg]" />
              <button className="bg-[#f2d99b] hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded rotate-[-90deg]" onClick={()=>handleLevelClick("GameFour")}>
                Jugar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
