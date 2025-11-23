import type { Experience } from "../../service/types"

interface ExperienceTimelineProps {
    experience: Experience[];
}

export default function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' });
    };

    return (
        <div className="space-y-6">
            {experience.map((exp) => (
                <div key={exp.id} className="relative pl-8 pb-8 border-l-2 border-indigo-200 last:border-l-0 last:pb-0">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-0 transform -translate-x-1/2">
                        <div className={`w-4 h-4 rounded-full ${exp.current ? 'bg-indigo-600' : 'bg-gray-400'} border-4 border-white shadow`}></div>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                                <p className="text-indigo-600 font-semibold">{exp.organization}</p>
                            </div>
                            {exp.current && (
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                    Текущая
                                </span>
                            )}
                        </div>

                        <p className="text-gray-600 mb-3">
                            {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Настоящее время'}
                        </p>

                        <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
