import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { useParams } from 'react-router-dom'

export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    

//  console.log(blog?.author.name)

    if(loading){
        <div>
            loading
        </div>
    }
    return <div>
        <FullBlog blog={blog}/>
    </div>
        
    
}

