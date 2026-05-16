import { Calendar, Clock, User } from 'lucide-react';
import { Lesson } from '../types';

const SchedulePage = () => {
  const lessons: Lesson[] = [
    { id: 1, title: "Workshop: Laravel Middleware", date: "2026-05-18", time: "19:00", mentor: "Dmitry K.", link: "#" },
    { id: 2, title: "Q&A: Подготовка к защите", date: "2026-05-20", time: "18:00", mentor: "Ivan P." },
  ];

  return (
    <div className="p-6 bg-zinc-950 min-h-screen font-mono">
      <h1 className="text-2xl text-white mb-8 border-l-4 border-blue-500 pl-4">_ACADEMIC_CALENDAR</h1>
      <div className="space-y-6">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="relative p-6 border-l-2 border-blue-900 bg-zinc-900/30">
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <h3 className="text-xl text-blue-400 mb-2">{lesson.title}</h3>
                <div className="flex gap-6 text-sm opacity-70">
                  <span className="flex items-center gap-1"><Calendar size={14}/> {lesson.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14}/> {lesson.time} (GMT+3)</span>
                  <span className="flex items-center gap-1"><User size={14}/> {lesson.mentor}</span>
                </div>
              </div>
              {lesson.link && (
                <button className="h-fit px-6 py-2 bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                  JOIN_STREAM
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SchedulePage;