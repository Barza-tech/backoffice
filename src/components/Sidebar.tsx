import React from 'react';
import { 
  Home, Users, Calendar, Map, Bell, BarChart3, 
  CreditCard, MessageSquare, Globe, Settings, 
  Scissors, X, Menu 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  sidebarOpen, 
  setSidebarOpen 
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Utilizadores', icon: Users },
    { id: 'appointments', label: 'Agendamentos', icon: Calendar },
    { id: 'map', label: 'Mapa', icon: Map },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'statistics', label: 'Estatísticas', icon: BarChart3 },
    { id: 'payments', label: 'Pagamentos', icon: CreditCard },
    { id: 'reviews', label: 'Avaliações', icon: MessageSquare },
    { id: 'content', label: 'Conteúdo', icon: Globe },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 text-white transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 bg-blue-800">
          <div className="flex items-center">
            <Scissors className="w-8 h-8 text-orange-400" />
            <span className="ml-2 text-xl font-bold">Barza Admin</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-blue-700 p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center px-6 py-3 text-left hover:bg-blue-800 transition-colors
                  ${activeTab === item.id ? 'bg-blue-800 border-r-4 border-orange-400' : ''}
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};