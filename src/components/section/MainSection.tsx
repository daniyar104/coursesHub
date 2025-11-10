export default function MainSection() {
    return (
        <main className="py-20 text-center mt-10">
            <h1 className="max-w-[800px] font-sans font-bold text-4xl md:text-5xl lg:text-8xl text-center mx-auto leading-none text-gray-800">
                Добро пожаловать в CourseHub
            </h1>
            <p
                className="mt-6 text-xl text-gray-600"
                data-aos="fade-up"
                data-aos-delay="200"
            >
                Платформа, которая делает онлайн-обучение доступным, удобным и
                эффективным!
            </p>
            <button
                className="mt-8 px-6 py-3 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                data-aos="fade-up"
                data-aos-delay="400"
            >
                Начать!
            </button>
        </main>
    );
}
