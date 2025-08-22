import React from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';

interface HeaderProps {
  user: {
    name?: string;
    role?: string;
    avatar_url?: string;
  };
  onLogout: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, setSidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Botão e título */}
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 ml-2 lg:ml-0">
            Painel Administrativo
          </h1>
        </div>

        {/* Notificação + Utilizador */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            {/* Avatar */}
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover border"
              />
            ) : (
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                <User className="w-4 h-4 text-blue-600" />
              </div>
            )}

            {/* Nome + role */}
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-gray-900">{user?.name || "Utilizador"}</div>
              <div className="text-xs text-gray-500">{user?.role || "Sem role"}</div>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
