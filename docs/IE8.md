# Guia de Adaptação para Internet Explorer 8

## ⚠️ AVISO IMPORTANTE

**Este guia é apenas para cenários extremos onde seja absolutamente impossível atualizar para IE10/IE11.**

- **Recomendação oficial:** Atualizar para IE10 ou IE11 (10 minutos de instalação)
- **Alternativa:** Este guia (~2-3 dias de trabalho)
- **Trade-off:** Código +50% maior, mais lento, mais difícil de manter

---

## 📊 Resumo Executivo

### ❌ Recursos Não Suportados no IE8

| Recurso | IE8 | IE10 | Usado no Projeto? |
|---------|-----|------|-------------------|
| `localStorage` | ⚠️ Parcial/Bugado | ✅ Sim | ✅ Sim (crítico) |
| `sessionStorage` | ❌ Não | ✅ Sim | ✅ Sim (auth) |
| `classList` | ❌ Não | ✅ Sim | ✅ Sim |
| `addEventListener` | ❌ Não (`attachEvent`) | ✅ Sim | ✅ Sim |
| `querySelectorAll` | ⚠️ Bugado | ✅ Sim | ✅ Sim |
| `XMLHttpRequest` Level 2 | ❌ Parcial | ✅ Sim | ✅ Sim (api.js) |
| `JSON` nativo | ⚠️ Bugado | ✅ Sim | ✅ Sim |
| `border-radius` | ❌ Não | ✅ Sim | ✅ Sim (visual) |
| `box-shadow` | ❌ Não | ✅ Sim | ✅ Sim (visual) |
| `opacity` | ❌ Não (filter) | ✅ Sim | ✅ Sim |
| `transition` | ❌ Não | ✅ Sim | ✅ Sim (UX) |

---

## 🛠️ Modificações Necessárias

### 1. Polyfills Adicionais (Críticos)

#### 1.1. JSON2.js
```javascript
// Adicionar antes de polyfills.js
<script src="js/vendor/json2.min.js"></script>
```
**Download:** https://github.com/douglascrockford/JSON-js/blob/master/json2.js

#### 1.2. localStorage Shim
```javascript
// Fallback para cookies se localStorage não funcionar
if (!window.localStorage) {
  window.localStorage = {
    getItem: function(key) {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var pair = cookies[i].split('=');
        if (pair[0].trim() === key) {
          return decodeURIComponent(pair[1]);
        }
      }
      return null;
    },
    setItem: function(key, value) {
      var expires = new Date();
      expires.setDate(expires.getDate() + 365);
      document.cookie = key + '=' + encodeURIComponent(value) + 
                       '; expires=' + expires.toUTCString() + '; path=/';
    },
    removeItem: function(key) {
      document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  };
}
```

#### 1.3. sessionStorage Shim (usar cookies)
```javascript
if (!window.sessionStorage) {
  window.sessionStorage = {
    _data: {},
    getItem: function(key) {
      return this._data[key] || null;
    },
    setItem: function(key, value) {
      this._data[key] = String(value);
    },
    removeItem: function(key) {
      delete this._data[key];
    },
    clear: function() {
      this._data = {};
    }
  };
}
```

#### 1.4. addEventListener Polyfill
```javascript
// Já está parcialmente em polyfills.js, melhorar:
(function() {
  if (!Element.prototype.addEventListener) {
    var eventListeners = [];
    
    Element.prototype.addEventListener = function(type, listener, useCapture) {
      var self = this;
      var wrapper = function(e) {
        e.target = e.srcElement;
        e.currentTarget = self;
        if (listener.handleEvent) {
          listener.handleEvent(e);
        } else {
          listener.call(self, e);
        }
      };
      
      if (type === 'DOMContentLoaded') {
        var wrapper2 = function(e) {
          if (document.readyState === 'complete') {
            wrapper(e);
          }
        };
        document.attachEvent('onreadystatechange', wrapper2);
        eventListeners.push({
          object: this, 
          type: type, 
          listener: listener, 
          wrapper: wrapper2
        });
      } else {
        this.attachEvent('on' + type, wrapper);
        eventListeners.push({
          object: this, 
          type: type, 
          listener: listener, 
          wrapper: wrapper
        });
      }
    };
    
    Element.prototype.removeEventListener = function(type, listener, useCapture) {
      var counter = 0;
      while (counter < eventListeners.length) {
        var eventListener = eventListeners[counter];
        if (eventListener.object === this && 
            eventListener.type === type && 
            eventListener.listener === listener) {
          if (type === 'DOMContentLoaded') {
            this.detachEvent('onreadystatechange', eventListener.wrapper);
          } else {
            this.detachEvent('on' + type, eventListener.wrapper);
          }
          eventListeners.splice(counter, 1);
          break;
        }
        ++counter;
      }
    };
  }
})();
```

#### 1.5. ES5-shim (Completo)
**Biblioteca recomendada:** https://github.com/es-shims/es5-shim

```html
<script src="js/vendor/es5-shim.min.js"></script>
<script src="js/vendor/es5-sham.min.js"></script>
```

---

### 2. Modificações no Código JavaScript

#### 2.1. search.js - Máscara de Data

**Antes (IE10+):**
```javascript
element.addEventListener('input', function() {
  // código
});
```

**Depois (IE8):**
```javascript
// IE8 não tem evento 'input', usar 'keyup' + 'propertychange'
if (element.attachEvent) {
  element.attachEvent('onkeyup', mascaraData);
  element.attachEvent('onpropertychange', mascaraData);
} else {
  element.addEventListener('input', mascaraData, false);
}
```

#### 2.2. Substituir querySelectorAll bugado

**Antes:**
```javascript
var elements = document.querySelectorAll('.my-class');
```

**Depois (IE8 seguro):**
```javascript
// Usar jQuery (se adicionar) ou getElementsByClassName
var elements = document.getElementsByClassName('my-class');
// Ou seletor por ID sempre que possível
```

#### 2.3. XMLHttpRequest - Usar ActiveX Fallback

**Modificar api.js:**
```javascript
function createXHR() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  }
  // IE8 fallback
  try {
    return new ActiveXObject('Msxml2.XMLHTTP.6.0');
  } catch (e1) {
    try {
      return new ActiveXObject('Msxml2.XMLHTTP.3.0');
    } catch (e2) {
      try {
        return new ActiveXObject('Microsoft.XMLHTTP');
      } catch (e3) {
        throw new Error('Este navegador não suporta AJAX');
      }
    }
  }
}
```

#### 2.4. auth.js - Substituir sessionStorage

**Antes:**
```javascript
sessionStorage.setItem('damper_auth_session', JSON.stringify(session));
```

**Depois (com shim):**
```javascript
// Com o shim acima, continua funcionando
// Mas testar se está funcionando corretamente
```

#### 2.5. admin.js e search.js - Testar localStorage

**Adicionar validação:**
```javascript
function testLocalStorage() {
  try {
    var test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch(e) {
    console.warn('localStorage não funcional, usando fallback cookies');
    return false;
  }
}

// Usar no início do script
if (!testLocalStorage()) {
  // Usar cookie fallback
}
```

---

### 3. Modificações no CSS

#### 3.1. Remover/Substituir Propriedades Modernas

**main.css:**

```css
/* ANTES (IE10+) */
.box {
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  opacity: 0.9;
  transition: all 0.3s ease;
}

/* DEPOIS (IE8) */
.box {
  /* border-radius: NÃO suportado - remover ou aceitar bordas quadradas */
  /* box-shadow: NÃO suportado - remover */
  
  /* opacity: usar filter */
  opacity: 0.9;
  filter: alpha(opacity=90); /* IE8 */
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=90)"; /* IE8 */
  
  /* transition: NÃO suportado - remover ou aceitar sem animação */
}

/* Hover sem transition */
.box:hover {
  opacity: 1;
  filter: alpha(opacity=100);
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
}
```

#### 3.2. Evitar nth-child (bugado no IE8)

**Antes:**
```css
.list-item:nth-child(odd) {
  background-color: #f0f0f0;
}
```

**Depois:**
```css
/* Adicionar classes manualmente via JavaScript */
.list-item-odd {
  background-color: #f0f0f0;
}
```

#### 3.3. RGBa para IE8

```css
/* ANTES */
background-color: rgba(0, 0, 0, 0.5);

/* DEPOIS */
background-color: rgb(0, 0, 0); /* Fallback sólido */
background-color: rgba(0, 0, 0, 0.5); /* IE9+ */
filter: progid:DXImageTransform.Microsoft.gradient(
  startColorstr=#80000000, endColorstr=#80000000
); /* IE8 (80 = 50% opacity em hex) */
```

---

### 4. Estrutura de Carregamento de Scripts

**Ordem crítica para IE8:**

```html
<!-- 1. JSON2 (PRIMEIRO) -->
<script src="js/vendor/json2.min.js"></script>

<!-- 2. ES5-shim -->
<script src="js/vendor/es5-shim.min.js"></script>
<script src="js/vendor/es5-sham.min.js"></script>

<!-- 3. Polyfills customizados -->
<script src="js/polyfills.js"></script>

<!-- 4. localStorage/sessionStorage shims -->
<script src="js/ie8-storage-shim.js"></script>

<!-- 5. Resto dos scripts normais -->
<script src="js/utils.js"></script>
<script src="js/api.js"></script>
<script src="js/search.js"></script>
```

---

## 📋 Checklist de Modificações

### JavaScript Files

- [ ] **js/vendor/** (novo diretório)
  - [ ] Adicionar json2.min.js
  - [ ] Adicionar es5-shim.min.js
  - [ ] Adicionar es5-sham.min.js

- [ ] **js/ie8-storage-shim.js** (novo)
  - [ ] Implementar localStorage fallback
  - [ ] Implementar sessionStorage fallback

- [ ] **js/polyfills.js** (modificar)
  - [ ] Melhorar addEventListener polyfill
  - [ ] Adicionar removeEventListener completo
  - [ ] Adicionar compatibilidade com attachEvent

- [ ] **js/api.js** (modificar)
  - [ ] Substituir XMLHttpRequest por createXHR() com ActiveX fallback
  - [ ] Testar CORS no IE8 (pode não funcionar)

- [ ] **js/search.js** (modificar)
  - [ ] Substituir evento 'input' por 'keyup' + 'propertychange'
  - [ ] Validar localStorage com try/catch
  - [ ] Substituir querySelectorAll por getElementById quando possível

- [ ] **js/admin.js** (modificar)
  - [ ] Validar localStorage funcionamento
  - [ ] Adicionar fallback para cookies se necessário
  - [ ] Testar CRUD completo

- [ ] **js/auth.js** (modificar)
  - [ ] Testar sessionStorage shim
  - [ ] Validar expiração de sessão

- [ ] **js/utils.js** (modificar)
  - [ ] Adicionar função createXHR()
  - [ ] Adicionar detectores de funcionalidade

### CSS Files

- [ ] **css/main.css** (modificar)
  - [ ] Substituir `opacity` por `opacity + filter`
  - [ ] Remover/comentar `border-radius`
  - [ ] Remover/comentar `box-shadow`
  - [ ] Remover/comentar `transition`
  - [ ] Converter `rgba()` para `rgb() + filter`

- [ ] **css/search.css** (modificar)
  - [ ] Aplicar mudanças de opacity
  - [ ] Testar layout sem border-radius

- [ ] **css/admin.css** (modificar)
  - [ ] Aplicar mudanças de opacity
  - [ ] Validar modal sem box-shadow

### HTML Files

- [ ] **index.html** (modificar)
  - [ ] Adicionar scripts vendor (json2, es5-shim)
  - [ ] Adicionar ie8-storage-shim.js
  - [ ] Atualizar ordem de carregamento

- [ ] **admin.html** (modificar)
  - [ ] Adicionar scripts vendor
  - [ ] Adicionar ie8-storage-shim.js
  - [ ] Atualizar ordem de carregamento

---

## 🧪 Testes Necessários (IE8)

### Funcionalidades Críticas

- [ ] **localStorage funciona ou usa fallback cookies**
- [ ] **sessionStorage funciona ou usa fallback em memória**
- [ ] **Máscara de data funciona (keyup + propertychange)**
- [ ] **Select Tag carrega opções do localStorage**
- [ ] **Formulário valida campos corretamente**
- [ ] **Login/Logout funcionam**
- [ ] **CRUD admin funciona (Create, Read, Update, Delete)**
- [ ] **Modal de confirmação abre e fecha**
- [ ] **Paginação funciona**
- [ ] **AJAX (XMLHttpRequest) funciona com backend**

### Visual

- [ ] **Layout não quebra em 1024x768**
- [ ] **Cores e opacidade renderizam (com filter)**
- [ ] **Botões têm estados hover (sem transition)**
- [ ] **Tabelas são legíveis**
- [ ] **Formulários são acessíveis**

---

## 📊 Estimativa de Esforço

| Tarefa | Tempo Estimado |
|--------|----------------|
| Download e setup de bibliotecas vendor | 1 hora |
| Implementar storage shims | 2-3 horas |
| Modificar polyfills.js | 2 horas |
| Modificar api.js (XMLHttpRequest) | 1-2 horas |
| Modificar search.js (eventos) | 2-3 horas |
| Modificar admin.js (validações) | 2 horas |
| Modificar auth.js | 1 hora |
| Modificar CSS (opacity, remover moderno) | 3-4 horas |
| Atualizar HTMLs (ordem scripts) | 30 min |
| Testes completos em IE8 | 4-6 horas |
| Correção de bugs encontrados | 4-8 horas |
| **TOTAL** | **~2-3 dias** |

---

## ⚠️ Limitações Conhecidas (IE8)

### Visual
- ❌ Sem bordas arredondadas (`border-radius`)
- ❌ Sem sombras (`box-shadow`)
- ❌ Sem transições suaves (`transition`)
- ⚠️ Opacidade via `filter` (pode ter performance ruim)

### Funcional
- ⚠️ localStorage pode ser lento/bugado (usar cookies fallback)
- ⚠️ sessionStorage não existe (usar objeto em memória)
- ❌ CORS pode não funcionar (limitação do IE8)
- ⚠️ Performance geral ~30% mais lenta

### Desenvolvimento
- ❌ Console.log pode causar crashes
- ❌ Debugging mais difícil
- ❌ Código +50% maior (polyfills)
- ❌ Manutenção muito mais complexa

---

## 🎯 Recomendação Final

### Cenário A: Atualizar IE (RECOMENDADO)
- **Tempo:** 10 minutos
- **Custo:** $0 (gratuito)
- **Esforço:** Baixíssimo
- **Resultado:** 100% funcional como planejado

### Cenário B: Adaptar para IE8 (ÚLTIMO RECURSO)
- **Tempo:** 2-3 dias de trabalho
- **Custo:** Alto (horas de desenvolvimento)
- **Esforço:** Alto
- **Resultado:** Funcional mas com limitações visuais e de performance

---

## 📚 Recursos Externos

### Bibliotecas Necessárias
- JSON2: https://github.com/douglascrockford/JSON-js
- ES5-shim: https://github.com/es-shims/es5-shim
- Polyfills.io: https://polyfill.io (pode gerar bundle customizado para IE8)

### Documentação
- IE8 Compatibility: https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/
- Can I Use IE8: https://caniuse.com/?browsers=ie%208

### Ferramentas
- IETester (teste múltiplas versões IE)
- BrowserStack (teste em cloud)

---

**Última atualização:** Abril 2026  
**Autor:** Equipe DamperReport  
**Versão:** 1.0.0 (Guia de Contingência IE8)
