import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target, Eye, Heart,
  ChevronRight, Zap,
} from 'lucide-react';

const timeline = [
  { year: '2021', title: 'Основание', desc: 'Green Umbrella запустила первые курсы по C# и Web-разработке. 20 первых студентов.' },
  { year: '2022', title: 'Расширение', desc: 'Добавили направления Gamedev. Количество студентов превысило 100 человек.' },
  { year: '2023', title: 'Рост', desc: 'Открыли курсы по ИИ и Unreal Engine. Партнёрство с IT-компаниями региона.' },
  { year: '2024', title: 'Сегодня', desc: 'Более 500 выпускников. 98% трудоустройство. Полноценная онлайн-платформа.' },
];

const values = [
  {
    icon: Target,
    title: 'Практика прежде всего',
    desc: 'Каждый урок — это реальная задача. Мы против пустых лекций. Пишем код с первого занятия.',
  },
  {
    icon: Heart,
    title: 'Сообщество',
    desc: 'Ты не один. Discord, митапы, code review, менторство — мы строим настоящее IT-сообщество.',
  },
  {
    icon: Eye,
    title: 'Прозрачность',
    desc: 'Честная программа, чёткие цены, реальные отзывы. Никаких скрытых платежей и пустых обещаний.',
  },
  {
    icon: Zap,
    title: 'Актуальность',
    desc: 'Программа обновляется каждый квартал. Только актуальные технологии, которые нужны прямо сейчас.',
  },
];

const team = [
  {
    name: 'Артём Волков',
    role: 'Основатель / CEO',
    spec: 'C# / .NET',
    exp: '12 лет в разработке',
    emoji: '👨‍💻',
  },
  {
    name: 'Марина Соколова',
    role: 'Lead Web Instructor',
    spec: 'React / Node.js',
    exp: '8 лет в разработке',
    emoji: '👩‍💻',
  },
  {
    name: 'Денис Крылов',
    role: 'GameDev Instructor',
    spec: 'Unity / Unreal',
    exp: '10 лет в геймдеве',
    emoji: '🎮',
  },
  {
    name: 'Ксения Лебедева',
    role: 'AI / ML Instructor',
    spec: 'TensorFlow / PyTorch',
    exp: '7 лет в ML',
    emoji: '🤖',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050f0a] text-white pt-24 pb-24">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-4">// О НАС</div>
              <h1 className="section-title text-5xl md:text-6xl gradient-text mb-6">GREEN UMBRELLA</h1>
              <p className="text-white/60 text-lg font-inter leading-relaxed mb-6">
                Мы — современная онлайн-школа программирования, которая верит: каждый человек может освоить IT при правильном подходе.
              </p>
              <p className="text-white/40 font-inter leading-relaxed mb-8">
                Название "Green Umbrella" — это символ защиты и роста. Мы защищаем тебя от неправильных решений на старте пути и помогаем расти в правильном направлении. Да, есть и другие ассоциации — мы не против 😄
              </p>
              <Link to="/courses" className="btn-primary px-8 py-4 rounded-sm text-sm inline-flex items-center gap-2">
                Наши курсы <ChevronRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Cyber graphic */}
              <div className="relative w-full h-80 flex items-center justify-center">
                {/* Outer ring */}
                <div className="absolute w-72 h-72 rounded-full border border-[#00ff88]/20 animate-rotate-slow" />
                <div className="absolute w-56 h-56 rounded-full border border-[#00ff88]/30 animate-rotate-reverse" />
                <div className="absolute w-40 h-40 rounded-full border-2 border-[#00ff88]/50 animate-pulse" />
                <div className="absolute w-24 h-24 rounded-full bg-[#00ff88]/10 border border-[#00ff88] flex items-center justify-center box-glow">
                  <span className="font-orbitron font-black text-2xl text-[#00ff88]">GU</span>
                </div>

                {/* Orbiting dots */}
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <div
                    key={deg}
                    className="absolute w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88]"
                    style={{
                      transform: `rotate(${deg}deg) translateX(112px)`,
                    }}
                  />
                ))}

                {/* Stats around */}
                {[
                  { label: '500+', sub: 'студентов', top: '-10%', left: '50%', transform: 'translateX(-50%)' },
                  { label: '4', sub: 'курса', top: '50%', left: '-5%', transform: 'translateY(-50%)' },
                  { label: '98%', sub: 'довольны', top: '50%', left: '105%', transform: 'translateY(-50%)' },
                  { label: '3+', sub: 'года', top: '105%', left: '50%', transform: 'translateX(-50%)' },
                ].map(({ label, sub, top, left, transform }) => (
                  <div
                    key={label}
                    className="absolute text-center"
                    style={{ top, left, transform }}
                  >
                    <div className="font-orbitron font-black text-xl text-[#00ff88] text-glow-sm">{label}</div>
                    <div className="font-mono text-[10px] text-white/30 tracking-widest">{sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission / Vision */}
      <div className="py-16 bg-[#030a06] relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                label: 'МИССИЯ',
                text: 'Сделать IT-образование доступным, практичным и результативным. Каждый студент должен выйти с реальными навыками и уверенностью в своих силах.',
              },
              {
                icon: Eye,
                label: 'ВИДЕНИЕ',
                text: 'Стать ведущей онлайн-школой программирования в России, где обучение строится на реальных проектах и живом общении с экспертами.',
              },
            ].map(({ icon: Icon, label, text }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="card-bg p-8 rounded-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-sm bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center">
                    <Icon size={20} className="text-[#00ff88]" />
                  </div>
                  <div className="font-orbitron text-xs tracking-widest text-[#00ff88]">// {label}</div>
                </div>
                <p className="text-white/60 font-inter leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-20 relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-4">// НАШИ ЦЕННОСТИ</div>
            <h2 className="section-title text-4xl gradient-text">ЧТО НАС ОТЛИЧАЕТ</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-bg p-6 rounded-sm text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00ff88]/20 transition-colors">
                  <v.icon size={24} className="text-[#00ff88]" />
                </div>
                <h3 className="font-orbitron font-bold text-sm text-white mb-2 group-hover:text-[#00ff88] transition-colors">
                  {v.title}
                </h3>
                <p className="text-white/40 text-sm font-inter leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-20 bg-[#030a06] relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-4">// ИСТОРИЯ</div>
            <h2 className="section-title text-4xl gradient-text">НАШ ПУТЬ</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-[#00ff88] via-[#00ff88]/40 to-transparent" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="flex gap-6"
                >
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-sm bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center font-orbitron font-bold text-sm text-[#00ff88]">
                      {item.year}
                    </div>
                  </div>
                  <div className="card-bg p-5 rounded-sm flex-1">
                    <h3 className="font-orbitron font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/50 text-sm font-inter">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-20 relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-4">// КОМАНДА</div>
            <h2 className="section-title text-4xl gradient-text">НАШИ ЭКСПЕРТЫ</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-bg p-6 rounded-sm text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-[#00ff88]/10 border-2 border-[#00ff88]/20 flex items-center justify-center mx-auto mb-4 text-4xl group-hover:border-[#00ff88]/50 transition-colors">
                  {member.emoji}
                </div>
                <h3 className="font-orbitron font-bold text-white text-sm mb-1">{member.name}</h3>
                <div className="font-mono text-xs text-[#00ff88] mb-2">{member.role}</div>
                <div className="font-mono text-[10px] text-white/30 mb-1">{member.spec}</div>
                <div className="font-mono text-[10px] text-white/20">{member.exp}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech stack */}
      <div className="py-16 bg-[#030a06] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-8">// МЫ РАБОТАЕМ С</div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'C#', '.NET', 'ASP.NET', 'React', 'TypeScript', 'Node.js',
              'Python', 'Unity', 'Unreal Engine 5', 'TensorFlow', 'PyTorch',
              'PostgreSQL', 'Docker', 'Git', 'Linux',
            ].map((tech) => (
              <div
                key={tech}
                className="font-mono text-xs px-4 py-2 rounded-sm border border-[#00ff88]/20 text-white/40 hover:border-[#00ff88]/50 hover:text-[#00ff88] transition-all duration-300"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
