# Avaliação inicial de IA

`cases.json`: oito casos curtos inteiramente sintéticos; não são contratos reais nem um benchmark jurídico. Incluem obrigação, multa, renovação, ausência de multa, página correta, instrução maliciosa, rescisão e duas partes.

O avaliador mede acerto exato de categoria/página/citação normalizada, com correspondência um a um. Citações extras/duplicadas são FP, omissões são FN e fonte inexistente reprova o gate. Esta métrica estrita não avalia equivalência semântica ou qualidade do resumo. Revisão humana continua necessária; uma citação verdadeira pode ter sido interpretada incorretamente.

## Executar quando houver integração

Gerar previsões com modelo real e adaptar cada evidência da saída para `{category, page, quote}`. Criar arquivo local ignorado `evals/predictions.local.json`:

```json
{
  "datasetVersion": "seed-v1",
  "model": "identificador-real-do-modelo",
  "promptVersion": "commit-ou-versao-do-prompt",
  "cases": [
    {"id": "obligation", "findings": [{"category":"obligation","page":1,"quote":"A contratada entregará relatório até o dia 5 de cada mês."}]}
  ]
}
```

Exemplo de formato, incompleto e ilustrativo. É obrigatório fornecer os oito casos exatamente uma vez, inclusive `findings: []` em casos sem achado. Não copiar gabarito e chamar de previsão do modelo.

```sh
npm run eval -- --predictions evals/predictions.local.json
```

Exit code 0 apenas com precisão ≥90%, cobertura ≥80% e fontes válidas 100%; erro de formato ou reprovação retorna 1. O comando sem arquivo falha intencionalmente. `npm run check` valida a integridade do dataset e testa o cálculo do avaliador com previsões artificiais, sem computar desempenho de IA.

Próxima etapa US-06: ≥10 contratos sintéticos completos, gabarito revisado por outro integrante, casos que cruzam páginas, conjunto de aceite separado do ajuste do prompt, qualidade de resumo, falhas, custo e latência. Nenhum desempenho de modelo foi medido nesta entrega.
