/**
 * auth.js
 * Sistema de autenticação
 * Compatível com IE10+
 */

(function(window) {
    'use strict';

    var Auth = {
        // Credenciais hardcoded (conforme guideline)
        ADMIN_USER: 'admin',
        ADMIN_PASS: 'autP58x',
        SESSION_KEY: 'damper_auth_session'
    };

    /**
     * Realiza login do usuário
     * @param {string} username - Nome de usuário
     * @param {string} password - Senha
     * @returns {boolean} True se login bem-sucedido
     */
    Auth.login = function(username, password) {
        if (username === Auth.ADMIN_USER && password === Auth.ADMIN_PASS) {
            // Salvar sessão
            sessionStorage.setItem(Auth.SESSION_KEY, JSON.stringify({
                user: username,
                timestamp: new Date().getTime()
            }));
            return true;
        }
        return false;
    };

    /**
     * Realiza logout do usuário
     */
    Auth.logout = function() {
        sessionStorage.removeItem(Auth.SESSION_KEY);
    };

    /**
     * Verifica se usuário está autenticado
     * @returns {boolean} True se autenticado
     */
    Auth.isAuthenticated = function() {
        var session = sessionStorage.getItem(Auth.SESSION_KEY);
        if (!session) return false;
        
        try {
            var sessionData = JSON.parse(session);
            // Validar se sessão ainda é válida (opcional: adicionar expiração)
            return sessionData && sessionData.user === Auth.ADMIN_USER;
        } catch (e) {
            return false;
        }
    };

    /**
     * Protege página - redireciona se não autenticado
     * @param {string} redirectUrl - URL para redirecionar se não autenticado
     */
    Auth.requireAuth = function(redirectUrl) {
        if (!Auth.isAuthenticated()) {
            window.location.href = redirectUrl || 'admin.html';
            return false;
        }
        return true;
    };

    /**
     * Obtém dados da sessão atual
     * @returns {Object|null} Dados da sessão ou null
     */
    Auth.getSession = function() {
        var session = sessionStorage.getItem(Auth.SESSION_KEY);
        if (!session) return null;
        
        try {
            return JSON.parse(session);
        } catch (e) {
            return null;
        }
    };

    // Expor Auth globalmente
    window.Auth = Auth;

})(window);
