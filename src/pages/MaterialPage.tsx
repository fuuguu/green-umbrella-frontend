import { FileText, PlayCircle, Link as LinkIcon, Download } from 'lucide-react';
import { Material } from '../types';

const MaterialsPage = () => {
  const materials: Material[] = [
    { id: 1, title: "Введение в React 19", type: 'video', duration: "45:00", url: "#" },
    { id: 2, title: "Архитектура Clean Code.pdf", type: 'pdf', size: "2.4MB", url: "#" },
    { id: 3, title: "Полезные ссылки по TypeScript", type: 'link', url: "https://www.typescriptlang.org/" },
  ];

  return (
    <div className="p-6 bg-zinc-950 min-h-screen text-gray-300 font-mono">
      <h1 className="text-2xl text-white mb-8 border-l-4 border-green-500 pl-4">_RESOURCES_LIBRARY</h1>
      <div className="grid gap-4">
        {materials.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 border border-green-900/20 bg-black hover:border-green-500/50 transition-all group">
            <div className="flex items-center gap-4">
              {item.type === 'video' && <PlayCircle className="text-blue-500" />}
              {item.type === 'pdf' && <FileText className="text-red-500" />}
              {item.type === 'link' && <LinkIcon className="text-amber-500" />}
              <div>
                <p className="text-white group-hover:text-green-400 transition-colors">{item.title}</p>
                <span className="text-xs opacity-50 uppercase">{item.duration || item.size || 'External Link'}</span>
              </div>
            </div>
            <a href={item.url} className="px-4 py-1 border border-green-900 text-xs hover:bg-green-900/20">OPEN_FILE</a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MaterialsPage;