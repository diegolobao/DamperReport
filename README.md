# DamperReport - Frontend

Sistema de busca e gerenciamento de relatórios com compatibilidade **Internet Explorer 10** e **Windows Server 2008**.

**Ambiente alvo:** Micro Desktop | **Resolução mínima:** 1024x768

---

## 📁 Estrutura do Projeto

```
DamperReport/
├── index.html                  # Página inicial (busca de relatórios)
├── admin.html                  # Página administrativa (CRUD)
├── css/
│   ├── normalize.css          # Reset CSS para compatibilidade cross-browser
│   ├── main.css               # Estilos globais (layout, botões, tabelas)
│   ├── search.css             # Estilos específicos da página de busca
│   └── admin.css              # Estilos específicos da página admin
├── js/
│   ├── polyfills.js           # Polyfills para IE10 (DEVE SER CARREGADO PRIMEIRO)
│   ├── utils.js               # Funções utilitárias (formatação, validação)
│   ├── api.js                 # Módulo de comunicação com API REST
│   ├── search.js              # Lógica da página de busca
│   ├── admin.js               # Lógica da página administrativa
│   └── auth.js                # Sistema de autenticação
├── assets/
│   └── images/                # Imagens e ícones do sistema
├── docs/
│   └── compatibility.md       # Documentação de compatibilidade IE10
├── guideline_frontend.md      # Guidelines do projeto
├── TASK.md                    # Plano de implementação completo
└── README.md                  # Este arquivo
```

---

## 🚀 Como Usar

### 1. Abrir o Sistema

**Página de Busca:**
```
Abrir: index.html
```

**Página Administrativa:**
```
Abrir: admin.html
Login: admin
Senha: autP58x
```

### 2. Desenvolvimento

Os arquivos estão prontos para serem desenvolvidos seguindo o [TASK.md](TASK.md).

**Ordem de implementação:**
- ✅ Fase 1: Estrutura (CONCLUÍDA)
- ✅ Fase 2: Configuração base (CONCLUÍDA)
- ✅ Fase 3: Página de busca (CONCLUÍDA)
- ⏳ Fase 4: Sistema de autenticação
- ⏳ Fase 5: Página administrativa
- ⏳ Fase 6: Módulo de API
- ⏳ Fase 7: Estilos e compatibilidade visual
- ⏳ Fase 8: Utilitários
- ⏳ Fase 9: Testes e validação
- ⏳ Fase 10: Documentação final

---

## 🛠️ Stack Tecnológica

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos com fallbacks para IE10 (sem Flexbox/Grid crítico)
- **JavaScript (ES5/ES6 compatível)** - Lógica da aplicação
- **XMLHttpRequest** - Comunicação com API (sem fetch)
- **Vanilla JS** - Sem frameworks pesados
- **Ambiente:** Micro Desktop (>= 1024x768)

---

## 📋 Funcionalidades

### Página de Busca (index.html) ✅
- Formulário com 4 campos: Tag, Data Início (dd/mm/aaaa), Data Fim (dd/mm/aaaa), Status (Todos/Normal/Falha)
- Máscara automática de data com validação completa (incluindo anos bissextos)
- Validações: campos obrigatórios, formato de data, data fim >= data início
- Integração com API REST via XMLHttpRequest
- Tabela de resultados paginada (10 itens por página)
- Navegação entre páginas com scroll suave
- Botão Limpar que restaura estado inicial
- Contador de resultados
- Mensagens de feedback (sucesso/erro/warning)
- Estado vazio quando não há resultados
- Mock data (opcional) para testes sem backend

### Página Administrativa (admin.html)
- Login com autenticação (admin/autP58x)
- CRUD de Tag Busca
- CRUD de Tag Report
- CRUD de ZSL (vinculado a Tag Report)
- CRUD de ZSH (vinculado a Tag Report)
- Modais de confirmação para exclusões
- Proteção de acesso via sessionStorage

---

## ⚙️ Arquivos Base Criados

### HTML
- ✅ `index.html` - Estrutura básica da página de busca
- ✅ `admin.html` - Estrutura básica da página admin

### CSS (Otimizados para Desktop >= 1024x768)
- ✅ `normalize.css` - Reset CSS compatível com IE10
- ✅ `main.css` - Estilos globais (containers, botões, formulários, tabelas, mensagens)
- ✅ `search.css` - Estilos da busca (formulário, resultados, paginação)
- ✅ `admin.css` - Estilos admin (login, CRUD, modal)

### JavaScript
- ✅ `polyfills.js` - Polyfills essenciais (Promise, Object.assign, Array methods, classList, Console)
- ✅ `utils.js` - Utilitários (formatDate, sanitizeInput, showMessage, debounce, getFormData, etc.)
- ✅ `api.js` - Módulo de comunicação API (GET, POST, PUT, DELETE com XHR)
- ✅ `auth.js` - Sistema de autenticação (login, logout, isAuthenticated)
- ✅ `search.js` - Lógica completa de busca (validações, máscara, API, paginação)
- ✅ `mock-data.js` - Dados simulados para testes (REMOVER em produção)
- ⏳ `admin.js` - Placeholder para lógica admin (Fase 5)

### Documentação
- ✅ `docs/compatibility.md` - Guia completo de compatibilidade IE10
- ✅ `README.md` - Este arquivo

---

## 🎯 Compatibilidade

### Navegadores Suportados
- ✅ Internet Explorer 10.0+ (prioridade)
- ✅ Internet Explorer 11
- ✅ Edge
- ✅ Chrome/Firefox (desenvolvimento)

### Ambiente Alvo
- **Dispositivo:** Micro Desktop
- **Resolução mínima:** 1024x768
- **Resoluções testadas:** 1024x768, 1280x720, 1366x768, 1920x1080
- **Responsividade mobile/tablet:** NÃO necessário

### Polyfills Incluídos
- Promise
- Object.assign
- Array.prototype: forEach, map, filter, indexOf
- classList (add, remove, toggle, contains)
- Console (stub para IE sem DevTools)

### Recursos Evitados
- ❌ Arrow functions
- ❌ Template literals
- ❌ let/const (usar var)
- ❌ Flexbox/Grid em áreas críticas
- ❌ CSS Variables
- ❌ fetch API (usar XMLHttpRequest)

Consulte [docs/compatibility.md](docs/compatibility.md) para detalhes completos.

---

## 🔧 Módulos Principais

### API Module (api.js)
```javascript
// Exemplo de uso
API.get('/reports', { tag: 'ABC123' }, 
    function(data) { console.log(data); },
    function(error) { console.error(error); }
);

API.post('/tag_busca', { name: 'Nova Tag' },
    function(data) { console.log('Criado!'); },
    function(error) { console.error(error); }
);
```

### Utils Module (utils.js)
```javascript
// Formatar data
Utils.formatDate('2026-04-20'); // "20/04/2026"

// Mostrar mensagem
Utils.showMessage('Salvo com sucesso!', 'success', 3000);

// Validar email
Utils.validateEmail('teste@email.com'); // true

// Extrair dados de formulário
var data = Utils.getFormData('#meu-form');
```

### Auth Module (auth.js)
```javascript
// Login
if (Auth.login('admin', 'autP58x')) {
    console.log('Autenticado!');
}

// Verificar autenticação
if (Auth.isAuthenticated()) {
    console.log('Usuário logado');
}

// Logout
Auth.logout();
```

---

## 📝 Convenções de Código

### JavaScript
- Variáveis e funções: `camelCase`
- Usar `var` ao invés de let/const
- Usar `function` ao invés de arrow functions
- Comentar funções críticas

### CSS
- Classes: `kebab-case` (`.search-form`, `.btn-primary`)
- IDs: `snake_case` (apenas quando necessário)
- Evitar CSS inline

### HTML
- Sempre incluir `<meta http-equiv="X-UA-Compatible" content="IE=edge">`
- Scripts no final do `<body>`
- Ordem de scripts: polyfills → utils → api → específicos

---

## 🧪 Testes

### Checklist de Compatibilidade Desktop
- [ ] Testar em IE10
- [ ] Validar polyfills carregando
- [ ] Verificar console sem erros
- [ ] Testar em resoluções: 1024x768, 1280x720, 1366x768
- [ ] Validar formulários
- [ ] Testar modais
- [ ] Verificar paginação
- [ ] Validar overflow horizontal em tabelas

Consulte [TASK.md](TASK.md) Fase 9 para checklist completo.

---

## 🔗 Integração com Backend

O frontend está preparado para consumir API REST do FastAPI.

**Endpoints esperados:**
```
GET    /api/reports?tag=xxx&start_date=xxx&end_date=xxx&status=xxx
GET    /api/tag_busca
POST   /api/tag_busca
PUT    /api/tag_busca/{id}
DELETE /api/tag_busca/{id}
# ... e outros (ver TASK.md Fase 6)
```

---

## 📞 Próximos Passos

1. ✅ **Fase 1 CONCLUÍDA** - Estrutura do projeto
2. ✅ **Fase 2 CONCLUÍDA** - Configuração base (CSS + Polyfills)
3. ✅ **Fase 3 CONCLUÍDA** - Página de busca (formulário + validações + resultados + paginação)
4. ⏳ Implementar **Fase 4** - Sistema de Autenticação
5. ⏳ Continuar conforme [TASK.md](TASK.md)

---

## 📖 Documentação Adicional

- [guideline_frontend.md](guideline_frontend.md) - Guidelines completas do projeto
- [TASK.md](TASK.md) - Plano de implementação detalhado (10 fases)
- [docs/compatibility.md](docs/compatibility.md) - Guia de compatibilidade IE10

---

## 👤 Credenciais

**Administrativo:**
- Usuário: `admin`
- Senha: `autP58x`

---

## ⚠️ Notas Importantes

1. **SEMPRE carregar polyfills.js primeiro**
2. **Testar em IE10 regularmente**
3. **Evitar console.log em produção**
4. **Usar XMLHttpRequest ao invés de fetch**
5. **Validar compatibilidade antes de merge**
6. **Ambiente:** Otimizado para micro desktop (>= 1024x768)
7. **Não usar Flexbox/Grid** em áreas críticas

---

**Status:** Fases 1, 2 e 3 Concluídas ✅  
**Última atualização:** Abril 2026
