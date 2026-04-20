# TASK.md - Plano de Implementação Frontend

## 📋 Visão Geral
Desenvolvimento do frontend para o sistema DamperReport, com foco em compatibilidade com **IE10** e **Windows Server 2008**.

**Ambiente alvo:** Micro Desktop (resolução >= 1024x768)
**Sem necessidade de responsividade mobile/tablet**

---

## 🎯 Objetivos
- ✅ Criar interface de busca de relatórios
- ✅ Criar painel administrativo com autenticação
- ✅ Garantir compatibilidade com IE10
- ✅ Preparar integração com API REST (FastAPI)
- ✅ Implementar layout otimizado para desktop (>= 1024x768)

---

## 📁 Fase 1: Estrutura do Projeto

### Task 1.1: Criar estrutura de diretórios
```
DamperReport/
├── index.html                  # Página inicial (busca)
├── admin.html                  # Página administrativa
├── css/
│   ├── normalize.css          # Reset CSS
│   ├── main.css               # Estilos globais
│   ├── search.css             # Estilos da página de busca
│   └── admin.css              # Estilos da página admin
├── js/
│   ├── polyfills.js           # Polyfills para IE10
│   ├── utils.js               # Funções utilitárias
│   ├── api.js                 # Módulo de comunicação com API
│   ├── search.js              # Lógica da página de busca
│   ├── admin.js               # Lógica da página admin
│   └── auth.js                # Sistema de autenticação
├── assets/
│   └── images/                # Imagens e ícones
└── docs/
    └── compatibility.md       # Documentação de compatibilidade
```

**Critérios de aceitação:**
- [x] Todos os diretórios criados
- [x] Estrutura documentada

**Status:** ✅ CONCLUÍDA

---

## 🔧 Fase 2: Configuração Base

### Task 2.1: Criar arquivo normalize.css ✅
- Reset CSS para compatibilidade cross-browser
- Normalizar comportamento entre IE10 e browsers modernos

### Task 2.2: Criar main.css ✅
- Estilos globais (tipografia, cores, containers)
- Classes utilitárias (`.hidden`, `.text-center`, etc.)
- Sistema de botões (.btn-primary, .btn-danger, etc.)
- Sistema de mensagens (.message-success, .message-error)
- Tabelas e formulários otimizados para desktop

### Task 2.3: Criar polyfills.js ✅
Polyfills implementados:
- [x] `Promise` (para IE10)
- [x] `Object.assign`
- [x] `Array.prototype.forEach`, `.map`, `.filter`, `.indexOf`
- [x] `classList` (add, remove, toggle, contains)
- [x] `Console` (stub para IE10 sem DevTools)

**Critérios de aceitação:**
- [x] Estilos base aplicados em todas as páginas
- [x] Polyfills carregados antes de outros scripts
- [x] Layout otimizado para desktop (1024x768+)
- [x] Sem dependências de media queries mobile

**Status:** ✅ CONCLUÍDA

---

## 🔍 Fase 3: Página de Busca (index.html)

### Task 3.1: Criar estrutura HTML (index.html)
**Campos do formulário:**
- [ ] Campo "Tag" (input text)
- [ ] Campo "Data Início" (input date com fallback)
- [ ] Campo "Data Fim" (input date com fallback)
- [ ] Campo "Status" (select/dropdown)
- [ ] Botão "Buscar"
- [ ] Botão "Limpar"

**Elementos adicionais:**
- [ ] Cabeçalho com título do sistema
- [ ] Container para tabela de resultados
- [ ] Área de paginação
- [ ] Mensagens de erro/sucesso

### Task 3.2: Criar estilos (search.css)
- [ ] Estilizar formulário de busca
- [ ] Layout responsivo para campos (sem Flexbox crítico)
- [ ] Estilizar tabela de resultados
- [ ] Estilizar controles de paginação
- [ ] Estados: hover, focus, disabled

### Task 3.3: Implementar lógica (search.js)
**Funcionalidades:**
- [ ] Validação de campos obrigatórios
- [ ] Sanitização de inputs
- [ ] Função `searchReports()` - chamar API de busca
- [ ] Função `displayResults(data)` - renderizar tabela
- [ ] Função `clearForm()` - limpar formulário
- [ ] Paginação de resultados (local)
- [ ] Tratamento de erros (rede, validação)

**Regras de validação:**
- [ ] Tag: obrigatório, mínimo 3 caracteres
- [ ] Data Início: obrigatório, formato válido
- [ ] Data Fim: obrigatório, >= Data Início
- [ ] Exibir mensagens de erro amigáveis

**Critérios de aceitação:**
- [ ] Formulário funcional em IE10
- [ ] Validações funcionando
- [ ] Resultados exibidos em tabela paginada
- [ ] Botão limpar restaura estado inicial

---

## 👤 Fase 4: Sistema de Autenticação

### Task 4.1: Criar módulo auth.js
**Funcionalidades:**
- [ ] Função `login(username, password)` - validar credenciais
- [ ] Função `logout()` - limpar sessão
- [ ] Função `isAuthenticated()` - verificar se está logado
- [ ] Armazenar sessão em `sessionStorage`
- [ ] Redirecionar não autenticados

**Credenciais:**
- Usuário: `admin`
- Senha: `autP58x`

**Critérios de aceitação:**
- [ ] Login funcional
- [ ] Proteção de página admin
- [ ] Logout funcional
- [ ] Sessão persistente durante navegação

---

## ⚙️ Fase 5: Página Administrativa (admin.html)

### Task 5.1: Criar estrutura HTML (admin.html)
**Elementos principais:**
- [ ] Formulário de login (se não autenticado)
- [ ] Painel de navegação entre seções:
  - Tag Busca
  - Tag Report
  - ZSL
  - ZSH
- [ ] Botão logout
- [ ] Formulários CRUD para cada entidade
- [ ] Tabelas para listar registros
- [ ] Modal de confirmação de exclusão

### Task 5.2: Criar estilos (admin.css)
- [ ] Layout do painel administrativo
- [ ] Estilos de formulários CRUD
- [ ] Tabelas de listagem
- [ ] Modal de confirmação
- [ ] Menu de navegação entre seções
- [ ] Feedback visual (success, error, warning)

### Task 5.3: Implementar lógica (admin.js)

#### 5.3.1: CRUD - Tag Busca
- [ ] Função `createTagBusca(data)`
- [ ] Função `readTagBusca()`
- [ ] Função `updateTagBusca(id, data)`
- [ ] Função `deleteTagBusca(id)`
- [ ] Validação de duplicidade

#### 5.3.2: CRUD - Tag Report
- [ ] Função `createTagReport(data)`
- [ ] Função `readTagReport()`
- [ ] Função `updateTagReport(id, data)`
- [ ] Função `deleteTagReport(id)`
- [ ] Validação de duplicidade

#### 5.3.3: CRUD - ZSL (array vinculado a tag_report)
- [ ] Função `createZSL(tagReportId, data)`
- [ ] Função `readZSL(tagReportId)`
- [ ] Função `updateZSL(id, data)`
- [ ] Função `deleteZSL(id)`
- [ ] Validar vínculo com tag_report

#### 5.3.4: CRUD - ZSH (array vinculado a tag_report)
- [ ] Função `createZSH(tagReportId, data)`
- [ ] Função `readZSH(tagReportId)`
- [ ] Função `updateZSH(id, data)`
- [ ] Função `deleteZSH(id)`
- [ ] Validar vínculo com tag_report

#### 5.3.5: Funcionalidades gerais
- [ ] Renderizar tabelas de listagem
- [ ] Modal de confirmação antes de deletar
- [ ] Feedback de operações (sucesso/erro)
- [ ] Alternar entre seções sem reload

**Critérios de aceitação:**
- [ ] Todas as operações CRUD funcionais
- [ ] Validações aplicadas antes de salvar
- [ ] Modal de confirmação em exclusões
- [ ] Navegação entre seções funcional
- [ ] Compatível com IE10

---

## 🌐 Fase 6: Módulo de API (api.js)

### Task 6.1: Criar módulo centralizado de comunicação
**Funções:**
- [ ] `apiRequest(method, endpoint, data)` - função genérica
- [ ] `get(endpoint)` - wrapper para GET
- [ ] `post(endpoint, data)` - wrapper para POST
- [ ] `put(endpoint, data)` - wrapper para PUT
- [ ] `delete(endpoint)` - wrapper para DELETE

**Implementação:**
- [ ] Usar `XMLHttpRequest` (compatível IE10) ou polyfill de `fetch`
- [ ] Configurar headers (Content-Type, Authorization se necessário)
- [ ] Tratamento de erros HTTP (4xx, 5xx)
- [ ] Timeout de requisições
- [ ] Mensagens de erro amigáveis

**Endpoints esperados (FastAPI):**
```javascript
// Busca
GET /api/reports?tag=xxx&start_date=xxx&end_date=xxx&status=xxx

// Tag Busca
GET    /api/tag_busca
POST   /api/tag_busca
PUT    /api/tag_busca/{id}
DELETE /api/tag_busca/{id}

// Tag Report
GET    /api/tag_report
POST   /api/tag_report
PUT    /api/tag_report/{id}
DELETE /api/tag_report/{id}

// ZSL
GET    /api/zsl?tag_report_id={id}
POST   /api/zsl
PUT    /api/zsl/{id}
DELETE /api/zsl/{id}

// ZSH
GET    /api/zsh?tag_report_id={id}
POST   /api/zsh
PUT    /api/zsh/{id}
DELETE /api/zsh/{id}
```

**Critérios de aceitação:**
- [ ] Módulo funcional em IE10
- [ ] Erros tratados com mensagens claras
- [ ] Timeout configurado (ex: 30s)
- [ ] Código centralizado e reutilizável

---

## 🎨 Fase 7: Estilos e Compatibilidade Visual

### Task 7.1: Otimizar layout para desktop
- [ ] Validar layout em resoluções: 1024x768, 1280x720, 1366x768, 1920x1080
- [ ] Layout fixo com max-width para telas grandes
- [ ] Evitar Flexbox/Grid em áreas críticas (usar floats/inline-block)
- [ ] Fallbacks para propriedades modernas

### Task 7.2: Garantir compatibilidade visual IE10
- [ ] Testar `border-radius`, `opacity`, `box-shadow`
- [ ] Verificar fontes web (WOFF, TTF)
- [ ] Garantir contraste adequado
- [ ] Testar inputs de data com fallback
- [ ] Validar tabelas com overflow horizontal

**Critérios de aceitação:**
- [ ] Layout funcional em resoluções desktop (>= 1024x768)
- [ ] Visual consistente em IE10
- [ ] Sem quebras de layout
- [ ] Performance otimizada para micro desktop

---

## 🧰 Fase 8: Utilitários e Helpers

### Task 8.1: Criar utils.js
**Funções:**
- [ ] `formatDate(dateString)` - formatar datas
- [ ] `validateEmail(email)` - validar email
- [ ] `sanitizeInput(input)` - limpar inputs
- [ ] `showMessage(message, type)` - exibir notificações
- [ ] `debounce(func, delay)` - debounce para inputs
- [ ] `toggleElement(selector)` - mostrar/ocultar elementos
- [ ] `getFormData(formId)` - extrair dados de formulários

**Critérios de aceitação:**
- [ ] Funções bem documentadas
- [ ] Compatíveis com IE10
- [ ] Testadas individualmente

---

## ✅ Fase 9: Testes e Validação

### Task 9.1: Checklist de compatibilidade IE10
- [ ] Testar polyfills carregando corretamente
- [ ] Validar todos os formulários
- [ ] Testar CRUDs completos
- [ ] Validar responsividade em 1024x768
- [ ] Verificar console sem erros críticos
- [ ] Testar fluxo de login/logout
- [ ] Validar paginação de resultados
- [ ] Testar modais de confirmação

### Task 9.2: Testes funcionais
- [ ] Busca com filtros válidos retorna resultados
- [ ] Validações de formulário impedem submissão inválida
- [ ] CRUD completo para todas as entidades
- [ ] Modal de exclusão exige confirmação
- [ ] Mensagens de erro exibidas corretamente
- [ ] Sessão persiste durante navegação

### Task 9.3: Testes de integração (quando backend estiver pronto)
- [ ] Conectar ao endpoint da API
- [ ] Validar formato de requisições
- [ ] Tratar respostas de sucesso/erro
- [ ] Validar payloads JSON

---

## 📦 Fase 10: Documentação e Entrega

### Task 10.1: Documentar código
- [ ] Comentários em funções críticas
- [ ] Documentar estrutura de dados esperados da API
- [ ] README.md com instruções de uso

### Task 10.2: Criar compatibility.md
- [ ] Listar polyfills utilizados
- [ ] Documentar limitações do IE10
- [ ] Instruções para testar em IE10

### Task 10.3: Build e deploy
- [ ] Minificar CSS (opcional, cuidado com compatibilidade)
- [ ] Concatenar JS (se usar Grunt/Gulp)
- [ ] Testar em ambiente Windows Server 2008
- [ ] Documentar processo de deploy

**Critérios de aceitação:**
- [ ] Código documentado
- [ ] README.md completo
- [ ] Sistema funcional em IE10 + Windows Server 2008

---

## 🚀 Cronograma Sugerido

| Fase | Duração Estimada | Dependências |
|------|------------------|--------------|
| Fase 1 | 1 dia | - |
| Fase 2 | 2 dias | Fase 1 |
| Fase 3 | 3 dias | Fase 1, 2 |
| Fase 4 | 1 dia | Fase 2 |
| Fase 5 | 4 dias | Fase 2, 4 |
| Fase 6 | 2 dias | Fase 2 |
| Fase 7 | 2 dias | Fase 3, 5 |
| Fase 8 | 1 dia | Fase 2 |
| Fase 9 | 3 dias | Todas anteriores |
| Fase 10 | 2 dias | Todas anteriores |
| **TOTAL** | **~21 dias** | |

---

## ❓ Questões Pendentes

1. **Exportação de dados:** A página de busca deve ter funcionalidade de exportar (CSV/Excel/PDF) já na primeira versão ou será feature futura?
   
2. **Tag Report - Arrays ZSL/ZSH:** Qual é a estrutura exata desses arrays? São arrays de strings, objetos com propriedades específicas?

3. **Status no filtro de busca:** Quais são os valores possíveis para o campo "Status"? (ex: Pendente, Concluído, Em Andamento, etc.)

4. **Persistência local:** Enquanto o backend não estiver pronto, devemos simular dados com `localStorage` ou apenas fazer mock de respostas?

5. **Autenticação real:** O sistema de login será apenas frontend (validação hardcoded) ou o backend terá endpoint de autenticação com tokens/sessões?

6. **Campos adicionais:** Além de Tag, Data Início/Fim e Status, há outros campos no relatório que precisam ser exibidos na tabela de resultados?

7. **Permissões:** Existe diferenciação de níveis de acesso (ex: admin vs usuário comum) ou apenas admin/não autenticado?

8. **Tema visual:** Há preferências de cores, logo ou identidade visual que devem ser seguidas?

---

## 📝 Notas Importantes

- **Prioridade:** Compatibilidade com IE10 é CRÍTICA
- **Ambiente:** Micro Desktop - resolução mínima 1024x768
- **Responsividade:** NÃO necessário para mobile/tablet
- **Performance:** Minimizar manipulações DOM, usar debounce em inputs
- **Progressão:** Testar cada fase em IE10 antes de avançar
- **Fallbacks:** Sempre prever alternativas para features modernas
- **Documentação:** Código legível e bem comentado é essencial

---

## 📞 Próximos Passos

1. Responder questões pendentes
2. Validar cronograma e prioridades
3. Iniciar Fase 1 (Estrutura do Projeto)
4. Configurar ambiente de testes para IE10

---

## ✅ Progresso Atual

**Fases Concluídas:**
- ✅ Fase 1: Estrutura do Projeto
- ✅ Fase 2: Configuração Base (CSS + Polyfills)

**Próxima Fase:**
- ⏳ Fase 3: Página de Busca (index.html)

**Arquivos Criados:**
- 2 HTML (index.html, admin.html)
- 4 CSS (normalize, main, search, admin)
- 6 JS (polyfills, utils, api, auth, search, admin)
- README.md + compatibility.md

**Status:** ✅ Fases 1 e 2 completas - Pronto para iniciar Fase 3
