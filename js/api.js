/**
 * api.js
 * Módulo centralizado para comunicação com API REST
 * Compatível com IE10+ usando XMLHttpRequest
 */

(function(window) {
    'use strict';

    var API = {
        baseURL: '/api', // Configurar URL base da API
        timeout: 30000 // 30 segundos
    };

    /**
     * Requisição genérica para a API
     * @param {string} method - Método HTTP (GET, POST, PUT, DELETE)
     * @param {string} endpoint - Endpoint da API (ex: '/reports')
     * @param {Object} data - Dados para enviar (opcional)
     * @param {Function} successCallback - Callback de sucesso
     * @param {Function} errorCallback - Callback de erro
     */
    API.request = function(method, endpoint, data, successCallback, errorCallback) {
        var xhr = new XMLHttpRequest();
        var url = API.baseURL + endpoint;
        
        // Adiciona query string para GET
        if (method === 'GET' && data) {
            var params = [];
            for (var key in data) {
                if (data.hasOwnProperty(key) && data[key] !== null && data[key] !== undefined) {
                    params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
                }
            }
            if (params.length > 0) {
                url += '?' + params.join('&');
            }
        }
        
        xhr.open(method, url, true);
        
        // Headers
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        
        // Timeout
        xhr.timeout = API.timeout;
        
        // Handler de timeout
        xhr.ontimeout = function() {
            if (errorCallback) {
                errorCallback({
                    status: 0,
                    message: 'Tempo de requisição esgotado. Tente novamente.'
                });
            }
        };
        
        // Handler de erro de rede
        xhr.onerror = function() {
            if (errorCallback) {
                errorCallback({
                    status: 0,
                    message: 'Erro de rede. Verifique sua conexão.'
                });
            }
        };
        
        // Handler de resposta
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var response;
                
                try {
                    response = JSON.parse(xhr.responseText);
                } catch (e) {
                    response = { message: xhr.responseText };
                }
                
                if (xhr.status >= 200 && xhr.status < 300) {
                    // Sucesso
                    if (successCallback) {
                        successCallback(response);
                    }
                } else {
                    // Erro HTTP
                    if (errorCallback) {
                        errorCallback({
                            status: xhr.status,
                            message: response.message || 'Erro ao processar requisição.',
                            data: response
                        });
                    }
                }
            }
        };
        
        // Envia requisição
        try {
            if (method === 'GET' || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        } catch (e) {
            if (errorCallback) {
                errorCallback({
                    status: 0,
                    message: 'Erro ao enviar requisição: ' + e.message
                });
            }
        }
    };

    /**
     * Wrapper para requisição GET
     */
    API.get = function(endpoint, params, successCallback, errorCallback) {
        API.request('GET', endpoint, params, successCallback, errorCallback);
    };

    /**
     * Wrapper para requisição POST
     */
    API.post = function(endpoint, data, successCallback, errorCallback) {
        API.request('POST', endpoint, data, successCallback, errorCallback);
    };

    /**
     * Wrapper para requisição PUT
     */
    API.put = function(endpoint, data, successCallback, errorCallback) {
        API.request('PUT', endpoint, data, successCallback, errorCallback);
    };

    /**
     * Wrapper para requisição DELETE
     */
    API.delete = function(endpoint, successCallback, errorCallback) {
        API.request('DELETE', endpoint, null, successCallback, errorCallback);
    };

    // Expor API globalmente
    window.API = API;

})(window);
