import { Appbar } from "../components/Appbar"


export const Publish = (): any => {
    return <div>
        <Appbar />
        <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg w-full">
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="Title" />

                <TextEditor/>
            </div>
        </div>
        
    </div>
}

function TextEditor() {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border ">
            <div className="my-2 bg-white rounded-b-lg w-full">
                   <label className="sr-only">Publish post</label>
                    <textarea id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required ></textarea>
            </div>
            </div>
        </div>
        <button type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 ">
            Publish post
        </button>
    </div>
}