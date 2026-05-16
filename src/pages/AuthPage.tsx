import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Terminal, Lock, User, Mail, AlertTriangle } from 'lucide-react';
import api from '../api';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isLogin = location.pathname === '/login';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Выбираем нужный адрес в зависимости от режима
      const endpoint = isLogin ? '/login' : '/register';
      
      // Формируем данные для отправки
      const payload = isLogin 
        ? { email, password } 
        : { name, email, password, role: 'student' }; 

      // ОТПРАВЛЯЕМ ЗАПРОС В LARAVEL
      const response = await api.post(endpoint, payload);

      localStorage.setItem('token', response.data.token);

      // Перенаправляем пользователя в Личный кабинет
      navigate('/dashboard');
      
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'ОШИБКА ДОСТУПА. ПРОВЕРЬТЕ ДАННЫЕ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-md bg-black border border-green-900/50 p-8 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.1)] relative overflow-hidden">
        
        {/* Декоративный фон */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-900 via-green-500 to-green-900"></div>

        <div className="flex flex-col items-center mb-8">
          <Terminal size={40} className="text-green-500 mb-4" />
          <h1 className="text-2xl text-white font-bold tracking-widest">
            {isLogin ? 'SYSTEM_LOGIN' : 'USER_REGISTRATION'}
          </h1>
          <p className="text-gray-500 text-sm mt-2">GREEN_UMBRELLA_WORKSPACE</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/30 border border-red-900/50 text-red-500 text-sm flex items-center gap-2 rounded">
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs text-green-600 mb-1">FULL_NAME</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-gray-600" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-green-400 pl-10 p-2.5 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Иван Иванов"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs text-green-600 mb-1">EMAIL_ADDRESS</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3 text-gray-600" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-green-400 pl-10 p-2.5 focus:outline-none focus:border-green-500 transition-colors"
                placeholder="student@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-green-600 mb-1">PASSWORD</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-gray-600" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-green-400 pl-10 p-2.5 focus:outline-none focus:border-green-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 py-3 bg-green-950/40 text-green-500 border border-green-500/50 hover:bg-green-500 hover:text-black font-bold tracking-widest transition-all disabled:opacity-50"
          >
            {loading ? 'PROCESSING...' : (isLogin ? 'AUTHENTICATE' : 'INITIALIZE_USER')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          {isLogin ? "Нет доступа? " : "Уже в системе? "}
          <button 
            onClick={() => navigate(isLogin ? '/register' : '/login')}
            className="text-green-500 hover:underline"
          >
            {isLogin ? 'ЗАПРОСИТЬ РЕГИСТРАЦИЮ' : 'ВВЕСТИ ЛОГИН'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;