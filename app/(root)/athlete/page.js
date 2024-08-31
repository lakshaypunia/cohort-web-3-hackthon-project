"use client"
import Fund_form from "@/components/fundsform";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";

const { Button1 } = require("@/components/button1");
const { usePathname, useSearchParams , useRouter } = require("next/navigation");



const Athlete = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    
    const section = searchParams.get('section') || "";
    const [width,setwidth] = useState(false);




    const componet = {
        profile : Profile,
        Apply_for_funds : Apply_for_funds
    }

    const Selctedsection = componet[(section)? section : "profile"];

   
    

    return <div id="main" className="bg-black text-white relative">
    <div id="navbar" className="flex justify-between px-8 pt-4 border-b-gray-700 border-b-2 z-10 sticky top-0 bg-black
    xl:hidden">
        <div>
            <div></div>
            <div className="font-bold text-white text-2xl">DASHBOARD</div>
        </div>
        <button className="flex items-center p-2 hover:bg-gray-900 border-none rounded-md transition-all duration-300"
        onClick={() => {
            setwidth(!width)
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="size-9">
        <path fill-rule="evenodd" d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
        </svg>

        </button>
    </div>

    <div className="flex h-screen w-full">
    <div id="sidemenu" className={`w-80 h-screen overflow-hidden px-2 ${(width)?"block ": "hidden"} z-10 border-r-2 border-gray-700 xl:border-none xl:block`}
    style={{
        scrollbarWidth: 'none',
    }}>
        <div className=" flex px-4 py-4 " id="heading">
            <div></div>
            <div className="font-bold text-white text-2xl xl:block hidden">DASHBOARD</div>
        </div>

        <div>
        <Button1 content={"profile"}  />
        <Button1 content={"Apply_for_funds"}  />
        </div>
    </div>

    <div id="content" className="w-full border-2 border-gray-700 mt-4 mb-2 px-4 py-6 overflow-hidden overflow-y-scroll mx-2 rounded-md h- text-white"
    style={{
        scrollbarWidth: 'none',
    }}>
        <div><Selctedsection /></div>
    </div>
    </div>

    

</div>

}

const Profile = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const {publicKey , signMessage} = useWallet();

    return <div className="text-white  h-screen flex flex-col">
    <div className="flex justify-end pb-4">{publicKey ? <WalletDisconnectButton /> : <WalletMultiButton />}</div>
    <div className="border-b-2 border-gray-700 pb-4">
        <div className="flex justify-between w-full h-fit py-3 px-4 hover:bg-purple-400/80 border-none rounded-lg transition-all duration-500">
            <div className="text-3xl font-bold">Total funds recieved</div>
            <div className="text-3xl font-bold">₹0.00</div>
        </div>
        <div className="flex w-full justify-center mt-4">
        <button onClick={() => {
            const queryParams = new URLSearchParams(searchParams.toString());
                queryParams.set("section", "Apply_for_funds");

                router.push(`${pathname}?${queryParams.toString()}`);
        }} className="text-center h-fit py-2 px-12 text-xl font-bold border-gray-700 border-2 rounded-md bg-black hover:bg-purple-500 transition-all duration-300">Apply for funds</button>
        </div>
    </div>

    <div className="flex flex-col flex-grow">
        <div className="text-2xl font-bold p-3 " >Transactions</div>
        <div className="flex flex-col flex-grow">
            <div className="grid grid-cols-11 w-full h-fit border-t-2 border-gray-700">
                <div className="col-span-1 flex justify-center border-r-gray-700 border-r-2 border-b-gray-700 border-b-2 border-l-2 border-l-gray-700">S.NO</div>
                <div className="col-span-3 flex justify-center  border-r-gray-700 border-r-2 border-b-gray-700 border-b-2">TXN ID</div> 
                <div className="col-span-3 flex justify-center  border-r-gray-700 border-r-2 border-b-gray-700 border-b-2">SPORTS_NAME</div>
                <div className="col-span-2 flex justify-center  border-r-gray-700 border-r-2 border-b-gray-700 border-b-2">STATUS</div>
                <div className="col-span-2 flex justify-center  border-r-gray-700 border-r-2 border-b-gray-700 border-b-2">AMOUNT</div>
            </div>
            <div className="w-full flex flex-col flex-grow pt-2 border-gray-700 border-2 rounded-md overflow-hidden overflow-y-scroll mt-2"
            style={{
                scrollbarWidth: 'none',
            }}>
            <div>
            </div>

            </div>
        </div>

    </div>

    </div>

}

const Apply_for_funds = () => {

    return <div >
        <div className="flex justify-center">
            <Fund_form />
        </div>

    </div>
}


export default Athlete