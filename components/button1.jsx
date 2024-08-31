"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


const Button1 = (props) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const section = searchParams.get('section') || "";
    const selectedsection = (section)? section : "profile";

    return <div className="p-1">
        <button className={`bg w-full h-fit px-4 py-2 flex justify-start ${(selectedsection == props.content) ? "bg-purple-500" : "bg-transparent  hover:bg-purple-500/20 hover:backdrop-blur-lg "} rounded-md border-none transition-all duration-300`}
        onClick={() => {
            const queryParams = new URLSearchParams(searchParams.toString());
                queryParams.set("section", props.content);

                router.push(`${pathname}?${queryParams.toString()}`);
        }}>
            <div>{props.svg}</div>
            <div>{props.content}</div>
        </button>
    </div>
}

export {Button1}