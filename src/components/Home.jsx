import Image from "next/image";

const Home = () => {
  return (
    <div className="flex items-center space-x-8">
      <div className="relative m-2">
        <Image
          src="/images/bee-logo.png"
          alt="Descripción de la imagen"
          width={250}
          height={350}
          className="absolute z-10 mt-20 ml-40"
        />
        <Image
          src="/images/panel-bee.png"
          alt="Descripción de la imagen"
          width={400}
          height={550}
          className="relative z-8"
        />
      </div>
      <div className="flex flex-col items-center">
        <div>
          <h2
            className="text-[60px] sm:text-[60px] md:text-[100px] lg:text-[120px] font-extrabold text-[#f6f2e9] flex flex-col items-center leading-tight z-10"
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
              Escucha
            </span>
            <div className="hexagon shadow-2xl bg-red-500 w-45 h-45"></div>
          </div>

          {/* Segunda columna */}
          <div className="flex flex-col items-center gap-4 p-4">
            
            <div className="hexagon shadow-2xl bg-red-500 w-32 h-32"></div>
            <span className="font-bold text-[18px] md:text-[25px] mt-6">Vocabulario</span>
          </div>

          {/* Tercera columna */}
          <div className="flex flex-col items-center gap-4 px-4 pt-4 md:pt-20">
            <span className="font-bold text-[18px] md:text-[25px] mb-6">Lógica</span>
            <div className="hexagon shadow-2xl bg-red-500 w-32 h-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
