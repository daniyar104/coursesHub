import React, {
    useState,
    useRef,
    useImperativeHandle,
    forwardRef,
    useEffect,
} from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

// Определяем структуру таймкода, чтобы плеер знал, что принимать
export interface TimecodeMarker {
    time: number;
    label?: string; // label тут не обязателен для отрисовки, но пусть будет для совместимости
}

export interface VideoPlayerHandle {
    seekTo: (time: number) => void;
}

interface VideoPlayerProps {
    src: string;
    poster?: string;
    title?: string;
    // НОВЫЙ ПРОП: массив таймкодов для отображения на баре
    timecodes?: TimecodeMarker[];
    onDuration?: (duration: number) => void;
}

const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
    ({ src, poster, title, timecodes = [], onDuration }, ref) => {
        const videoRef = useRef<HTMLVideoElement>(null);
        const [isPlaying, setIsPlaying] = useState(false);
        const [currentTime, setCurrentTime] = useState(0);
        const [duration, setDuration] = useState(0);
        const [isMuted, setIsMuted] = useState(false);
        const [showControls, setShowControls] = useState(true);

        const controlsTimeoutRef = useRef<number | undefined>(undefined);

        useImperativeHandle(ref, () => ({
            seekTo: (time: number) => {
                if (videoRef.current) {
                    videoRef.current.currentTime = time;
                    if (videoRef.current.paused) {
                        videoRef.current.play();
                        setIsPlaying(true);
                    }
                }
            },
        }));

        // --- Логика управления (без изменений) ---
        const handleMouseMove = () => {
            setShowControls(true);
            if (controlsTimeoutRef.current)
                clearTimeout(controlsTimeoutRef.current);
            if (isPlaying) {
                controlsTimeoutRef.current = window.setTimeout(
                    () => setShowControls(false),
                    3000
                );
            }
        };

        const handleMouseLeave = () => {
            if (isPlaying) setShowControls(false);
        };

        useEffect(() => {
            return () => {
                if (controlsTimeoutRef.current)
                    clearTimeout(controlsTimeoutRef.current);
            };
        }, []);

        const togglePlay = () => {
            if (!videoRef.current) return;
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
                controlsTimeoutRef.current = window.setTimeout(
                    () => setShowControls(false),
                    3000
                );
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
                setShowControls(true);
                if (controlsTimeoutRef.current)
                    clearTimeout(controlsTimeoutRef.current);
            }
        };

        const handleTimeUpdate = () => {
            if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
        };

        const handleLoadedMetadata = () => {
            if (videoRef.current) setDuration(videoRef.current.duration);

            const d = videoRef.current.duration;
            setDuration(d);

            // отправляем родителю
            if (onDuration) onDuration(d);
        };

        const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
            const time = Number(e.target.value);
            if (videoRef.current) {
                videoRef.current.currentTime = time;
                setCurrentTime(time);
            }
        };

        const toggleMute = () => {
            if (videoRef.current) {
                videoRef.current.muted = !isMuted;
                setIsMuted(!isMuted);
            }
        };

        const toggleFullscreen = () => {
            if (!videoRef.current) return;
            const container = videoRef.current.parentElement;
            if (container) {
                if (!document.fullscreenElement) container.requestFullscreen();
                else document.exitFullscreen();
            }
        };

        const formatTime = (time: number) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        };
        // -----------------------------------------

        return (
            <div
                className="relative w-full h-full aspect-video bg-black rounded-xl overflow-hidden group shadow-lg select-none"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    className="w-full h-full object-contain"
                    onClick={togglePlay}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                />

                <div
                    className={`absolute inset-0 bg-black/30 transition-opacity duration-300 flex flex-col justify-between pointer-events-none ${
                        showControls || !isPlaying ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="p-6 text-white font-medium text-lg drop-shadow-md">
                        {title}
                    </div>

                    {!isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button
                                onClick={togglePlay}
                                className="bg-white/20 backdrop-blur-md p-5 rounded-full hover:bg-white/30 transition-all transform hover:scale-110 pointer-events-auto"
                            >
                                <Play
                                    fill="white"
                                    className="text-white w-8 h-8 ml-1"
                                />
                            </button>
                        </div>
                    )}

                    <div className="bg-gradient-to-t from-black/90 to-transparent px-6 pb-6 pt-12 pointer-events-auto">
                        {/* --- ПРОГРЕСС БАР С МАРКЕРАМИ --- */}
                        <div className="relative w-full h-1.5 flex items-center group/slider cursor-pointer mb-4">
                            {/* Фон */}
                            <div className="absolute w-full h-full bg-white/30 rounded-full overflow-hidden">
                                {/* НОВОЕ: Маркеры глав 
                  Мы рисуем их поверх фона, но под активным прогрессом.
                  Используем z-index, чтобы они были видны на фоне, но перекрывались синим прогрессом.
              */}
                                {duration > 0 &&
                                    timecodes.map((tc, index) => {
                                        // Не рисуем маркер для самого начала (0:00)
                                        if (tc.time <= 0) return null;
                                        const position =
                                            (tc.time / duration) * 100;
                                        return (
                                            <div
                                                key={index}
                                                // Тонкая белая полупрозрачная линия, создающая эффект "разреза"
                                                className="absolute top-0 bottom-0 w-[1px] bg-white/70 z-10 pointer-events-none"
                                                style={{ left: `${position}%` }}
                                            />
                                        );
                                    })}
                            </div>

                            {/* Прогресс (Accent Color) */}
                            <div
                                className="absolute h-full bg-[#5F52F8] rounded-full z-20 pointer-events-none"
                                style={{
                                    width: `${(currentTime / duration) * 100}%`,
                                }}
                            ></div>

                            {/* Input range (невидимый) */}
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                                className="absolute w-full h-full opacity-0 cursor-pointer z-30"
                            />
                        </div>
                        {/* -------------------------------- */}

                        <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={togglePlay}
                                    className="hover:text-[#5F52F8] transition-colors"
                                >
                                    {isPlaying ? (
                                        <Pause size={24} fill="currentColor" />
                                    ) : (
                                        <Play size={24} fill="currentColor" />
                                    )}
                                </button>
                                <span className="text-sm font-medium font-mono">
                                    {formatTime(currentTime)} /{" "}
                                    {formatTime(duration)}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={toggleMute}
                                    className="hover:text-[#5F52F8] transition-colors"
                                >
                                    {isMuted ? (
                                        <VolumeX size={20} />
                                    ) : (
                                        <Volume2 size={20} />
                                    )}
                                </button>
                                <button
                                    onClick={toggleFullscreen}
                                    className="hover:text-[#5F52F8] transition-colors"
                                >
                                    <Maximize size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

VideoPlayer.displayName = "VideoPlayer";
export default VideoPlayer;
