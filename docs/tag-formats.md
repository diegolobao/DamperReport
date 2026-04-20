# Guia de Formatos de Tags - DamperReport

## 📋 Campos e Formatos

### 1. Tag Busca
**Formato:** `XX-XXXXXXX` (com hífen)  
**Exemplo:** `DG-5252025`  
**Descrição:** Tag principal usada para busca de relatórios  
**Regras:**
- Prefixo de 2 letras
- Hífen separador
- Sequência numérica de 7 dígitos

---

### 2. Tag Report  
**Formato:** `XXX_XXX_XXXXXXX_XXX` (com underline)  
**Exemplo:** `FGS_DGY_5252025_SLG`  
**Descrição:** Tag completa do relatório  
**Regras:**
- 4 partes separadas por underline (_)
- Primeira parte: 3 letras (cód sistema)
- Segunda parte: 3 letras (cód tipo)
- Terceira parte: 7 dígitos (número)
- Quarta parte: 3 letras (cód categoria)

---

### 3. ZSL (Zero Span Low)
**Formato:** `XXX_ZSL_XXXXXXX_XXX`  
**Exemplo:** `FGS_ZSL_5252025_EPT`  
**Descrição:** Configuração ZSL vinculada ao relatório  
**Regras:**
- Segue padrão similar ao Tag Report
- Segunda parte sempre "ZSL"

---

### 4. ZSH (Zero Span High)
**Formato:** `XXX_ZSH_XXXXXXX_XXX`  
**Exemplo:** `FGS_ZSH_5252025_EPT`  
**Descrição:** Configuração ZSH vinculada ao relatório  
**Regras:**
- Segue padrão similar ao Tag Report
- Segunda parte sempre "ZSH"

---

### 5. Tempo T1
**Formato:** Número inteiro  
**Exemplo:** `5`  
**Descrição:** Tempo de configuração T1 (em unidades definidas)  
**Regras:**
- Somente números inteiros
- Valor mínimo: 0

---

### 6. Tempo T2
**Formato:** Número inteiro  
**Exemplo:** `6`  
**Descrição:** Tempo de configuração T2 (em unidades definidas)  
**Regras:**
- Somente números inteiros
- Valor mínimo: 0

---

## 📊 Exemplo Completo de Registro

```
ID: 1
Tag Busca: DG-5252025
Tag Report: FGS_DGY_5252025_SLG
ZSL: FGS_ZSL_5252025_EPT
ZSH: FGS_ZSH_5252025_EPT
Tempo T1: 5
Tempo T2: 6
```

---

## ⚠️ Validações

### Tag Busca
- ✅ Formato correto: `DG-5252025`
- ❌ Sem hífen: `DG5252025`
- ❌ Mais de um hífen: `DG-52-52025`

### Tag Report, ZSL, ZSH
- ✅ Formato correto: `FGS_DGY_5252025_SLG`
- ❌ Sem underline: `FGSDGY5252025SLG`
- ❌ Partes faltando: `FGS_DGY_5252025`

### Tempos
- ✅ Número inteiro: `5`, `10`, `100`
- ❌ Decimal: `5.5`, `10.25`
- ❌ Negativo: `-5`
- ❌ Texto: `cinco`

---

## 🔍 Onde os Campos são Usados

### Tag Busca
- **Página de Busca:** Dropdown de seleção principal
- **Página Admin:** Campo único por registro (não pode duplicar)

### Tag Report, ZSL, ZSH
- **Página Admin:** Campos de configuração técnica
- **Relatórios:** Identificação completa do sistema

### Tempo T1 e T2
- **Página Admin:** Parâmetros de tempo
- **Relatórios:** Configurações de processamento

---

## 💾 Armazenamento

**Atual:** localStorage (`damper_admin_data`)  
**Futuro:** Banco de dados (.db)

**Chave de armazenamento:**
```javascript
{
  id: number,
  tag_busca: string,
  tag_report: string,
  zsl: string,
  zsh: string,
  tempo_t1: number,
  tempo_t2: number
}
```

---

## 🛠️ Como Inicializar Dados de Teste

1. Abra o console do navegador (F12)
2. Certifique-se que `init-sample-data.js` está carregado
3. Execute:
   ```javascript
   SampleData.init()  // Inicializar 3 registros de exemplo
   SampleData.show()  // Ver dados atuais
   SampleData.clear() // Limpar todos os dados
   ```

---

**Última atualização:** Abril 2026  
**Versão:** 1.0 - Tabela Unificada
