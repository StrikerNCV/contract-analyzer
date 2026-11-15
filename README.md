# Contract Analyzer

Projeto do MBA — Software Engineering Project · Bootcamp.

Repositório: [StrikerNCV/contract-analyzer](https://github.com/StrikerNCV/contract-analyzer) · [Execuções da CI](https://github.com/StrikerNCV/contract-analyzer/actions).

**Proposta:** envie um contrato em PDF e receba uma síntese das cláusulas, obrigações, multas e pontos de atenção, com trechos e páginas para conferir no original.

**Fase:** preparação do checkpoint 02 — Produto. Documentação v1 elaborada para revisão do POD; discovery com usuários ainda pendente. O MVP ainda não está implementado.

## POD e papéis

| Integrante | Papel proposto | Responsabilidade |
| --- | --- | --- |
| Nicholas Capone Villela | Produto e discovery (proposto) | Entrevistas, escopo, PRD e aceite |
| André dos Santos | Engenharia e arquitetura (proposto) | Implementação, integração, LikeC4 e deploy |
| Roberto Antonio da Silva | Qualidade e IA (proposto) | Evals, testes, segurança e roteiro da demo |

Os nomes foram informados pelo usuário. A distribuição de papéis é uma proposta para confirmação do grupo. Os três integrantes revisam PRs e devem conseguir explicar o código.

## Comece por aqui

1. [Problema, solução e hipótese](docs/produto/problema-solucao.md).
2. [PRD v1](docs/produto/prd-v1.md).
3. [Histórias e critérios de aceite](docs/specs/historias.md).
4. [Checklist da aula 2](docs/produto/checklist-aula-02.md).
5. [Discovery: evidências e plano](docs/produto/discovery.md).

## Estrutura da disciplina

| Caminho | Conteúdo |
| --- | --- |
| `AGENTS.md` | Regras para agentes, limites e revisão humana |
| `docs/produto/` | Problema, Lean Canvas, AI Canvas, MoSCoW, PRD e discovery |
| `docs/specs/` | Histórias, aceite e contrato de saída da IA |
| `docs/adr/` | Decisões e propostas de arquitetura |
| `docs/diario/` | Diário por checkpoint |
| `docs/pitch/` | Planejamento do pitch, fonte Markdown e roteiro futuro |
| `architecture/` | Espaço do modelo LikeC4 C1/C2 no checkpoint 04 |
| `prototype/` | Espaço das telas e testes com usuários no checkpoint 03 |
| `evals/` | Casos sintéticos iniciais e avaliador de previsões |
| `src/` | Espaço do código do MVP no checkpoint 05 |
| `.github/` | CI e templates de issues/PR |

## Verificações locais

Requisito: Node.js 22 ou superior. Não há dependências externas nesta fase.

```sh
npm run check
npm run eval -- --predictions caminho/para/previsoes.json
```

O primeiro comando confere artefatos, links locais e dados de avaliação. O segundo compara previsões reais com o conjunto sintético; sem previsões ele falha, evitando divulgar uma taxa de acerto inventada. Não há análise de PDF nem chamada a modelo nesta entrega.

Se `npm` não estiver disponível, use `node scripts/check.mjs` e `node evals/evaluate.mjs --predictions caminho/para/previsoes.json`.

## Governança e checkpoints

- Trabalhar em branches e integrar por PR com revisão de outro integrante e CI verde; ver [CONTRIBUTING.md](CONTRIBUTING.md).
- Ativar proteção remota da `main` conforme [guia de configuração](docs/repositorio.md). A existência deste arquivo não ativa a proteção.
- Usar tags `checkpoint-01` a `checkpoint-06` para registrar o estado real de cada entrega. `checkpoint-02` registra esta preparação v1 com discovery e aceite do POD pendentes. Não criar tags retroativas para simular uma entrega anterior.
- [Diário do checkpoint 02](docs/diario/checkpoint-02.md) registra esta preparação e suas pendências.

## MVP e demonstração

URL pública: **ainda não disponível**, prevista para o checkpoint 05.

Recorte proposto: contratos de prestação de serviços, em português, PDF com texto selecionável, até 20 páginas e 10 MB. Saída informativa para conferência humana; não emitir parecer jurídico nem recomendar assinatura automática. Somente documentos sintéticos na demonstração inicial.

## Próximas decisões do POD

Confirmar papéis; validar a persona e a dor; aprovar o recorte; coletar discovery; escolher stack/provedor com um teste técnico; revisar e aceitar a v1 do PRD.
