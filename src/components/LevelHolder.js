import Image from 'next/image';
const LevelHolder = ({children}) =>  {
return(
    <div className="flex justify-center relative ">
    <Image
        width={150}
        height={120}
        src="/BeeScore.png"
        alt="Score"
        
      />
      {children}
    </div>

);
}
export default LevelHolder