import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Code2, Globe, Gamepad2, Brain, ChevronRight,
  Clock, Users, BarChart2, CheckCircle, Star, Layers
} from 'lucide-react';

const allCourses = [
  {
    id: 'csharp',
    category: 'backend',
    icon: Code2,
    color: '#00ff88',
    title: 'C# Разработка',
    subtitle: 'От основ до Senior Backend',
    duration: '8 месяцев',
    hours: '320 часов',
    students: '124',
    rating: 4.9,
    level: 'С нуля',
    price: '4 800 ₽/мес',
    tags: ['C#', '.NET', 'ASP.NET Core', 'EF Core', 'SQL', 'REST API'],
    shortDesc: 'Самый востребованный язык для enterprise-разработки. Создавай приложения, API, сервисы.',
    modules: [
      'Основы C# и ООП',
      'Работа с .NET экосистемой',
      'ASP.NET Core и REST API',
      'Entity Framework Core + БД',
      'Паттерны проектирования',
      'Финальный проект',
    ],
  },
  {
    id: 'web',
    category: 'web',
    icon: Globe,
    color: '#00ddff',
    title: 'Web-разработка',
    subtitle: 'Full Stack: Frontend + Backend',
    duration: '10 месяцев',
    hours: '400 часов',
    students: '200',
    rating: 4.8,
    level: 'С нуля',
    price: '4 500 ₽/мес',
    tags: ['HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    shortDesc: 'Полный стек современной веб-разработки. От вёрстки до серверной части и деплоя.',
    modules: [
      'HTML5, CSS3, адаптивность',
      'JavaScript ES2024',
      'TypeScript',
      'React + экосистема',
      'Node.js + Express/Fastify',
      'Базы данных и деплой',
    ],
  },
  {
    id: 'unity',
    category: 'gamedev',
    icon: Gamepad2,
    color: '#ff6b6b',
    title: 'Unity — Разработка игр',
    subtitle: '2D и 3D игры на Unity',
    duration: '10 месяцев',
    hours: '380 часов',
    students: '98',
    rating: 4.9,
    level: 'С нуля',
    price: '5 200 ₽/мес',
    tags: ['Unity', 'C#', '2D', '3D', 'Физика', 'Шейдеры'],
    shortDesc: 'Разрабатывай 2D и 3D игры на Unity. От базовых механик до публикации в Steam.',
    modules: [
      'Интерфейс Unity, сцены, объекты',
      'C# скриптинг для игр',
      'Физика и анимация',
      'UI, меню, HUD',
      'Мобильные игры',
      'Публикация и монетизация',
    ],
  },
  {
    id: 'unreal',
    category: 'gamedev',
    icon: Layers,
    color: '#f59e0b',
    title: 'Unreal Engine',
    subtitle: 'AAA-разработка игр',
    duration: '12 месяцев',
    hours: '480 часов',
    students: '62',
    rating: 4.8,
    level: 'Базовый C++',
    price: '5 800 ₽/мес',
    tags: ['Unreal Engine 5', 'C++', 'Blueprints', 'Lumen', 'Nanite'],
    shortDesc: 'Движок, на котором создают лучшие игры мира. Blueprints + C++ + новейшие технологии UE5.',
    modules: [
      'Основы UE5 и Blueprints',
      'C++ в контексте игр',
      'Lumen и Nanite',
      'Персонажи и анимация',
      'Мультиплеер',
      'Оптимизация и деплой',
    ],
  },
  {
    id: 'ai',
    category: 'ai',
    icon: Brain,
    color: '#a855f7',
    title: 'Искусственный интеллект',
    subtitle: 'ML & Data Science',
    duration: '9 месяцев',
    hours: '360 часов',
    students: '87',
    rating: 5.0,
    level: 'Базовый Python',
    price: '5 500 ₽/мес',
    tags: ['Python', 'NumPy', 'TensorFlow', 'PyTorch', 'LLM', 'CV'],
    shortDesc: 'Нейросети, ML-модели, работа с данными. Создавай ИИ-решения, которые меняют мир.',
    modules: [
      'Python для Data Science',
      'Математика: линейная алгебра, статистика',
      'ML: классические алгоритмы',
      'Глубокое обучение (DL)',
      'NLP и Large Language Models',
      'Компьютерное зрение',
    ],
  },
];

const categories = [
  { id: 'all', label: 'Все курсы' },
  { id: 'backend', label: 'Backend' },
  { id: 'web', label: 'Web' },
  { id: 'gamedev', label: 'Геймдев' },
  { id: 'ai', label: 'ИИ' },
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = allCourses.filter(
    (c) => activeCategory === 'all' || c.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-[#050f0a] text-white pt-24 pb-24">
      {/* Header */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00ff88]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-4">// КАТАЛОГ КУРСОВ</div>
            <h1 className="section-title text-5xl md:text-6xl gradient-text mb-4">НАПРАВЛЕНИЯ</h1>
            <p className="text-white/50 max-w-2xl mx-auto font-inter text-lg">
              Выбери своё направление в IT. Каждый курс — это реальный карьерный путь.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-orbitron text-xs px-6 py-3 rounded-sm tracking-widest uppercase transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#00ff88] text-[#050f0a] font-bold shadow-[0_0_20px_#00ff8866]'
                  : 'border border-[#00ff88]/20 text-white/50 hover:border-[#00ff88]/50 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Course cards */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-bg rounded-sm overflow-hidden group"
              >
                {/* Card header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-sm flex items-center justify-center shrink-0"
                        style={{ background: `${course.color}22`, border: `1px solid ${course.color}44` }}
                      >
                        <course.icon size={24} style={{ color: course.color }} />
                      </div>
                      <div>
                        <h3 className="font-orbitron font-bold text-white text-lg group-hover:text-[#00ff88] transition-colors">
                          {course.title}
                        </h3>
                        <div className="font-mono text-xs mt-0.5" style={{ color: course.color }}>
                          {course.subtitle}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-[#00ff88] fill-[#00ff88]" />
                      <span className="font-mono text-xs text-white">{course.rating}</span>
                    </div>
                  </div>

                  <p className="text-white/50 text-sm font-inter mb-4 leading-relaxed">{course.shortDesc}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-1 rounded-sm"
                        style={{
                          background: `${course.color}11`,
                          border: `1px solid ${course.color}22`,
                          color: `${course.color}aa`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Info row */}
                  <div className="grid grid-cols-3 gap-3 py-3 border-t border-[#00ff88]/10">
                    {[
                      { icon: Clock, label: course.duration },
                      { icon: Users, label: `${course.students} студ.` },
                      { icon: BarChart2, label: course.level },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-1.5">
                        <Icon size={12} className="text-[#00ff88]/60" />
                        <span className="font-mono text-[10px] text-white/40">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expandable modules */}
                <AnimatePresence>
                  {expanded === course.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden border-t border-[#00ff88]/10"
                    >
                      <div className="p-6 pt-4">
                        <div className="font-orbitron text-xs text-[#00ff88] mb-3 tracking-widest">
                          // ПРОГРАММА КУРСА
                        </div>
                        <ul className="space-y-2">
                          {course.modules.map((mod, mi) => (
                            <li key={mod} className="flex items-start gap-3">
                              <div className="font-mono text-[10px] text-[#00ff88]/40 mt-0.5 shrink-0">
                                {String(mi + 1).padStart(2, '0')}
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle size={12} className="text-[#00ff88]/60 mt-0.5 shrink-0" />
                                <span className="text-white/60 text-sm font-inter">{mod}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer */}
                <div className="p-6 pt-0 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] text-white/30">Стоимость</div>
                    <div className="font-orbitron font-bold text-lg" style={{ color: course.color }}>
                      {course.price}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setExpanded(expanded === course.id ? null : course.id)}
                      className="font-mono text-xs px-4 py-2 rounded-sm border border-[#00ff88]/20 text-white/40 hover:border-[#00ff88]/50 hover:text-white transition-all duration-300"
                    >
                      {expanded === course.id ? 'Свернуть' : 'Программа'}
                    </button>
                    <Link
                      to="/register"
                      className="btn-primary px-4 py-2 rounded-sm text-xs flex items-center gap-1"
                    >
                      Записаться <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-6 mt-20 text-center">
        <div className="card-bg p-10 rounded-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/5 via-transparent to-[#00ff88]/5" />
          <div className="relative z-10">
            <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-3">// НЕ МОЖЕШЬ ВЫБРАТЬ?</div>
            <h3 className="font-orbitron font-bold text-2xl text-white mb-3">Пройди бесплатную консультацию</h3>
            <p className="text-white/40 font-inter text-sm mb-6">
              Расскажи нам о своих целях — поможем выбрать оптимальный курс и познакомим с форматом обучения.
            </p>
            <Link to="/contacts" className="btn-primary px-8 py-3 rounded-sm text-sm inline-flex items-center gap-2">
              Получить консультацию <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
