


const Sports = (props) => {


    return <div className="p-3 w-fit h-fit border-gray-700 rounded-md border-2 hover:bg-gray-900 transition-all duration-300 group">
        <div className="bg-blue-600 w-80 h-52 border-gray-700 rounded-md border-2"></div>
        <div className="text-gray-400 text-md group-hover:text-white transition-all duration-300">{props.sportsname}</div>
        
    </div>
}

export {Sports}