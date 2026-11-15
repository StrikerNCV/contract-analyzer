# Problema, solução e hipótese

## Problema proposto

Responsáveis por pequenas empresas de serviços recebem contratos em PDF e precisam identificar rapidamente o que foi combinado, quem deve fazer o quê, prazos e consequências de descumprimento. A leitura manual pode exigir releituras e dificultar a localização de informações antes de encaminhar dúvidas para um especialista.

Esta dor é uma hipótese do produto, não resultado de entrevistas. Não há dados coletados sobre frequência, tempo gasto ou disposição a pagar.

## Persona inicial — hipótese

Pessoa responsável por operações/administrativo de pequena prestadora de serviços, que revisa contratos recebidos de clientes e reúne dúvidas para decisão com a liderança e, quando necessário, assessoria jurídica. Possui familiaridade básica com navegador e PDF; não precisa conhecer ferramentas de IA.

Job to be done: “Quando recebo um contrato de prestação de serviços, quero localizar obrigações, prazos e multas com suas fontes, para preparar uma conferência e perguntas antes de decidir os próximos passos.”

## Alternativas e limitações a investigar

Leitura manual, busca no PDF, planilha de obrigações, envio a assessoria e chat genérico com IA são alternativas presumidas. Investigar o que a persona usa hoje e em que situações a alternativa resolve bem o problema. Não há benchmark competitivo realizado.

## Solução proposta

Uma aplicação web que recebe um PDF textual e produz uma síntese estruturada em português. Cada item informa categoria, explicação simples, trecho literal e página. A pessoa pode voltar à fonte para conferir; informação ausente é sinalizada e não completada pelo modelo.

Fluxo: escolher PDF → validar limites e confirmar processamento → extrair texto por página → analisar → exibir resumo e achados com fonte → conferir → encerrar e apagar a sessão.

## Hipótese testável

“Acreditamos que responsáveis por pequenas empresas de serviços conseguirão localizar obrigações e multas de um contrato sintético com menos tempo usando um resumo com referências do que usando somente o PDF, mantendo a correção das respostas.”

Experimento inicial: pelo menos dois participantes compatíveis com a persona, dois contratos sintéticos equivalentes e tarefas alternadas entre leitura direta e protótipo para reduzir efeito de aprendizagem. Registrar tempo, conclusão correta, dificuldade de localizar a fonte e percepção de utilidade. Amostra exploratória, sem inferência estatística.

Sinal inicial desejado: ambos localizam as fontes, pelo menos 4 de 5 tarefas corretas por participante, e redução mediana de tempo de pelo menos 30%. São metas propostas, não resultados. Se não houver melhora ou a confiança dispensar leitura da fonte, revisar a proposta e a interface antes de ampliar o MVP.
