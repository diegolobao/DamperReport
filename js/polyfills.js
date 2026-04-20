/**
 * polyfills.js
 * Polyfills para compatibilidade com IE10
 * Este arquivo deve ser carregado PRIMEIRO antes de qualquer outro script
 */

(function() {
    'use strict';

    // ========================================================================
    // Promise Polyfill (IE10 não suporta Promises)
    // ========================================================================
    if (typeof Promise === 'undefined') {
        // Implementação simplificada de Promise
        // Em produção, considere usar um polyfill completo como es6-promise
        window.Promise = function() {
            console.warn('Promise polyfill não implementado completamente. Use XMLHttpRequest ou adicione biblioteca externa.');
        };
    }

    // ========================================================================
    // Object.assign Polyfill (IE10 não suporta)
    // ========================================================================
    if (typeof Object.assign !== 'function') {
        Object.assign = function(target) {
            if (target === null || target === undefined) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource !== null && nextSource !== undefined) {
                    for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        };
    }

    // ========================================================================
    // Array.prototype.forEach Polyfill
    // ========================================================================
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(callback, thisArg) {
            if (this === null || this === undefined) {
                throw new TypeError('Array.prototype.forEach called on null or undefined');
            }
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            var T, k;
            var O = Object(this);
            var len = O.length >>> 0;

            if (arguments.length > 1) {
                T = thisArg;
            }

            k = 0;
            while (k < len) {
                var kValue;
                if (k in O) {
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                }
                k++;
            }
        };
    }

    // ========================================================================
    // Array.prototype.map Polyfill
    // ========================================================================
    if (!Array.prototype.map) {
        Array.prototype.map = function(callback, thisArg) {
            if (this === null || this === undefined) {
                throw new TypeError('Array.prototype.map called on null or undefined');
            }
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            var T, A, k;
            var O = Object(this);
            var len = O.length >>> 0;

            if (arguments.length > 1) {
                T = thisArg;
            }

            A = new Array(len);
            k = 0;

            while (k < len) {
                var kValue, mappedValue;
                if (k in O) {
                    kValue = O[k];
                    mappedValue = callback.call(T, kValue, k, O);
                    A[k] = mappedValue;
                }
                k++;
            }

            return A;
        };
    }

    // ========================================================================
    // Array.prototype.filter Polyfill
    // ========================================================================
    if (!Array.prototype.filter) {
        Array.prototype.filter = function(callback, thisArg) {
            if (this === null || this === undefined) {
                throw new TypeError('Array.prototype.filter called on null or undefined');
            }
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            var T, k;
            var O = Object(this);
            var len = O.length >>> 0;
            var res = [];
            var resLength = 0;

            if (arguments.length > 1) {
                T = thisArg;
            }

            k = 0;
            while (k < len) {
                var kValue;
                if (k in O) {
                    kValue = O[k];
                    if (callback.call(T, kValue, k, O)) {
                        res[resLength++] = kValue;
                    }
                }
                k++;
            }

            return res;
        };
    }

    // ========================================================================
    // Array.prototype.indexOf Polyfill
    // ========================================================================
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(searchElement, fromIndex) {
            var k;
            if (this === null || this === undefined) {
                throw new TypeError('Array.prototype.indexOf called on null or undefined');
            }

            var O = Object(this);
            var len = O.length >>> 0;

            if (len === 0) {
                return -1;
            }

            var n = fromIndex | 0;

            if (n >= len) {
                return -1;
            }

            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            while (k < len) {
                if (k in O && O[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };
    }

    // ========================================================================
    // classList Polyfill (IE10-IE11 tem suporte parcial)
    // ========================================================================
    if (!('classList' in document.createElement('_'))) {
        (function(view) {
            if (!('Element' in view)) return;

            var classListProp = 'classList',
                protoProp = 'prototype',
                elemCtrProto = view.Element[protoProp],
                objCtr = Object,
                strTrim = String[protoProp].trim || function() {
                    return this.replace(/^\s+|\s+$/g, '');
                },
                arrIndexOf = Array[protoProp].indexOf || function(item) {
                    var i = 0,
                        len = this.length;
                    for (; i < len; i++) {
                        if (i in this && this[i] === item) {
                            return i;
                        }
                    }
                    return -1;
                },
                DOMEx = function(type, message) {
                    this.name = type;
                    this.code = DOMException[type];
                    this.message = message;
                },
                checkTokenAndGetIndex = function(classList, token) {
                    if (token === '') {
                        throw new DOMEx('SYNTAX_ERR', 'An invalid or illegal string was specified');
                    }
                    if (/\s/.test(token)) {
                        throw new DOMEx('INVALID_CHARACTER_ERR', 'String contains an invalid character');
                    }
                    return arrIndexOf.call(classList, token);
                },
                ClassList = function(elem) {
                    var trimmedClasses = strTrim.call(elem.getAttribute('class') || ''),
                        classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
                        i = 0,
                        len = classes.length;
                    for (; i < len; i++) {
                        this.push(classes[i]);
                    }
                    this._updateClassName = function() {
                        elem.setAttribute('class', this.toString());
                    };
                },
                classListProto = ClassList[protoProp] = [],
                classListGetter = function() {
                    return new ClassList(this);
                };

            DOMEx[protoProp] = Error[protoProp];

            classListProto.item = function(i) {
                return this[i] || null;
            };

            classListProto.contains = function(token) {
                return checkTokenAndGetIndex(this, token + '') !== -1;
            };

            classListProto.add = function() {
                var tokens = arguments,
                    i = 0,
                    l = tokens.length,
                    token,
                    updated = false;
                do {
                    token = tokens[i] + '';
                    if (checkTokenAndGetIndex(this, token) === -1) {
                        this.push(token);
                        updated = true;
                    }
                }
                while (++i < l);

                if (updated) {
                    this._updateClassName();
                }
            };

            classListProto.remove = function() {
                var tokens = arguments,
                    i = 0,
                    l = tokens.length,
                    token,
                    updated = false,
                    index;
                do {
                    token = tokens[i] + '';
                    index = checkTokenAndGetIndex(this, token);
                    while (index !== -1) {
                        this.splice(index, 1);
                        updated = true;
                        index = checkTokenAndGetIndex(this, token);
                    }
                }
                while (++i < l);

                if (updated) {
                    this._updateClassName();
                }
            };

            classListProto.toggle = function(token, force) {
                token += '';

                var result = this.contains(token),
                    method = result ? force !== true && 'remove' : force !== false && 'add';

                if (method) {
                    this[method](token);
                }

                if (force === true || force === false) {
                    return force;
                } else {
                    return !result;
                }
            };

            classListProto.toString = function() {
                return this.join(' ');
            };

            if (objCtr.defineProperty) {
                var classListPropDesc = {
                    get: classListGetter,
                    enumerable: true,
                    configurable: true
                };
                try {
                    objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                } catch (ex) {
                    if (ex.number === -0x7FF5EC54) {
                        classListPropDesc.enumerable = false;
                        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                    }
                }
            }
        }(window));
    }

    // ========================================================================
    // Console Polyfill (para IE sem DevTools aberto)
    // ========================================================================
    if (!window.console) {
        window.console = {
            log: function() {},
            warn: function() {},
            error: function() {},
            info: function() {},
            debug: function() {}
        };
    }

    console.log('Polyfills carregados com sucesso para IE10 compatibilidade.');

})();
