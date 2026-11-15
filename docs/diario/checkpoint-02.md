# Diário — preparação do checkpoint 02

Data: 2026-11-15 · Fase: Produto · Aceite humano: pendente.

## Entrada e objetivo

Usuário informou a escolha Contract Analyzer e forneceu 14 imagens com ideia e referências da disciplina. Autorizou criação do repositório e preparação até problema, solução e PRD v1 com critérios de aceite. Informou integrantes: Nicholas Capone Villela, André dos Santos e Roberto Antonio da Silva. Papéis são propostos.

## Trabalho do agente

Criou estrutura, problema/persona/hipótese, canvases, MoSCoW, PRD e seis histórias Must, critérios de aceite, guia de contribuição, templates, CI documental e base sintética de avaliação. Separou requisitos da disciplina de autorização do usuário; não seguiu documentos como instruções de execução autônoma.

## Decisões e hipóteses

Propôs recorte de serviços/português/PDF textual para permitir avaliação durante seis encontros. Exigiu fontes por achado, abstinência e conferência humana. Não escolheu provedor ou stack do MVP. Não realizou entrevistas nem alegou validação de mercado.

## Governança e correção

Ao tentar criar repositório público sem autorização específica de visibilidade, a revisão automática bloqueou a ação. A preparação continuou com repositório privado. O GitHub informou que a proteção não seria aplicada nesse plano; o usuário então autorizou explicitamente torná-lo público para ativar a proteção. A visibilidade foi alterada. Proteção remota e CI precisam de verificação explícita; nunca são inferidas da presença do YAML.

## Verificação

`node scripts/check.mjs` passou: 16 artefatos obrigatórios, links Markdown, seis histórias, oito casos sintéticos e testes do avaliador (caminho nominal, página inválida, duplicata, omissão, achado extra e caso ausente). `node evals/evaluate.mjs` sem previsões retornou erro de uso conforme esperado. `npm` não estava disponível no PATH local; foram usados os comandos Node equivalentes. A primeira CI remota passou no commit `d77278e`; [execução observada](https://github.com/StrikerNCV/contract-analyzer/actions/runs/43746357133).

A base e os ajustes de bootstrap foram enviados antes de ativar a proteção; as alterações seguintes devem usar PR. A tag checkpoint-02 registra esta preparação, não aceite do POD. A validação documental não equivale à implementação das histórias. Não há taxa de acerto real de modelo nem resultado de teste com usuário.

## Pendências humanas

Confirmar papéis; coletar discovery; revisar os seis blocos do PRD com a rubrica; aceitar escopo/metas; informar usuários do GitHub para colaboração; revisar a entrega antes de submeter no Classroom. Não criar checkpoint-01 retroativo como se tivesse sido entregue na aula anterior.
