import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DashboardHome } from './pages/DashboardHome';
import { UsersPage } from './pages/UsersPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { MapPage } from './pages/MapPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { CommissionsPage } from './pages/CommissionsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContentPage } from './pages/ContentPage';
import { SettingsPage } from './pages/SettingsPage';
import Notifications from './pages/NotificationsPage';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'users':
        return <UsersPage />;
      case 'appointments':
        return <AppointmentsPage />;
      case 'map':
        return <MapPage />;
      case 'notifications':
        return <Notifications />;
      case 'statistics':
        return <StatisticsPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'commissions':
        return <CommissionsPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'content':
        return <ContentPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={user}
          onLogout={onLogout}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};