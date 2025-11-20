import {categories} from "../../../../data/courses.tsx";
import {useNavigate} from "react-router-dom";


export default function Categories() {
    const navigate = useNavigate();

    const handleClick = (slug: string) => {
        navigate(`/home/category/${slug}`);
    };
    return(
        <div className="my-10">
            <div className="text-4xl font-bold mb-4">Разведуй категории</div>
            <div className="flex flex-row mb-2">
                {categories.map(category => (
                    <div
                        key={category.id}
                        onClick={() => handleClick(category.slug)}
                    >
                        <div className="flex gap-2 px-6 py-3 bg-[#3F3F8F20] border border-transparent mr-4 rounded-3xl text-sm items-center hover:border-[#3F3F8F] hover:underline cursor-pointer hover:text-[#3F3F8F]">
                            {category.icon}
                            {category.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
