/**
 * mock-data.js
 * Dados mock para testes de desenvolvimento (REMOVER EM PRODUÇÃO)
 * Este arquivo simula respostas da API enquanto o backend não está pronto
 */

(function(window) {
    'use strict';

    // Mock de dados de relatórios
    var mockReports = [
        {
            id: 1,
            tag: 'ABC123',
            date: '2026-04-15',
            status: 'Normal',
            description: 'Relatório de teste 1'
        },
        {
            id: 2,
            tag: 'ABC124',
            date: '2026-04-16',
            status: 'Normal',
            description: 'Relatório de teste 2'
        },
        {
            id: 3,
            tag: 'ABC125',
            date: '2026-04-17',
            status: 'Falha',
            description: 'Relatório com falha'
        },
        {
            id: 4,
            tag: 'ABC126',
            date: '2026-04-18',
            status: 'Normal',
            description: 'Relatório de teste 4'
        },
        {
            id: 5,
            tag: 'ABC127',
            date: '2026-04-19',
            status: 'Normal',
            description: 'Relatório de teste 5'
        },
        {
            id: 6,
            tag: 'DEF001',
            date: '2026-04-10',
            status: 'Falha',
            description: 'Erro no processamento'
        },
        {
            id: 7,
            tag: 'DEF002',
            date: '2026-04-11',
            status: 'Normal',
            description: 'Processamento concluído'
        },
        {
            id: 8,
            tag: 'DEF003',
            date: '2026-04-12',
            status: 'Normal',
            description: 'Relatório automático 1'
        },
        {
            id: 9,
            tag: 'DEF004',
            date: '2026-04-13',
            status: 'Normal',
            description: 'Relatório automático 2'
        },
        {
            id: 10,
            tag: 'DEF005',
            date: '2026-04-14',
            status: 'Falha',
            description: 'Timeout na conexão'
        },
        {
            id: 11,
            tag: 'XYZ999',
            date: '2026-04-20',
            status: 'Normal',
            description: 'Último relatório'
        }
    ];

    /**
     * Filtra relatórios com base nos parâmetros
     */
    function filterReports(params) {
        var filtered = mockReports;
        
        // Filtrar por tag (busca exata no select)
        if (params.tag) {
            filtered = filtered.filter(function(report) {
                return report.tag === params.tag;
            });
        }
        
        // Filtrar por data início (formato: dd/mm/aaaa HH:mm:ss)
        if (params.start_date) {
            // Extrair apenas a parte da data (dd/mm/aaaa)
            var startDateParts = params.start_date.split(' ')[0].split('/');
            var startDateISO = startDateParts[2] + '-' + startDateParts[1] + '-' + startDateParts[0];
            
            filtered = filtered.filter(function(report) {
                return report.date >= startDateISO;
            });
        }
        
        // Filtrar por data fim (formato: dd/mm/aaaa HH:mm:ss)
        if (params.end_date) {
            // Extrair apenas a parte da data (dd/mm/aaaa)
            var endDateParts = params.end_date.split(' ')[0].split('/');
            var endDateISO = endDateParts[2] + '-' + endDateParts[1] + '-' + endDateParts[0];
            
            filtered = filtered.filter(function(report) {
                return report.date <= endDateISO;
            });
        }
        
        // Filtrar por status
        if (params.status) {
            filtered = filtered.filter(function(report) {
                return report.status === params.status;
            });
        }
        
        return filtered;
    }

    /**
     * Intercepta chamadas API e retorna dados mock
     * ATENÇÃO: Isto é apenas para desenvolvimento! Remover em produção.
     */
    if (window.API && typeof window.API.get === 'function') {
        // Salvar função original
        var originalGet = window.API.get;
        
        // Substituir temporariamente
        window.API.get = function(endpoint, params, successCallback, errorCallback) {
            // Se for endpoint de reports, usar mock
            if (endpoint === '/reports' || endpoint.indexOf('/api/reports') !== -1) {
                console.warn('[MOCK] Usando dados simulados para:', endpoint);
                
                // Simular delay de rede (500ms)
                setTimeout(function() {
                    var results = filterReports(params || {});
                    
                    // Simular resposta da API
                    var response = {
                        data: results,
                        total: results.length,
                        success: true
                    };
                    
                    if (successCallback) {
                        successCallback(response);
                    }
                }, 500);
            } else {
                // Para outros endpoints, usar função original
                originalGet.apply(this, arguments);
            }
        };
        
        console.info('[MOCK DATA] Mock ativado. Lembre-se de remover em produção!');
    }

})(window);
