import React from 'react';
import { Users, Calendar, DollarSign, Star, TrendingUp, TrendingDown } from 'lucide-react';

export const DashboardHome = () => {
  const stats = [
    {
      label: 'Clientes Ativos',
      value: '2,847',
      change: '+12.3%',
      icon: Users,
      color: 'bg-blue-500',
      trending: 'up'
    },
    {
      label: 'Agendamentos Hoje',
      value: '156',
      change: '+8.1%',
      icon: Calendar,
      color: 'bg-green-500',
      trending: 'up'
    },
    {
      label: 'Receita Mensal',
      value: '€18,450',
      change: '+15.2%',
      icon: DollarSign,
      color: 'bg-orange-500',
      trending: 'up'
    },
    {
      label: 'Avaliação Média',
      value: '4.8',
      change: '-0.2%',
      icon: Star,
      color: 'bg-yellow-500',
      trending: 'down'
    }
  ];

  const recentActivity = [
    { id: 1, type: 'appointment', message: 'Novo agendamento - João Silva', time: '2 min atrás' },
    { id: 2, type: 'barber', message: 'Barbeiro aprovado - Premium Cuts', time: '5 min atrás' },
    { id: 3, type: 'payment', message: 'Pagamento processado - €45.00', time: '10 min atrás' },
    { id: 4, type: 'review', message: 'Nova avaliação - 5 estrelas', time: '15 min atrás' },
    { id: 5, type: 'user', message: 'Novo cliente registrado - Maria Santos', time: '20 min atrás' }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Visão geral da plataforma Barza</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trending === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center text-sm ${
                  stat.trending === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendIcon className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{activity.message}</div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 px-4 rounded-lg text-left transition-colors">
              Aprovar Barbeiros Pendentes (3)
            </button>
            <button className="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 py-3 px-4 rounded-lg text-left transition-colors">
              Enviar Notificação Push
            </button>
            <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-3 px-4 rounded-lg text-left transition-colors">
              Gerar Relatório Semanal
            </button>
            <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 py-3 px-4 rounded-lg text-left transition-colors">
              Moderar Avaliações (2)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};