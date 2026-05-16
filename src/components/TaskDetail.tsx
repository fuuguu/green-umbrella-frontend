import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetail = () => {
  // Вытаскиваем параметр :id из URL (который мы прописали в App.tsx как /homework/:id)
  const { id } = useParams(); 
  const navigate = useNavigate();

  return (
    <div className="p-8 min-h-screen bg-zinc-950 text-gray-300 font-mono">
      <button 
        onClick={() => navigate(-1)} // Возврат на предыдущую страницу (к списку ДЗ)
        className="mb-6 text-sm text-gray-500 hover:text-green-500 transition-colors"
      >
        &lt; НАЗАД К СПИСКУ
      </button>

      {/* Используем id, который достали из URL */}
      <h2 className="text-3xl text-white mb-4">_ЗАДАНИЕ_ID_{id}</h2>
      
      <div className="prose prose-invert mb-8 text-gray-400">
        <p>Здесь в будущем будет загружаться описание задания из базы данных. Пока мы просто тестируем интерфейс.</p>
        <p>Инструкция: Загрузите ваш код в репозиторий и отправьте ссылку на проверку.</p>
      </div>
      
      <div className="border border-green-900 p-6 bg-black mt-8 rounded">
        <label className="block text-xs mb-2 text-green-500">ССЫЛКА НА GIT РЕПОЗИТОРИЙ (URL):</label>
        <input 
          type="text" 
          placeholder="https://github.com/ваша-ссылка" 
          className="w-full bg-zinc-900 border border-zinc-800 p-3 text-green-400 focus:outline-none focus:border-green-500 rounded"
        />
        <button 
          onClick={() => alert(`Задание ${id} отправлено на проверку! (Имитация)`)}
          className="mt-6 px-6 py-3 bg-green-900/30 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition rounded font-bold"
        >
          ОТПРАВИТЬ НА ПРОВЕРКУ
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;