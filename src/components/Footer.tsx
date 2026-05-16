import { Link } from 'react-router-dom';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#030a06] border-t border-[#00ff88]/10 pt-16 pb-8 overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-2 border-[#00ff88] animate-rotate-slow opacity-60" />
                <div className="absolute inset-1 rounded-full border border-[#00ff88]/40 animate-rotate-reverse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#00ff88] font-bold text-sm font-orbitron">GU</span>
                </div>
              </div>
              <div>
                <div className="font-orbitron font-bold text-white text-sm tracking-widest">
                  GREEN UMBRELLA
                </div>
                <div className="font-mono text-[10px] text-[#00ff88]/60 tracking-widest">
                  ONLINE SCHOOL
                </div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Современная онлайн-школа программирования. Открываем двери в мир технологий будущего.
            </p>
            <div className="flex gap-3">
              {[
              { icon: Send, href: '#', label: 'Telegram' },
              { icon: Mail, href: '#', label: 'Email' },
              { icon: Phone, href: '#', label: 'Phone' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 border border-[#00ff88]/20 rounded-sm flex items-center justify-center text-[#00ff88]/60 hover:border-[#00ff88] hover:text-[#00ff88] hover:bg-[#00ff88]/10 transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-orbitron text-xs tracking-widest text-[#00ff88] uppercase mb-5">Навигация</h4>
            <ul className="space-y-3">
              {[
                { label: 'Главная', path: '/' },
                { label: 'Курсы', path: '/courses' },
                { label: 'О школе', path: '/about' },
                { label: 'Преподаватели', path: '/teachers' },
                { label: 'Контакты', path: '/contacts' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-white/50 hover:text-[#00ff88] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-[#00ff88]/30 group-hover:w-5 group-hover:bg-[#00ff88] transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-orbitron text-xs tracking-widest text-[#00ff88] uppercase mb-5">Направления</h4>
            <ul className="space-y-3">
              {[
                'C# разработка',
                'Web-разработка',
                'Unity (2D/3D игры)',
                'Unreal Engine',
                'Искусственный интеллект',
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/courses"
                    className="text-white/50 hover:text-[#00ff88] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-[#00ff88]/30 group-hover:w-5 group-hover:bg-[#00ff88] transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-orbitron text-xs tracking-widest text-[#00ff88] uppercase mb-5">Контакты</h4>
            <ul className="space-y-4">
              {[
                { icon: Mail, text: 'greenumbrschool@gmail.com' },
                { icon: Phone, text: '+7 (4012) 66-55-44' },
                { icon: MapPin, text: 'Онлайн, по всему миру' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-white/50 text-sm">
                  <Icon size={14} className="text-[#00ff88] mt-0.5 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-6 p-3 border border-[#00ff88]/20 rounded-sm bg-[#00ff88]/5">
              <div className="font-mono text-[10px] text-[#00ff88]/60 mb-1">// СТАТУС СИСТЕМЫ</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="font-mono text-xs text-[#00ff88]">ВСЕ СИСТЕМЫ АКТИВНЫ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#00ff88]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-white/30">
            © 2026 Green Umbrella Online School. Все права защищены.
          </div>
          <div className="font-mono text-xs text-white/20">
            v1.0.0 — <span className="text-[#00ff88]/40">UMBRELLA CORP. DIVISION: EDUCATION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
