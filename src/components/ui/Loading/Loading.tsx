interface LoadingProps {
    size?: 'small' | 'medium' | 'large';
    color?: 'white' | 'primary' | 'gray';
}

export default function Loading({ size = 'medium', color = 'primary' }: LoadingProps) {
    // размеры в пикселях
    const sizeMap = {
        small: 'w-8 h-8 border-2',
        medium: 'w-16 h-16 border-4',
        large: 'w-24 h-24 border-6',
    };

    const colorLoad = {
        white: 'border-white',
        primary: 'border-indigo-600',
        gray: 'border-gray-600',
    };

    return (
        <div className="flex justify-center items-center w-full h-full">
            <div
                className={`${sizeMap[size]} ${colorLoad[color]} border-dashed rounded-full animate-spin`}
            ></div>
        </div>
    );
}
