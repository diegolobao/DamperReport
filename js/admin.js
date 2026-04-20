/**
 * admin.js
 * Lógica da página administrativa
 * Versão: Tabela unificada com 6 campos
 * Compatível com IE10+
 */

(function(window) {
    'use strict';

    // ========================================================================
    // CONSTANTES E ESTADO
    // ========================================================================

    var DATA_KEY = 'damper_admin_data';
    var confirmCallback = null;

    // Elementos DOM
    var elements = {
        loginSection: null,
        adminPanel: null,
        loginForm: null,
        loginMessage: null,
        logoutBtn: null,
        adminForm: null,
        adminCancel: null,
        adminMessage: null,
        adminTbody: null,
        confirmModal: null,
        confirmModalMessage: null,
        confirmModalConfirm: null,
        confirmModalCancel: null
    };

    // ========================================================================
    // FUNÇÕES DE ARMAZENAMENTO (localStorage)
    // ========================================================================

    /**
     * Carrega dados do localStorage
     * @returns {Array} Array de registros
     */
    function loadData() {
        try {
            var data = localStorage.getItem(DATA_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Erro ao carregar dados:', e);
            return [];
        }
    }

    /**
     * Salva dados no localStorage
     * @param {Array} data - Array de registros
     */
    function saveData(data) {
        try {
            localStorage.setItem(DATA_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Erro ao salvar dados:', e);
        }
    }

    /**
     * Gera próximo ID
     * @param {Array} data - Array de dados
     * @returns {number} Próximo ID
     */
    function getNextId(data) {
        if (!data || data.length === 0) return 1;
        var maxId = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].id > maxId) {
                maxId = data[i].id;
            }
        }
        return maxId + 1;
    }

    /**
     * Verifica duplicidade de Tag Busca
     * @param {Array} data - Array de dados
     * @param {string} tagBusca - Tag Busca a verificar
     * @param {number} excludeId - ID a excluir da verificação
     * @returns {boolean} True se existe duplicidade
     */
    function checkDuplicate(data, tagBusca, excludeId) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].tag_busca === tagBusca && data[i].id !== excludeId) {
                return true;
            }
        }
        return false;
    }

    // ========================================================================
    // FUNÇÕES DE INTERFACE
    // ========================================================================

    /**
     * Inicializa referências aos elementos DOM
     */
    function initElements() {
        elements.loginSection = document.getElementById('login-section');
        elements.adminPanel = document.getElementById('admin-panel');
        elements.loginForm = document.getElementById('login-form');
        elements.loginMessage = document.getElementById('login-message');
        elements.logoutBtn = document.getElementById('logout-btn');
        
        elements.adminForm = document.getElementById('admin-form');
        elements.adminCancel = document.getElementById('admin-cancel');
        elements.adminMessage = document.getElementById('admin-message');
        elements.adminTbody = document.getElementById('admin-tbody');
        
        elements.confirmModal = document.getElementById('confirm-modal');
        elements.confirmModalMessage = document.getElementById('confirm-modal-message');
        elements.confirmModalConfirm = document.getElementById('confirm-modal-confirm');
        elements.confirmModalCancel = document.getElementById('confirm-modal-cancel');
    }

    /**
     * Atualiza view baseado no estado de autenticação
     */
    function updateView() {
        if (window.Auth && window.Auth.isAuthenticated()) {
            elements.loginSection.classList.add('hidden');
            elements.adminPanel.classList.remove('hidden');
            elements.logoutBtn.classList.remove('hidden');
            loadRecords();
        } else {
            elements.loginSection.classList.remove('hidden');
            elements.adminPanel.classList.add('hidden');
            elements.logoutBtn.classList.add('hidden');
        }
    }

    /**
     * Exibe mensagem de feedback do login
     */
    function showMessage(message, type) {
        if (!elements.loginMessage) return;

        elements.loginMessage.textContent = message;
        elements.loginMessage.className = 'message message-' + type;
        elements.loginMessage.classList.remove('hidden');

        setTimeout(function() {
            elements.loginMessage.classList.add('hidden');
        }, 5000);
    }

    /**
     * Exibe mensagem no painel admin
     */
    function showAdminMessage(message, type) {
        if (!elements.adminMessage) return;

        elements.adminMessage.textContent = message;
        elements.adminMessage.className = 'message message-' + type;
        elements.adminMessage.classList.remove('hidden');

        setTimeout(function() {
            elements.adminMessage.classList.add('hidden');
        }, 5000);
    }

    /**
     * Exibe modal de confirmação
     */
    function showConfirmModal(message, callback) {
        elements.confirmModalMessage.textContent = message;
        elements.confirmModal.classList.add('active');
        confirmCallback = callback;
    }

    /**
     * Oculta modal de confirmação
     */
    function hideConfirmModal() {
        elements.confirmModal.classList.remove('active');
        confirmCallback = null;
    }

    // ========================================================================
    // AUTENTICAÇÃO
    // ========================================================================

    /**
     * Handler do formulário de login
     */
    function handleLogin(e) {
        e.preventDefault();

        var username = document.getElementById('username').value.trim();
        var password = document.getElementById('password').value;

        if (!username || !password) {
            showMessage('Por favor, preencha todos os campos', 'error');
            return;
        }

        if (window.Auth) {
            var result = window.Auth.login(username, password);
            
            if (result.success) {
                showMessage(result.message, 'success');
                setTimeout(function() {
                    updateView();
                    elements.loginForm.reset();
                }, 500);
            } else {
                showMessage(result.message, 'error');
                document.getElementById('password').value = '';
                document.getElementById('password').focus();
            }
        } else {
            showMessage('Erro: Módulo de autenticação não carregado', 'error');
        }
    }

    /**
     * Handler do botão de logout
     */
    function handleLogout() {
        if (window.Auth) {
            var result = window.Auth.logout();
            if (result.success) {
                updateView();
                console.info(result.message);
            }
        }
    }

    // ========================================================================
    // CRUD UNIFICADO
    // ========================================================================

    /**
     * Carrega e renderiza todos os registros
     */
    function loadRecords() {
        var data = loadData();
        
        if (!elements.adminTbody) return;

        if (data.length === 0) {
            elements.adminTbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: #999;">Nenhum registro encontrado</td></tr>';
            return;
        }

        var html = '';
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            html += '<tr>';
            html += '<td>' + record.id + '</td>';
            html += '<td>' + (record.tag_busca || '') + '</td>';
            html += '<td>' + (record.tag_report || '') + '</td>';
            html += '<td>' + (record.zsl || '') + '</td>';
            html += '<td>' + (record.zsh || '') + '</td>';
            html += '<td>' + (record.tempo_t1 !== undefined ? record.tempo_t1 : '') + '</td>';
            html += '<td>' + (record.tempo_t2 !== undefined ? record.tempo_t2 : '') + '</td>';
            html += '<td class="data-table-actions">';
            html += '<button class="btn btn-small btn-secondary" onclick="window.AdminPage.editRecord(' + record.id + ')">Editar</button> ';
            html += '<button class="btn btn-small btn-danger" onclick="window.AdminPage.deleteRecord(' + record.id + ')">Excluir</button>';
            html += '</td>';
            html += '</tr>';
        }
        
        elements.adminTbody.innerHTML = html;
    }

    /**
     * Handler do formulário de cadastro/edição
     */
    function handleFormSubmit(e) {
        e.preventDefault();

        var id = document.getElementById('record-id').value;
        var tagBusca = document.getElementById('tag-busca').value.trim();
        var tagReport = document.getElementById('tag-report').value.trim();
        var zsl = document.getElementById('zsl').value.trim();
        var zsh = document.getElementById('zsh').value.trim();
        var tempoT1 = document.getElementById('tempo-t1').value.trim();
        var tempoT2 = document.getElementById('tempo-t2').value.trim();

        // Validar campos obrigatórios
        if (!tagBusca || !tagReport || !zsl || !zsh || !tempoT1 || !tempoT2) {
            showAdminMessage('Todos os campos são obrigatórios', 'error');
            return;
        }

        var data = loadData();
        var editId = id ? parseInt(id, 10) : null;

        // Verificar duplicidade de Tag Busca
        if (checkDuplicate(data, tagBusca, editId)) {
            showAdminMessage('Já existe um registro com esta Tag Busca', 'error');
            return;
        }

        if (editId) {
            // Editar registro existente
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === editId) {
                    data[i].tag_busca = tagBusca;
                    data[i].tag_report = tagReport;
                    data[i].zsl = zsl;
                    data[i].zsh = zsh;
                    data[i].tempo_t1 = parseInt(tempoT1, 10);
                    data[i].tempo_t2 = parseInt(tempoT2, 10);
                    break;
                }
            }
            showAdminMessage('Registro atualizado com sucesso', 'success');
        } else {
            // Criar novo registro
            var newRecord = {
                id: getNextId(data),
                tag_busca: tagBusca,
                tag_report: tagReport,
                zsl: zsl,
                zsh: zsh,
                tempo_t1: parseInt(tempoT1, 10),
                tempo_t2: parseInt(tempoT2, 10)
            };
            data.push(newRecord);
            showAdminMessage('Registro criado com sucesso', 'success');
        }

        saveData(data);
        loadRecords();
        resetForm();
    }

    /**
     * Edita um registro
     */
    function editRecord(id) {
        var data = loadData();
        var record = null;

        for (var i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                record = data[i];
                break;
            }
        }

        if (!record) return;

        document.getElementById('record-id').value = record.id;
        document.getElementById('tag-busca').value = record.tag_busca || '';
        document.getElementById('tag-report').value = record.tag_report || '';
        document.getElementById('zsl').value = record.zsl || '';
        document.getElementById('zsh').value = record.zsh || '';
        document.getElementById('tempo-t1').value = record.tempo_t1 || '';
        document.getElementById('tempo-t2').value = record.tempo_t2 || '';
        document.getElementById('admin-form-title').textContent = 'Editar Registro';
        elements.adminCancel.classList.remove('hidden');
    }

    /**
     * Deleta um registro
     */
    function deleteRecord(id) {
        showConfirmModal('Tem certeza que deseja excluir este registro?', function() {
            var data = loadData();
            var newData = [];

            for (var i = 0; i < data.length; i++) {
                if (data[i].id !== id) {
                    newData.push(data[i]);
                }
            }

            saveData(newData);
            loadRecords();
            showAdminMessage('Registro excluído com sucesso', 'success');
            hideConfirmModal();
        });
    }

    /**
     * Reseta o formulário
     */
    function resetForm() {
        elements.adminForm.reset();
        document.getElementById('record-id').value = '';
        document.getElementById('admin-form-title').textContent = 'Novo Registro';
        elements.adminCancel.classList.add('hidden');
        elements.adminMessage.classList.add('hidden');
    }

    // ========================================================================
    // INICIALIZAÇÃO
    // ========================================================================

    /**
     * Inicialização principal
     */
    function init() {
        initElements();

        if (!window.Auth) {
            console.error('Módulo Auth não foi carregado!');
            return;
        }

        // Atualizar view baseado no estado de autenticação
        updateView();

        // Event listeners de login/logout
        if (elements.loginForm) {
            elements.loginForm.addEventListener('submit', handleLogin);
        }

        if (elements.logoutBtn) {
            elements.logoutBtn.addEventListener('click', handleLogout);
        }

        // Event listeners do formulário admin
        if (elements.adminForm) {
            elements.adminForm.addEventListener('submit', handleFormSubmit);
        }

        if (elements.adminCancel) {
            elements.adminCancel.addEventListener('click', resetForm);
        }

        // Event listeners do modal de confirmação
        if (elements.confirmModalConfirm) {
            elements.confirmModalConfirm.addEventListener('click', function() {
                if (confirmCallback) {
                    confirmCallback();
                } else {
                    hideConfirmModal();
                }
            });
        }

        if (elements.confirmModalCancel) {
            elements.confirmModalCancel.addEventListener('click', hideConfirmModal);
        }

        // Expor funções globalmente para os botões onclick
        window.AdminPage = {
            editRecord: editRecord,
            deleteRecord: deleteRecord
        };

        console.info('[ADMIN] Página administrativa inicializada (versão tabela unificada)');
    }

    // Aguardar carregamento do DOM
    function onDOMReady(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }

    onDOMReady(init);

})(window);
