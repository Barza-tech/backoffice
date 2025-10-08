import React, { useState } from "react";
import { Star, Eye, MessageSquare, Check } from "lucide-react";
import { useProfessionalSpaceRatings, ProfessionalSpaceRating } from "../../hooks/useProfessionalRatings";

const REVIEWS_PER_PAGE = 4;

export const ReviewsPage = () => {
  const [activeTab, setActiveTab] = useState("reviews");
  const [pageReviews, setPageReviews] = useState(1);

  const { ratings, loading } = useProfessionalSpaceRatings();

  const complaints = [
    {
      id: 1,
      client: "Carlos Mendes",
      barber: "Quick Cuts",
      subject: "Atraso de 45 minutos",
      description: "O barbeiro chegou 45 minutos atrasado e não avisou previamente. Perdi outros compromissos.",
      date: "2024-01-19T20:30:00",
      status: "open",
      priority: "high",
    },
    {
      id: 2,
      client: "Sofia Rodrigues",
      barber: "Classic Barber",
      subject: "Cobrança incorreta",
      description: "Foi cobrado valor diferente do acordado na app. Combinamos €20 e foi cobrado €30.",
      date: "2024-01-18T16:45:00",
      status: "resolved",
      priority: "medium",
    },
    {
      id: 3,
      client: "Miguel Fernandes",
      barber: "Style Pro",
      subject: "Serviço não realizado",
      description: "Barbeiro cancelou no último minuto sem justificativa adequada.",
      date: "2024-01-17T09:20:00",
      status: "in_progress",
      priority: "high",
    },
  ];

  // Dashboard stats
  const totalReviews = ratings.length;
  const positiveReviews = ratings.filter(r => r.stars >= 4).length;
  const negativeReviews = ratings.filter(r => r.stars <= 2).length;
  const averageStars = ratings.length > 0
    ? (ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length).toFixed(1)
    : 0;

  const totalPagesReviews = Math.ceil(totalReviews / REVIEWS_PER_PAGE) || 1;
  const paginatedReviews = ratings.slice((pageReviews - 1) * REVIEWS_PER_PAGE, pageReviews * REVIEWS_PER_PAGE);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ));

  const formatDate = (dateStr: string) =>
    new Intl.DateTimeFormat("pt-PT", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(dateStr));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-100 text-red-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Avaliações e Reclamações</h2>
        <p className="text-gray-600">Moderar avaliações e resolver reclamações dos utilizadores</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-xl p-4 flex flex-col">
          <span className="text-gray-500 text-sm">Total de Avaliações</span>
          <span className="text-2xl font-bold">{totalReviews}</span>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex flex-col">
          <span className="text-gray-500 text-sm">Positivas (≥4⭐)</span>
          <span className="text-2xl font-bold">{positiveReviews}</span>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex flex-col">
          <span className="text-gray-500 text-sm">Negativas (≤2⭐)</span>
          <span className="text-2xl font-bold">{negativeReviews}</span>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex flex-col">
          <span className="text-gray-500 text-sm">Média de Estrelas</span>
          <span className="text-2xl font-bold">{averageStars}⭐</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "reviews" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Avaliações ({totalReviews})
        </button>
        <button
          onClick={() => setActiveTab("complaints")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "complaints" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Reclamações ({complaints.length})
        </button>
      </div>

      {/* Reviews Table */}
      {activeTab === "reviews" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <p className="p-6 text-center text-gray-500">A carregar avaliações...</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Espaço</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avaliação</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comentário</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedReviews.map((r: ProfessionalSpaceRating) => (
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{r.client_full_name}</td>
                        <td className="px-6 py-4">{r.space_name}</td>
                        <td className="px-6 py-4 flex items-center">{renderStars(r.stars)}</td>
                        <td className="px-6 py-4 truncate max-w-xs">{r.comment}</td>
                        <td className="px-6 py-4">{formatDate(r.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              <div className="flex justify-between items-center p-4 border-t bg-gray-50">
                <button
                  disabled={pageReviews === 1}
                  onClick={() => setPageReviews(p => Math.max(p - 1, 1))}
                  className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                  Anterior
                </button>
                <span>Página {pageReviews} de {totalPagesReviews}</span>
                <button
                  disabled={pageReviews === totalPagesReviews}
                  onClick={() => setPageReviews(p => p + 1)}
                  className="px-3 py-1 rounded bg-blue-600 text-white"
                >
                  Próxima
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Complaints Table */}
      {activeTab === "complaints" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Barbeiro</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assunto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prioridade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {complaints.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{c.client}</td>
                    <td className="px-6 py-4">{c.barber}</td>
                    <td className="px-6 py-4">{c.subject}</td>
                    <td className="px-6 py-4 truncate max-w-xs">{c.description}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(c.priority)}`}>
                        {c.priority === "high" ? "Alta" : c.priority === "medium" ? "Média" : "Baixa"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(c.status)}`}>
                        {c.status === "open" ? "Aberto" : c.status === "in_progress" ? "Em Progresso" : "Resolvido"}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900"><Eye className="w-4 h-4" /></button>
                      <button className="text-green-600 hover:text-green-900"><MessageSquare className="w-4 h-4" /></button>
                      <button className="text-yellow-600 hover:text-yellow-900"><Check className="w-4 h-4" /></button>
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
