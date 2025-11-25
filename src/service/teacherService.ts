import type { Teacher, TeacherDetail } from "./types";

// Mock data for teachers
export const mockTeachers: Teacher[] = [
    {
        id: "1",
        firstName: "Айгуль",
        lastName: "Токтомушева",
        position: "Профессор",
        department: "Факультет информационных технологий",
        specialization: ["Веб-разработка", "JavaScript", "React"],
        avatar: "https://i.pravatar.cc/300?img=1",
        email: "a.toktomushe va@university.kg",
        phone: "+996 555 123 456",
        shortBio: "Профессор с 15-летним опытом преподавания веб-разработки и современных JavaScript фреймворков."
    },
    {
        id: "2",
        firstName: "Бакыт",
        lastName: "Асанов",
        position: "Доцент",
        department: "Факультет информационных технологий",
        specialization: ["Python", "Data Science", "Machine Learning"],
        avatar: "https://i.pravatar.cc/300?img=12",
        email: "b.asanov@university.kg",
        phone: "+996 555 234 567",
        shortBio: "Специалист по анализу данных и машинному обучению с опытом работы в международных проектах."
    },
    {
        id: "3",
        firstName: "Гульнара",
        lastName: "Садыкова",
        position: "Старший преподаватель",
        department: "Факультет дизайна",
        specialization: ["UX/UI Design", "Графический дизайн", "Figma"],
        avatar: "https://i.pravatar.cc/300?img=5",
        email: "g.sadykova@university.kg",
        phone: "+996 555 345 678",
        shortBio: "Практикующий UX/UI дизайнер с портфолио из более чем 50 успешных проектов."
    },
    {
        id: "4",
        firstName: "Эрлан",
        lastName: "Бекжанов",
        position: "Профессор",
        department: "Факультет бизнеса",
        specialization: ["Маркетинг", "Digital Marketing", "SMM"],
        avatar: "https://i.pravatar.cc/300?img=13",
        email: "e.bekzhanov@university.kg",
        phone: "+996 555 456 789",
        shortBio: "Эксперт в области цифрового маркетинга, автор 3 книг по интернет-маркетингу."
    },
    {
        id: "5",
        firstName: "Динара",
        lastName: "Касымова",
        position: "Доцент",
        department: "Факультет информационных технологий",
        specialization: ["Mobile Development", "Flutter", "iOS"],
        avatar: "https://i.pravatar.cc/300?img=9",
        email: "d.kasymova@university.kg",
        phone: "+996 555 567 890",
        shortBio: "Разработчик мобильных приложений с опытом создания приложений для iOS и Android."
    },
    {
        id: "6",
        firstName: "Тимур",
        lastName: "Жумабаев",
        position: "Старший преподаватель",
        department: "Факультет информационных технологий",
        specialization: ["Backend Development", "Node.js", "Databases"],
        avatar: "https://i.pravatar.cc/300?img=14",
        email: "t.zhumabaev@university.kg",
        phone: "+996 555 678 901",
        shortBio: "Backend разработчик с глубокими знаниями в области серверных технологий и баз данных."
    }
];

export const mockTeacherDetails: { [key: string]: TeacherDetail } = {
    "1": {
        ...mockTeachers[0],
        fullBio: "Айгуль Токтомушева - профессор факультета информационных технологий с более чем 15-летним опытом преподавания. Специализируется на веб-разработке, современных JavaScript фреймворках и лучших практиках программирования. Активно участвует в международных конференциях и является автором множества научных публикаций в области компьютерных наук.",
        education: [
            "Кандидат технических наук, Московский государственный университет, 2010",
            "Магистр компьютерных наук, Кыргызский национальный университет, 2005",
            "Бакалавр информационных технологий, Кыргызский национальный университет, 2003"
        ],
        experience: [
            {
                id: "exp1",
                position: "Профессор",
                organization: "Кыргызский национальный университет",
                startDate: "2015-09-01",
                description: "Преподавание курсов по веб-разработке, JavaScript, React и современным фронтенд технологиям",
                current: true
            },
            {
                id: "exp2",
                position: "Доцент",
                organization: "Кыргызский национальный университет",
                startDate: "2010-09-01",
                endDate: "2015-08-31",
                description: "Преподавание основ программирования и веб-технологий",
                current: false
            },
            {
                id: "exp3",
                position: "Senior Frontend Developer",
                organization: "Tech Solutions KG",
                startDate: "2008-01-01",
                endDate: "2010-08-31",
                description: "Разработка веб-приложений для крупных клиентов",
                current: false
            }
        ],
        publications: [
            {
                id: "pub1",
                title: "Современные подходы к разработке SPA приложений",
                type: "article",
                publisher: "Журнал Информационных Технологий",
                publishDate: "2023-05-15",
                description: "Исследование современных подходов к разработке одностраничных приложений с использованием React и Vue.js"
            },
            {
                id: "pub2",
                title: "React: от основ до продвинутых концепций",
                type: "book",
                publisher: "Tech Publishing",
                publishDate: "2022-11-20",
                description: "Комплексное руководство по разработке на React для начинающих и опытных разработчиков"
            },
            {
                id: "pub3",
                title: "Оптимизация производительности веб-приложений",
                type: "conference",
                publisher: "DevConf Central Asia 2023",
                publishDate: "2023-09-10",
                description: "Доклад о методах оптимизации производительности современных веб-приложений"
            }
        ],
        certificates: [
            {
                id: "cert1",
                title: "AWS Certified Solutions Architect",
                issuer: "Amazon Web Services",
                issueDate: "2023-03-15",
                imageUrl: "https://placehold.co/400x300/4C0D7F/ffffff?text=AWS+Certificate"
            },
            {
                id: "cert2",
                title: "Google Cloud Professional Developer",
                issuer: "Google Cloud",
                issueDate: "2022-08-20",
                imageUrl: "https://placehold.co/400x300/4285F4/ffffff?text=Google+Cloud"
            },
            {
                id: "cert3",
                title: "Meta React Advanced Certification",
                issuer: "Meta (Facebook)",
                issueDate: "2023-01-10",
                imageUrl: "https://placehold.co/400x300/0668E1/ffffff?text=Meta+React"
            }
        ],
        coursesCount: 12,
        studentsCount: 450
    }
};

// Add basic details for other teachers
mockTeachers.slice(1).forEach(teacher => {
    if (!mockTeacherDetails[teacher.id]) {
        mockTeacherDetails[teacher.id] = {
            ...teacher,
            fullBio: teacher.shortBio + " Активно участвует в научной деятельности и развитии образовательных программ университета.",
            education: [
                "Кандидат наук, 2010",
                "Магистр, 2005",
                "Бакалавр, 2003"
            ],
            experience: [
                {
                    id: `exp-${teacher.id}-1`,
                    position: teacher.position,
                    organization: "Кыргызский национальный университет",
                    startDate: "2015-09-01",
                    description: `Преподавание курсов по ${teacher.specialization.join(', ')}`,
                    current: true
                }
            ],
            publications: [
                {
                    id: `pub-${teacher.id}-1`,
                    title: `Современные подходы в ${teacher.specialization[0]}`,
                    type: "article",
                    publisher: "Научный журнал",
                    publishDate: "2023-06-01",
                    description: "Научная статья по актуальным вопросам в области специализации"
                }
            ],
            certificates: [
                {
                    id: `cert-${teacher.id}-1`,
                    title: `Professional ${teacher.specialization[0]} Certification`,
                    issuer: "International Certification Body",
                    issueDate: "2023-01-15",
                    imageUrl: "https://placehold.co/400x300/4C0D7F/ffffff?text=Certificate"
                }
            ],
            coursesCount: Math.floor(Math.random() * 10) + 5,
            studentsCount: Math.floor(Math.random() * 300) + 100
        };
    }
});
