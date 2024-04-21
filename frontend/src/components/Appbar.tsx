import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-2 ">
          <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
              Medium
          </Link>
          <div className="flex justify-center">
            <Link to={`/publish`}>
             <button type="button" className="mt-3 mr-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xs px-5 py-2   text-center me-2 mb-2">New</button>
          </Link>
             <div className="mt-4 ">
            <Avatar name = "vinayak" size = "big" />
            </div>
          </div>
    </div>
}