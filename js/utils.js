/**
 * utils.js
 * Funções utilitárias para o DamperReport
 * Compatível com IE10+
 */

(function(window) {
    'use strict';

    // Namespace para utilitários
    var Utils = {};

    /**
     * Formata uma data para o padrão brasileiro (DD/MM/YYYY)
     * @param {string|Date} dateString - String de data ou objeto Date
     * @returns {string} Data formatada
     */
    Utils.formatDate = function(dateString) {
        if (!dateString) return '';
        
        var date = typeof dateString === 'string' ? new Date(dateString) : dateString;
        
        if (isNaN(date.getTime())) return dateString;
        
        var day = ('0' + date.getDate()).slice(-2);
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();
        
        return day + '/' + month + '/' + year;
    };

    /**
     * Valida um endereço de email
     * @param {string} email - Email para validar
     * @returns {boolean} True se válido
     */
    Utils.validateEmail = function(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    /**
     * Sanitiza input removendo caracteres perigosos
     * @param {string} input - String para sanitizar
     * @returns {string} String sanitizada
     */
    Utils.sanitizeInput = function(input) {
        if (typeof input !== 'string') return input;
        
        var div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    };

    /**
     * Exibe uma mensagem de feedback ao usuário
     * @param {string} message - Mensagem a exibir
     * @param {string} type - Tipo: 'success', 'error', 'warning', 'info'
     * @param {number} duration - Duração em ms (0 = permanente)
     */
    Utils.showMessage = function(message, type, duration) {
        type = type || 'info';
        duration = duration || 5000;
        
        // Remove mensagens anteriores
        var existingMessages = document.querySelectorAll('.message');
        for (var i = 0; i < existingMessages.length; i++) {
            existingMessages[i].parentNode.removeChild(existingMessages[i]);
        }
        
        var messageDiv = document.createElement('div');
        messageDiv.className = 'message message-' + type;
        messageDiv.textContent = message;
        
        var mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.insertBefore(messageDiv, mainContent.firstChild);
            
            if (duration > 0) {
                setTimeout(function() {
                    if (messageDiv.parentNode) {
                        messageDiv.parentNode.removeChild(messageDiv);
                    }
                }, duration);
            }
        }
    };

    /**
     * Debounce - Limita a frequência de execução de uma função
     * @param {Function} func - Função a ser executada
     * @param {number} delay - Delay em ms
     * @returns {Function} Função com debounce
     */
    Utils.debounce = function(func, delay) {
        var timeoutId;
        return function() {
            var context = this;
            var args = arguments;
            
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function() {
                func.apply(context, args);
            }, delay);
        };
    };

    /**
     * Mostra ou oculta um elemento
     * @param {string|Element} selector - Seletor CSS ou elemento
     * @param {boolean} show - True para mostrar, false para ocultar
     */
    Utils.toggleElement = function(selector, show) {
        var element = typeof selector === 'string' ? 
            document.querySelector(selector) : selector;
        
        if (!element) return;
        
        if (show === undefined) {
            // Toggle
            if (element.classList) {
                element.classList.toggle('hidden');
            } else {
                var classes = element.className.split(' ');
                var index = classes.indexOf('hidden');
                if (index > -1) {
                    classes.splice(index, 1);
                } else {
                    classes.push('hidden');
                }
                element.className = classes.join(' ');
            }
        } else {
            // Mostrar ou ocultar
            if (show) {
                if (element.classList) {
                    element.classList.remove('hidden');
                } else {
                    element.className = element.className.replace(/\bhidden\b/g, '').trim();
                }
            } else {
                if (element.classList) {
                    element.classList.add('hidden');
                } else {
                    if (element.className.indexOf('hidden') === -1) {
                        element.className += ' hidden';
                    }
                }
            }
        }
    };

    /**
     * Extrai dados de um formulário
     * @param {string|Element} formSelector - Seletor CSS ou elemento do formulário
     * @returns {Object} Objeto com os dados do formulário
     */
    Utils.getFormData = function(formSelector) {
        var form = typeof formSelector === 'string' ? 
            document.querySelector(formSelector) : formSelector;
        
        if (!form) return {};
        
        var data = {};
        var elements = form.elements;
        
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var name = element.name;
            var type = element.type;
            
            if (!name || element.disabled) continue;
            
            if (type === 'checkbox') {
                data[name] = element.checked;
            } else if (type === 'radio') {
                if (element.checked) {
                    data[name] = element.value;
                }
            } else if (type !== 'button' && type !== 'submit' && type !== 'reset') {
                data[name] = element.value;
            }
        }
        
        return data;
    };

    /**
     * Limpa um formulário
     * @param {string|Element} formSelector - Seletor CSS ou elemento do formulário
     */
    Utils.clearForm = function(formSelector) {
        var form = typeof formSelector === 'string' ? 
            document.querySelector(formSelector) : formSelector;
        
        if (!form) return;
        
        if (typeof form.reset === 'function') {
            form.reset();
        } else {
            var elements = form.elements;
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                var type = element.type;
                
                if (type === 'checkbox' || type === 'radio') {
                    element.checked = false;
                } else if (type !== 'button' && type !== 'submit' && type !== 'reset') {
                    element.value = '';
                }
            }
        }
    };

    /**
     * Valida se uma data está no formato válido
     * @param {string} dateString - String de data
     * @returns {boolean} True se válida
     */
    Utils.isValidDate = function(dateString) {
        if (!dateString) return false;
        var date = new Date(dateString);
        return !isNaN(date.getTime());
    };

    /**
     * Compara duas datas
     * @param {string} date1 - Primeira data
     * @param {string} date2 - Segunda data
     * @returns {number} Negativo se date1 < date2, positivo se date1 > date2, 0 se iguais
     */
    Utils.compareDates = function(date1, date2) {
        var d1 = new Date(date1);
        var d2 = new Date(date2);
        return d1.getTime() - d2.getTime();
    };

    // Expor Utils globalmente
    window.Utils = Utils;

})(window);
