import { useNavigate } from 'react-router-dom'; // Предполагаем использование react-router
import { ClipboardList, AlertCircle } from 'lucide-react';
import { Homework } from '../types';

const HomeworksPage = () => {
  const navigate = useNavigate();
  const homeworks: Homework[] = [
    { id: 101, title: "Auth System Implementation", subject: "Backend Dev", deadline: "2026-05-22", status: 'todo' },
    { id: 102, title: "Responsive Dashboard Layout", subject: "Frontend Dev", deadline: "2026-05-15", status: 'graded', score: 95 },
  ];

  return (
    <div className="p-6 bg-zinc-950 min-h-screen font-mono">
      <h1 className="text-2xl text-white mb-8 border-l-4 border-amber-500 pl-4">_ASSIGNMENTS_LOG</h1>
      <div className="grid gap-6">
        {homeworks.map((hw) => (
          <div 
            key={hw.id} 
            onClick={() => navigate(`/homework/${hw.id}`)}
            className="cursor-pointer border border-zinc-800 p-5 bg-black hover:border-amber-500/50 transition-all flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-bold">{hw.title}</span>
                {hw.status === 'todo' && <AlertCircle size={14} className="text-amber-500" />}
              </div>
              <p className="text-xs opacity-50">{hw.subject} | DEADLINE: {hw.deadline}</p>
            </div>
            <div className="text-right">
              {hw.status === 'graded' ? (
                <span className="text-green-500">SCORE: {hw.score}/100</span>
              ) : (
                <span className="text-amber-500 text-xs">AWAITING_SUBMISSION</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomeworksPage;