import React, { useEffect, useState } from "react";
import { Search, Filter, Plus, MapPin } from "lucide-react";
import Cookies from "js-cookie";

const SB_URL = import.meta.env.VITE_SUPABASE_URL;
const SB_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;
const ACCESS_COOKIE = "sb-access-token";

export const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("clients");
  const [searchTerm, setSearchTerm] = useState("");

  const [clients, setClients] = useState<any[]>([]);
  const [spaces, setSpaces] = useState<any[]>([]);

  const [loadingClients, setLoadingClients] = useState(false);
  const [loadingSpaces, setLoadingSpaces] = useState(false);

  // paginação
  const [pageClients, setPageClients] = useState(1);
  const [pageSpaces, setPageSpaces] = useState(1);
  const limit = 10;
  const [totalClients, setTotalClients] = useState(0);
  const [totalSpaces, setTotalSpaces] = useState(0);

  // 🔹 Fetch profiles (clientes) com paginação
  useEffect(() => {
    const fetchProfiles = async () => {
      setLoadingClients(true);
      try {
        const token = Cookies.get(ACCESS_COOKIE);
        if (!token) return;

        const from = (pageClients - 1) * limit;
        const to = from + limit - 1;

        const resp = await fetch(
          `${SB_URL}/rest/v1/profiles?order=created_at.desc`,
          {
            headers: {
              apikey: SB_ANON,
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              Range: `${from}-${to}`,
              Prefer: "count=exact",
            },
          }
        );

        if (!resp.ok) throw new Error("Erro ao buscar perfis.");

        const data = await resp.json();
        setClients(data);

        const total = resp.headers.get("content-range");
        if (total) {
          const [, totalCount] = total.split("/");
          setTotalClients(Number(totalCount));
        }
      } catch (err) {
        console.error(err);
        setClients([]);
      } finally {
        setLoadingClients(false);
      }
    };

    fetchProfiles();
  }, [pageClients]);

  // 🔹 Fetch professional spaces com paginação
  useEffect(() => {
    const fetchSpaces = async () => {
      setLoadingSpaces(true);
      try {
        const token = Cookies.get(ACCESS_COOKIE);
        if (!token) return;

        const from = (pageSpaces - 1) * limit;
        const to = from + limit - 1;

        const resp = await fetch(
          `${SB_URL}/rest/v1/professional_space?order=created_at.desc`,
          {
            headers: {
              apikey: SB_ANON,
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              Range: `${from}-${to}`,
              Prefer: "count=exact",
            },
          }
        );

        if (!resp.ok) throw new Error("Erro ao buscar espaços.");

        const data = await resp.json();
        setSpaces(data);

        const total = resp.headers.get("content-range");
        if (total) {
          const [, totalCount] = total.split("/");
          setTotalSpaces(Number(totalCount));
        }
      } catch (err) {
        console.error(err);
        setSpaces([]);
      } finally {
        setLoadingSpaces(false);
      }
    };

    fetchSpaces();
  }, [pageSpaces]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "blocked":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "blocked":
        return "Bloqueado";
      case "pending":
        return "Pendente";
      default:
        return status;
    }
  };

  const totalPagesClients = Math.ceil(totalClients / limit) || 1;
  const totalPagesSpaces = Math.ceil(totalSpaces / limit) || 1;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Gestão de Utilizadores
        </h2>
        <p className="text-gray-600">
          Gerir clientes e profissionais da plataforma
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab("clients")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "clients"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Clientes ({totalClients})
        </button>
        <button
          onClick={() => setActiveTab("barbers")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "barbers"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Profissionais ({totalSpaces})
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={`Pesquisar ${
              activeTab === "clients" ? "clientes" : "profissionais"
            }...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </button>
        </div>
      </div>

      {/* Clients Table */}
      {activeTab === "clients" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loadingClients ? (
            <p className="p-6 text-center text-gray-500">
              Carregando clientes...
            </p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Contacto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Localização
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clients.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img
                            src={
                              client.avatar_url ||
                              "https://via.placeholder.com/40"
                            }
                            alt={client.full_name}
                            className="w-10 h-10 rounded-full object-cover border"
                          />
                          <span>{client.full_name}</span>
                        </td>
                        <td className="px-6 py-4">{client.phone}</td>
                        <td className="px-6 py-4 flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                          {client.location}
                        </td>
                        <td className="px-6 py-4">{client.user_type}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                              client.status || "active"
                            )}`}
                          >
                            {getStatusText(client.status || "active")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              <div className="flex justify-between items-center p-4 border-t bg-gray-50">
                <button
                  disabled={pageClients === 1}
                  onClick={() =>
                    setPageClients((p) => Math.max(p - 1, 1))
                  }
                  className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                  Anterior
                </button>
                <span>
                  Página {pageClients} de {totalPagesClients}
                </span>
                <button
                  disabled={pageClients === totalPagesClients}
                  onClick={() => setPageClients((p) => p + 1)}
                  className="px-3 py-1 rounded bg-blue-600 text-white"
                >
                  Próxima
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Professional Spaces Table */}
      {activeTab === "barbers" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loadingSpaces ? (
            <p className="p-6 text-center text-gray-500">
              Carregando profissionais...
            </p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Espaço
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Serviços
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Localização
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Contacto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Preço
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {spaces.map((space) => (
                      <tr key={space.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{space.space_name}</td>
                        <td className="px-6 py-4">
                          {JSON.parse(space.beauty_services).join(", ")}
                        </td>
                        <td className="px-6 py-4 flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                          {space.location_space?.address}
                        </td>
                        <td className="px-6 py-4">{space.phone}</td>
                        <td className="px-6 py-4">{space.rate} Kz</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              <div className="flex justify-between items-center p-4 border-t bg-gray-50">
                <button
                  disabled={pageSpaces === 1}
                  onClick={() =>
                    setPageSpaces((p) => Math.max(p - 1, 1))
                  }
                  className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                  Anterior
                </button>
                <span>
                  Página {pageSpaces} de {totalPagesSpaces}
                </span>
                <button
                  disabled={pageSpaces === totalPagesSpaces}
                  onClick={() => setPageSpaces((p) => p + 1)}
                  className="px-3 py-1 rounded bg-blue-600 text-white"
                >
                  Próxima
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
