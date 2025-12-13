import Divider from '../../../components/ui/Divider/Divider';

interface DescriptionProps {
    content: any;
}
export default function Description({ content }: DescriptionProps) {
    return (
        <div className="min-w-full  mb-10">
            <h2 className="text-2xl text-[#0E2A46] font-bold mb-4">ОПИСАНИЕ УРОКА</h2>
            <p className="whitespace-pre-line">{content}</p>
            <Divider />
            <div className="mt-auto">
                <label className="block text-[#0E2A46] text-xl mb-4">Оставьте комментарий:</label>
                <input
                    type="text"
                    placeholder="Напишите Своё Мнение"
                    className="w-full rounded-full border border-[#5344B6] p-4 text-gray-700 focus:outline-none text-xl"
                />
            </div>

            <Divider className="" />
        </div>
    );
}
