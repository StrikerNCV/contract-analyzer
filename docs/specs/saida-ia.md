# Contrato de saída da IA — proposta v1

Requisição do backend contém páginas numeradas e delimitadas como dados não confiáveis. Nenhuma chave, instrução interna ou ferramenta é oferecida ao modelo. Modelo e prompt são registrados por versão técnica, sem conteúdo do contrato em logs.

```json
{
  "summary": [
    {
      "text": "Prestação de suporte técnico.",
      "evidence": [{"page": 1, "quote": "O objeto é a prestação de suporte técnico."}]
    }
  ],
  "findings": [
    {
      "category": "obligation",
      "text": "A contratada entrega relatório mensal.",
      "party": "contratada",
      "deadline": "até o dia 5 de cada mês",
      "amount": null,
      "evidence": [{"page": 2, "quote": "A contratada entregará relatório até o dia 5 de cada mês."}]
    }
  ],
  "notLocated": ["penalty"],
  "limitations": []
}
```

Exemplo inteiramente sintético; não é uma previsão real. Categorias permitidas: `obligation`, `penalty`, `attention`. `summary` e `findings` exigem texto e uma ou mais evidências. `party`, `deadline` e `amount` são texto ou null; não inferir valores ausentes. `notLocated` indica categorias não localizadas, não inexistência da obrigação. Rejeitar conflito entre categoria presente e a mesma categoria em `notLocated`.

Backend valida schema fechado, tipos, limites de tamanho, páginas e citação literal por evidência. Rejeitar campos desconhecidos e resposta inválida. Evidência textual não garante correção semântica: revisão humana e evals também verificam se a explicação é sustentada pelo trecho.

UI deve tratar toda saída como texto, sem executar HTML/Markdown ativo. Não usar um score global. Só apresentar análise concluída após todas as validações; se falhar, apresentar erro e opção explícita de repetir.

O formato reduzido das previsões em `evals/` serve ao avaliador inicial. Não é a API final nem prova de conformidade completa com este contrato.
