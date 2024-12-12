"use client"
import { useContext } from "react"
import { SidebarContext } from "./SiderBar"


const SiderBarItem = ({icon , text , active , onClick}) => {
    const { expanded } = useContext(SidebarContext)
  
    return (
      <li
        className={`
          relative flex items-center py-2 px-3 my-4
          font-medium rounded-md cursor-pointer
          transition-colors group 
          ${
            active
              ? "bg-gradient-to-tr from-[#f0e1b7] to-[#f2d99b] "
              : "hover:bg-[#f6f2e9] hover:text-gray-500"
          }
      `}
      onClick={onClick}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        

        {!expanded && (
          <div
            className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
          >
            {text}
          </div>
        )}
      </li>
    )
}

export default SiderBarItem;
