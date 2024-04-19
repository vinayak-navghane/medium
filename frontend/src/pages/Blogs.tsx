import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";


export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            loading...
        </div>
    }


    return <div >
        <Appbar />
        <div className="flex justify-center">
            <div className=" max-w-xl">
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={"How an ugly Single page website maked 5000 a month with affiliate marketing"}
                    content={"How an ugly Single page website maked 5000 a month with affiliate marketing How an ugly Single page website maked 5000 a month with affiliate marketing"}
                    publishedDate={"2nd Feb 2024"}
                />)}


            </div>
        </div>
    </div>
}
