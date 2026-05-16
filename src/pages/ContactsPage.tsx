import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';

const faqs = [
  {
    q: 'Нужен ли опыт программирования для поступления?',
    a: 'Нет! Большинство наших курсов рассчитаны на абсолютных новичков. Исключение — курс по Unreal Engine (нужен базовый C++) и ИИ (базовый Python). Уточните при записи.',
  },
  {
    q: 'Как проходят занятия?',
    a: 'Занятия проходят онлайн через видеозвонок в Zoom/Meet в небольших группах (до 10 человек). Записи сохраняются и доступны 24/7. Домашние задания с проверкой преподавателя.',
  },
  {
    q: 'Какой диплом/сертификат я получу?',
    a: 'По окончании курса вы защищаете финальный проект и получаете официальный диплом Green Umbrella, подкреплённый реальным портфолио.',
  },
  {
    q: 'Можно ли совмещать с работой или учёбой?',
    a: 'Да! Занятия 2-3 раза в неделю по 1.5-2 часа. Гибкое расписание, записи всех уроков. Большинство студентов совмещают с работой.',
  },
  {
    q: 'Есть ли рассрочка?',
    a: 'Да, мы предлагаем беспроцентную рассрочку на весь период обучения. Также действуют скидки при единовременной оплате.',
  },
  {
    q: 'Помогаете ли с трудоустройством?',
    a: 'Активно! Помогаем с составлением резюме, готовим к техническим собеседованиям и передаём контакты партнёров-работодателей.',
  },
];

export default function ContactsPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050f0a] text-white pt-24 pb-24">
      {/* Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00ff88]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-4">// СВЯЗЬ С НАМИ</div>
            <h1 className="section-title text-5xl md:text-6xl gradient-text mb-4">КОНТАКТЫ</h1>
            <p className="text-white/50 max-w-xl mx-auto font-inter text-lg">
              Остались вопросы? Напишите нам — ответим в течение 2 часов.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Contact info */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-6">// КОНТАКТНЫЕ ДАННЫЕ</div>
              {[
                { icon: Mail, label: 'Email', value: 'greenumbrschool@gmail.com' },
                { icon: Phone, label: 'Телефон', value: '+7 (4012) 66-55-44' },
                { icon: MessageCircle, label: 'Telegram', value: '@greenumbrschool' },
                { icon: Clock, label: 'Режим работы', value: 'Пн-Сб 9:00–20:00 МСК' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="card-bg p-4 rounded-sm flex items-center gap-4 mb-3 hover:border-[#00ff88]/30 transition-all">
                  <div className="w-10 h-10 rounded-sm bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-[#00ff88]" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-white/30 tracking-widest">{label}</div>
                    <div className="font-inter text-sm text-white/70 mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="card-bg p-5 rounded-sm"
            >
              <div className="font-mono text-[10px] text-[#00ff88]/60 mb-3 tracking-widest">// СТАТУС ПРИЁМА</div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-pulse shadow-[0_0_8px_#00ff88]" />
                <span className="font-orbitron text-xs text-[#00ff88]">НАБОР ОТКРЫТ</span>
              </div>
              <div className="font-mono text-[10px] text-white/30">Ближайший старт: 1 февраля 2025</div>
              <div className="mt-3 h-1.5 bg-[#00ff88]/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00ff88] to-[#00cc6a] w-3/4 rounded-full" />
              </div>
              <div className="font-mono text-[10px] text-white/30 mt-1">Мест осталось: 7 из 30</div>
            </motion.div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="card-bg p-8 rounded-sm"
            >
              <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-6">// ЗАЯВКА НА ОБУЧЕНИЕ</div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-[#00ff88]/10 border-2 border-[#00ff88] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={36} className="text-[#00ff88]" />
                  </div>
                  <h3 className="font-orbitron font-bold text-2xl text-white mb-3">Заявка отправлена!</h3>
                  <p className="text-white/40 font-inter">
                    Мы свяжемся с вами в течение 2 часов в рабочее время.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 btn-outline px-6 py-3 rounded-sm text-xs"
                  >
                    Отправить ещё
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-mono text-[10px] text-white/40 tracking-widest block mb-2">ИМЯ *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ваше имя"
                        className="w-full bg-[#050f0a] border border-[#00ff88]/20 rounded-sm px-4 py-3 text-white text-sm font-inter placeholder-white/20 focus:border-[#00ff88]/60 focus:outline-none focus:ring-0 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-white/40 tracking-widest block mb-2">EMAIL *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full bg-[#050f0a] border border-[#00ff88]/20 rounded-sm px-4 py-3 text-white text-sm font-inter placeholder-white/20 focus:border-[#00ff88]/60 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-mono text-[10px] text-white/40 tracking-widest block mb-2">ТЕЛЕФОН</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full bg-[#050f0a] border border-[#00ff88]/20 rounded-sm px-4 py-3 text-white text-sm font-inter placeholder-white/20 focus:border-[#00ff88]/60 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-white/40 tracking-widest block mb-2">КУРС</label>
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full bg-[#050f0a] border border-[#00ff88]/20 rounded-sm px-4 py-3 text-white text-sm font-inter focus:border-[#00ff88]/60 focus:outline-none transition-colors"
                      >
                        <option value="">Выберите курс</option>
                        <option>C# Разработка</option>
                        <option>Web-разработка</option>
                        <option>Unity — Разработка игр</option>
                        <option>Unreal Engine</option>
                        <option>Искусственный интеллект</option>
                        <option>Не определился</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-white/40 tracking-widest block mb-2">СООБЩЕНИЕ</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Расскажите о себе, своих целях или задайте вопрос..."
                      className="w-full bg-[#050f0a] border border-[#00ff88]/20 rounded-sm px-4 py-3 text-white text-sm font-inter placeholder-white/20 focus:border-[#00ff88]/60 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full py-4 rounded-sm text-sm flex items-center justify-center gap-2">
                    Отправить заявку <Send size={16} />
                  </button>

                  <p className="font-mono text-[10px] text-white/20 text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-4">// ЧАСТЫЕ ВОПРОСЫ</div>
            <h2 className="section-title text-3xl md:text-4xl gradient-text">FAQ</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="card-bg rounded-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                >
                  <span className="font-inter text-sm text-white/70 group-hover:text-white transition-colors">
                    {faq.q}
                  </span>
                  <span
                    className="font-mono text-xl text-[#00ff88] shrink-0 transition-transform duration-300"
                    style={{ transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="px-6 pb-5"
                  >
                    <div className="w-full h-px bg-[#00ff88]/10 mb-4" />
                    <p className="text-white/40 text-sm font-inter leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
