export default function durationFormat(sec: number) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    if (m < 1) return `${s} ceк`;

    return `${m} мин ${s} сек`;
}
