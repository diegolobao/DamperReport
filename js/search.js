/**
 * search.js
 * Lógica da página de busca de relatórios
 * Compatível com IE10+
 */

(function(window) {
    'use strict';

    // Configurações de paginação
    var ITEMS_PER_PAGE = 10;
    var currentPage = 1;
    var totalPages = 1;
    var allResults = [];

    /**
     * Aguarda o carregamento completo do DOM
     */
    function onDOMReady(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }

    /**
     * Aplica máscara de data (dd/mm/aaaa) em um input
     */
    function applyDateMask(input) {
        input.addEventListener('input', function(e) {
            var value = e.target.value.replace(/\D/g, '');
            var formattedValue = '';
            
            if (value.length > 0) {
                formattedValue = value.substring(0, 2);
                if (value.length >= 3) {
                    formattedValue += '/' + value.substring(2, 4);
                }
                if (value.length >= 5) {
                    formattedValue += '/' + value.substring(4, 8);
                }
            }
            
            e.target.value = formattedValue;
        });
    }

    /**
     * Valida formato de data dd/mm/aaaa
     */
    function isValidDateFormat(dateString) {
        var regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!regex.test(dateString)) {
            return false;
        }
        
        var parts = dateString.split('/');
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[2], 10);
        
        if (year < 1900 || year > 2100) return false;
        if (month < 1 || month > 12) return false;
        
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        
        // Ano bissexto
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
            daysInMonth[1] = 29;
        }
        
        if (day < 1 || day > daysInMonth[month - 1]) return false;
        
        return true;
    }

    /**
     * Compara duas datas no formato dd/mm/aaaa
     */
    function compareDates(date1, date2) {
        var parts1 = date1.split('/');
        var parts2 = date2.split('/');
        var d1 = parts1[2] + parts1[1] + parts1[0];
        var d2 = parts2[2] + parts2[1] + parts2[0];
        return d1.localeCompare(d2);
    }

    /**
     * Carrega as tags disponíveis no select
     */
    function loadTags() {
        var tagSelect = document.getElementById('search_tag');
        if (!tagSelect) return;
        
        // Carregar tags do localStorage (dados cadastrados no admin)
        var tags = [];
        try {
            var adminData = localStorage.getItem('damper_admin_data');
            if (adminData) {
                var records = JSON.parse(adminData);
                for (var i = 0; i < records.length; i++) {
                    if (records[i].tag_busca) {
                        tags.push(records[i].tag_busca);
                    }
                }
            }
        } catch (e) {
            console.error('Erro ao carregar tags:', e);
        }
        
        // Se não houver tags no localStorage, usar mock
        if (tags.length === 0) {
            tags = [
                'DG-5252025',
                'DG-5252026',
                'DG-5252027'
            ];
        }
        
        // Limpar opções existentes (exceto a primeira)
        tagSelect.innerHTML = '<option value="">Selecione</option>';
        
        // Adicionar tags
        for (var i = 0; i < tags.length; i++) {
            var option = document.createElement('option');
            option.value = tags[i];
            option.textContent = tags[i];
            tagSelect.appendChild(option);
        }
    }

    /**
     * Converte data dd/mm/aaaa para formato dd/mm/aaaa HH:mm:ss
     * @param {string} dateString - Data no formato dd/mm/aaaa
     * @param {string} time - Horário no formato HH:mm:ss
     * @returns {string} Data no formato dd/mm/aaaa HH:mm:ss
     */
    function addTimeToDate(dateString, time) {
        if (!dateString) return '';
        return dateString + ' ' + time;
    }

    /**
     * Valida o formulário de busca
     */
    function validateForm() {
        var tag = document.getElementById('search_tag').value.trim();
        var startDate = document.getElementById('search_start_date').value.trim();
        var endDate = document.getElementById('search_end_date').value.trim();
        
        // Validar tag
        if (!tag) {
            Utils.showMessage('O campo Tag é obrigatório.', 'error');
            return false;
        }
        
        // Validar data início
        if (!startDate) {
            Utils.showMessage('O campo Data Início é obrigatório.', 'error');
            return false;
        }
        
        if (!isValidDateFormat(startDate)) {
            Utils.showMessage('Data Início inválida. Use o formato dd/mm/aaaa.', 'error');
            return false;
        }
        
        // Validar data fim
        if (!endDate) {
            Utils.showMessage('O campo Data Fim é obrigatório.', 'error');
            return false;
        }
        
        if (!isValidDateFormat(endDate)) {
            Utils.showMessage('Data Fim inválida. Use o formato dd/mm/aaaa.', 'error');
            return false;
        }
        
        // Validar se data fim >= data início
        if (compareDates(startDate, endDate) > 0) {
            Utils.showMessage('Data Fim deve ser maior ou igual à Data Início.', 'error');
            return false;
        }
        
        return true;
    }

    /**
     * Realiza a busca de relatórios
     */
    function searchReports(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        var formData = Utils.getFormData('#search-form');
        
        // Adicionar timestamp às datas (00:00:00 para início, 23:59:59 para fim)
        var params = {
            tag: formData.tag,
            start_date: addTimeToDate(formData.start_date, '00:00:00'),
            end_date: addTimeToDate(formData.end_date, '23:59:59')
        };
        
        // Adicionar status se selecionado
        if (formData.status) {
            params.status = formData.status;
        }
        
        // Exibir loading
        Utils.showMessage('Buscando relatórios...', 'info', 0);
        
        // Chamar API
        API.get('/reports', params, 
            function(response) {
                // Sucesso
                handleSearchSuccess(response);
            },
            function(error) {
                // Erro
                handleSearchError(error);
            }
        );
    }

    /**
     * Trata sucesso da busca
     */
    function handleSearchSuccess(response) {
        // Assumindo que a API retorna: { data: [...], total: N }
        var results = response.data || response || [];
        
        if (results.length === 0) {
            showNoResults();
            Utils.showMessage('Nenhum resultado encontrado para os critérios informados.', 'warning');
            return;
        }
        
        allResults = results;
        currentPage = 1;
        totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
        
        displayResults();
        Utils.showMessage('Busca realizada com sucesso! ' + results.length + ' resultado(s) encontrado(s).', 'success');
    }

    /**
     * Trata erro da busca
     */
    function handleSearchError(error) {
        showNoResults();
        
        var errorMsg = 'Erro ao buscar relatórios. ';
        if (error.message) {
            errorMsg += error.message;
        } else if (error.status === 0) {
            errorMsg += 'Verifique sua conexão ou se o servidor está disponível.';
        } else {
            errorMsg += 'Código: ' + error.status;
        }
        
        Utils.showMessage(errorMsg, 'error');
    }

    /**
     * Exibe os resultados na tabela
     */
    function displayResults() {
        var startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        var endIndex = startIndex + ITEMS_PER_PAGE;
        var pageResults = allResults.slice(startIndex, endIndex);
        
        var tbody = document.getElementById('results-tbody');
        tbody.innerHTML = '';
        
        for (var i = 0; i < pageResults.length; i++) {
            var result = pageResults[i];
            var row = document.createElement('tr');
            
            row.innerHTML = 
                '<td>' + Utils.sanitizeInput(result.tag || '-') + '</td>' +
                '<td>' + Utils.formatDate(result.date || result.created_at || '-') + '</td>' +
                '<td>' + Utils.sanitizeInput(result.status || '-') + '</td>' +
                '<td>' + Utils.sanitizeInput(result.description || result.desc || '-') + '</td>';
            
            tbody.appendChild(row);
        }
        
        // Mostrar seção de resultados
        Utils.toggleElement('#results-section', true);
        Utils.toggleElement('#no-results', false);
        
        // Atualizar contador
        var countElement = document.getElementById('results-count');
        countElement.textContent = '(' + allResults.length + ' resultado' + (allResults.length !== 1 ? 's' : '') + ')';
        
        // Renderizar paginação
        renderPagination();
    }

    /**
     * Renderiza os controles de paginação
     */
    function renderPagination() {
        var paginationList = document.getElementById('pagination-list');
        paginationList.innerHTML = '';
        
        if (totalPages <= 1) {
            Utils.toggleElement('#pagination-container', false);
            return;
        }
        
        Utils.toggleElement('#pagination-container', true);
        
        // Botão Anterior
        var prevLi = document.createElement('li');
        prevLi.className = 'pagination-item';
        var prevLink = document.createElement('a');
        prevLink.className = 'pagination-link' + (currentPage === 1 ? ' disabled' : '');
        prevLink.textContent = '« Anterior';
        prevLink.href = '#';
        if (currentPage > 1) {
            prevLink.onclick = function(e) {
                e.preventDefault();
                goToPage(currentPage - 1);
            };
        } else {
            prevLink.onclick = function(e) {
                e.preventDefault();
            };
        }
        prevLi.appendChild(prevLink);
        paginationList.appendChild(prevLi);
        
        // Páginas numeradas
        var startPage = Math.max(1, currentPage - 2);
        var endPage = Math.min(totalPages, currentPage + 2);
        
        for (var i = startPage; i <= endPage; i++) {
            var pageLi = document.createElement('li');
            pageLi.className = 'pagination-item';
            var pageLink = document.createElement('a');
            pageLink.className = 'pagination-link' + (i === currentPage ? ' active' : '');
            pageLink.textContent = i;
            pageLink.href = '#';
            pageLink.setAttribute('data-page', i);
            
            if (i !== currentPage) {
                pageLink.onclick = function(e) {
                    e.preventDefault();
                    var page = parseInt(this.getAttribute('data-page'), 10);
                    goToPage(page);
                };
            } else {
                pageLink.onclick = function(e) {
                    e.preventDefault();
                };
            }
            
            pageLi.appendChild(pageLink);
            paginationList.appendChild(pageLi);
        }
        
        // Botão Próximo
        var nextLi = document.createElement('li');
        nextLi.className = 'pagination-item';
        var nextLink = document.createElement('a');
        nextLink.className = 'pagination-link' + (currentPage === totalPages ? ' disabled' : '');
        nextLink.textContent = 'Próximo »';
        nextLink.href = '#';
        if (currentPage < totalPages) {
            nextLink.onclick = function(e) {
                e.preventDefault();
                goToPage(currentPage + 1);
            };
        } else {
            nextLink.onclick = function(e) {
                e.preventDefault();
            };
        }
        nextLi.appendChild(nextLink);
        paginationList.appendChild(nextLi);
    }

    /**
     * Navega para uma página específica
     */
    function goToPage(page) {
        if (page < 1 || page > totalPages || page === currentPage) {
            return;
        }
        
        currentPage = page;
        displayResults();
        
        // Scroll para topo da tabela
        var resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /**
     * Exibe mensagem de "nenhum resultado"
     */
    function showNoResults() {
        Utils.toggleElement('#results-section', false);
        Utils.toggleElement('#no-results', true);
        allResults = [];
        currentPage = 1;
        totalPages = 1;
    }

    /**
     * Limpa o formulário e resultados
     */
    function clearForm() {
        Utils.clearForm('#search-form');
        Utils.toggleElement('#results-section', false);
        Utils.toggleElement('#no-results', false);
        allResults = [];
        currentPage = 1;
        totalPages = 1;
        
        // Focar no primeiro campo
        var tagSelect = document.getElementById('search_tag');
        if (tagSelect) {
            tagSelect.focus();
        }
    }

    /**
     * Inicialização
     */
    onDOMReady(function() {
        var searchForm = document.getElementById('search-form');
        var clearBtn = document.getElementById('clear-btn');
        var startDateInput = document.getElementById('search_start_date');
        var endDateInput = document.getElementById('search_end_date');
        
        // Carregar tags no select
        loadTags();
        
        if (searchForm) {
            searchForm.addEventListener('submit', searchReports);
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', clearForm);
        }
        
        // Aplicar máscaras de data
        if (startDateInput) {
            applyDateMask(startDateInput);
        }
        
        if (endDateInput) {
            applyDateMask(endDateInput);
        }
        
        console.log('search.js inicializado com sucesso');
    });

})(window);
