import { useEffect, useState } from "react";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { useNavigate, useParams } from 'react-router-dom'
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Spinner";

export const Blog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });

    const [buffer, setBuffer] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signup")
        }
        else {
            setBuffer(false)
        }
    }, [])
    if (buffer) {
        return <div></div>
    }


    if (loading || !blog) {
        return <div>
            <Appbar />
        
            <div className="h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }
    return <div>
        <FullBlog blog={blog}/>
    </div>
        
    
}

