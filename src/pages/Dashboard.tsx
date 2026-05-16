// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import api from '../api';
import { User, CourseProgress, Submission, AiPrediction } from '../types';
import { LogOut, BookOpen, CheckCircle, AlertTriangle, Code, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{id:number, name: string, role: string, email: string} | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('Backend');
  const [selectedStudentForCourses, setSelectedStudentForCourses] = useState('');
  const [studentCourses, setStudentCourses] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [allSystemCourses, setAllSystemCourses] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'student' });
  const navigate = useNavigate();
  

  const [courses, setCourses] = useState<CourseProgress[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [prediction, setPrediction] = useState<AiPrediction | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userRes, coursesRes, homeworksRes, predictionRes, studentsRes] = await Promise.all([
          api.get('/user'),
          api.get('/courses'),
          api.get('/homeworks'),
          api.get('/prediction').catch(() => ({ data: null })),
          api.get('/students').catch(() => ({ data: [] }))
        ]);

        setUser(userRes.data);
        setCourses(coursesRes.data);
        setStudents(studentsRes.data || []);
        
        const formattedCourses = coursesRes.data.map((course: any) => ({
          id: course.id,
          title: course.title,
          progressPercentage: course.progress_percentage 
        }));
        setCourses(formattedCourses);

        const rawHomeworks = homeworksRes.data;
        const formattedSubmissions = rawHomeworks.map((hw: any) => ({
          id: hw.id,
          taskTitle: hw.title,
          subject: hw.subject,
          repoLink: hw.repo_link,
          status: hw.status,
          score: hw.score,
          studentName: hw.studentName
        }));
        setSubmissions(formattedSubmissions);

        if (predictionRes.data) {
          setPrediction(predictionRes.data);
        } else {
          setPrediction(null); // Вернет надпись "Мало данных для анализа..."
        }

      } catch (error: any) {
        console.error("Ошибка загрузки данных:", error);
        // Если сервер ответил 401 (нет доступа) - выкидываем на логин
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

    useEffect(() => {
    if (selectedStudentForCourses) {
      api.get(`/courses/student/${selectedStudentForCourses}`)
        .then(res => setStudentCourses(res.data))
        .catch(err => console.error("Ошибка загрузки курсов студента:", err));
    } else {
      setStudentCourses([]); // Очищаем, если никто не выбран
    }
  }, [selectedStudentForCourses]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      Promise.all([
        api.get('/admin/users'),
        api.get('/admin/courses')
      ])
      .then(([usersRes, coursesRes]) => {
        setAllUsers(usersRes.data);
        setAllSystemCourses(coursesRes.data);
      })
      .catch(err => console.error("Ошибка загрузки данных админа:", err));
    }
  }, [user]);

  const handleUpdateUserRole = async (id: number, newRole: string) => {
    try {
      await api.patch(`/admin/users/${id}`, { role: newRole });
      setAllUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    } catch (error) {
      alert("Не удалось изменить роль.");
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) return alert("Заполните все поля!");

    try {
      const res = await api.post('/admin/users', newUser);
      setAllUsers(prev => [...prev, res.data]);
      setNewUser({ name: '', email: '', password: '', role: 'student' });
      alert("Пользователь успешно создан!");
    } catch (error) {
      alert("Не удалось создать пользователя. Возможно, такой Email уже занят.");
    }
  };

  // Функция изменения имени и Email пользователя
  const handleUpdateUserDetails = async (id: number, currentName: string, currentEmail: string) => {
    const name = window.prompt("Введите новое имя пользователя:", currentName);
    if (name === null) return; // Если нажали "Отмена"

    const email = window.prompt("Введите новый Email пользователя:", currentEmail);
    if (email === null) return; // Если нажали "Отмена"

    if (!name.trim() || !email.trim()) {
      return alert("Имя и Email не могут быть пустыми!");
    }

    try {
      const res = await api.patch(`/admin/users/${id}`, { name, email });
      setAllUsers(prev => prev.map(u => u.id === id ? { ...u, name: res.data.name, email: res.data.email } : u));
      alert("Данные пользователя успешно обновлены!");
    } catch (error) {
      alert("Не удалось обновить данные. Возможно, этот Email уже занят другим пользователем.");
    }
  };

  // Функция принудительной смены пароля
  const handleChangeUserPassword = async (id: number) => {
    const password = window.prompt("Введите новый пароль для пользователя (минимум 6 символов):");
    if (password === null) return; // Если нажали "Отмена"

    if (password.length < 6) {
      return alert("Пароль должен быть не менее 6 символов!");
    }

    try {
      await api.patch(`/admin/users/${id}`, { password });
      alert("Пароль успешно изменен!");
    } catch (error) {
      alert("Не удалось изменить пароль.");
    }
  };

  // Удаление курса админом
  const handleAdminDeleteCourse = async (id: number) => {
    if (window.confirm("Удалить этот курс из системы?")) {
      try {
        await api.delete(`/courses/${id}`);
        setAllSystemCourses(prev => prev.filter(c => c.id !== id));
      } catch (error) {
        alert("Не удалось удалить курс.");
      }
    }
  };

  // Изменение прогресса курса админом
  const handleAdminUpdateCourse = async (id: number) => {
    const pStr = window.prompt("Введите новый процент прогресса (0-100):");
    if (pStr !== null) {
      const progress = parseInt(pStr, 10);
      if (!isNaN(progress) && progress >= 0 && progress <= 100) {
        try {
          await api.patch(`/courses/${id}`, { progress_percentage: progress });
          setAllSystemCourses(prev => prev.map(c => c.id === id ? { ...c, progress_percentage: progress } : c));
        } catch (error) {
          alert("Не удалось обновить курс.");
        }
      }
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Удалить пользователя навсегда? Это удалит все его курсы и домашки!")) {
      try {
        await api.delete(`/admin/users/${id}`);
        setAllUsers(prev => prev.filter(u => u.id !== id));
      } catch (error) {
        alert("Не удалось удалить пользователя. Возможно, нужно сначала удалить его домашки.");
      }
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const userRes = await api.get<User>('/user');
      setUser(userRes.data);

      if (userRes.data.role === 'student') {
        const [coursesRes, predictionRes] = await Promise.all([
          api.get<CourseProgress[]>('/student/courses'),
          api.get<AiPrediction>('/student/ai-prediction')
        ]);
        setCourses(coursesRes.data);
        setPrediction(predictionRes.data);
      } else if (userRes.data.role === 'teacher') {
        const submissionsRes = await api.get<Submission[]>('/teacher/submissions');
        setSubmissions(submissionsRes.data);
      }
      
      setError(null);
    } catch (err: any) {
      console.error("Ошибка загрузки данных:", err);
      // mockDataForUI(); 
    } finally {
      setLoading(false);
    }
  };

  // --- ВРЕМЕННЫЕ ДАННЫЕ ДЛЯ ПРОВЕРКИ ВЕРСТКИ ---
  // const mockDataForUI = () => {
  //   setUser({ name: 'Алексей Смирнов', role: 'student' }); // Поменяй 'student' на 'teacher', чтобы увидеть другой кабинет
  //   setCourses([
  //     { id: 1, title: 'React 19 Architecture', progressPercentage: 85, lastAccessed: '2026-05-14' },
  //     { id: 2, title: 'Laravel API REST', progressPercentage: 30, lastAccessed: '2026-05-10' }
  //   ]);
  //   setPrediction({ successProbability: 92, riskLevel: 'low', recommendation: 'Отличный темп! Рекомендуется перейти к модулю Docker.' });
  //   setSubmissions([
  //     { id: 101, studentName: 'Иван Иванов', taskTitle: 'JWT Auth', repoLink: 'github.com/...', status: 'pending', submittedAt: '2026-05-15' }
  //   ]);
  // };
  // ---------------------------------------------

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error("Ошибка при выходе", error);
    } finally {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const handleReviewSubmission = async (id: number, decision: 'approved' | 'rejected', score?: number) => {
    try {
      // Отправляем решение и оценку на бэкенд
      await api.patch(`/homeworks/${id}/review`, { decision, score });
      
      setSubmissions((prev: any) => prev.filter((task: any) => task.id !== id));
      
      alert(decision === 'approved' ? `Работа успешно принята с оценкой ${score}!` : "Работа отправлена на доработку.");
    } catch (error) {
      console.error("Ошибка при проверке работы:", error);
      alert("Ошибка сети. Не удалось отправить решение на сервер.");
    }
  };

  const handleCreateTask = async () => {
    if (!newTaskTitle || !selectedStudent || !newTaskSubject) {
      return alert("Введите название, предмет и выберите студента!");
    }
    
    try {
      await api.post('/homeworks', {
        title: newTaskTitle,
        subject: newTaskSubject, 
        user_id: selectedStudent
      });
      
      alert("ЗАДАНИЕ УСПЕШНО ОТПРАВЛЕНО!");
      setNewTaskTitle('');
    } catch (error) {
      console.error("Ошибка при создании:", error);
      alert("Не удалось создать задание.");
    }
  };

  const handleUpdateCourseProgress = async (courseId: number) => {
    const newProgressStr = window.prompt("Введите новый процент прогресса (0-100):");
    if (newProgressStr !== null) {
      const progress = parseInt(newProgressStr, 10);
      if (!isNaN(progress) && progress >= 0 && progress <= 100) {
        try {
          await api.patch(`/courses/${courseId}`, { progress_percentage: progress });
          setStudentCourses(prev => prev.map(c => c.id === courseId ? { ...c, progress_percentage: progress } : c));
        } catch (error) {
          alert("Не удалось обновить прогресс.");
        }
      } else {
        alert("Введите число от 0 до 100.");
      }
    }
  };

  // Добавить курс
  const handleAddCourse = async () => {
    if (!selectedStudentForCourses) return alert("Сначала выберите студента из списка!");
    const title = window.prompt("Введите название нового курса:");
    if (title) {
      try {
        const res = await api.post('/courses', { title, user_id: selectedStudentForCourses });
        setStudentCourses(prev => [...prev, res.data]); 
      } catch (error) {
        alert("Не удалось добавить курс.");
      }
    }
  };

  // Удалить курс
  const handleDeleteCourse = async (id: number) => {
    if (window.confirm("Вы уверены, что хотите навсегда удалить этот курс у студента?")) {
      try {
        await api.delete(`/courses/${id}`);
        setStudentCourses(prev => prev.filter(c => c.id !== id)); 
      } catch (error) {
        alert("Не удалось удалить курс.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-green-500 font-mono">
        <Terminal className="animate-pulse mr-2" /> ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-300 font-mono p-6">
      <div className="flex justify-between items-center mb-8 border-b border-green-900/30 pb-4 relative z-50 pointer-events-auto">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Terminal className="text-green-500" /> GREEN_UMBRELLA_WORKSPACE
          </h1>
          <div className="text-green-500 text-sm mt-1">
            ПОЛЬЗОВАТЕЛЬ: {user.name} | РОЛЬ: {user.role.toUpperCase()}
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 border border-red-900 text-red-500 px-4 py-2 hover:bg-red-900 hover:text-white transition-all cursor-pointer bg-black"
        >
          ВЫХОД
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ИНТЕРФЕЙС СТУДЕНТА */}
        {user.role === 'student' && (
          <>
            <div className="md:col-span-2 bg-black border border-green-900/30 p-6 rounded-lg">
              <h2 className="text-xl text-white mb-6 flex items-center gap-2">
                <BookOpen size={20} className="text-green-500" /> ТЕКУЩИЕ КУРСЫ
              </h2>
              <div className="space-y-6">
                {courses.map(course => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-bold">{course.title}</span>
                      <span className="text-green-500">{course.progressPercentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 transition-all duration-1000"
                        style={{ width: `${course.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-1 bg-black border border-blue-900/30 p-6 rounded-lg relative overflow-hidden">
              {/* Фоновый декор */}
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-900/10 rounded-full blur-2xl"></div>
              
              <h2 className="text-xl text-white mb-6 flex items-center gap-2">
                <CheckCircle size={20} className="text-blue-500" /> AI-ПРОГНОЗ
              </h2>
              
              {prediction ? (
                <div>
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    {prediction.successProbability}%
                  </div>
                  <p className="text-xs text-gray-500 mb-4">ВЕРОЯТНОСТЬ УСПЕХА (Модель: LightGBM)</p>
                  
                  <div className="p-3 bg-blue-950/30 border border-blue-900/50 rounded text-sm text-blue-200">
                    <AlertTriangle size={14} className="inline mr-1" />
                    {prediction.recommendation}
                  </div>
                </div>
              ) : (
                <p className="text-sm opacity-50">Мало данных для анализа...</p>
              )}
            </div>
            <div className="md:col-span-3 bg-black border border-zinc-800 p-6 rounded-lg mt-4">
              <h2 className="text-xl text-white mb-6 flex items-center gap-2">
                <Terminal size={20} className="text-zinc-500" /> МОИ ЗАДАНИЯ
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-500 text-sm">
                      <th className="pb-3 font-normal">ЗАДАНИЕ</th>
                      <th className="pb-3 font-normal">ПРЕДМЕТ</th>
                      <th className="pb-3 font-normal">СТАТУС</th>
                      <th className="pb-3 font-normal text-right">ОЦЕНКА / ДЕЙСТВИЕ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions && submissions.length > 0 ? (
                      submissions.map((task: any) => (
                        <tr key={task.id} className="border-b border-zinc-900/50 hover:bg-zinc-900/20 transition-colors">
                          <td className="py-4 text-green-400">{task.taskTitle || task.title}</td>
                          <td className="py-4 text-zinc-400">{task.subject || 'Backend'}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 text-xs rounded ${
                              task.status === 'todo' ? 'bg-zinc-900 text-zinc-400 border border-zinc-700' :
                              task.status === 'submitted' ? 'bg-yellow-900/30 text-yellow-500 border border-yellow-700/50' :
                              'bg-green-900/30 text-green-500 border border-green-700/50'
                            }`}>
                              {task.status === 'todo' ? 'К ВЫПОЛНЕНИЮ' : task.status === 'submitted' ? 'НА ПРОВЕРКЕ' : 'ОЦЕНЕНО'}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            {task.score ? (
                              <span className="font-bold text-green-500">{task.score} / 100</span>
                            ) : (
                              <button 
                                onClick={async () => {
                                  const link = window.prompt("Вставьте ссылку на ваш GitHub репозиторий с решением:");
                                  if (link) {
                                    try {
                                      await api.patch(`/homeworks/${task.id}/submit`, { 
                                        repo_link: link 
                                      });
                                      
                                      setSubmissions((prev: any) => prev.map((item: any) => 
                                        item.id === task.id 
                                          ? { ...item, status: 'submitted', repoLink: link } 
                                          : item
                                      ));
                                    } catch (error) {
                                      console.error("Ошибка при отправке", error);
                                      alert("Не удалось сохранить ссылку.");
                                    }
                                  }
                                }}
                                className="text-sm text-blue-500 hover:text-blue-400 hover:underline cursor-pointer px-2 py-1"
                              >
                                Отправить GitHub
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-zinc-600 text-sm">
                          НЕТ АКТИВНЫХ ЗАДАНИЙ
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ИНТЕРФЕЙС ПРЕПОДАВАТЕЛЯ */}
        {user.role === 'teacher' && (
          <div className="md:col-span-3 bg-black border border-amber-900/30 p-6 rounded-lg">
            <h2 className="text-xl text-white mb-6 flex items-center gap-2">
              <Code size={20} className="text-amber-500" /> ОЧЕРЕДЬ CODE REVIEW
            </h2>
            
            {/* ФОРМА СОЗДАНИЯ ЗАДАНИЯ */}
            <div className="bg-zinc-950 border border-amber-900/50 p-4 rounded mb-8">
              <h3 className="text-sm text-amber-500 mb-3 font-bold">ВЫДАТЬ НОВОЕ ЗАДАНИЕ</h3>
              <div className="flex flex-col md:flex-row gap-3">
                <input 
                  type="text" 
                  placeholder="Название задачи (например: Настроить Docker)"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="bg-black border border-zinc-800 text-white px-3 py-2 rounded flex-1 focus:border-amber-700 outline-none transition-colors"
                />
                <input 
                  type="text" 
                  placeholder="Предмет (например: Frontend)"
                  value={newTaskSubject}
                  onChange={(e) => setNewTaskSubject(e.target.value)}
                  className="bg-black border border-zinc-800 text-white px-3 py-2 rounded focus:border-amber-700 outline-none transition-colors"
                />
                <select 
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="bg-black border border-zinc-800 text-zinc-400 px-3 py-2 rounded outline-none focus:border-amber-700 cursor-pointer"
                >
                  <option value="" disabled>Выберите студента...</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <button 
                  onClick={handleCreateTask}
                  className="bg-amber-900/40 text-amber-500 border border-amber-700/50 px-6 py-2 rounded hover:bg-amber-900 hover:text-white transition-colors font-bold cursor-pointer"
                >
                  НАЗНАЧИТЬ
                </button>
              </div>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded mb-8">
              <h3 className="text-sm text-zinc-400 mb-3 font-bold flex justify-between items-center">
                <span>CRM: УПРАВЛЕНИЕ КУРСАМИ</span>
              </h3>
              
              {/* Панель выбора студента и добавления курса */}
              <div className="flex flex-col md:flex-row gap-3 mb-6 bg-black p-3 border border-zinc-900 rounded">
                <select 
                  value={selectedStudentForCourses}
                  onChange={(e) => setSelectedStudentForCourses(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 text-zinc-300 px-3 py-2 rounded outline-none focus:border-zinc-500 cursor-pointer flex-1"
                >
                  <option value="">-- Выберите студента для редактирования курсов --</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                
                <button 
                  onClick={handleAddCourse}
                  disabled={!selectedStudentForCourses}
                  className={`px-4 py-2 rounded font-bold transition-colors ${
                    selectedStudentForCourses 
                      ? 'bg-blue-900/40 text-blue-500 border border-blue-700/50 hover:bg-blue-900 hover:text-white cursor-pointer' 
                      : 'bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed'
                  }`}
                >
                  + ДОБАВИТЬ КУРС
                </button>
              </div>

              {/* Список курсов выбранного студента */}
              {selectedStudentForCourses ? (
                studentCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {studentCourses.map((course: any) => (
                      <div key={course.id} className="flex justify-between items-center p-3 bg-black border border-zinc-900 rounded hover:border-zinc-700 transition-colors">
                        <div>
                          <div className="text-white text-sm font-bold">{course.title}</div>
                          <div className="text-xs text-zinc-500 mt-1">Прогресс: <span className="text-green-500">{course.progressPercentage || course.progress_percentage}%</span></div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleUpdateCourseProgress(course.id)}
                            className="text-xs bg-zinc-900 text-zinc-300 border border-zinc-700 px-2 py-1 rounded hover:bg-zinc-700 transition cursor-pointer"
                          >
                            ✎ Изменить %
                          </button>
                          <button 
                            onClick={() => handleDeleteCourse(course.id)}
                            className="text-xs bg-red-950/30 text-red-500 border border-red-900/50 px-2 py-1 rounded hover:bg-red-900 hover:text-white transition cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-600 text-sm text-center py-4">У этого студента пока нет курсов.</p>
                )
              ) : (
                <p className="text-zinc-600 text-sm text-center py-4">Выберите студента, чтобы увидеть его курсы.</p>
              )}
            </div>
            {submissions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Все работы проверены. Отличная работа!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-zinc-800 text-zinc-500">
                    <tr>
                      <th className="pb-3 font-normal">Студент</th>
                      <th className="pb-3 font-normal">Задание</th>
                      <th className="pb-3 font-normal">Репозиторий</th>
                      <th className="pb-3 font-normal text-right">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {submissions.map(sub => (
                      <tr key={sub.id} className="hover:bg-zinc-900/30 transition-colors">
                        <td className="py-4 text-white">{sub.studentName}</td>
                        <td className="py-4 text-gray-400">{sub.taskTitle}</td>
                        <td className="py-4">
                          <a 
                            href={
                              sub.repoLink && !sub.repoLink.startsWith('http') 
                                ? `https://${sub.repoLink}` 
                                : sub.repoLink || '#'
                            } 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-amber-500 hover:underline"
                            >
                            GitHub_Link ↗
                          </a>
                        </td>
                        <td className="py-4 flex justify-end gap-2">
                          <button 
                            onClick={() => {
                              const scoreStr = window.prompt("Введите оценку за работу (от 0 до 100):", "100");
                              if (scoreStr !== null) {
                                const score = parseInt(scoreStr, 10);
                                if (!isNaN(score) && score >= 0 && score <= 100) {
                                  // Если ввели нормальное число, отправляем
                                  handleReviewSubmission(sub.id, 'approved', score);
                                } else {
                                  alert("Пожалуйста, введите корректное число от 0 до 100.");
                                }
                              }
                            }}
                            className="px-3 py-1 bg-green-950/50 text-green-500 border border-green-900/50 rounded hover:bg-green-900 hover:text-white transition cursor-pointer"
                          >
                            ПРИНЯТЬ
                          </button>
                          <button 
                            onClick={() => handleReviewSubmission(sub.id, 'rejected')}
                            className="px-3 py-1 bg-red-950/50 text-red-500 border border-red-900/50 rounded hover:bg-red-900 hover:text-white transition cursor-pointer"
                          >
                            ВЕРНУТЬ
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
      {/* ИНТЕРФЕЙС АДМИНИСТРАТОРА */}
        {user?.role === 'admin' && (
          <div className="mt-8 animate-fade-in space-y-8">
            <div className="bg-purple-950/20 border border-purple-900 p-6 rounded-lg shadow-xl backdrop-blur-sm">
              <h2 className="text-2xl font-black text-purple-500 mb-6 flex items-center gap-2">
                <span className="text-3xl"></span> ПАНЕЛЬ УПРАВЛЕНИЯ
              </h2>

              {/* БЛОК 1: СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ */}
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded mb-8">
                <h3 className="text-sm text-purple-400 mb-3 font-bold">ДОБАВИТЬ НОВОГО ПОЛЬЗОВАТЕЛИЯ</h3>
                <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  <input 
                    type="text" placeholder="Имя" value={newUser.name}
                    onChange={e => setNewUser({...newUser, name: e.target.value})}
                    className="bg-black border border-zinc-800 text-white px-3 py-2 rounded text-sm focus:border-purple-700 outline-none"
                  />
                  <input 
                    type="email" placeholder="Email" value={newUser.email}
                    onChange={e => setNewUser({...newUser, email: e.target.value})}
                    className="bg-black border border-zinc-800 text-white px-3 py-2 rounded text-sm focus:border-purple-700 outline-none"
                  />
                  <input 
                    type="password" placeholder="Пароль" value={newUser.password}
                    onChange={e => setNewUser({...newUser, password: e.target.value})}
                    className="bg-black border border-zinc-800 text-white px-3 py-2 rounded text-sm focus:border-purple-700 outline-none"
                  />
                  <select 
                    value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}
                    className="bg-black border border-zinc-800 text-zinc-400 px-3 py-2 rounded text-sm outline-none cursor-pointer"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button type="submit" className="bg-purple-900/40 text-purple-400 border border-purple-700/50 px-4 py-2 rounded hover:bg-purple-900 hover:text-white transition-colors text-sm font-bold cursor-pointer">
                    СОЗДАТЬ
                  </button>
                </form>
              </div>

              {/* БЛОК 2: ТАБЛИЦА ПОЛЬЗОВАТЕЛЕЙ */}
              <h3 className="text-sm text-purple-400 mb-3 font-bold">СПИСОК ПОЛЬЗОВАТЕЛЕЙ</h3>
              <div className="bg-black border border-zinc-800 rounded overflow-hidden mb-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-900 border-b border-zinc-800 text-sm text-zinc-400">
                      <th className="p-3">ID</th>
                      <th className="p-3">ИМЯ / EMAIL</th>
                      <th className="p-3">РОЛЬ</th>
                      <th className="p-3 text-right">ДЕЙСТВИЯ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((u: any) => (
                      <tr key={u.id} className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors">
                        <td className="p-3 text-zinc-500">#{u.id}</td>
                        <td className="p-3">
                          <div className="text-white font-bold text-sm">{u.name}</div>
                          <div className="text-xs text-zinc-500">{u.email}</div>
                        </td>
                        <td className="p-3">
                          <select 
                            value={u.role}
                            onChange={(e) => handleUpdateUserRole(u.id, e.target.value)}
                            disabled={u.id === (user as any)?.id}
                            className={`px-2 py-1 rounded Regal text-xs outline-none cursor-pointer border ${
                              u.role === 'admin' ? 'bg-purple-900/50 text-purple-300 border-purple-700/50' :
                              u.role === 'teacher' ? 'bg-amber-900/50 text-amber-300 border-amber-700/50' :
                              'bg-zinc-800 text-zinc-300 border-zinc-700'
                            }`}
                          >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button 
                            onClick={() => handleUpdateUserDetails(u.id, u.name, u.email)}
                            className="text-xs bg-zinc-900 text-zinc-300 border border-zinc-700 px-2 py-1 rounded hover:bg-zinc-700 transition cursor-pointer"
                          >
                            Изменить
                          </button>
                          <button 
                            onClick={() => handleChangeUserPassword(u.id)}
                            className="text-xs bg-zinc-900 text-purple-400 border border-purple-900/50 px-2 py-1 rounded hover:bg-purple-900 hover:text-white transition cursor-pointer"
                          >
                            Пароль
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(u.id)}
                            disabled={u.id === (user as any)?.id}
                            className="text-xs bg-red-950/30 text-red-500 border border-red-900/50 px-2 py-1 rounded hover:bg-red-900 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            УДАЛИТЬ
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* БЛОК 3: ГЛОБАЛЬНОЕ УПРАВЛЕНИЕ КУРСАМИ */}
              <h3 className="text-sm text-purple-400 mb-3 font-bold">ГЛОБАЛЬНЫЙ МОНИТОРИНГ КУРСОВ</h3>
              <div className="bg-black border border-zinc-800 rounded overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-900 border-b border-zinc-800 text-sm text-zinc-400">
                      <th className="p-3">ID Курса</th>
                      <th className="p-3">НАЗВАНИЕ КУРСА</th>
                      <th className="p-3">СТУДЕНТ</th>
                      <th className="p-3">ПРОГРЕСС</th>
                      <th className="p-3 text-right">ДЕЙСТВИЯ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSystemCourses.map((c: any) => (
                      <tr key={c.id} className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors">
                        <td className="p-3 text-zinc-500">#{c.id}</td>
                        <td className="p-3 text-white font-bold text-sm">{c.title}</td>
                        <td className="p-3 text-zinc-300 text-sm">{c.studentName || `ID студента: ${c.user_id}`}</td>
                        <td className="p-3 text-sm text-green-500 font-mono">{c.progress_percentage || c.progressPercentage || 0}%</td>
                        <td className="p-3 text-right space-x-2">
                          <button 
                            onClick={() => handleAdminUpdateCourse(c.id)}
                            className="text-xs bg-zinc-900 text-zinc-300 border border-zinc-700 px-2 py-1 rounded hover:bg-zinc-700 transition"
                          >
                            Изменить %
                          </button>
                          <button 
                            onClick={() => handleAdminDeleteCourse(c.id)}
                            className="text-xs bg-red-950/30 text-red-500 border border-red-900/50 px-2 py-1 rounded hover:bg-red-900 hover:text-white transition"
                          >
                            УДАЛИТЬ
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}
    </div>
  );
};

export default Dashboard;