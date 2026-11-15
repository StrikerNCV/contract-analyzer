# AI Canvas — v1

| Dimensão | Proposta |
| --- | --- |
| Decisão/tarefa apoiada | Preparar a conferência de obrigações, multas e pontos que merecem perguntas |
| Valor da IA | Organizar linguagem contratual em categorias e síntese acessível com referências |
| Entrada | Texto extraído de PDF de prestação de serviços em português, com índice de páginas |
| Saída | Resumo e lista de achados tipados com citação/página; ausência ou impossibilidade de concluir explícita |
| Fonte de dados | Fixtures sintéticas criadas pelo POD; documentos reais somente após revisão de uso e política do provedor |
| Técnica proposta | LLM com instrução delimitada, JSON estruturado e validação de fontes no backend; sem treino próprio |
| Humano no circuito | POD anota gabarito e revisa falhas; usuário confere no original; especialista decide questões jurídicas |
| Erros de maior impacto | Inventar multa, omitir obrigação, trocar parte responsável, errar prazo/valor ou atribuir página falsa |
| Controles | Schema, evidência literal, limites, abstinência, teste de injeção, sem ferramentas e sem aconselhamento de assinatura |
| Avaliação | Precisão, cobertura e fontes válidas por categoria; amostra pequena explicitada; revisão humana do resumo |
| Operação | Medir latência/custo com modelo e prompt versionados; timeout; sem logs de conteúdo |
| Feedback | Registro voluntário de erro sem documento real; não reutilizar uploads para treinamento automaticamente |

Critério para trocar o modelo: falha persistente nas metas após ajustes mensurados do prompt, ou custo/latência acima do orçamento. Registrar decisão e benchmark em ADR. Provedor e condições de processamento ainda pendentes.
