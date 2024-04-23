import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { useEffect, useState } from "react";


export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    const navigate = useNavigate();

    const [buffer, setBuffer] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signup")
        } else {
            setBuffer(false)
        }
    }, [])
    if (buffer) {
        return <div></div>
    }

    if (loading) {
        return <div>
            <Appbar/> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }


    return <div >
        <Appbar />
        <div className="flex justify-center">
            <div className=" max-w-xl">
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.Date}
                />)}


            </div>
        </div>
    </div>
}
