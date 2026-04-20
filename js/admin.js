/**
 * admin.js
 * Lógica da página administrativa
 * Compatível com IE10+
 */

(function(window) {
    'use strict';

    // Elementos DOM
    var elements = {
        loginSection: null,
        adminPanel: null,
        loginForm: null,
        loginMessage: null,
        logoutBtn: null,
        navItems: null,
        sections: null
    };

    /**
     * Inicializa referências aos elementos DOM
     */
    function initElements() {
        elements.loginSection = document.getElementById('login-section');
        elements.adminPanel = document.getElementById('admin-panel');
        elements.loginForm = document.getElementById('login-form');
        elements.loginMessage = document.getElementById('login-message');
        elements.logoutBtn = document.getElementById('logout-btn');
        elements.navItems = document.querySelectorAll('.admin-nav-item');
        elements.sections = document.querySelectorAll('.admin-section');
    }

    /**
     * Exibe a seção apropriada baseado no estado de autenticação
     */
    function updateView() {
        if (window.Auth && window.Auth.isAuthenticated()) {
            // Mostrar painel admin
            elements.loginSection.classList.add('hidden');
            elements.adminPanel.classList.remove('hidden');
            elements.logoutBtn.classList.remove('hidden');
        } else {
            // Mostrar formulário de login
            elements.loginSection.classList.remove('hidden');
            elements.adminPanel.classList.add('hidden');
            elements.logoutBtn.classList.add('hidden');
        }
    }

    /**
     * Exibe mensagem de feedback
     * @param {string} message - Mensagem a ser exibida
     * @param {string} type - Tipo da mensagem (success, error, warning)
     */
    function showMessage(message, type) {
        if (!elements.loginMessage) return;

        elements.loginMessage.textContent = message;
        elements.loginMessage.className = 'message message-' + type;
        elements.loginMessage.classList.remove('hidden');

        // Auto-ocultar após 5 segundos
        setTimeout(function() {
            elements.loginMessage.classList.add('hidden');
        }, 5000);
    }

    /**
     * Handler do formulário de login
     * @param {Event} e - Evento de submit
     */
    function handleLogin(e) {
        e.preventDefault();

        // Obter valores dos campos
        var username = document.getElementById('username').value.trim();
        var password = document.getElementById('password').value;

        // Validar campos vazios
        if (!username || !password) {
            showMessage('Por favor, preencha todos os campos', 'error');
            return;
        }

        // Tentar fazer login
        if (window.Auth) {
            var result = window.Auth.login(username, password);
            
            if (result.success) {
                showMessage(result.message, 'success');
                
                // Aguardar um momento antes de atualizar a view
                setTimeout(function() {
                    updateView();
                    elements.loginForm.reset();
                }, 500);
            } else {
                showMessage(result.message, 'error');
                // Limpar senha em caso de erro
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
                // Atualizar view para mostrar login
                updateView();
                
                // Mensagem será exibida no próximo login
                console.info(result.message);
            }
        }
    }

    /**
     * Navega entre as seções do painel admin
     * @param {string} sectionName - Nome da seção a ser exibida
     */
    function navigateToSection(sectionName) {
        // Remover classe 'active' de todos os itens de navegação
        for (var i = 0; i < elements.navItems.length; i++) {
            elements.navItems[i].classList.remove('active');
        }

        // Remover classe 'active' de todas as seções
        for (var j = 0; j < elements.sections.length; j++) {
            elements.sections[j].classList.remove('active');
        }

        // Adicionar classe 'active' ao item clicado
        var clickedItem = document.querySelector('.admin-nav-item[data-section="' + sectionName + '"]');
        if (clickedItem) {
            clickedItem.classList.add('active');
        }

        // Adicionar classe 'active' à seção correspondente
        var targetSection = document.getElementById('section-' + sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    /**
     * Configura event listeners para navegação
     */
    function setupNavigation() {
        for (var i = 0; i < elements.navItems.length; i++) {
            elements.navItems[i].addEventListener('click', function() {
                var sectionName = this.getAttribute('data-section');
                navigateToSection(sectionName);
            });
        }
    }

    /**
     * Inicializa a página admin
     */
    function init() {
        // Inicializar elementos
        initElements();

        // Verificar se Auth está disponível
        if (!window.Auth) {
            console.error('Módulo Auth não foi carregado!');
            return;
        }

        // Atualizar view baseado no estado de autenticação
        updateView();

        // Event listeners
        if (elements.loginForm) {
            elements.loginForm.addEventListener('submit', handleLogin);
        }

        if (elements.logoutBtn) {
            elements.logoutBtn.addEventListener('click', handleLogout);
        }

        // Configurar navegação entre seções
        setupNavigation();

        console.info('[ADMIN] Página administrativa inicializada');
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
