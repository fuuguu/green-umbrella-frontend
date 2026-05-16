import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { label: 'Главная', path: '/' },
  { label: 'Курсы', path: '/courses' },
  { label: 'О школе', path: '/about' },
  { label: 'Преподаватели', path: '/teachers' },
  { label: 'Контакты', path: '/contacts' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050f0a]/95 backdrop-blur-md border-b border-[#00ff88]/20 shadow-lg shadow-[#00ff8811]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-2 border-[#00ff88] animate-rotate-slow opacity-60" />
              <div className="absolute inset-1 rounded-full border border-[#00ff88]/40 animate-rotate-reverse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#00ff88] font-bold text-sm font-orbitron">GU</span>
              </div>
            </div>
            <div>
              <div className="font-orbitron font-bold text-white text-sm tracking-widest group-hover:text-[#00ff88] transition-colors">
                GREEN UMBRELLA
              </div>
              <div className="font-mono text-[10px] text-[#00ff88]/60 tracking-widest">
                ONLINE SCHOOL
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'text-[#00ff88]' : ''}`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#00ff88] shadow-[0_0_8px_#00ff88]" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="btn-outline px-5 py-2 rounded-sm text-xs">
              Войти
            </Link>
            <Link to="/register" className="btn-primary px-5 py-2 rounded-sm text-xs flex items-center gap-1">
              Записаться <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#00ff88] hover:text-white transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#050f0a]/98 backdrop-blur-lg flex flex-col items-center justify-center"
          >
            <div className="grid-bg absolute inset-0 opacity-30" />
            <div className="relative z-10 flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`font-orbitron text-2xl font-bold tracking-widest uppercase ${
                      location.pathname === link.path ? 'text-[#00ff88]' : 'text-white/70 hover:text-[#00ff88]'
                    } transition-colors`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex gap-4 mt-4">
                <Link to="/login" className="btn-outline px-6 py-3 rounded-sm text-sm">
                  Войти
                </Link>
                <Link to="/register" className="btn-primary px-6 py-3 rounded-sm text-sm">
                  Записаться
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
