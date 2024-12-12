import Image from "next/image";
import Logo from "@/components/Home";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] relative gap-8">
      <Logo />
      
    </div>
  );
}
