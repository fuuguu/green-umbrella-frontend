import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, MessageCircle, ChevronRight, Code2, Globe, Gamepad2, Brain, Layers } from 'lucide-react';

const teachers = [
  {
    id: 1,
    name: 'Артём Волков',
    role: 'C# / .NET Разработчик',
    emoji: '👨‍💻',
    color: '#00ff88',
    icon: Code2,
    exp: '12 лет',
    rating: 4.9,
    students: 124,
    courses: ['C# Разработка', 'Паттерны проектирования'],
    skills: ['C#', '.NET', 'ASP.NET Core', 'Entity Framework', 'Microservices', 'Docker'],
    bio: 'Senior .NET разработчик с 12-летним опытом. Работал в Сбертехе, Иннотехе. Эксперт по enterprise-архитектуре и микросервисам. Страстный преподаватель — объясняет сложные вещи простым языком.',
    achievements: ['Microsoft MVP', 'Спикер DotNext 2022', 'Open Source contributor'],
  },
  {
    id: 2,
    name: 'Марина Соколова',
    role: 'Full Stack Web Developer',
    emoji: '👩‍💻',
    color: '#00ddff',
    icon: Globe,
    exp: '8 лет',
    rating: 4.8,
    students: 200,
    courses: ['Web-разработка', 'React Advanced'],
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL', 'AWS'],
    bio: 'Full Stack разработчик из Яндекса. Специализируется на React-экосистеме и производительности веб-приложений. Автор популярного YouTube-канала по TypeScript.',
    achievements: ['Ex-Яндекс Lead Dev', 'YouTube 50K подписчиков', 'GDE по Web'],
  },
  {
    id: 3,
    name: 'Денис Крылов',
    role: 'Game Developer',
    emoji: '🎮',
    color: '#ff6b6b',
    icon: Gamepad2,
    exp: '10 лет',
    rating: 4.9,
    students: 98,
    courses: ['Unity разработка', 'Разработка игр'],
    skills: ['Unity', 'C#', '2D/3D', 'Shader Graph', 'Networking', 'Steam SDK'],
    bio: 'Выпустил 5 коммерческих игр в Steam. Работал в 1С-Game Studios. Специализируется на Unity и геймдизайне. Верит, что каждый может создать игру своей мечты.',
    achievements: ['5 игр в Steam', 'Unity Certified Pro', 'Ex-1С Game Studios'],
  },
  {
    id: 4,
    name: 'Пётр Захаров',
    role: 'Unreal Engine Expert',
    emoji: '⚡',
    color: '#f59e0b',
    icon: Layers,
    exp: '9 лет',
    rating: 4.8,
    students: 62,
    courses: ['Unreal Engine 5'],
    skills: ['UE5', 'C++', 'Blueprints', 'Lumen', 'Nanite', 'VFX'],
    bio: 'AAA разработчик, участвовавший в создании нескольких крупных проектов. Эксперт по Lumen и Nanite — новейшим технологиям Unreal Engine 5. Обучает с фокусом на реальный продакшн.',
    achievements: ['Epic Games Partner', 'Unreal Fellowship Alumni', 'GDC спикер 2023'],
  },
  {
    id: 5,
    name: 'Ксения Лебедева',
    role: 'ML / AI Engineer',
    emoji: '🤖',
    color: '#a855f7',
    icon: Brain,
    exp: '7 лет',
    rating: 5.0,
    students: 87,
    courses: ['Искусственный интеллект', 'Data Science'],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'LLM', 'Computer Vision', 'MLOps'],
    bio: 'ML Engineer в крупной tech-компании. Кандидат технических наук по machine learning. Участник Kaggle competitions (top 1%). Сделает ML понятным для каждого.',
    achievements: ['PhD в ML', 'Kaggle Master', 'Автор 3 научных статей'],
  },
];

export default function TeachersPage() {
  return (
    <div className="min-h-screen bg-[#050f0a] text-white pt-24 pb-24">
      {/* Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00ff88]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-4">// КОМАНДА ЭКСПЕРТОВ</div>
            <h1 className="section-title text-5xl md:text-6xl gradient-text mb-4">ПРЕПОДАВАТЕЛИ</h1>
            <p className="text-white/50 max-w-2xl mx-auto font-inter text-lg">
              Практикующие специалисты из ведущих IT-компаний. Не просто теория — живой опыт.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {teachers.map((teacher, i) => (
          <motion.div
            key={teacher.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="card-bg rounded-sm overflow-hidden group"
          >
            <div className="grid md:grid-cols-4 gap-0">
              {/* Left - Avatar */}
              <div
                className="p-8 flex flex-col items-center justify-center text-center relative"
                style={{ background: `${teacher.color}08`, borderRight: `1px solid ${teacher.color}22` }}
              >
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-4 border-2"
                  style={{ borderColor: `${teacher.color}44`, background: `${teacher.color}11` }}
                >
                  {teacher.emoji}
                </div>
                <h3 className="font-orbitron font-bold text-white text-base mb-1">{teacher.name}</h3>
                <div className="font-mono text-xs mb-3" style={{ color: teacher.color }}>
                  {teacher.role}
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Star size={12} className="fill-[#00ff88] text-[#00ff88]" />
                  <span className="font-mono text-xs text-white">{teacher.rating}</span>
                </div>
                <div className="font-mono text-[10px] text-white/30">{teacher.students} студентов</div>
                <div className="font-mono text-[10px] text-white/30 mt-1">Опыт: {teacher.exp}</div>
              </div>

              {/* Right - Info */}
              <div className="md:col-span-3 p-8">
                <div className="grid md:grid-cols-3 gap-8 h-full">
                  {/* Bio */}
                  <div className="md:col-span-2">
                    <div className="font-mono text-[10px] text-[#00ff88]/60 tracking-widest mb-2">// БИО</div>
                    <p className="text-white/50 text-sm font-inter leading-relaxed mb-5">{teacher.bio}</p>

                    <div className="font-mono text-[10px] text-[#00ff88]/60 tracking-widest mb-3">// ДОСТИЖЕНИЯ</div>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {teacher.achievements.map((ach) => (
                        <span
                          key={ach}
                          className="font-mono text-[10px] px-2 py-1 rounded-sm border"
                          style={{
                            borderColor: `${teacher.color}33`,
                            color: `${teacher.color}99`,
                            background: `${teacher.color}0a`,
                          }}
                        >
                          ✦ {ach}
                        </span>
                      ))}
                    </div>

                    <div className="font-mono text-[10px] text-[#00ff88]/60 tracking-widest mb-3">// ВЕДЁТ КУРСЫ</div>
                    <div className="flex flex-wrap gap-2">
                      {teacher.courses.map((course) => (
                        <Link
                          key={course}
                          to="/courses"
                          className="font-mono text-[10px] px-3 py-1.5 rounded-sm border border-[#00ff88]/20 text-white/40 hover:text-[#00ff88] hover:border-[#00ff88]/50 transition-all"
                        >
                          {course}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Skills + CTA */}
                  <div>
                    <div className="font-mono text-[10px] text-[#00ff88]/60 tracking-widest mb-3">// СТЕК</div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {teacher.skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-[10px] px-2 py-1 rounded-sm"
                          style={{
                            background: `${teacher.color}11`,
                            border: `1px solid ${teacher.color}22`,
                            color: teacher.color,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <Link
                      to="/register"
                      className="btn-primary px-5 py-3 rounded-sm text-xs flex items-center gap-2 w-full justify-center mb-2"
                    >
                      Записаться на курс <ChevronRight size={12} />
                    </Link>
                    <Link
                      to="/contacts"
                      className="btn-outline px-5 py-3 rounded-sm text-xs flex items-center gap-2 w-full justify-center"
                    >
                      <MessageCircle size={12} /> Задать вопрос
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Join team */}
      <div className="max-w-3xl mx-auto px-6 mt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="card-bg p-10 rounded-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/5 via-transparent to-[#00ff88]/5" />
          <div className="relative z-10">
            <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-3">// ПРИСОЕДИНИТЬСЯ К КОМАНДЕ</div>
            <h3 className="font-orbitron font-bold text-2xl text-white mb-3">Стань преподавателем</h3>
            <p className="text-white/40 font-inter text-sm mb-6">
              Ты опытный разработчик и хочешь делиться знаниями? Мы всегда ищем экспертов-практиков.
            </p>
            <Link to="/contacts" className="btn-primary px-8 py-3 rounded-sm text-sm inline-flex items-center gap-2">
              Оставить заявку <ChevronRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
