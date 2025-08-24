   import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Clock, DollarSign, AlertTriangle, Check, X, Search, FileText, MessageSquare } from 'lucide-react';
import dayjs from 'dayjs';

const SB_URL = import.meta.env.VITE_SUPABASE_URL;
const SB_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;
const ACCESS_COOKIE = "sb-access-token";

const supabase = createClient(SB_URL, SB_ANON);

export const CommissionsPage = () => {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState(null);
  const [adminComment, setAdminComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCommissions = async () => {
      setLoading(true);
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith(`${ACCESS_COOKIE}=`))
          ?.split('=')[1];

        if (!token) throw new Error('Token de acesso não encontrado');

        const { data, error } = await supabase.rpc('get_commissions_with_space', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (error) throw error;
        setCommissions(data);
      } catch (error) {
        console.error('Erro ao carregar comissões:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommissions();
  }, []);

  // Filtros
  const filteredCommissions = commissions.filter(c => {
    const matchesSearch =
      c.professional_space?.space_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.booking_id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Paginação
  const totalPages = Math.ceil(filteredCommissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCommissions = filteredCommissions.slice(startIndex, startIndex + itemsPerPage);

  // Estatísticas
  const summaryStats = {
    totalPending: commissions.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.amount, 0),
    totalBlocked: commissions.filter(c => c.status === 'blocked').reduce((sum, c) => sum + c.amount, 0),
    totalValidated: commissions.filter(c => c.status === 'validated').reduce((sum, c) => sum + c.amount, 0),
    totalThisMonth: commissions.reduce((sum, c) => sum + c.amount, 0),
    pendingCount: commissions.filter(c => c.status === 'pending').length,
    blockedCount: commissions.filter(c => c.status === 'blocked').length,
    validatedCount: commissions.filter(c => c.status === 'validated').length,
    rejectedCount: commissions.filter(c => c.status === 'rejected').length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'validated': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'blocked': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'validated': return 'Validado';
      case 'rejected': return 'Rejeitado';
      case 'blocked': return 'Bloqueado';
      default: return status;
    }
  };

  const handleViewReceipt = (commission) => {
    if (commission.comprovative) {
      setSelectedReceipt(commission);
      setShowReceiptModal(true);
    }
  };

  const handleValidatePayment = (commission) => {
    console.log('Validando pagamento para:', commission.commission_id);
  };

  const handleRejectPayment = (commission) => {
    setSelectedCommission(commission);
    setAdminComment(commission.adminComments || '');
    setShowCommentsModal(true);
  };

  const handleSaveComment = () => {
    console.log('Comentário salvo e pagamento rejeitado:', adminComment);
    setShowCommentsModal(false);
    setSelectedCommission(null);
    setAdminComment('');
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Gestão de Comissões</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <Clock className="w-6 h-6 text-yellow-600" />
            <div className="text-right">
              <div className="text-2xl font-bold">KZ{summaryStats.totalPending.toFixed(2)}</div>
              <div className="text-sm text-gray-500">Pendentes ({summaryStats.pendingCount})</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <AlertTriangle className="w-6 h-6 text-gray-600" />
          <div className="text-right">
            <div className="text-2xl font-bold">KZ{summaryStats.totalBlocked.toFixed(2)}</div>
            <div className="text-sm text-gray-500">Bloqueadas ({summaryStats.blockedCount})</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <Check className="w-6 h-6 text-green-600" />
          <div className="text-right">
            <div className="text-2xl font-bold">KZ{summaryStats.totalValidated.toFixed(2)}</div>
            <div className="text-sm text-gray-500">Validadas ({summaryStats.validatedCount})</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <DollarSign className="w-6 h-6 text-blue-600" />
          <div className="text-right">
            <div className="text-2xl font-bold">KZ{summaryStats.totalThisMonth.toFixed(2)}</div>
            <div className="text-sm text-gray-500">Total Este Mês</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Pesquisar por espaço ou booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm"
        >
          <option value="all">Todos os Estados</option>
          <option value="pending">Pendentes</option>
          <option value="validated">Validadas</option>
          <option value="rejected">Rejeitadas</option>
          <option value="blocked">Bloqueadas</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Carregando comissões...</div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-left">
                <tr>
                  <th className="p-3">Espaço Profissional</th>
                  <th className="p-3">Comissão</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Data de Criação</th>
                  <th className="p-3">Comprovativo</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentCommissions.map(c => (
                  <tr key={c.commission_id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{c.professional_space?.space_name}</td>
                    <td className="p-3 font-medium">KZ{c.amount.toFixed(2)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(c.status)}`}>
                        {getStatusText(c.status)}
                      </span>
                    </td>
                    <td className="p-3">{dayjs(c.commission_created_at).format('DD/MM/YYYY HH:mm')}</td>
                    <td className="p-3">
                      {c.comprovative ? (
                        <button
                          onClick={() => handleViewReceipt(c)}
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <FileText className="w-4 h-4" /> Ver PDF
                        </button>
                      ) : (
                        <span className="text-gray-400 italic">Sem comprovativo</span>
                      )}
                    </td>
                    <td className="p-3 flex justify-center gap-2">
                      {c.status === 'pending' && (
                        <>
                          <button onClick={() => handleValidatePayment(c)} className="p-1 rounded hover:bg-green-50">
                            <Check className="w-4 h-4 text-green-600" />
                          </button>
                          <button onClick={() => handleRejectPayment(c)} className="p-1 rounded hover:bg-red-50">
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        </>
                      )}
                      <button onClick={() => setSelectedCommission(c) || setShowCommentsModal(true)} className="p-1 rounded hover:bg-gray-50">
                        <MessageSquare className="w-4 h-4 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </>
      )}

      {/* Modal Recibo */}
      {showReceiptModal && selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 md:w-2/3 lg:w-1/2 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Comprovativo</h3>
            <iframe src={selectedReceipt.comprovative} className="w-full h-96 border rounded-lg" />
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setShowReceiptModal(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Comentários */}
      {showCommentsModal && selectedCommission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 md:w-2/3 lg:w-1/2 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Comentário para {selectedCommission.booking_id}</h3>
            <textarea
              value={adminComment}
              onChange={(e) => setAdminComment(e.target.value)}
              className="w-full border rounded-lg p-2 mb-4 focus:ring focus:ring-blue-200"
              rows={4}
            />
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowCommentsModal(false)} className="px-4 py-2 border rounded-lg">
                Cancelar
              </button>
              <button onClick={handleSaveComment} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Salvar e Rejeitar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
