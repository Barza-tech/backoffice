import React, { useState, useEffect } from 'react';
import { Clock, DollarSign, AlertTriangle, Check, X, Upload, Eye, MessageSquare, Filter, Search, Download, FileText, ExternalLink } from 'lucide-react';

export const CommissionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState(null);
  const [adminComment, setAdminComment] = useState('');

  // Mock data for commissions
  const commissions = [
    {
      id: 'COM-001',
      barberName: 'Premium Cuts',
      serviceId: 'SRV-001',
      serviceName: 'Corte + Barba',
      serviceAmount: 25.00,
      commissionDue: 3.75,
      status: 'pending',
      serviceDate: '2024-01-20 14:30',
      completedAt: '2024-01-20 15:15',
      timeRemaining: 18.5, // hours
      receiptUploaded: true,
      receiptUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      receiptType: 'pdf',
      adminComments: '',
      clientName: 'João Silva'
    },
    {
      id: 'COM-002',
      barberName: 'Mobile Barber Pro',
      serviceId: 'SRV-002',
      serviceName: 'Corte',
      serviceAmount: 20.00,
      commissionDue: 3.00,
      status: 'validated',
      serviceDate: '2024-01-19 16:00',
      completedAt: '2024-01-19 16:30',
      timeRemaining: 0,
      receiptUploaded: true,
      receiptUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      receiptType: 'pdf',
      adminComments: 'Recibo validado - pagamento confirmado',
      clientName: 'Maria Santos'
    },
    {
      id: 'COM-003',
      barberName: 'Style Masters',
      serviceId: 'SRV-003',
      serviceName: 'Barba',
      serviceAmount: 15.00,
      commissionDue: 2.25,
      status: 'blocked',
      serviceDate: '2024-01-18 10:15',
      completedAt: '2024-01-18 10:35',
      timeRemaining: 0,
      receiptUploaded: false,
      receiptUrl: null,
      receiptType: null,
      adminComments: 'Bloqueado automaticamente - 24h sem validação',
      clientName: 'Pedro Costa'
    },
    {
      id: 'COM-004',
      barberName: 'Urban Cuts',
      serviceId: 'SRV-004',
      serviceName: 'Sobrancelha',
      serviceAmount: 10.00,
      commissionDue: 1.50,
      status: 'rejected',
      serviceDate: '2024-01-17 15:45',
      completedAt: '2024-01-17 16:00',
      timeRemaining: 0,
      receiptUploaded: true,
      receiptUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      receiptType: 'pdf',
      adminComments: 'Recibo ilegível - solicitar novo comprovativo',
      clientName: 'Ana Ferreira'
    },
    {
      id: 'COM-005',
      barberName: 'Classic Barber',
      serviceId: 'SRV-005',
      serviceName: 'Corte + Barba',
      serviceAmount: 30.00,
      commissionDue: 4.50,
      status: 'pending',
      serviceDate: '2024-01-20 11:00',
      completedAt: '2024-01-20 11:45',
      timeRemaining: 2.3, // hours - critical
      receiptUploaded: true,
      receiptUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      receiptType: 'pdf',
      adminComments: '',
      clientName: 'Carlos Mendes'
    }
  ];

  // Calculate summary statistics
  const summaryStats = {
    totalPending: commissions.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.commissionDue, 0),
    totalBlocked: commissions.filter(c => c.status === 'blocked').reduce((sum, c) => sum + c.commissionDue, 0),
    totalValidated: commissions.filter(c => c.status === 'validated').reduce((sum, c) => sum + c.commissionDue, 0),
    totalThisMonth: commissions.reduce((sum, c) => sum + c.commissionDue, 0),
    pendingCount: commissions.filter(c => c.status === 'pending').length,
    blockedCount: commissions.filter(c => c.status === 'blocked').length,
    validatedCount: commissions.filter(c => c.status === 'validated').length,
    rejectedCount: commissions.filter(c => c.status === 'rejected').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'validated':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'blocked':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'validated':
        return 'Validado';
      case 'rejected':
        return 'Rejeitado';
      case 'blocked':
        return 'Bloqueado';
      default:
        return status;
    }
  };

  const formatTimeRemaining = (hours: number) => {
    if (hours <= 0) return 'Expirado';
    if (hours < 1) {
      const minutes = Math.floor(hours * 60);
      return `${minutes}min`;
    }
    return `${hours.toFixed(1)}h`;
  };

  const getTimeRemainingColor = (hours: number) => {
    if (hours <= 0) return 'text-red-600';
    if (hours <= 2) return 'text-orange-600';
    if (hours <= 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredCommissions = commissions.filter(commission => {
    const matchesSearch = commission.barberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || commission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewReceipt = (commission) => {
    if (commission.receiptUploaded && commission.receiptUrl) {
      setSelectedReceipt(commission);
      setShowReceiptModal(true);
    }
  };

  const handleValidatePayment = (commission) => {
    // Logic to validate payment
    console.log('Validating payment for:', commission.id);
    // Update commission status to 'validated'
  };

  const handleRejectPayment = (commission) => {
    setSelectedCommission(commission);
    setAdminComment(commission.adminComments || '');
    setShowCommentsModal(true);
  };

  const handleSaveComment = () => {
    // Logic to save admin comment and reject payment
    console.log('Rejecting payment with comment:', adminComment);
    setShowCommentsModal(false);
    setSelectedCommission(null);
    setAdminComment('');
  };

  const handleOpenComments = (commission) => {
    setSelectedCommission(commission);
    setAdminComment(commission.adminComments || '');
    setShowCommentsModal(true);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Gestão de Comissões</h2>
        <p className="text-gray-600">Controlar e validar comissões dos barbeiros</p>
      </div>

      {/* Summary Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-yellow-100">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">€{summaryStats.totalPending.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Pendentes ({summaryStats.pendingCount})</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-gray-100">
              <AlertTriangle className="w-6 h-6 text-gray-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">€{summaryStats.totalBlocked.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Bloqueadas ({summaryStats.blockedCount})</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-green-100">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">€{summaryStats.totalValidated.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Validadas ({summaryStats.validatedCount})</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-blue-100">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">€{summaryStats.totalThisMonth.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Total Este Mês</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Pesquisar por barbeiro, serviço ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os Estados</option>
            <option value="pending">Pendentes</option>
            <option value="validated">Validadas</option>
            <option value="rejected">Rejeitadas</option>
            <option value="blocked">Bloqueadas</option>
          </select>
          
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Mais Filtros
          </button>
          
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </button>
        </div>
      </div>

      {/* Commission Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barbeiro / Serviço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor / Comissão
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data do Serviço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tempo Restante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recibo
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
              {filteredCommissions.map((commission) => (
                <tr key={commission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{commission.barberName}</div>
                      <div className="text-sm text-gray-500">{commission.serviceName}</div>
                      <div className="text-xs text-gray-400">Cliente: {commission.clientName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">€{commission.serviceAmount.toFixed(2)}</div>
                      <div className="text-sm text-blue-600 font-medium">€{commission.commissionDue.toFixed(2)} (15%)</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{commission.serviceDate}</div>
                    <div className="text-xs text-gray-500">Concluído: {commission.completedAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getTimeRemainingColor(commission.timeRemaining)}`}>
                      {formatTimeRemaining(commission.timeRemaining)}
                    </div>
                    {commission.timeRemaining > 0 && commission.timeRemaining <= 2 && (
                      <div className="text-xs text-red-500 flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Crítico
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {commission.receiptUploaded ? (
                      <div className="flex items-center">
                        <button 
                          onClick={() => handleViewReceipt(commission)}
                          className="text-blue-600 hover:text-blue-900 mr-2"
                          title="Ver Recibo PDF"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-green-600">Enviado</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <button className="text-gray-400 mr-2">
                          <Upload className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-red-600">Pendente</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(commission.status)}`}>
                      {getStatusText(commission.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {commission.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleValidatePayment(commission)}
                            className="text-green-600 hover:text-green-900" 
                            title="Validar Pagamento"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleRejectPayment(commission)}
                            className="text-red-600 hover:text-red-900" 
                            title="Rejeitar Pagamento"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => handleOpenComments(commission)}
                        className="text-blue-600 hover:text-blue-900" 
                        title="Comentários"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-gray-600 hover:text-gray-900" 
                        title="Ver Detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF Receipt Viewer Modal */}
      {showReceiptModal && selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Recibo de Pagamento</h3>
                <p className="text-sm text-gray-600">
                  {selectedReceipt.barberName} - {selectedReceipt.serviceName} - €{selectedReceipt.serviceAmount.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.open(selectedReceipt.receiptUrl, '_blank')}
                  className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Abrir em Nova Aba
                </button>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-6">
              {selectedReceipt.receiptType === 'pdf' ? (
                <div className="w-full h-full min-h-[600px] border border-gray-300 rounded-lg overflow-hidden">
                  <iframe
                    src={`${selectedReceipt.receiptUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                    className="w-full h-full"
                    title="PDF Receipt Viewer"
                    style={{ minHeight: '600px' }}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Formato de arquivo não suportado</p>
                    <p className="text-sm text-gray-500">Apenas arquivos PDF são aceitos</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                <p><strong>ID da Comissão:</strong> {selectedReceipt.id}</p>
                <p><strong>Data do Serviço:</strong> {selectedReceipt.serviceDate}</p>
                <p><strong>Comissão Devida:</strong> €{selectedReceipt.commissionDue.toFixed(2)} (15%)</p>
              </div>
              
              {selectedReceipt.status === 'pending' && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      handleRejectPayment(selectedReceipt);
                      setShowReceiptModal(false);
                    }}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Rejeitar
                  </button>
                  <button
                    onClick={() => {
                      handleValidatePayment(selectedReceipt);
                      setShowReceiptModal(false);
                    }}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Validar Pagamento
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showCommentsModal && selectedCommission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Comentários do Administrador</h3>
              <button
                onClick={() => setShowCommentsModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Barbeiro:</strong> {selectedCommission.barberName}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Serviço:</strong> {selectedCommission.serviceName}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Comissão:</strong> €{selectedCommission.commissionDue.toFixed(2)}
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comentário do Administrador
                </label>
                <textarea
                  value={adminComment}
                  onChange={(e) => setAdminComment(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Adicione um comentário sobre esta comissão..."
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowCommentsModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveComment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Salvar Comentário
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Automation Rules Info */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Regras de Automação
        </h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• O sistema inicia a contagem de 24 horas a partir da conclusão do serviço</p>
          <p>• Se após 24 horas o recibo não for validado, o estado muda para "Bloqueado"</p>
          <p>• Barbeiros bloqueados não podem aceitar novos agendamentos</p>
          <p>• Notificação automática é enviada: "Sua conta foi temporariamente bloqueada devido a comissão em atraso"</p>
        </div>
      </div>
    </div>
  );
};