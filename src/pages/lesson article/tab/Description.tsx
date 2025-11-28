import Divider from "../../../components/ui/Divider/Divider";

export default function Description() {
    return (
        <div className="max-w-full  mb-10">
            <h2 className="text-2xl text-[#0E2A46] font-bold mb-4">
                ОПИСАНИЕ УРОКА
            </h2>
            <p className="text-[#333931] mb-4 text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim..
            </p>
            <p className="text-[#333931] mb-6 text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum..
            </p>

            <Divider />
            <div className="mt-auto">
                <label className="block text-[#0E2A46] text-xl mb-4">
                    Оставьте комментарий:
                </label>
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
