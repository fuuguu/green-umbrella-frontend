import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#050f0a] flex items-center justify-center text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 px-6"
      >
        <div className="font-orbitron font-black text-8xl md:text-9xl text-[#00ff88]/10 mb-4 select-none">404</div>
        <div className="font-mono text-sm text-[#00ff88] mb-6 tracking-widest">// СТРАНИЦА НЕ НАЙДЕНА</div>
        <h1 className="font-orbitron font-bold text-2xl md:text-3xl text-white mb-4">
          Ошибка в матрице
        </h1>
        <p className="text-white/40 font-inter mb-10 max-w-md mx-auto">
          Похоже, эта страница ещё не написана. Возможно, T-вирус добрался до наших серверов 🧟
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-primary px-8 py-4 rounded-sm text-sm flex items-center gap-2">
            <Home size={16} /> На главную
          </Link>
          <Link to="/courses" className="btn-outline px-8 py-4 rounded-sm text-sm flex items-center gap-2">
            Курсы <ChevronRight size={16} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
