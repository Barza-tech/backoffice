import React, { useState } from 'react';
import { Settings, Save, Key, MapPin, Clock, DollarSign, Shield, Zap } from 'lucide-react';

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Configurações da Plataforma</h2>
        <p className="text-gray-600">Gerir configurações globais e integrações</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'general'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Geral
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'services'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Serviços
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'pricing'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Preços
        </button>
        <button
          onClick={() => setActiveTab('integrations')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'integrations'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Integrações
        </button>
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Configurações Gerais</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da Plataforma
                  </label>
                  <input
                    type="text"
                    defaultValue="Barza"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email de Contacto
                  </label>
                  <input
                    type="email"
                    defaultValue="contato@barza.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tempo de Validade de Agendamento (minutos)
                </label>
                <input
                  type="number"
                  defaultValue="30"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distância Máxima para Barbeiros Móveis (km)
                </label>
                <input
                  type="number"
                  defaultValue="20"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="auto-approve"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="auto-approve" className="ml-2 text-sm text-gray-700">
                  Aprovação automática de barbeiros
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Services Settings */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Serviços Disponíveis</h3>
          
          <div className="space-y-4">
            {[
              { name: 'Corte de Cabelo', duration: '30 min', active: true },
              { name: 'Barba', duration: '20 min', active: true },
              { name: 'Corte + Barba', duration: '45 min', active: true },
              { name: 'Sobrancelha', duration: '15 min', active: true },
              { name: 'Massagem Facial', duration: '25 min', active: false },
              { name: 'Hidratação', duration: '30 min', active: false }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={service.active}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{service.name}</div>
                    <div className="text-sm text-gray-500">Duração: {service.duration}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    defaultValue={service.duration}
                    className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="text-blue-600 hover:text-blue-900">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pricing Settings */}
      {activeTab === 'pricing' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Configurações de Preços</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taxa de Comissão da Plataforma (%)
              </label>
              <input
                type="number"
                defaultValue="15"
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Preços Base por Zona</h4>
              <div className="space-y-4">
                {[
                  { city: 'Luanda', min: 15, max: 40 },
                  { city: 'Benguela', min: 12, max: 30 },
                  { city: 'Huíla', min: 10, max: 25 },
                  { city: 'Huambo', min: 10, max: 25 }
                ].map((zone, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{zone.city}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Min:</span>
                      <input
                        type="number"
                        defaultValue={zone.min}
                        className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="text-sm text-gray-500">Max:</span>
                      <input
                        type="number"
                        defaultValue={zone.max}
                        className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="text-sm text-gray-500">€</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integrations Settings */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Integrações e API Keys</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Maps API Key
                </label>
                <div className="flex">
                  <input
                    type="password"
                    placeholder="••••••••••••••••••••••••••••••••"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
                    <Key className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Firebase Server Key
                </label>
                <div className="flex">
                  <input
                    type="password"
                    placeholder="••••••••••••••••••••••••••••••••"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
                    <Key className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stripe Secret Key
                </label>
                <div className="flex">
                  <input
                    type="password"
                    placeholder="••••••••••••••••••••••••••••••••"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
                    <Key className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Estado das Integrações</h3>
            
            <div className="space-y-4">
              {[
                { name: 'Google Maps', status: 'active', icon: MapPin },
                { name: 'Firebase Push', status: 'active', icon: Zap },
                { name: 'Stripe Payments', status: 'active', icon: DollarSign },
                { name: 'SMS Gateway', status: 'inactive', icon: Shield }
              ].map((integration, index) => {
                const Icon = integration.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-sm font-medium text-gray-900">{integration.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        integration.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {integration.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </button>
      </div>
    </div>
  );
};