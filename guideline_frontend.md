# Frontend Guidelines

## 🛠️ Stack Tecnológica
- Linguagens: **JavaScript (ES5/ES6 compatível)**, **HTML5**, **CSS3**
- Compatibilidade: **Internet Explorer 10.0**
- Ambiente alvo: **Windows Server 2008**
- Ferramentas de build: Grunt/Gulp (evitar dependências modernas não suportadas)
- Frameworks/Bibliotecas: uso mínimo; priorizar vanilla JS e CSS puro

## 📐 Convenções de Código
- Seguir padrão **ESLint** configurado para compatibilidade com ES5/ES6
- Nomes de variáveis e funções em **camelCase**
- Classes CSS em **kebab-case** (ex.: `.menu-item`)
- IDs em **snake_case** apenas quando necessário
- Evitar arrow functions em código crítico (compatibilidade IE10)
- Sempre usar `var` ou `function` quando necessário para retrocompatibilidade

## 🎨 Estilo e Layout
- CSS modularizado por componentes/páginas
- Evitar uso de Flexbox/Grid em cenários críticos (IE10 tem suporte parcial)
- Usar **fallbacks** para propriedades modernas (ex.: `opacity`, `border-radius`)
- Garantir responsividade mínima (layout fluido + media queries básicas)
- Testar em resoluções 1024x768 e superiores

## 🔄 Fluxo de Desenvolvimento
1. Criar branch a partir de `main`
2. Nomear branch com padrão: `feature/frontend-nome` ou `fix/frontend-nome`
3. Commits devem seguir o padrão:
   - `feat(frontend): descrição`
   - `fix(frontend): descrição`
   - `style(frontend): ajustes de CSS`
   - `refactor(frontend): refatoração de JS`

## ✅ Regras de Programação
- Evitar dependências externas pesadas (bibliotecas modernas não suportadas em IE10)
- Usar **polyfills** para recursos modernos (ex.: `Promise`, `fetch`)
- Sempre validar compatibilidade em IE10 antes de merge
- Documentar funções JS críticas com comentários claros
- Testar manualmente em IE10 + Windows Server 2008

## 📖 Boas Práticas
- Priorizar performance: minimizar DOM manipulations
- Usar `classList` em vez de manipulação direta de `className` quando suportado
- Evitar CSS inline; centralizar estilos em arquivos `.css`
- Scripts JS devem ser carregados no final do `body` para não bloquear renderização
- Usar Progressive Enhancement: funcionalidades modernas devem ter fallback


## 📄 Estrutura de Páginas

- **Página de Busca**
  - Campos: Tag (select), Data Início (dd/mm/aaaa), Data Fim (dd/mm/aaaa), Status (Todos, Normal, Falha)
  - Botões: Buscar (ao clicar chama API de busca do backend), Limpar (Limpa os campos preenchidos)
  - Regras:
    - Validar campos obrigatórios antes da busca
    - Exibir resultados em tabela paginada
    - Permitir exportar resultados (CSV/Excel/PDF) futuramente

- **Página Administrativa**
  - Login único: usuário `admin`, senha `autP58x`
  - Funcionalidades:
    - Cadastro de `tag_busca` 
    - Cadastro de `tag_report`
    - Cadastro de `zsl` (array vinculado a `tag_report`)
    - Cadastro de `zsh` (array vinculado a `tag_report`)
    - Cadastro de zsl_time (inteiro vinculado a `zsl`)
    - Cadastro de zsh_time (inteiro vinculado a `zsh`)
    - Operações CRUD: incluir, modificar, deletar
  - Regras:
    - Validar duplicidade antes de salvar
    - Confirmar exclusão com modal


## 🔗 Integração futura
- O frontend deve estar preparado para consumir APIs REST do backend (FastAPI).
- Todas as chamadas devem ser centralizadas em um módulo `api.js`.
- Usar `fetch` ou `XMLHttpRequest` compatível com IE10.
- Tratar erros de rede com mensagens amigáveis ao usuário.

---

## 💾 Estratégia de Persistência de Dados

### Fase Atual (Desenvolvimento)
- **localStorage:** Armazenamento temporário dos dados cadastrados no painel administrativo
  - Chave: `damper_admin_data`
  - Formato: Array de objetos JSON com 6 campos (tag_busca, tag_report, zsl, zsh, tempo_t1, tempo_t2)
  - Limite: ~5-10MB (suficiente para fase de desenvolvimento)
- **mock-data.js:** Dados simulados para testes da página de busca
  - **IMPORTANTE:** Este arquivo será **removido** na migração para backend

### Fase Futura (Produção com Backend)
- **Dual Storage (localStorage + SQLite):**
  - **Frontend (IE10):**
    - localStorage continua como cache local (acesso instantâneo)
    - XMLHttpRequest para comunicação com backend
    - Sincronização automática: salvar localmente → enviar ao backend
  - **Backend (Python + FastAPI + SQLite):**
    - Banco de dados SQLite (.db) como fonte de verdade
    - Endpoints REST para CRUD completo
    - Persistência permanente e multi-usuário

### Fluxo de Migração
1. **Criar backend:**
   - Python 3.x + FastAPI + SQLite
   - Tabela `records` com colunas: id, tag_busca (UNIQUE), tag_report, zsl, zsh, tempo_t1, tempo_t2
   - Endpoints: GET/POST/PUT/DELETE `/api/records`
   - Endpoint de sincronização: POST `/api/sync` (migrar dados do localStorage)

2. **Atualizar frontend:**
   - Modificar `admin.js`: adicionar chamadas de sincronização com backend após salvar no localStorage
   - Atualizar `api.js`: configurar `API_BASE_URL` (ex: http://localhost:8000)
   - Implementar tratamento de erros offline (backend indisponível)

3. **Remoção de arquivos obsoletos:**
   - **Deletar `js/mock-data.js`** (substituído por dados reais do backend)
   - **Deletar `js/init-sample-data.js`** (não mais necessário)
   - Atualizar referências nos arquivos HTML

4. **Migração de dados:**
   - Executar script de sincronização para transferir dados do localStorage para SQLite
   - Validar integridade dos dados migrados
   - Confirmar com usuário antes de limpar localStorage (backup)

### Compatibilidade IE10
- ✅ XMLHttpRequest (IE10 nativo)
- ❌ fetch API (não suportado, usar polyfill ou evitar)
- ✅ localStorage (IE10 nativo)
- ✅ JSON.parse/stringify (IE10 nativo)

### Benefícios da Estratégia Dual Storage
- **Performance:** Leitura instantânea do cache local
- **Offline-first:** Sistema funciona mesmo sem conexão com backend
- **Sincronização:** Dados persistem permanentemente no servidor
- **Multi-usuário:** Vários usuários podem acessar dados centralizados
- **Backup:** Duas camadas de armazenamento (local + servidor)