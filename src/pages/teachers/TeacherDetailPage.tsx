import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/HomeHeader";
import ExperienceTimeline from "../../components/section/ExperienceTimeline";
import PublicationsList from "../../components/section/PublicationsList";
import CertificatesGallery from "../../components/section/CertificatesGallery";
import { mockTeacherDetails } from "../../service/teacherService";

export default function TeacherDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const teacher = id ? mockTeacherDetails[id] : null;

    if (!teacher) {
        return (
            <>
                <Header />
                <div className="max-w-[1320px] w-9/10 mx-auto py-20 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Преподаватель не найден</h1>
                    <button
                        onClick={() => navigate('/teachers')}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Вернуться к списку
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />

            <div className="bg-gradient-to-b from-indigo-50 to-white">
                {/* Hero Section */}
                <div className="max-w-[1320px] w-9/10 mx-auto py-12">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/teachers')}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-8 group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Назад к списку преподавателей
                    </button>

                    {/* Teacher Header */}
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-8">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <img
                                    src={teacher.avatar}
                                    alt={`${teacher.firstName} ${teacher.lastName}`}
                                    className="w-48 h-48 rounded-2xl object-cover border-4 border-indigo-100 shadow-lg"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                                    {teacher.firstName} {teacher.lastName}
                                </h1>
                                <p className="text-2xl text-indigo-600 font-semibold mb-3">
                                    {teacher.position}
                                </p>
                                <p className="text-lg text-gray-700 mb-4">
                                    {teacher.department}
                                </p>

                                {/* Specialization */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {teacher.specialization.map((spec, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-medium"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="flex gap-8 mb-6">
                                    <div>
                                        <div className="text-3xl font-bold text-indigo-600">{teacher.coursesCount}</div>
                                        <div className="text-gray-600">Курсов</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-indigo-600">{teacher.studentsCount}</div>
                                        <div className="text-gray-600">Студентов</div>
                                    </div>
                                </div>

                                {/* Contact */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <a href={`mailto:${teacher.email}`} className="hover:text-indigo-600">{teacher.email}</a>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <a href={`tel:${teacher.phone}`} className="hover:text-indigo-600">{teacher.phone}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1320px] w-9/10 mx-auto py-12 space-y-16">
                {/* About Section */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">О преподавателе</h2>
                    <div className="bg-white rounded-xl p-8 shadow-md">
                        <p className="text-lg text-gray-700 leading-relaxed">{teacher.fullBio}</p>
                    </div>
                </section>

                {/* Education Section */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Образование</h2>
                    <div className="bg-white rounded-xl p-8 shadow-md">
                        <ul className="space-y-4">
                            {teacher.education.map((edu, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    </svg>
                                    <span className="text-lg text-gray-700">{edu}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Experience Section */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Опыт работы</h2>
                    <ExperienceTimeline experience={teacher.experience} />
                </section>

                {/* Publications Section */}
                {teacher.publications.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Публикации и статьи</h2>
                        <PublicationsList publications={teacher.publications} />
                    </section>
                )}

                {/* Certificates Section */}
                {teacher.certificates.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Сертификаты и дипломы</h2>
                        <CertificatesGallery certificates={teacher.certificates} />
                    </section>
                )}
            </div>
        </>
    );
}
