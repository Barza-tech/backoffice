import React, { useState } from 'react';
import { Bell, Send, Clock, Users, MapPin, Calendar, Plus, Edit, Trash2, Eye } from 'lucide-react';

export const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('create');

  const campaignHistory = [
    {
      id: 1,
      title: 'Promoção Fim de Semana',
      message: 'Aproveite 20% de desconto em todos os serviços este fim de semana!',
      sentAt: '2024-01-19 15:30',
      recipients: 1250,
      opens: 892,
      clicks: 234,
      status: 'sent'
    },
    {
      id: 2,
      title: 'Novos Barbeiros Disponíveis',
      message: 'Descubra novos barbeiros na sua área. Agende já!',
      sentAt: '2024-01-18 10:15',
      recipients: 2150,
      opens: 1456,
      clicks: 412,
      status: 'sent'
    },
    {
      id: 3,
      title: 'Lembrete de Agendamento',
      message: 'Seu agendamento é amanhã às 14:30. Confirme sua presença.',
      sentAt: '2024-01-17 18:45',
      recipients: 45,
      opens: 43,
      clicks: 38,
      status: 'sent'
    },
    {
      id: 4,
      title: 'Campanha de Natal',
      message: 'Feliz Natal! Descontos especiais para você.',
      sentAt: 'Agendado para 2024-12-24 08:00',
      recipients: 3500,
      opens: 0,
      clicks: 0,
      status: 'scheduled'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Notificações Push</h2>
        <p className="text-gray-600">Criar e gerir campanhas de notificação para os utilizadores</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'create'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Criar Campanha
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'history'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Histórico ({campaignHistory.length})
        </button>
      </div>

      {/* Create Campaign */}
      {activeTab === 'create' && (
        <div className="max-w-4xl">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Nova Campanha de Notificação</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título da Campanha
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Promoção Especial"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Notificação
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Promocional</option>
                    <option>Informativa</option>
                    <option>Lembrete</option>
                    <option>Urgente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem Principal
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Escreva sua mensagem aqui..."
                />
                <div className="text-sm text-gray-500 mt-1">Máximo 150 caracteres</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texto do Botão (opcional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Ver Promoção"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link de Ação (opcional)
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Targeting Options */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Segmentação de Audiência</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localização
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Todas as localizações</option>
                      <option>Luanda</option>
                      <option>Benguela</option>
                      <option>Huíla</option>
                      <option>Huambo</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Utilizador
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Todos os utilizadores</option>
                      <option>Clientes ativos</option>
                      <option>Clientes inativos</option>
                      <option>Novos clientes</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Scheduling */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Agendamento</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      id="send-now"
                      name="schedule"
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      defaultChecked
                    />
                    <label htmlFor="send-now" className="text-sm font-medium text-gray-700">
                      Enviar agora
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      id="schedule-later"
                      name="schedule"
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="schedule-later" className="text-sm font-medium text-gray-700">
                      Agendar para mais tarde
                    </label>
                  </div>
                  
                  <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hora
                      </label>
                      <input
                        type="time"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Pré-visualização</h4>
                <div className="bg-gray-50 rounded-lg p-4 max-w-sm">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <Bell className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Barza</div>
                      <div className="text-xs text-gray-500">agora</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-900 mb-2">
                    Promoção Especial
                  </div>
                  <div className="text-xs text-gray-600">
                    Sua mensagem aparecerá aqui...
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Campanha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Campaign History */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Histórico de Campanhas</h3>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Nova Campanha
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campanha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enviado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destinatários
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaignHistory.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{campaign.title}</div>
                        <div className="text-sm text-gray-500">{campaign.message.substring(0, 50)}...</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        {campaign.sentAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Users className="w-4 h-4 mr-1 text-gray-400" />
                        {campaign.recipients.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {campaign.opens > 0 ? `${((campaign.opens / campaign.recipients) * 100).toFixed(1)}% abertura` : '-'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {campaign.clicks > 0 ? `${((campaign.clicks / campaign.recipients) * 100).toFixed(1)}% cliques` : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        campaign.status === 'sent' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {campaign.status === 'sent' ? 'Enviado' : 'Agendado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};