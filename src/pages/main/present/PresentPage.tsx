import {PresentCourses} from "../../../../data/courses.tsx";
import PresentCard from "./PresentCard.tsx";


export default function PresentPage(){
    return (
        <>
            <div className="mx-8">
                <h1 className="text-2xl mb-4">Продолжите учиться</h1>
               <div className="flex gap-10">
                   {PresentCourses.map((item)=>(
                       <PresentCard key={item.id} courses={item} />
                   ))}
               </div>
            </div>
        </>
    )
}
