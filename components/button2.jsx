"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


const Button2 = (props) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const section = searchParams.get('section2') || "";
    const selectedsection = (section)? section : "YOUR_TRANSACTIONS";

    return <div className="p-1">
        <button className={`bg w-full border-white border-2 h-fit px-4 py-2 flex justify-start ${(selectedsection == props.content) ? "bg-purple-500" : "bg-transparent  hover:bg-purple-500/60 hover:backdrop-blur-lg "} rounded-md  transition-all duration-300`}
        onClick={() => {
            const queryParams = new URLSearchParams(searchParams.toString());
                queryParams.set("section2", props.content);

                router.push(`${pathname}?${queryParams.toString()}`);
        }}>
            <div>{props.svg}</div>
            <div>{props.content}</div>
        </button>
    </div>
}

export {Button2}