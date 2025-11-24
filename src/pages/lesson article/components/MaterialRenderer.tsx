import VideoPlayer from "../../../components/ui/VideoPlayer/VideoPlayer";
import LectureViewer from "./LectureViewer";
import PDFViewer from "./PDFViewer";

interface MaterialProps {
    type: "PRESENTATION" | "VIDEO" | "OTHER";
    title: string;
    material_url?: string | null;
    slides?: string[];
    video?: string;
    timecodes?: any[];
    onVideoDuration?: (duration: number) => void;
}

export default function MaterialRenderer(props: MaterialProps) {
    switch (props.type.toLowerCase()) {
        case "presentation":
            return <PDFViewer url={props.material_url!} />;

        case "lecture":
            return <LectureViewer />;

        case "video":
            return (
                <div className="relative w-full md:h-[50vh] lg:h-[60vh] max-h-[700px] bg-gray-300 overflow-hidden rounded-[50px]">
                    <VideoPlayer
                        src={props.material_url!}
                        poster=""
                        title={props.title}
                        timecodes={props.timecodes || []}
                        onDuration={props.onVideoDuration}
                    />
                </div>
            );

        default:
            return <div>Неизвестный тип контента</div>;
    }
}
