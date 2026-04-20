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
        SESSION_KEY: 'damper_auth_session',
        SESSION_TIMEOUT: 3600000 // 1 hora em milissegundos
    };

    /**
     * Realiza login do usuário
     * @param {string} username - Nome de usuário
     * @param {string} password - Senha
     * @returns {Object} Objeto com sucesso e mensagem
     */
    Auth.login = function(username, password) {
        // Validar campos obrigatórios
        if (!username || !password) {
            return {
                success: false,
                message: 'Usuário e senha são obrigatórios'
            };
        }

        if (username === Auth.ADMIN_USER && password === Auth.ADMIN_PASS) {
            // Salvar sessão com tempo de expiração
            try {
                sessionStorage.setItem(Auth.SESSION_KEY, JSON.stringify({
                    user: username,
                    loginTime: new Date().getTime(),
                    expiresAt: new Date().getTime() + Auth.SESSION_TIMEOUT
                }));
                return {
                    success: true,
                    message: 'Login realizado com sucesso'
                };
            } catch (e) {
                console.error('Erro ao salvar sessão:', e);
                return {
                    success: false,
                    message: 'Erro ao criar sessão. Verifique se cookies/storage estão habilitados.'
                };
            }
        }
        return {
            success: false,
            message: 'Usuário ou senha inválidos'
        };
    };

    /**
     * Realiza logout do usuário
     */
    Auth.logout = function() {
        try {
            sessionStorage.removeItem(Auth.SESSION_KEY);
            return {
                success: true,
                message: 'Logout realizado com sucesso'
            };
        } catch (e) {
            console.error('Erro ao fazer logout:', e);
            return {
                success: false,
                message: 'Erro ao fazer logout'
            };
        }
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
            var now = new Date().getTime();
            
            // Verificar se sessão expirou
            if (sessionData.expiresAt && now > sessionData.expiresAt) {
                // Sessão expirada, remover
                Auth.logout();
                return false;
            }
            
            // Validar se sessão ainda é válida
            return sessionData && sessionData.user === Auth.ADMIN_USER;
        } catch (e) {
            console.error('Erro ao verificar autenticação:', e);
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
        if (!Auth.isAuthenticated()) {
            return null;
        }
        
        var session = sessionStorage.getItem(Auth.SESSION_KEY);
        if (!session) return null;
        
        try {
            return JSON.parse(session);
        } catch (e) {
            console.error('Erro ao obter sessão:', e);
            return null;
        }
    };

    /**
     * Renova a sessão, estendendo o tempo de expiração
     * @returns {Object} Objeto com sucesso e mensagem
     */
    Auth.renewSession = function() {
        if (!Auth.isAuthenticated()) {
            return {
                success: false,
                message: 'Usuário não autenticado'
            };
        }

        try {
            var sessionData = Auth.getSession();
            if (!sessionData) {
                return {
                    success: false,
                    message: 'Sessão inválida'
                };
            }
            
            // Atualizar tempo de expiração
            sessionData.expiresAt = new Date().getTime() + Auth.SESSION_TIMEOUT;
            
            sessionStorage.setItem(Auth.SESSION_KEY, JSON.stringify(sessionData));

            return {
                success: true,
                message: 'Sessão renovada'
            };
        } catch (e) {
            console.error('Erro ao renovar sessão:', e);
            return {
                success: false,
                message: 'Erro ao renovar sessão'
            };
        }
    };

    // Expor Auth globalmente
    window.Auth = Auth;

})(window);
