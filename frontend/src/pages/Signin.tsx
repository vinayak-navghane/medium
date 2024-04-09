import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signin = ():any => {
    return <div className="grid grid-cols-2 font-bold">
        <div>
            <Auth type="signin"/>
        </div>
        <div className="invisible lg:visible">
        <Quote/>
        </div>
        
    </div>
}