import type {PresentList} from "../../../../service/types.ts";
import {Dot, PlayIcon, Pointer} from "lucide-react";
interface PresentListProps {
    courses: PresentList
}

export default function PresentCard({courses}: PresentListProps){
    return (
        <>
            <div className="w-90 h-40 flex cursor-pointer">
                <div className="w-30 h-40 bg-gray-400 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-full">
                        <PlayIcon />
                    </div>
                </div>
                <div className="pl-4 border-r border-y pt-4">
                    <div>
                        <div className="text-sm lowercase mb-2">{courses.title}</div>
                        <div>{courses.lessons}</div>
                    </div>
                   <div className="flex flex-row gap-4 mt-6 items-center">
                       <div className="text-sm">{courses.type}</div>
                       <Dot />
                       <div className="text-sm">{courses.time}</div>
                   </div>
                </div>
            </div>
        </>
    )
}

