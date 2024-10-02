import { useNavigate } from "react-router-dom"

export default function Dropdown({isVisible, user} : {isVisible: boolean, user: string}) {
    const navigate = useNavigate();
    return <>
        <div className={`z-10 ${!isVisible && "hidden"} absolute top-16 bg-custom-white divide-y divide-gray-100 border border-black/30 rounded-lg shadow w-44`}>
            <div className="px-4 py-3 text-sm text-gray-900">
                <div className="font-medium ">User</div>
                <div className="truncate">{user}@logs.com</div>
            </div>
            <ul className="py-2 text-sm text-black/70 ">
                <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-peach  hover:font-medium">Dashboard</a>
                </li>
                <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-peach  hover:font-medium">Settings</a>
                </li>
            </ul>
            <div className="py-2" onClick={() =>{
                localStorage.clear()
                navigate('/login')
            }
            }>
                <a href="#" className="block px-4 py-2 text-sm text-custom-white hover:bg-light-red bg-peach hover:text-custom-white  hover:font-medium ">Sign out</a>
            </div>
        </div>
    </>
}