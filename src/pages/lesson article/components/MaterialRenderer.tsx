import VideoPlayer from "../../../components/ui/VideoPlayer/VideoPlayer";
import LectureViewer from "./LectureViewer";
import PDFViewer from "./PDFViewer";

interface MaterialProps {
    type: "presentation" | "lecture" | "video-lesson";
    title: string;
    material_url?: string;
    slides?: string[];
    video?: string;
    timecodes?: any[];
}

export default function MaterialRenderer(props: MaterialProps) {
    switch (props.type) {
        case "presentation":
            return <PDFViewer url={props.material_url!} />;

        case "lecture":
            return <LectureViewer />;

        case "video-lesson":
            return (
                <div className="relative w-full md:h-[50vh] lg:h-[60vh] max-h-[700px] bg-gray-300 overflow-hidden rounded-[50px]">
                    <VideoPlayer
                        src={props.video!}
                        poster=""
                        title={props.title}
                        timecodes={props.timecodes || []}
                    />
                </div>
            );

        default:
            return <div>Неизвестный тип контента</div>;
    }
}
