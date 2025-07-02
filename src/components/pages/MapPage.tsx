import React from 'react';
import { MapPin, Navigation, Users, Clock, Star } from 'lucide-react';

export const MapPage = () => {
  const activeBarbersData = [
    {
      id: 1,
      name: 'Premium Cuts',
      location: 'Luanda, Maianga',
      type: 'Fixo',
      rating: 4.8,
      reviews: 156,
      available: true,
      coordinates: { lat: -8.8384, lng: 13.2344 }
    },
    {
      id: 2,
      name: 'Mobile Barber Pro',
      location: 'Luanda, Ingombota',
      type: 'Móvel',
      rating: 4.6,
      reviews: 89,
      available: true,
      coordinates: { lat: -8.8167, lng: 13.2333 }
    },
    {
      id: 3,
      name: 'Style Masters',
      location: 'Benguela Centro',
      type: 'Fixo',
      rating: 4.9,
      reviews: 203,
      available: false,
      coordinates: { lat: -12.5763, lng: 13.4055 }
    }
  ];

  const hotZones = [
    { id: 1, area: 'Luanda - Maianga', requests: 45, color: 'bg-red-500' },
    { id: 2, area: 'Luanda - Ingombota', requests: 32, color: 'bg-orange-500' },
    { id: 3, area: 'Benguela Centro', requests: 18, color: 'bg-yellow-500' },
    { id: 4, area: 'Huíla - Lubango', requests: 12, color: 'bg-green-500' }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Mapa e Geolocalização</h2>
        <p className="text-gray-600">Visualizar barbeiros ativos e zonas de maior procura</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Mapa de Barbeiros</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Disponível</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Ocupado</span>
                </div>
              </div>
            </div>
            
            {/* Simulated Map */}
            <div className="bg-gray-100 rounded-lg h-96 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100"></div>
              
              {/* Simulated Map Pins */}
              <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <MapPin className="w-8 h-8 text-green-600 drop-shadow-lg" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium">
                    Premium Cuts
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <MapPin className="w-8 h-8 text-green-600 drop-shadow-lg" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium">
                    Mobile Pro
                  </div>
                </div>
              </div>
              
              <div className="absolute top-3/4 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <MapPin className="w-8 h-8 text-gray-400 drop-shadow-lg" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium">
                    Style Masters
                  </div>
                </div>
              </div>

              {/* Heat Map Zones */}
              <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-red-400 rounded-full opacity-30"></div>
              <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-orange-400 rounded-full opacity-30"></div>
              <div className="absolute top-3/4 left-2/3 w-16 h-16 bg-yellow-400 rounded-full opacity-30"></div>
              
              <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow p-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Navigation className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Angola</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Active Barbers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Barbeiros Ativos</h3>
            <div className="space-y-3">
              {activeBarbersData.map((barber) => (
                <div key={barber.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${barber.available ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{barber.name}</div>
                      <div className="text-xs text-gray-500">{barber.location}</div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                        {barber.rating} ({barber.reviews})
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    barber.type === 'Fixo' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {barber.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Zones */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Zonas de Maior Procura</h3>
            <div className="space-y-3">
              {hotZones.map((zone) => (
                <div key={zone.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${zone.color}`}></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{zone.area}</div>
                      <div className="text-xs text-gray-500">{zone.requests} pedidos hoje</div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {zone.requests}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas Rápidas</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Barbeiros Online</span>
                <span className="text-sm font-medium text-green-600">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pedidos Ativos</span>
                <span className="text-sm font-medium text-blue-600">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tempo Médio de Resposta</span>
                <span className="text-sm font-medium text-orange-600">3.2 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};