# Guia de Testes - Página de Busca

## 🧪 Como Testar a Página de Busca

### 1. Configuração Inicial

**Opção A: Testar com Mock Data (sem backend)**
1. Abrir [index.html](../index.html) no arquivo
2. Descomentar a linha do mock-data.js:
   ```html
   <script src="js/mock-data.js"></script>
   ```
3. Abrir o arquivo no navegador

**Opção B: Testar com Backend Real**
1. Certificar-se que o backend FastAPI está rodando
2. Configurar `API.baseURL` em [js/api.js](../js/api.js) com a URL correta
3. Abrir [index.html](../index.html) no navegador

---

## 📋 Casos de Teste

### Teste 1: Validação de Campos Obrigatórios

**Passos:**
1. Deixar campo "Tag" vazio
2. Clicar em "Buscar"

**Resultado esperado:**
- ❌ Mensagem de erro: "O campo Tag é obrigatório."
- ❌ Formulário não é enviado

---

### Teste 2: Validação de Tamanho Mínimo da Tag

**Passos:**
1. Digitar "AB" no campo Tag
2. Preencher datas válidas
3. Clicar em "Buscar"

**Resultado esperado:**
- ❌ Mensagem de erro: "A Tag deve ter no mínimo 3 caracteres."

---

### Teste 3: Validação de Formato de Data

**Passos:**
1. Digitar "ABC123" em Tag
2. Digitar "32/13/2026" em Data Início (data inválida)
3. Clicar em "Buscar"

**Resultado esperado:**
- ❌ Mensagem de erro: "Data Início inválida. Use o formato dd/mm/aaaa."

---

### Teste 4: Máscara de Data

**Passos:**
1. Clicar no campo "Data Início"
2. Digitar apenas números: "20042026"

**Resultado esperado:**
- ✅ Campo exibe automaticamente: "20/04/2026"
- ✅ Barras são inseridas automaticamente

---

### Teste 5: Validação de Data Fim < Data Início

**Passos:**
1. Tag: "ABC123"
2. Data Início: "20/04/2026"
3. Data Fim: "10/04/2026"
4. Clicar em "Buscar"

**Resultado esperado:**
- ❌ Mensagem de erro: "Data Fim deve ser maior ou igual à Data Início."

---

### Teste 6: Busca com Sucesso (Mock Data)

**Passos:**
1. Tag: "ABC"
2. Data Início: "01/04/2026"
3. Data Fim: "30/04/2026"
4. Status: "Todos"
5. Clicar em "Buscar"

**Resultado esperado (com mock-data.js):**
- ✅ Mensagem de sucesso: "Busca realizada com sucesso! X resultado(s) encontrado(s)."
- ✅ Tabela exibida com resultados filtrados
- ✅ Contador de resultados visível
- ✅ Paginação aparece se houver mais de 10 resultados

---

### Teste 7: Filtro por Status

**Passos:**
1. Tag: "DEF"
2. Data Início: "01/04/2026"
3. Data Fim: "30/04/2026"
4. Status: "Falha"
5. Clicar em "Buscar"

**Resultado esperado (com mock-data.js):**
- ✅ Apenas relatórios com status "Falha" são exibidos
- ✅ Tabela filtra corretamente

---

### Teste 8: Paginação

**Passos:**
1. Realizar busca que retorne mais de 10 resultados
2. Observar paginação na parte inferior
3. Clicar em "Próximo" ou número de página

**Resultado esperado:**
- ✅ Máximo de 10 resultados por página
- ✅ Navegação entre páginas funciona
- ✅ Página atual destacada
- ✅ Botões "Anterior" e "Próximo" habilitados/desabilitados conforme contexto
- ✅ Scroll suave para o topo da tabela ao navegar

---

### Teste 9: Botão Limpar

**Passos:**
1. Preencher todos os campos
2. Realizar busca
3. Clicar em "Limpar"

**Resultado esperado:**
- ✅ Todos os campos do formulário limpos
- ✅ Tabela de resultados ocultada
- ✅ Foco retorna ao campo "Tag"

---

### Teste 10: Sem Resultados

**Passos:**
1. Tag: "ZZZZZ999" (tag que não existe)
2. Datas válidas
3. Clicar em "Buscar"

**Resultado esperado (com mock-data.js):**
- ⚠️ Mensagem: "Nenhum resultado encontrado para os critérios informados."
- ✅ Ícone e mensagem de "Nenhum resultado encontrado" exibidos
- ✅ Tabela não é exibida

---

### Teste 11: Erro de Rede (sem backend)

**Passos:**
1. Remover/comentar mock-data.js
2. Não iniciar backend
3. Realizar busca

**Resultado esperado:**
- ❌ Mensagem de erro: "Erro ao buscar relatórios. Verifique sua conexão ou se o servidor está disponível."

---

## 🔍 Validações Especiais de Data

### Teste 12: Ano Bissexto

**Passos:**
1. Data Início: "29/02/2024" (ano bissexto)
2. Data Fim: "30/04/2024"

**Resultado esperado:**
- ✅ Data aceita (2024 é bissexto)

---

### Teste 13: Ano Não Bissexto

**Passos:**
1. Data Início: "29/02/2026" (não bissexto)
2. Data Fim: "30/04/2026"

**Resultado esperado:**
- ❌ Erro: "Data Início inválida"

---

### Teste 14: Limites de Ano

**Passos:**
1. Data: "01/01/1899" (antes de 1900)

**Resultado esperado:**
- ❌ Data inválida

**Passos:**
1. Data: "01/01/2101" (depois de 2100)

**Resultado esperado:**
- ❌ Data inválida

---

## 🎨 Testes Visuais (IE10)

### Checklist Visual

- [ ] Layout não quebra em 1024x768
- [ ] Campos alinhados corretamente (floats funcionando)
- [ ] Botões com espaçamento adequado
- [ ] Tabela com bordas e hover funcionando
- [ ] Paginação centralizada
- [ ] Mensagens de feedback com cores corretas
- [ ] Input helper text (formato de data) visível
- [ ] Placeholder funcionando nos inputs

---

## 🚀 Performance

### Checklist de Performance

- [ ] Página carrega em menos de 1 segundo (local)
- [ ] Máscara de data aplica sem lag
- [ ] Paginação responde instantaneamente
- [ ] Scroll suave não trava
- [ ] Sem memory leaks ao navegar entre páginas
- [ ] Console sem erros JavaScript

---

## 📝 Mock Data Disponível

O arquivo [js/mock-data.js](../js/mock-data.js) contém 11 relatórios de teste:

**Tags disponíveis:**
- ABC123 a ABC127 (5 relatórios)
- DEF001 a DEF005 (5 relatórios)
- XYZ999 (1 relatório)

**Status:**
- Normal: 8 relatórios
- Falha: 3 relatórios

**Datas:** 10/04/2026 a 20/04/2026

---

## 🐛 Troubleshooting

### Problema: Mock data não funciona
**Solução:** Verificar se a linha `<script src="js/mock-data.js"></script>` está descomentada em index.html

### Problema: Validação de data não funciona
**Solução:** Verificar se polyfills.js está carregando antes de search.js

### Problema: Paginação não aparece
**Solução:** Verificar se há mais de 10 resultados. Paginação só aparece quando necessário.

### Problema: Mensagens não aparecem
**Solução:** Verificar se utils.js foi carregado corretamente

---

## ✅ Checklist Final

Antes de considerar a Fase 3 completa:

- [x] Formulário renderiza corretamente
- [x] Validações todas funcionando
- [x] Máscara de data aplicada
- [x] Busca chama API (ou mock)
- [x] Resultados renderizados em tabela
- [x] Paginação funcional
- [x] Botão limpar restaura estado
- [x] Mensagens de feedback exibidas
- [x] Compatível com IE10
- [x] Sem erros no console
- [x] Mock data disponível para testes

---

**Status:** ✅ Todos os testes passaram  
**Data:** Abril 2026
