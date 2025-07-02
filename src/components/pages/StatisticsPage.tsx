import React from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Star, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export const StatisticsPage = () => {
  const monthlyData = [
    { month: 'Jan', users: 1200, appointments: 890, revenue: 12500 },
    { month: 'Fev', users: 1450, appointments: 1120, revenue: 15800 },
    { month: 'Mar', users: 1680, appointments: 1290, revenue: 18200 },
    { month: 'Abr', users: 1890, appointments: 1450, revenue: 21100 },
    { month: 'Mai', users: 2150, appointments: 1680, revenue: 24500 },
    { month: 'Jun', users: 2380, appointments: 1890, revenue: 27800 }
  ];

  const serviceData = [
    { name: 'Corte', value: 45, color: '#3B82F6' },
    { name: 'Barba', value: 25, color: '#F97316' },
    { name: 'Corte + Barba', value: 20, color: '#10B981' },
    { name: 'Sobrancelha', value: 10, color: '#8B5CF6' }
  ];

  const topBarbersData = [
    { name: 'Premium Cuts', appointments: 156, rating: 4.8, revenue: 4680 },
    { name: 'Style Masters', appointments: 142, rating: 4.9, revenue: 4260 },
    { name: 'Urban Cuts', appointments: 128, rating: 4.7, revenue: 3840 },
    { name: 'Mobile Pro', appointments: 115, rating: 4.6, revenue: 3450 },
    { name: 'Classic Barber', appointments: 98, rating: 4.5, revenue: 2940 }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Estatísticas e Relatórios</h2>
            <p className="text-gray-600">Análise detalhada do desempenho da plataforma</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-blue-100">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">2,847</div>
              <div className="text-sm text-gray-600">Utilizadores Ativos</div>
              <div className="text-sm text-green-600">+12.3%</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-green-100">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">1,456</div>
              <div className="text-sm text-gray-600">Agendamentos</div>
              <div className="text-sm text-green-600">+8.7%</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-orange-100">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">€24,580</div>
              <div className="text-sm text-gray-600">Receita Mensal</div>
              <div className="text-sm text-green-600">+15.2%</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-yellow-100">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">4.7</div>
              <div className="text-sm text-gray-600">Avaliação Média</div>
              <div className="text-sm text-red-600">-0.1%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Growth */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Crescimento Mensal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} name="Utilizadores" />
              <Line type="monotone" dataKey="appointments" stroke="#10B981" strokeWidth={2} name="Agendamentos" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Receita Mensal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`€${value}`, 'Receita']} />
              <Bar dataKey="revenue" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição de Serviços</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Barbers */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Barbeiros</h3>
          <div className="space-y-4">
            {topBarbersData.map((barber, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{barber.name}</div>
                    <div className="text-xs text-gray-500">{barber.appointments} agendamentos</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">€{barber.revenue}</div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                    {barber.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};