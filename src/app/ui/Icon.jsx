// components/IconLibrary/IconLibrary.js
import { FaBeer, FaHome, FaUser, FaInfoCircle } from 'react-icons/fa';
import { MdHome, MdFavorite, MdSettings,MdHearing } from 'react-icons/md';
import { TbListLetters } from "react-icons/tb";
import { GiArchiveResearch } from "react-icons/gi";
// Define los íconos que quieres en tu biblioteca
const icons = {
  beer: FaBeer,
  home: FaHome,
  user: FaUser,
  mdHome: MdHome,
  favorite: MdFavorite,
  settings: MdSettings,
  hearing:MdHearing,
  letters:TbListLetters,
  context:GiArchiveResearch,
  InfoCircle:FaInfoCircle,
};

const Icon = ({ name, size = 24, color = 'black', className = '', style = {}, ...props }) => {
  const Icon = icons[name];
  
  if (!Icon) {
    console.error(`Icon "${name}" not found in IconLibrary`);
    return null;
  }

  return (
    <Icon 
      size={size} 
      color={color} 
      className={className} 
      style={style} 
      {...props} 
    />
  );
};

export default Icon;
 