import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Code2, Globe, Gamepad2, Brain,
  Users, Clock, Award, Zap, Shield, Star,
  ArrowRight, Play, CheckCircle, TrendingUp, BookOpen
} from 'lucide-react';
import MatrixRain from '../components/MatrixRain';
import ParticleField from '../components/ParticleField';

function TypingText({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = texts[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      setDisplayed(current.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx((c) => c + 1), 70);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx >= 0) {
      setDisplayed(current.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx((c) => c - 1), 40);
    } else {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
      setCharIdx(0);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts]);

  return (
    <span className="text-[#00ff88]">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = to / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Course Card ──────────────────────────────────────────────────────────────
const courses = [
  {
    icon: Code2,
    title: 'C# Разработка',
    subtitle: 'С нуля до Senior',
    desc: 'Освой один из самых востребованных языков. Backend, приложения, автоматизация. Реальные проекты с первого урока.',
    tags: ['ООП', '.NET', 'ASP.NET', 'Entity Framework'],
    color: '#00ff88',
    level: 'Начинающий → Продвинутый',
    duration: '8 месяцев',
  },
  {
    icon: Globe,
    title: 'Web-разработка',
    subtitle: 'Full Stack путь',
    desc: 'HTML/CSS, JavaScript, React, Node.js — полный стек современного веба. Создавай сайты и веб-приложения.',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    color: '#00ddff',
    level: 'Начинающий → Full Stack',
    duration: '10 месяцев',
  },
  {
    icon: Gamepad2,
    title: 'Разработка игр',
    subtitle: 'Unity & Unreal Engine',
    desc: 'От идеи до выхода в Steam. Физика, графика, геймплей, монетизация. Два движка — двойные возможности.',
    tags: ['Unity', 'Unreal', 'C#', 'C++'],
    color: '#ff6b6b',
    level: 'Начинающий → Независимый разработчик',
    duration: '12 месяцев',
  },
  {
    icon: Brain,
    title: 'Искусственный интеллект',
    subtitle: 'ML & Data Science',
    desc: 'Нейросети, машинное обучение, компьютерное зрение. Работай с технологиями, которые меняют мир.',
    tags: ['Python', 'TensorFlow', 'PyTorch', 'LLM'],
    color: '#a855f7',
    level: 'Базовый Python → AI Engineer',
    duration: '9 месяцев',
  },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  {
    icon: Users,
    title: 'Живые занятия',
    desc: 'Онлайн-сессии с преподавателем в реальном времени. Задавай вопросы, получай ответы мгновенно.',
  },
  {
    icon: Clock,
    title: 'Гибкий график',
    desc: 'Сам выбираешь время занятий. Материалы доступны 24/7 — учись тогда, когда удобно.',
  },
  {
    icon: Award,
    title: 'Сертификация',
    desc: 'Официальный диплом после окончания курса. Признаётся работодателями IT-сферы.',
  },
  {
    icon: Shield,
    title: 'Проверенная программа',
    desc: 'Curricula разработаны практикующими специалистами. Актуальный стек технологий.',
  },
  {
    icon: Zap,
    title: 'Практика с первого дня',
    desc: 'Никаких скучных лекций. Пишем код, деплоим проекты, получаем обратную связь.',
  },
  {
    icon: TrendingUp,
    title: 'Карьерная поддержка',
    desc: 'Помогаем с резюме, готовим к собеседованиям, рекомендуем партнёрам-работодателям.',
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: 'Алексей М.',
    role: 'Junior Unity Developer',
    text: 'Через 8 месяцев после начала обучения я устроился в геймдев студию. Преподаватели объясняют понятно, проекты реальные.',
    stars: 5,
    course: 'Разработка игр',
  },
  {
    name: 'Дарья К.',
    role: 'Frontend Developer',
    text: 'Без опыта в IT пришла на веб-курс. Уже через полгода получила оффер. Школа дала всё необходимое для старта.',
    stars: 5,
    course: 'Web-разработка',
  },
  {
    name: 'Иван Р.',
    role: 'C# / .NET Developer',
    text: 'Программа очень структурированная, нет воды. Каждый модуль — это реальная задача. Рекомендую всем!',
    stars: 5,
    course: 'C# Разработка',
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="bg-[#050f0a] text-white overflow-x-hidden">
      {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Backgrounds */}
        <MatrixRain />
        <ParticleField />
        <div className="absolute inset-0 hero-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />

        {/* Radial glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#00ff88]/3 rounded-full blur-2xl" />

        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent"
            style={{ animation: 'scan-line 8s linear infinite' }}
          />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-24"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#00ff88]/30 rounded-sm bg-[#00ff88]/5 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="font-mono text-xs text-[#00ff88] tracking-widest">СИСТЕМА ЗАПУЩЕНА — НАБОР ОТКРЫТ</span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6"
          >
            <span className="gradient-text-white block">GREEN</span>
            <span className="gradient-text block">UMBRELLA</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-orbitron text-lg md:text-2xl text-white/60 mb-4 tracking-widest uppercase"
          >
            Онлайн-школа программирования
          </motion.div>

          {/* Typing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="font-mono text-xl md:text-3xl mb-12 h-10 flex items-center justify-center"
          >
            <span className="text-white/40 mr-2">&gt;&gt;</span>
            <TypingText texts={[
              'Познаем с нуля',
              'Строим веб-приложения',
              'Создаём игры в Unity',
              'Работаем с ИИ',
              'Меняем мир кодом',
            ]} />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/courses" className="btn-primary px-8 py-4 rounded-sm text-sm flex items-center gap-2">
              Выбрать курс <ChevronRight size={16} />
            </Link>
            <Link to="/about" className="btn-outline px-8 py-4 rounded-sm text-sm flex items-center gap-2">
              <Play size={16} /> Узнать о школе
            </Link>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="flex flex-wrap justify-center gap-8 mt-16"
          >
            {[
              { value: '500+', label: 'Выпускников' },
              { value: '4', label: 'Направления' },
              { value: '98%', label: 'Трудоустройство' },
              { value: '24/7', label: 'Поддержка' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-orbitron font-bold text-2xl text-[#00ff88] text-glow-sm">{value}</div>
                <div className="font-mono text-xs text-white/40 tracking-widest uppercase mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="font-mono text-[10px] text-white/30 tracking-widest">SCROLL</div>
          <div className="w-px h-12 bg-gradient-to-b from-[#00ff88] to-transparent" />
        </motion.div>
      </section>

      {/* ═══ STATS BAR ═══════════════════════════════════════════════════════ */}
      <section className="relative py-6 border-y border-[#00ff88]/10 bg-[#030a06] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/5 via-transparent to-[#00ff88]/5" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { to: 500, suffix: '+', label: 'Студентов обучилось' },
              { to: 4, suffix: '', label: 'Направления курсов' },
              { to: 98, suffix: '%', label: 'Довольных студентов' },
              { to: 50, suffix: '+', label: 'Партнёров-работодателей' },
            ].map(({ to, suffix, label }) => (
              <div key={label} className="text-center">
                <div className="font-orbitron font-black text-3xl text-[#00ff88] text-glow-sm">
                  <Counter to={to} suffix={suffix} />
                </div>
                <div className="font-mono text-xs text-white/40 tracking-wider mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COURSES ═════════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ff88]/3 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-4">// НАПРАВЛЕНИЯ ОБУЧЕНИЯ</div>
            <h2 className="section-title text-4xl md:text-5xl gradient-text mb-4">
              НАШИ КУРСЫ
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto font-inter">
              Четыре мощных направления. Каждое — путь к востребованной профессии в IT.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, i) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="card-bg rounded-sm p-6 cursor-pointer group relative overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${course.color}11 0%, transparent 60%)` }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-sm flex items-center justify-center"
                      style={{ background: `${course.color}22`, border: `1px solid ${course.color}44` }}
                    >
                      <course.icon size={24} style={{ color: course.color }} />
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs text-white/30">{course.duration}</div>
                      <div
                        className="font-orbitron text-xs font-bold mt-1"
                        style={{ color: course.color }}
                      >
                        {course.level.split('→')[1]?.trim()}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-orbitron font-bold text-xl text-white mb-1 group-hover:text-[#00ff88] transition-colors">
                    {course.title}
                  </h3>
                  <div className="font-mono text-xs mb-3" style={{ color: course.color }}>
                    {course.subtitle}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-4 font-inter">
                    {course.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-2 py-1 rounded-sm"
                        style={{
                          background: `${course.color}11`,
                          border: `1px solid ${course.color}33`,
                          color: course.color,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/courses"
                    className="flex items-center gap-2 font-mono text-xs group-hover:gap-3 transition-all duration-300"
                    style={{ color: course.color }}
                  >
                    Подробнее о курсе <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/courses" className="btn-primary px-10 py-4 rounded-sm text-sm inline-flex items-center gap-2">
              Все курсы и программы <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ WHY US ══════════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-[#030a06]">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00ff88]/3 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-4">// ПОЧЕМУ МЫ</div>
            <h2 className="section-title text-4xl md:text-5xl gradient-text mb-4">
              НАШИ ПРЕИМУЩЕСТВА
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto font-inter">
              Мы не просто учим код. Мы строим твою карьеру в IT с первого урока.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-bg p-6 rounded-sm group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="w-10 h-10 rounded-sm bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center mb-4 group-hover:bg-[#00ff88]/20 group-hover:border-[#00ff88]/40 transition-all duration-300">
                  <f.icon size={20} className="text-[#00ff88]" />
                </div>
                <h3 className="font-orbitron font-bold text-sm text-white mb-2 tracking-wider group-hover:text-[#00ff88] transition-colors">
                  {f.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed font-inter">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />

        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-4">// КАК ЭТО РАБОТАЕТ</div>
            <h2 className="section-title text-4xl md:text-5xl gradient-text mb-4">
              ПУТЬ СТУДЕНТА
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connector */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#00ff88]/40 to-transparent" />

            {[
              { step: '01', icon: BookOpen, title: 'Выбираешь курс', desc: 'Определяешь направление и уровень. Консультант помогает с выбором.' },
              { step: '02', icon: Users, title: 'Попадаешь в группу', desc: 'Небольшие группы до 10 студентов. Личный куратор на весь курс.' },
              { step: '03', icon: Code2, title: 'Учишься и практикуешь', desc: 'Живые занятия + записи. Домашние задания с проверкой.' },
              { step: '04', icon: Award, title: 'Получаешь диплом', desc: 'Защищаешь финальный проект и получаешь сертификат.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-full border-2 border-[#00ff88]/40 bg-[#00ff88]/10 flex items-center justify-center mx-auto mb-4 relative z-10 animate-pulse-glow">
                  <item.icon size={24} className="text-[#00ff88]" />
                </div>
                <div className="font-orbitron font-black text-4xl text-[#00ff88]/10 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 select-none">
                  {item.step}
                </div>
                <h3 className="font-orbitron font-bold text-sm text-white mb-2 tracking-wider">{item.title}</h3>
                <p className="text-white/40 text-sm font-inter">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-[#030a06]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-10" />

        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-4">// ОТЗЫВЫ ВЫПУСКНИКОВ</div>
            <h2 className="section-title text-4xl md:text-5xl gradient-text mb-4">
              ГОВОРЯТ СТУДЕНТЫ
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="card-bg p-6 rounded-sm relative group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="absolute top-4 right-4 font-orbitron text-4xl text-[#00ff88]/10 select-none">"</div>
                <div className="flex mb-3">
                  {Array(t.stars).fill(0).map((_, si) => (
                    <Star key={si} size={14} className="text-[#00ff88] fill-[#00ff88]" />
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed font-inter mb-6 italic">"{t.text}"</p>
                <div className="border-t border-[#00ff88]/10 pt-4">
                  <div className="font-orbitron font-bold text-sm text-white">{t.name}</div>
                  <div className="font-mono text-xs text-[#00ff88] mt-0.5">{t.role}</div>
                  <div className="font-mono text-[10px] text-white/30 mt-1">Курс: {t.course}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ══════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/5 via-[#00ff88]/10 to-[#00ff88]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00ff88]/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-4">// ТВОЙ СТАРТ В IT</div>
            <h2 className="section-title text-4xl md:text-6xl text-white mb-6 leading-tight">
              ГОТОВ НАЧАТЬ<br />
              <span className="gradient-text">СВОЁ БУДУЩЕЕ?</span>
            </h2>
            <p className="text-white/50 text-lg font-inter mb-10 max-w-2xl mx-auto">
              Запишись на бесплатное вводное занятие. Познакомишься с преподавателем, поймёшь формат, определишься с курсом.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary px-10 py-5 rounded-sm text-sm flex items-center gap-2 justify-center">
                Записаться бесплатно <ChevronRight size={16} />
              </Link>
              <Link to="/contacts" className="btn-outline px-10 py-5 rounded-sm text-sm flex items-center gap-2 justify-center">
                Задать вопрос
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {['Без предоплаты', 'Бесплатная консультация', 'Первое занятие бесплатно'].map((item) => (
                <div key={item} className="flex items-center gap-2 font-mono text-xs text-white/40">
                  <CheckCircle size={12} className="text-[#00ff88]" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
