"use client";
import Image from "next/image";
import { createContext, useState } from "react";
import { LuArrowLeftToLine, LuArrowRightFromLine } from "react-icons/lu";
import SiderBarItem from "@/components/SideBar/SideBarItem";
import { MdHome } from "react-icons/md";
import { SiAlwaysdata } from "react-icons/si";
import { FaNoteSticky } from "react-icons/fa6";
import { useRouter, usePathname } from "next/navigation";

export const SidebarContext = createContext();
const SiderBar = () => {
  const [expanded, setExpanded] = useState(true);
  const router = useRouter(); // Para navegar entre rutas
  const pathname = usePathname(); // Ruta actual

  const handleNavigation = (path) => {
    router.push(path); // Navega a la ruta especificada
  };

  return (
    <aside className="min-h-screen">
      <nav className="h-full fex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src="/images/Icon.png"
            alt="Descripción de la imagen"
            width={100}
            height={100}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 w-[40px] h-[40px] justify-center mb-1"
          >
            {expanded ? (
              <LuArrowLeftToLine size={23} />
            ) : (
              <LuArrowRightFromLine size={23} />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            <SiderBarItem
              icon={<MdHome size={25} />}
              text="Inicio"
              active={pathname === "/"}
              onClick={() => handleNavigation("/")}
            />
            <SiderBarItem
              icon={<SiAlwaysdata size={25} />}
              text="Progreso"
              active={pathname === "/progreso"}
              onClick={() => handleNavigation("/progreso")}
            />
            <SiderBarItem
              icon={<FaNoteSticky size={25} />}
              text="Test"
              active={pathname === "/test"}
              onClick={() => handleNavigation("/test")}
            />
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

export default SiderBar;
