
const YellowCard = ({ children }) => {
    return (
        <div className="bg-[#feca7a] w-[300px] min-h-[70px] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex justify-center items-center">
            {children}
        </div>

    );
}
export default YellowCard