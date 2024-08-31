'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button1 } from "@/components/button1";
import { Sports } from "@/components/sports";
import { sportslist, sprots } from "@/assets/links";
import { Button2 } from "@/components/button2";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";


const Contributor = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    console.log(process.env.NEXT_PUBLIC_API_fundpublickey, " this the pubkey")

    
    const section = searchParams.get('section') || "";
    const [width,setwidth] = useState(false);

    const sports = sportslist
    const componet = {
        profile : Profile,
        Funds_Overview : Funds_overview,
        Transaction_Details : Transaction_details
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
            <Button1 content={"Funds_Overview"}  />
            <Button1 content={"Transaction_Details"}  />
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

    const {publicKey , signMessage} = useWallet();

    async function signandsend(){
        const message = new TextEncoder().encode("sign in to fund for the future champions!")
        const singnature = await signMessage?.(message);
        // const response = await axios.post(backendurl);

        // localStorage.setItem("token",response.data.token)
    }

    useEffect(() => {
        signandsend()
        

    },[publicKey]);


    return <div className="text-white">
        <div className="flex justify-end pb-4">{publicKey ? <WalletDisconnectButton /> : <WalletMultiButton />}</div>
        <div className="border-b-2 border-gray-700 pb-4">
            <div className="flex justify-between w-full h-fit py-3 px-4 hover:bg-purple-400/80 border-none rounded-lg transition-all duration-500">
                <div className="text-3xl font-bold">YOU funded</div>
                <div className="text-3xl font-bold">₹0.00</div>
            </div>
            <div className="flex w-full justify-center mt-4">
            <button onClick={() => {
                const transaction = new Transaction().add(
                    SystemProgram.transfer({
                        fromPubkey : publicKey,
                    toPubkey : new PublicKey("7y7QvPYHoPKr3SX3bKD7zP9RZJYzMV2mRASbHKQsWqw1"),
                    lamports : 100000000,
                    })
                    
                )
                console.log("working")
            }} className="text-center h-fit py-2 px-12 text-xl font-bold border-gray-700 border-2 rounded-md bg-black hover:bg-purple-500 transition-all duration-300">Fund 0.1sol</button>
            </div>
        </div>

        <div>
            <div className="text-2xl font-bold p-3 ">Fund the Game of Your Choice: Support the Next Champions!</div>
            <div className="grid grid-cols-3 gap-y-8 pl-8 pt-6">
                {sportslist.map(sports => 
                    (<Sports sportsname={sports.sportsName}/>)
                )}
            </div>
        </div>
    </div>
}
const Funds_overview = () => {


    return <div className="text-white">
    <div className="border-b-2 border-gray-700 pb-4">
        <div className="flex justify-between w-full h-fit py-3 px-4 hover:bg-purple-400/80 border-none rounded-lg transition-all duration-500">
            <div className="text-3xl font-bold">Total Funds Raised</div>
            <div className="text-3xl font-bold">₹0.00</div>
        </div>
    </div>

    <div>
        <div className="text-2xl font-bold p-3 ">Support in Action: Funds Raised for different sports!</div>
        <div className="grid grid-cols-3 gap-y-8 pl-8 pt-6">
            {sportslist.map(sports => 
                (<Sports />)
            )}
        </div>
    </div>
</div>
}

const Transaction_details = () => {

    //solana logic to get all the transaction details

    const connection = new Connection("https://api.devnet.solana.com");
    const userpublickey = new PublicKey("vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg");

    useEffect(() => {
        const publickey = userpublickey;
        async function tranasctiondetails() {
            const signatures = await connection.getSignaturesForAddress(publickey, { limit: 1000 });

            // for(let signatureinfo of signatures){
            //     try{
            //     const transaction = await connection.getTransaction(signatureinfo[0].signature, { encoding: "jsonParsed" });
            //     console.log("transactions", transaction)
            // }catch (error) {
            //     console.error(`Error processing transaction ${signatureinfo[0].signature}:`, error.message);
            //   }}
            return signatures;
        }



        const signatures = tranasctiondetails(publickey);
        console.log(signatures)

    },[])
    // here it ends
    

    return <div className="text-white h-screen flex flex-col">
        <div className="flex justify-center border-b-gray-700 border-b-2 pb-6 space-x-4">
            <Button2 content={"YOUR_TRANSACTIONS"}/>
            <Button2 content={"LATEST TRANSACTIONS"}/>
        </div>
        <div className="flex flex-col flex-grow">
            <div className="grid grid-cols-9 w-full h-fit">
                <div className="col-span-1 flex justify-center border-r-gray-700 border-r-2 border-b-gray-700 border-b-2 border-l-2 border-l-gray-700">S.NO</div>
                <div className="col-span-3 flex justify-center  border-r-gray-700 border-r-2 border-b-gray-700 border-b-2">TXN ID</div> 
                <div className="col-span-3 flex justify-center  border-r-gray-700 border-r-2 border-b-gray-700 border-b-2">SPORTS_NAME</div>
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
}

export default Contributor;