import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

// Указываем воркер
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function pdfToImages(url: string) {
    const pdf = await pdfjsLib.getDocument(url).promise;
    const images: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        // Можно немного уменьшить scale, если 1.5 слишком много для превью
        const viewport = page.getViewport({ scale: 1.2 });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Рисуем белый фон, так как JPEG не поддерживает прозрачность (иначе фон будет черным)
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({
            canvasContext: ctx,
            viewport,
        } as any).promise;

        // ОПТИМИЗАЦИЯ: Используем JPEG и качество 0.75 (75%)
        images.push(canvas.toDataURL("image/jpeg", 0.75));

        // Очищаем страницу из памяти PDF.js
        page.cleanup();
    }

    return images;
}
