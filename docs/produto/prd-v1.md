# PRD v1 — Contract Analyzer

Versão: 1.0 · Data: 2026-11-15 · Status: proposta pronta para revisão do POD.

Responsáveis: papéis propostos no README; pessoas a confirmar. Referências: imagens da disciplina fornecidas pelo usuário e ideia “Contract Analyzer”. Não foram fornecidos nomes oficiais dos seis pilares do PRD; os seis blocos abaixo são uma organização proposta, sujeita à rubrica do professor.

## 1. Contexto, problema e público

Responsáveis operacionais de pequenas empresas de serviços precisam conferir obrigações, prazos e multas em contratos recebidos em PDF. A hipótese é que localizar e consolidar essas informações demanda esforço e pode deixar pontos sem conferência. Não houve entrevista ou medição de baseline.

Persona e job to be done: [problema e solução](problema-solucao.md). Primeiro domínio: contratos de prestação de serviços em português. Fora do público inicial: especialistas buscando pesquisa jurídica, contratos trabalhistas/imobiliários e operações em múltiplas jurisdições.

## 2. Objetivo, valor e resultados esperados

Entregar uma primeira leitura rastreável que ajude a pessoa a localizar e conferir informações no original. A IA transforma texto em resumo estruturado; o humano verifica e decide.

| Indicador | Como medir | Meta proposta |
| --- | --- | --- |
| Tempo para responder cinco perguntas sobre o contrato | Teste alternado PDF versus protótipo, mesma dificuldade | Redução mediana ≥30% em ≥2 participantes |
| Correção das tarefas | Gabarito prévio dos contratos sintéticos | ≥4/5 por participante |
| Precisão dos achados | TP/(TP+FP), anotação humana congelada | ≥90% |
| Cobertura dos achados esperados | TP/(TP+FN), mesma anotação | ≥80% |
| Rastreabilidade | Achados com página e trecho literal válidos / total de achados | 100% |
| Tempo de análise ponta a ponta | Dez execuções do corpus com ambiente/modelo registrados, sem cache | p95 ≤60 s |

Metas de produto ainda não medidas. O avaliador inicial em `evals/` cobre apenas extração estruturada de um conjunto sintético pequeno, sem equivaler à qualidade de resumo ou segurança jurídica.

## 3. Solução, jornada e escopo

Aplicação web: usuário abre página → recebe explicação e limites → envia PDF → confirma envio ao provedor informado → acompanha processamento → lê resumo, obrigações, multas e pontos de atenção → confere fontes → encerra sessão.

MVP: um documento por sessão; PDF de 1 a 20 páginas, até 10 MB, com texto selecionável, sem senha, em português. PDF digitalizado, idioma não suportado, arquivo inválido ou texto insuficiente geram mensagem clara e não geram análise.

Categorias: objeto/partes/vigência no resumo; obrigações das partes; prazos explicitamente associados; multas e seus gatilhos; pontos de atenção como renovação automática e rescisão, quando presentes. Ausências aparecem como “não localizado no texto analisado”, sem concluir inexistência jurídica.

Não haverá score jurídico de risco, conclusão sobre validade, aconselhamento para assinar, edição/assinatura de contrato, chat aberto, comparação de versões, OCR, busca na legislação, login/histórico ou cobrança neste MVP. Prioridades: [MoSCoW](moscow.md).

## 4. Requisitos funcionais e critérios de aceite

As histórias [US-01 a US-06](../specs/historias.md) são a especificação detalhada e rastreável.

| ID | Comportamento esperado | História | Aceite mínimo |
| --- | --- | --- | --- |
| RF-01 | Receber e validar um PDF | US-01 | Recusar limites excedidos, senha, formato falso ou texto indisponível sem chamar IA |
| RF-02 | Informar processamento e permitir encerramento | US-02 | Estados claros, timeout e repetição sem duplicação |
| RF-03 | Produzir resumo estruturado em português | US-03 | Separar resumo, obrigações, multas e atenção; ausências explícitas |
| RF-04 | Permitir conferir cada achado | US-04 | Página 1-based e citação literal do texto extraído; rejeitar item sem fonte válida |
| RF-05 | Manter a pessoa no controle dos dados | US-05 | Informar destinatário antes do envio e limpar sessão no encerramento/TTL |
| RF-06 | Avaliar a IA com casos versionados | US-06 | Métricas reproduzíveis e casos negativos; nenhuma taxa sem execução real |

Contrato de saída: [especificação de análise](../specs/saida-ia.md). Erros do provedor, JSON inválido e fonte inválida não devem produzir um relatório apresentado como concluído.

## 5. Qualidade, IA, dados e restrições

- Backend guarda segredos; nenhuma chave no navegador. Validar arquivo por conteúdo e parser, além de extensão/MIME declarado.
- Pipeline mantém mapeamento de texto por página. Trechos serão validados no texto extraído após normalização de espaços, sem mudar palavras ou números.
- Documento é entrada não confiável: não pode alterar instruções, acionar ferramentas ou solicitar segredos. O modelo não possui acesso a ferramentas externas neste fluxo.
- Logs apenas de metadados técnicos sem nomes de arquivo, texto, dados das partes ou corpo de requisições/respostas.
- Proposta de retenção: nenhum arquivo/texto persistido pela aplicação; processar em sessão, limpar ao encerrar e expirar após 30 minutos de inatividade. Política do provedor deve ser verificada antes de aceitar documentos reais; não prometer retenção zero pelo provedor sem evidência.
- Informar finalidade, provedor e política antes de envio. Começar com contratos sintéticos; aprovação de uso real depende de revisão de dados pelo POD.
- Usabilidade: operação por teclado, rótulos de formulário, foco visível, status anunciado e texto além de cor para comunicar erros.
- Falhas: timeout de 60 segundos encerra a tentativa com opção de repetir; PDF rejeitado não consome chamada de IA; evitar reenvio automático que duplique custos.
- Meta inicial de custo: teto configurável por sessão, proposto em R$ 1,00 por documento. Medir e revisar após escolher modelo; bloquear antes do envio se o orçamento estimado exceder o teto.

Não há decisão final de tecnologia/modelo/hospedagem. Proposta: frontend e API web, parser de PDF e adaptador de LLM; detalhamento e LikeC4 no checkpoint 04.

## 6. Entrega, validação e riscos

| Checkpoint | Entrega | Estado nesta preparação |
| --- | --- | --- |
| 01 — Times e desafio | POD, Lean Canvas, hipótese, base de PRD, AGENTS | Artefatos recuperados nesta preparação; nomes e entrega histórica não comprovados |
| 02 — Produto | Discovery, AI Canvas, MoSCoW, histórias e PRD v1 | Documentos preparados; entrevistas e aceite humano pendentes |
| 03 — Protótipo | Telas HTML testadas com ≥2 usuários e ADR de design | Planejado |
| 04 — Design C1/C2 | LikeC4 e walking skeleton acessível | Planejado |
| 05 — MVP | Fluxo ponta a ponta em URL pública | Planejado |
| 06 — Pitch | Demo, negócio e making of agêntico | Planejado |

Riscos principais: informação inventada (fontes obrigatórias e abstinência); pessoa confiar sem conferir (interface com fonte e teste de compreensão); vazamento (dados sintéticos, sessão temporária e revisão do provedor); PDF sem texto (rejeição explícita); escopo amplo (um domínio/idioma); latência/custo (limites e benchmark); descoberta insuficiente (entrevistas antes de compromisso com escopo final).

**Aceite do produto para o MVP:** todas as histórias Must aprovadas por outro integrante, testes de erro e injeção passando, metas de precisão/cobertura/fontes medidas, fluxo principal demonstrável em URL pública e README atualizado. Uma CI verde documental não satisfaz esse aceite.

**Aceite desta v1:** POD revisa persona, recorte, metas e histórias; registra objeções e decisão no diário. Lacunas que impedem afirmar conclusão integral do checkpoint 02: evidências primárias de discovery, integrantes/papéis e revisão humana.

Mudanças de escopo devem atualizar versão, histórias, diário e ADR quando houver decisão técnica. Esta v1 não representa validação de mercado nem parecer jurídico.
