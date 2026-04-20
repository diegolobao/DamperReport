/**
 * init-sample-data.js
 * Script para inicializar dados de exemplo no localStorage
 * Execute este script no console do navegador para popular dados de teste
 */

(function() {
    'use strict';

    var sampleData = [
        {
            id: 1,
            tag_busca: 'DG-5252025',
            tag_report: 'FGS_DGY_5252025_SLG',
            zsl: 'FGS_ZSL_5252025_EPT',
            zsh: 'FGS_ZSH_5252025_EPT',
            tempo_t1: 5,
            tempo_t2: 6
        },
        {
            id: 2,
            tag_busca: 'DG-5252026',
            tag_report: 'FGS_DGY_5252026_SLG',
            zsl: 'FGS_ZSL_5252026_EPT',
            zsh: 'FGS_ZSH_5252026_EPT',
            tempo_t1: 7,
            tempo_t2: 8
        },
        {
            id: 3,
            tag_busca: 'DG-5252027',
            tag_report: 'FGS_DGY_5252027_SLG',
            zsl: 'FGS_ZSL_5252027_EPT',
            zsh: 'FGS_ZSH_5252027_EPT',
            tempo_t1: 4,
            tempo_t2: 5
        }
    ];

    /**
     * Inicializa dados de exemplo
     */
    function initSampleData() {
        try {
            localStorage.setItem('damper_admin_data', JSON.stringify(sampleData));
            console.log('✅ Dados de exemplo inicializados com sucesso!');
            console.log('Total de registros:', sampleData.length);
            console.table(sampleData);
            return true;
        } catch (e) {
            console.error('❌ Erro ao inicializar dados:', e);
            return false;
        }
    }

    /**
     * Limpa dados do localStorage
     */
    function clearData() {
        try {
            localStorage.removeItem('damper_admin_data');
            console.log('�� Dados limpos com sucesso!');
            return true;
        } catch (e) {
            console.error('❌ Erro ao limpar dados:', e);
            return false;
        }
    }

    /**
     * Exibe dados atuais
     */
    function showData() {
        try {
            var data = localStorage.getItem('damper_admin_data');
            if (!data) {
                console.log('ℹ️ Nenhum dado encontrado no localStorage');
                return;
            }
            var records = JSON.parse(data);
            console.log('📊 Dados atuais no localStorage:');
            console.log('Total de registros:', records.length);
            console.table(records);
        } catch (e) {
            console.error('❌ Erro ao exibir dados:', e);
        }
    }

    // Expor funções globalmente
    window.SampleData = {
        init: initSampleData,
        clear: clearData,
        show: showData
    };

    console.info('[SAMPLE DATA] Script carregado. Use:');
    console.info('  SampleData.init()  - Inicializar dados de exemplo');
    console.info('  SampleData.show()  - Exibir dados atuais');
    console.info('  SampleData.clear() - Limpar dados');

})();
