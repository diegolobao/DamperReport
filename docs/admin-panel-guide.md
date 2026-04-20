# Painel Administrativo - DamperReport

## 📋 Visão Geral

O painel administrativo permite o gerenciamento completo dos dados do sistema DamperReport através de uma **tabela unificada** com 6 campos principais.

## 🔐 Acesso

**URL:** `admin.html`  
**Credenciais:**
- Usuário: `admin`
- Senha: `autP58x`

## 📊 Estrutura de Dados

Cada registro contém 6 campos obrigatórios:

| Campo | Tipo | Formato | Exemplo |
|-------|------|---------|---------|
| **Tag Busca** | String | XX-XXXXXXX | `DG-5252025` |
| **Tag Report** | String | XXX_XXX_XXXXXXX_XXX | `FGS_DGY_5252025_SLG` |
| **ZSL** | String | XXX_ZSL_XXXXXXX_XXX | `FGS_ZSL_5252025_EPT` |
| **ZSH** | String | XXX_ZSH_XXXXXXX_XXX | `FGS_ZSH_5252025_EPT` |
| **Tempo T1** | Inteiro | Número positivo | `5` |
| **Tempo T2** | Inteiro | Número positivo | `6` |

## 🎯 Funcionalidades

### ✅ Create (Criar)
1. Preencha todos os 6 campos do formulário
2. Clique em "Salvar"
3. Registro aparecerá na tabela abaixo

### 📖 Read (Listar)
- Todos os registros são exibidos na tabela automaticamente
- Tabela possui 8 colunas: ID + 6 campos + Ações

### ✏️ Update (Editar)
1. Clique no botão "Editar" na linha desejada
2. O formulário será preenchido com os dados
3. Modifique os campos necessários
4. Clique em "Salvar"
5. Use "Cancelar" para voltar ao modo criação

### 🗑️ Delete (Excluir)
1. Clique no botão "Excluir" na linha desejada
2. Confirme a exclusão no modal
3. Registro será removido permanentemente

## 🔍 Validações

### Tag Busca
- ✅ Campo obrigatório
- ✅ Deve ser único (não pode duplicar)
- ✅ Formato sugerido: XX-XXXXXXX (com hífen)

### Demais Campos
- ✅ Todos são obrigatórios
- ✅ Tag Report, ZSL, ZSH: Formato com underline (_)
- ✅ Tempo T1 e T2: Somente números inteiros >= 0

## 💾 Armazenamento

**Atual (Desenvolvimento):**
- localStorage: `damper_admin_data`
- Dados persistem no navegador
- Limpar cache remove os dados

**Futuro (Produção):**
- Banco de dados (.db)
- Integração com API REST (FastAPI)

## 🔗 Integração com Página de Busca

Os dados cadastrados no painel administrativo são **automaticamente disponibilizados** na página de busca:

1. Cadastre um registro com Tag Busca: `DG-5252025`
2. Abra `index.html` (página de busca)
3. O campo "Tag" terá `DG-5252025` como opção

**Sincronização:** Automática via localStorage

## 🧪 Dados de Exemplo

### Método 1: Console do Navegador
```javascript
// Abra o console (F12) e execute:
SampleData.init()  // Cria 3 registros de exemplo
SampleData.show()  // Exibe dados atuais
SampleData.clear() // Limpa todos os dados
```

### Método 2: Manual
Cadastre manualmente usando os exemplos:

**Registro 1:**
```
Tag Busca: DG-5252025
Tag Report: FGS_DGY_5252025_SLG
ZSL: FGS_ZSL_5252025_EPT
ZSH: FGS_ZSH_5252025_EPT
Tempo T1: 5
Tempo T2: 6
```

**Registro 2:**
```
Tag Busca: DG-5252026
Tag Report: FGS_DGY_5252026_SLG
ZSL: FGS_ZSL_5252026_EPT
ZSH: FGS_ZSH_5252026_EPT
Tempo T1: 7
Tempo T2: 8
```

## 🛠️ Compatibilidade

- ✅ Internet Explorer 10+
- ✅ Windows Server 2008
- ✅ Navegadores modernos (Chrome, Firefox, Edge)
- ✅ Resolução mínima: 1024x768

## 📝 Observações Importantes

1. **Tag Busca é única:** Sistema impede cadastro de tags duplicadas
2. **Todos os campos obrigatórios:** Formulário não submete sem preencher
3. **Modal de confirmação:** Exclusões exigem confirmação para evitar erros
4. **Dados locais:** Enquanto não houver backend, dados ficam no navegador
5. **Sessão expira em 1 hora:** Faça login novamente se necessário

## 🔄 Fluxo de Trabalho Típico

1. **Login:** admin.html
2. **Listar:** Ver registros existentes
3. **Criar:** Adicionar novos registros de tags
4. **Editar:** Corrigir dados se necessário
5. **Testar:** Abrir index.html e verificar tags disponíveis
6. **Buscar:** Realizar buscas usando as tags cadastradas

## 📚 Documentação Adicional

- [Tag Formats Guide](tag-formats.md) - Detalhes sobre formatos
- [TASK.md](../TASK.md) - Histórico de implementação
- [Compatibility](compatibility.md) - Requisitos de compatibilidade

---

**Versão:** 1.0 - Tabela Unificada  
**Última atualização:** Abril 2026
