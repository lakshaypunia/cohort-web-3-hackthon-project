"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <div className=" w-4/12 border-white border-2 rounded-md">
        <button className={`bg w-full h-fit px-4 py-2 flex justify-center   hover:bg-purple-500/80 hover:backdrop-blur-lg rounded-md border-none transition-all duration-300`}
        onClick={() => {

                router.push('/contributor');
        }}>
            <div>join as contributor</div>
            <div></div>
        </button>
    </div>
    <div className=" w-4/12 border-white border-2 rounded-md">
        <button className={`bg w-full h-fit px-4 py-2 flex justify-center   hover:bg-purple-500/80 hover:backdrop-blur-lg rounded-md border-none transition-all duration-300`}
        onClick={() => {

                router.push('/athlete');
        }}>
            <div>join as athlete</div>
            <div></div>
        </button>
    </div>
    </div>
  )
}