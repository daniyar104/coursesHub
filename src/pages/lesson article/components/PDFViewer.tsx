import { useEffect, useState } from "react";
import { pdfToImages } from "../../../utils/pdfToImages";
import Slider from "../../../components/ui/Slider/Slider";
import Loading from "../../../components/ui/Loading/Loading";

export default function PDFViewer({ url }: { url: string }) {
    const [slides, setSlides] = useState<string[]>([]);

    useEffect(() => {
        pdfToImages(url).then(setSlides);
    }, [url]);

    if (!slides.length) return <Loading />;

    return <Slider elements={slides} isPresent={true} />;
}
