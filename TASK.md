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

### Task 3.1: Criar estrutura HTML (index.html) ✅
**Campos do formulário:**
- [x] Campo "Tag" (input text)
- [x] Campo "Data Início" (input text com máscara dd/mm/aaaa)
- [x] Campo "Data Fim" (input text com máscara dd/mm/aaaa)
- [x] Campo "Status" (select: Todos, Normal, Falha)
- [x] Botão "Buscar"
- [x] Botão "Limpar"

**Elementos adicionais:**
- [x] Cabeçalho com título do sistema
- [x] Container para tabela de resultados
- [x] Área de paginação
- [x] Mensagens de erro/sucesso
- [x] Estado vazio ("Nenhum resultado encontrado")

### Task 3.2: Criar estilos (search.css) ✅
- [x] Estilizar formulário de busca
- [x] Layout desktop para campos (floats, sem Flexbox)
- [x] Estilizar tabela de resultados
- [x] Estilizar controles de paginação
- [x] Estados: hover, focus, disabled
- [x] Helper text para formato de data

### Task 3.3: Implementar lógica (search.js) ✅
**Funcionalidades:**
- [x] Validação de campos obrigatórios
- [x] Sanitização de inputs (via Utils.sanitizeInput)
- [x] Máscara automática de data (dd/mm/aaaa)
- [x] Função `searchReports()` - chamar API de busca
- [x] Função `displayResults(data)` - renderizar tabela
- [x] Função `clearForm()` - limpar formulário
- [x] Paginação de resultados (10 por página)
- [x] Tratamento de erros (rede, validação)
- [x] Conversão de datas dd/mm/aaaa para ISO (aaaa-mm-dd)

**Regras de validação:**
- [x] Tag: obrigatório, mínimo 3 caracteres
- [x] Data Início: obrigatório, formato dd/mm/aaaa válido
- [x] Data Fim: obrigatório, formato dd/mm/aaaa válido
- [x] Data Fim >= Data Início
- [x] Validação de dias/meses válidos (incluindo anos bissextos)
- [x] Exibir mensagens de erro amigáveis

**Recursos Extras:**
- [x] Mock data (js/mock-data.js) para testes sem backend
- [x] Scroll suave ao navegar entre páginas
- [x] Contador de resultados

**Critérios de aceitação:**
- [x] Formulário funcional em IE10
- [x] Validações funcionando corretamente
- [x] Resultados exibidos em tabela paginada (10 itens/página)
- [x] Botão limpar restaura estado inicial
- [x] Tratamento de erros da API
- [x] Código compatível IE10 (var, function, sem ES6+)

**Status:** ✅ CONCLUÍDA

---

## 👤 Fase 4: Sistema de Autenticação

### Task 4.1: Criar módulo auth.js
**Funcionalidades:**
- [x] Função `login(username, password)` - validar credenciais
- [x] Função `logout()` - limpar sessão
- [x] Função `isAuthenticated()` - verificar se está logado
- [x] Armazenar sessão em `sessionStorage`
- [x] Redirecionar não autenticados

**Credenciais:**
- Usuário: `admin`
- Senha: `autP58x`

**Critérios de aceitação:**
- [x] Login funcional
- [x] Proteção de página admin
- [x] Logout funcional
- [x] Sessão persistente durante navegação

**Funcionalidades adicionais implementadas:**
- [x] Expiração de sessão (1 hora)
- [x] Renovação de sessão
- [x] Mensagens de retorno detalhadas
- [x] Validação de campos obrigatórios
- [x] Tratamento de erros de sessionStorage

**Status:** ✅ CONCLUÍDA

---

## ⚙️ Fase 5: Página Administrativa (admin.html)

**ESTRUTURA REFORMULADA:** Tabela única com 6 colunas ao invés de navegação por seções.

### Task 5.1: Criar estrutura HTML (admin.html)
**Elementos principais:**
- [x] Formulário de login (se não autenticado)
- [x] Formulário unificado com 6 campos:
  - Tag Busca (formato: XX-XXXXXXX com hífen)
  - Tag Report (formato: XXX_XXX_XXXXXXX_XXX com underline)
  - ZSL (formato: XXX_ZSL_XXXXXXX_XXX)
  - ZSH (formato: XXX_ZSH_XXXXXXX_XXX)
  - Tempo T1 (inteiro)
  - Tempo T2 (inteiro)
- [x] Botão logout
- [x] Tabela única com todas as 6 colunas
- [x] Modal de confirmação de exclusão

**Exemplo de registro:**
```
Tag Busca: DG-5252025
Tag Report: FGS_DGY_5252025_SLG
ZSL: FGS_ZSL_5252025_EPT
ZSH: FGS_ZSH_5252025_EPT
Tempo T1: 5
Tempo T2: 6
```

### Task 5.2: Criar estilos (admin.css)
- [x] Layout do painel administrativo
- [x] Estilos de formulários CRUD
- [x] Tabela única de listagem (8 colunas: ID + 6 campos + Ações)
- [x] Modal de confirmação
- [x] Feedback visual (success, error, warning)
- [x] Help text para formato dos campos

### Task 5.3: Implementar lógica (admin.js)

**CRUD Unificado - Modelo de dados:**
```javascript
{
  id: 1,
  tag_busca: "DG-5252025",
  tag_report: "FGS_DGY_5252025_SLG",
  zsl: "FGS_ZSL_5252025_EPT",
  zsh: "FGS_ZSH_5252025_EPT",
  tempo_t1: 5,
  tempo_t2: 6
}
```

#### 5.3.1: CRUD Completo
- [x] Função `createRecord(data)` - Criar novo registro completo
- [x] Função `readRecords()` - Listar todos os registros  
- [x] Função `updateRecord(id, data)` - Atualizar registro existente
- [x] Função `deleteRecord(id)` - Excluir registro
- [x] Validação de duplicidade (Tag Busca)
- [x] Validação de campos obrigatórios (todos os 6 campos)

#### 5.3.2: Funcionalidades gerais
- [x] Renderizar tabela única com todos os dados
- [x] Modal de confirmação antes de deletar
- [x] Feedback de operações (sucesso/erro)
- [x] Formulário inline (criar/editar no mesmo form)
- [x] Botão cancelar para voltar ao modo criação

**Armazenamento:**
- [x] Dados armazenados em localStorage (`damper_admin_data`)
- [x] Estrutura preparada para integração com API REST / Banco de dados

**Integração com página de busca:**
- [x] Campo "Tag" na busca carrega valores do localStorage (tag_busca)
- [x] Dados serão migrados para .db posteriormente

**Critérios de aceitação:**
- [x] Todas as operações CRUD funcionais
- [x] Validações aplicadas antes de salvar
- [x] Modal de confirmação em exclusões
- [x] Tabela única exibindo todos os 6 campos
- [x] Compatível com IE10

**Funcionalidades adicionais implementadas:**
- [x] Geração automática de IDs
- [x] Verificação de duplicidade por Tag Busca
- [x] Formulários de edição inline
- [x] Botão de cancelar edição
- [x] Mensagens de feedback
- [x] Help text com exemplos de formato
- [x] Validação de tipos (números para Tempo T1/T2)

**Status:** ✅ CONCLUÍDA (Versão Reformulada - Tabela Única)

---

## 🌐 Fase 6: Integração com Backend (SQLite + FastAPI)

### Task 6.1: Criar backend Python + FastAPI + SQLite
**Estrutura do backend:**
- [ ] Criar diretório `backend/`
- [ ] Criar `backend/main.py` (aplicação FastAPI)
- [ ] Criar `backend/database.py` (conexão SQLite)
- [ ] Criar `backend/models.py` (modelos de dados)
- [ ] Criar `backend/requirements.txt` (dependências: fastapi, uvicorn, pydantic)

**Banco de dados SQLite:**
- [ ] Criar arquivo `backend/damper_report.db`
- [ ] Tabela `records` com colunas:
  - `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
  - `tag_busca` (TEXT UNIQUE NOT NULL)
  - `tag_report` (TEXT NOT NULL)
  - `zsl` (TEXT NOT NULL)
  - `zsh` (TEXT NOT NULL)
  - `tempo_t1` (INTEGER NOT NULL)
  - `tempo_t2` (INTEGER NOT NULL)
  - `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
  - `updated_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

**Endpoints FastAPI:**
```python
# CRUD completo para records
GET    /api/records              # Listar todos os registros
GET    /api/records/{id}         # Buscar registro por ID
POST   /api/records              # Criar novo registro
PUT    /api/records/{id}         # Atualizar registro
DELETE /api/records/{id}         # Deletar registro

# Sincronização de dados do localStorage
POST   /api/sync                 # Migrar dados do localStorage para SQLite

# Busca de relatórios (para página de busca)
GET    /api/reports?tag=xxx&start_date=xxx&end_date=xxx&status=xxx
```

**Configurações:**
- [ ] Habilitar CORS (permitir requisições do frontend)
- [ ] Configurar porta padrão: 8000
- [ ] Logging de requisições
- [ ] Tratamento de erros (400, 404, 500)

**Critérios de aceitação:**
- [ ] Backend rodando com `uvicorn main:app --reload`
- [ ] Banco SQLite criado automaticamente ao iniciar
- [ ] Endpoints respondendo corretamente
- [ ] CORS configurado para aceitar requisições do frontend

---

### Task 6.2: Atualizar módulo de API frontend (api.js)
**Funções:**
- [ ] `apiRequest(method, endpoint, data)` - função genérica com XMLHttpRequest
- [ ] `get(endpoint)` - wrapper para GET
- [ ] `post(endpoint, data)` - wrapper para POST
- [ ] `put(endpoint, data)` - wrapper para PUT
- [ ] `delete(endpoint)` - wrapper para DELETE
- [ ] `syncToBackend(records)` - sincronizar localStorage com backend

**Configuração:**
- [ ] Definir `API_BASE_URL` (ex: `http://localhost:8000` ou IP do servidor)
- [ ] Usar `XMLHttpRequest` (compatível IE10, NÃO usar fetch)
- [ ] Configurar headers: `Content-Type: application/json`
- [ ] Timeout de requisições (30s)
- [ ] Tratamento de erros HTTP (4xx, 5xx)
- [ ] Mensagens de erro amigáveis

**Critérios de aceitação:**
- [ ] Módulo funcional em IE10
- [ ] Comunicação com backend estabelecida
- [ ] Erros tratados com mensagens claras
- [ ] Código centralizado e reutilizável

---

### Task 6.3: Implementar dual storage (localStorage + SQLite)
**Modificações em admin.js:**
- [ ] Atualizar `saveData()` para sincronizar com backend após salvar no localStorage
- [ ] Atualizar `handleFormSubmit()` para enviar POST/PUT ao backend
- [ ] Atualizar `deleteRecord()` para enviar DELETE ao backend
- [ ] Adicionar tratamento de erros offline (backend indisponível)
- [ ] Implementar retry automático em caso de falha de rede

**Modificações em search.js:**
- [ ] Substituir `loadMockData()` por chamada real à API: `GET /api/reports`
- [ ] Atualizar `searchReports()` para usar backend
- [ ] Manter cache local opcional para performance

**Fluxo de sincronização:**
1. Usuário cria/edita/deleta no painel admin
2. Dados salvos instantaneamente no localStorage (UX rápida)
3. Requisição enviada ao backend em paralelo
4. Se backend retornar sucesso: confirmar persistência
5. Se backend falhar: manter no localStorage e tentar novamente depois

**Critérios de aceitação:**
- [ ] Dados persistem no localStorage E no SQLite
- [ ] Sistema funciona offline (somente localStorage)
- [ ] Sistema sincroniza automaticamente quando backend disponível
- [ ] Feedback visual de status de sincronização

---

### Task 6.4: Migração de dados e limpeza
**Script de migração:**
- [ ] Criar função `migrateLocalStorageToBackend()` em admin.js
- [ ] Ler dados de `localStorage.getItem('damper_admin_data')`
- [ ] Enviar via POST `/api/sync` para backend
- [ ] Validar resposta e confirmar sucesso
- [ ] Oferecer backup antes de limpar localStorage

**Arquivos a serem removidos:**
- [ ] **Deletar `js/mock-data.js`** (substituído por dados reais do backend)
- [ ] **Deletar `js/init-sample-data.js`** (não mais necessário para testes)
- [ ] Remover tags `<script src="js/mock-data.js"></script>` de index.html
- [ ] Remover referências a `MockData` em search.js

**Documentação:**
- [ ] Atualizar README.md com instruções de setup do backend
- [ ] Documentar processo de migração de dados
- [ ] Criar guia de instalação (Python, pip, uvicorn)

**Critérios de aceitação:**
- [ ] Dados do localStorage migrados com sucesso para SQLite
- [ ] Arquivos mock-data.js e init-sample-data.js removidos
- [ ] Sistema funcionando 100% com backend
- [ ] Documentação completa de migração

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
| Fase 6 (Backend + Migração) | 4 dias | Fase 2, 5 |
| Fase 7 | 2 dias | Fase 3, 5 |
| Fase 8 | 1 dia | Fase 2 |
| Fase 9 | 3 dias | Todas anteriores |
| Fase 10 | 2 dias | Todas anteriores |
| **TOTAL** | **~23 dias** | |

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

### ⚠️ Arquivos Temporários (Serão Removidos na Migração)
- **`js/mock-data.js`:** Dados simulados para testes da página de busca
  - Status: Temporário - será **DELETADO** quando backend SQLite estiver implementado
  - Substituído por: Endpoint real `GET /api/reports` do backend
  
- **`js/init-sample-data.js`:** Script para popular dados de teste no localStorage
  - Status: Temporário - será **DELETADO** após migração dos dados para SQLite
  - Substituição: Dados reais no banco SQLite via backend

- **localStorage (`damper_admin_data`):** Armazenamento local temporário
  - Status: Continuará como **cache local** após migração
  - Fonte de verdade: Banco SQLite no backend
  - Estratégia: Dual storage (local + servidor)

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
- ✅ Fase 3: Página de Busca (Formulário + Validações + Resultados + Paginação)
- ✅ Fase 4: Sistema de Autenticação
- ✅ Fase 5: Página Administrativa com CRUD completo

**Próxima Fase:**
- ⏳ Fase 6: Integração com Backend (SQLite + FastAPI + Dual Storage)

**Arquivos Criados:**
- 2 HTML (index.html, admin.html)
- 4 CSS (normalize, main, search, admin)
- 9 JS (polyfills, utils, api, auth, search, admin, mock-data*, init-sample-data*)
  - *Arquivos temporários que serão removidos na migração
- README.md + compatibility.md + TASK.md

**Funcionalidades Implementadas:**
- Formulário de busca com 4 campos (Tag, Data Início, Data Fim, Status)
- Validação completa de formulário com anos bissextos
- Máscara automática de data (dd/mm/aaaa)
- Integração com API via XMLHttpRequest
- Tabela de resultados paginada (10 itens/página)
- Sistema de mensagens de feedback
- Mock data para testes
- **Sistema de autenticação completo (admin/autP58x)**
- **Painel administrativo com tabela única (6 campos)**
- **CRUD completo unificado: Tag Busca, Tag Report, ZSL, ZSH, Tempo T1, Tempo T2**
- **Modal de confirmação para exclusões**
- **Armazenamento em localStorage (damper_admin_data)**
- **Validação de duplicidade por Tag Busca**
- **Formulários inline de criação/edição**
- **Campo Tag na busca carrega do localStorage dinamicamente**

**Status:** ✅ Fases 1-5 completas - Sistema funcional com CRUD unificado e localStorage | Próximo: Backend SQLite + Migração de dados + Remoção de arquivos temporários (mock-data.js, init-sample-data.js)
