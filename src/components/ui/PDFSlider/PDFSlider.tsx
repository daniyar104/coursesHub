import { useState, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, AlertCircle } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Настройка worker для react-pdf - используем локальный worker из node_modules
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

interface PDFSliderProps {
    fileUrl: string;
    title: string;
}

export default function PDFSlider({ fileUrl, title }: PDFSliderProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Мемоизируем options чтобы избежать ненужных перезагрузок
    const options = useMemo(() => ({
        cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
        cMapPacked: true,
        standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
    }), []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setLoading(false);
        setError(null);
    }

    function onDocumentLoadError(error: Error) {
        console.error('Error loading PDF:', error);
        setLoading(false);
        setError('Не удалось загрузить PDF файл. Попробуйте скачать его.');
    }

    const goToPrevPage = () => {
        setPageNumber((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setPageNumber((prev) => Math.min(prev + 1, numPages));
    };

    const zoomIn = () => {
        setScale((prev) => Math.min(prev + 0.2, 2.0));
    };

    const zoomOut = () => {
        setScale((prev) => Math.max(prev - 0.2, 0.5));
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Ошибка загрузки PDF</h3>
                <p className="text-gray-600 mb-6 text-center max-w-md">{error}</p>
                <a
                    href={fileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-semibold"
                >
                    <Download className="w-5 h-5" />
                    Скачать PDF
                </a>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-gray-100">
            {/* Controls Bar */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-4">
                    {/* Page Navigation */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={goToPrevPage}
                            disabled={pageNumber <= 1}
                            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Предыдущая страница"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                            <input
                                type="number"
                                min={1}
                                max={numPages}
                                value={pageNumber}
                                onChange={(e) => {
                                    const page = parseInt(e.target.value);
                                    if (page >= 1 && page <= numPages) {
                                        setPageNumber(page);
                                    }
                                }}
                                className="w-16 text-center bg-transparent border-none outline-none font-semibold"
                            />
                            <span className="text-gray-500">/ {numPages || '...'}</span>
                        </div>

                        <button
                            onClick={goToNextPage}
                            disabled={pageNumber >= numPages}
                            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Следующая страница"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Zoom Controls */}
                    <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                        <button
                            onClick={zoomOut}
                            disabled={scale <= 0.5}
                            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Уменьшить"
                        >
                            <ZoomOut className="w-5 h-5" />
                        </button>

                        <span className="px-3 py-1 bg-gray-50 rounded-lg font-semibold min-w-[60px] text-center">
                            {Math.round(scale * 100)}%
                        </span>

                        <button
                            onClick={zoomIn}
                            disabled={scale >= 2.0}
                            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Увеличить"
                        >
                            <ZoomIn className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Download Button */}
                <a
                    href={fileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-semibold"
                >
                    <Download className="w-5 h-5" />
                    Скачать
                </a>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-auto flex items-start justify-center p-8">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 border-4 border-indigo-600 border-dashed rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600">Загрузка PDF...</p>
                    </div>
                )}

                <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={null}
                    className="shadow-2xl"
                    options={options}
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="bg-white shadow-lg"
                    />
                </Document>
            </div>

            {/* Page Info Footer */}
            {!loading && !error && (
                <div className="bg-white border-t border-gray-200 px-6 py-3 text-center text-sm text-gray-600">
                    Страница {pageNumber} из {numPages} • {title}
                </div>
            )}
        </div>
    );
}
