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
  - Campos: Tag, Data Início, Data Fim, Status
  - Botões: Buscar, Limpar
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
    - Operações CRUD: incluir, modificar, deletar
  - Regras:
    - Validar duplicidade antes de salvar
    - Confirmar exclusão com modal


    ## 🔗 Integração futura
- O frontend deve estar preparado para consumir APIs REST do backend (FastAPI).
- Todas as chamadas devem ser centralizadas em um módulo `api.js`.
- Usar `fetch` ou `XMLHttpRequest` compatível com IE10.
- Tratar erros de rede com mensagens amigáveis ao usuário.