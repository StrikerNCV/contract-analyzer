# ADR 0001 — Recorte e direção técnica

Status: proposta para revisão do POD · Data: 2026-11-15.

## Contexto

Seis encontros exigem produto, protótipo, arquitetura como código e fluxo público. A fase atual é Produto; escolher toda a stack antes do discovery pode consolidar suposições erradas.

## Proposta

Limitar o MVP a contratos de prestação de serviços em português, PDF textual, uma sessão por documento. Separar interface web, API com validação/extração paginada, adaptador de modelo e validação de saída. Evitar banco/histórico nesta primeira versão. Escolher tecnologias após um spike com PDFs sintéticos e medição de custo/latência.

## Alternativas

Chat genérico com upload: rápido para explorar, porém dificulta controle de schema, fontes e isolamento. OCR e vários domínios: maior alcance, com mais variação e avaliação. Regras fixas: úteis em validações determinísticas, insuficientes como única estratégia para síntese em linguagem natural.

## Consequências

Menos casos suportados e ausência de histórico; maior foco em fonte e conferência. Processamento temporário exige isolamento e TTL no servidor. Limites, privacidade e política do provedor precisam de teste antes do uso real.

## Como aprovar

Registrar responsável, decisão do POD e evidências de spike aqui. No checkpoint 04, produzir C1 e C2 em LikeC4 com nomes coerentes com o código. Esta proposta ainda não constitui arquitetura validada.
