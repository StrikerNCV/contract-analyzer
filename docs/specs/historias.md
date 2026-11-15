# Histórias de usuário e critérios de aceite — v1

Todas são Must do MVP. Status: especificadas, não implementadas. Cada cenário deve virar teste ou roteiro de aceite verificável. Pessoa do POD diferente do autor aprova a evidência.

## US-01 — Enviar um documento suportado (RF-01)

Como responsável operacional, quero enviar um contrato suportado para iniciar uma conferência.

- AC-01.1 Dado PDF textual em português de 1–20 páginas, até 10 MB (10.000.000 bytes), sem senha, quando selecionado e validado pelo parser, então a interface mostra tamanho/páginas e permite confirmar o processamento.
- AC-01.2 Dado arquivo de outro tipo, inclusive renomeado para `.pdf`, quando validado, então ele é recusado com orientação e nenhuma chamada à IA ocorre.
- AC-01.3 Dado PDF com 21 páginas ou 10.000.001 bytes, quando enviado, então é recusado com indicação do limite excedido. Valores exatamente no limite são aceitos se os demais critérios forem atendidos.
- AC-01.4 Dado PDF protegido, corrompido, vazio, digitalizado sem texto ou em outro idioma, quando validado, então é recusado com motivo específico e sem produzir resumo. Texto insuficiente: menos de 100 caracteres não brancos no documento.
- AC-01.5 Dado documento com página sem texto entre páginas textuais, então a paginação original é preservada e a página vazia é sinalizada; não se afirma análise de conteúdo visual. PDFs com conteúdo parcialmente digitalizado devem exibir a limitação e exigir outro arquivo completo para análise.

Evidência: fixtures válidas e inválidas, limites, parser sem chamada ao adaptador de IA para entradas recusadas. A detecção de idioma e conteúdo parcialmente digitalizado requer spike técnico; se não for confiável, reduzir explicitamente o suporte e atualizar o PRD antes do aceite.

## US-02 — Entender andamento e falhas (RF-02)

Como usuário, quero saber se a análise está em andamento e como agir quando falhar.

- AC-02.1 Dado envio confirmado, quando inicia a análise, então há estados “validando”, “analisando”, “concluído” ou “falhou”, anunciados para leitores de tela; clicar repetidamente não cria solicitações duplicadas.
- AC-02.2 Dado provedor indisponível, erro de parser, JSON inválido ou fonte inválida, quando a tentativa termina, então há mensagem compreensível, sem stack trace/conteúdo do contrato, e o relatório não aparece como concluído.
- AC-02.3 Dado processamento sem conclusão em 60 segundos, então o backend encerra a tentativa e oferece repetição explícita, sem reenvio automático.
- AC-02.4 Dada tentativa encerrada, quando chega resposta atrasada, então ela é descartada e não substitui o estado de uma nova tentativa.

Evidência: falhas simuladas do provedor/parser, relógio controlado, duplo clique e resposta tardia. Dependência: US-01.

## US-03 — Ler a síntese (RF-03)

Como usuário, quero resumo e achados separados para localizar informações relevantes.

- AC-03.1 Dado contrato sintético com objeto, partes, vigência, obrigação, multa e rescisão, quando analisado, então o relatório contém seções de resumo, obrigações, multas e pontos de atenção em português, com fontes para cada afirmação factual.
- AC-03.2 Dado contrato sem multa explícita, então a seção informa “multa não localizada no texto analisado” e não inventa percentual, valor ou conclusão de que não há multa em nenhum contexto.
- AC-03.3 Dado prazo/valor ambíguo, então a ambiguidade é indicada; não converter dias úteis em corridos, inventar datas ou calcular valores sem base explícita.
- AC-03.4 Dada instrução maliciosa dentro do contrato, então ela não altera formato/regras, não executa ferramentas nem revela instruções internas; o relatório só considera conteúdo contratual.
- AC-03.5 Dada saída sem evidência de uma afirmação, então a validação falha e não entrega essa afirmação como fato. O sistema nunca mostra recomendação de assinatura ou score de validade legal.

Evidência: corpus anotado, caso sem multa, ambiguidade e prompt injection; revisão humana da legibilidade e fidelidade do resumo. Dependências: US-01, US-02, US-04.

## US-04 — Conferir no original (RF-04)

Como usuário, quero acessar o trecho e a página de cada achado para conferir a síntese.

- AC-04.1 Dado achado exibido, então contém categoria, explicação, citação literal e página inteira entre 1 e o total original. Partes, prazos e valores só aparecem quando sustentados por fonte.
- AC-04.2 Dada citação, quando normalizados apenas os espaços, então ela existe na página indicada; citação inventada, página errada ou evidência vazia fazem a validação falhar.
- AC-04.3 Dado item apoiado em várias páginas, então cada evidência informa sua própria página; não juntar fragmentos descontínuos como uma citação única literal.
- AC-04.4 Dado usuário operando por teclado, então consegue chegar à fonte, ler trecho e página com foco visível; a classificação não depende apenas de cor. Visualizador com salto direto é Should, não condição do Must.

Evidência: teste automatizado de correspondência, numeração original e roteiro por teclado. Dependência: extração paginada da US-01.

## US-05 — Controlar processamento e sessão (RF-05)

Como usuário, quero entender onde o contrato será processado e encerrar sua sessão.

- AC-05.1 Antes da chamada ao provedor, então a interface informa finalidade, nome do provedor, política de retenção conhecida, limites de uso e caráter informativo; exige confirmação explícita. Sem confirmação, nenhum texto é enviado ao provedor.
- AC-05.2 Dado encerramento da sessão, então arquivo, texto e resultado temporários da aplicação são apagados/invalidados e não podem ser recuperados por URL ou identificador anterior.
- AC-05.3 Dada sessão inativa por 30 minutos, então a mesma limpeza ocorre; a expiração é aplicada no servidor, não apenas no navegador.
- AC-05.4 Dadas duas sessões simultâneas, então uma não acessa dados da outra por troca de identificador; não registrar conteúdo nem chaves nos logs.
- AC-05.5 Dada política de retenção do provedor ainda não verificada, então a aplicação bloqueia uso de documentos reais e identifica o modo de demonstração com dados sintéticos. Apagar sessão não é apresentado como apagar dados do provedor.

Evidência: interceptação da chamada antes/depois da confirmação, isolamento, expiração, limpeza e inspeção de logs. Dependências: escolha do provedor e ADR de dados antes do uso real.

## US-06 — Medir a qualidade da IA (RF-06)

Como POD, quero comparar saídas com casos anotados para detectar regressões antes de entregar.

- AC-06.1 Dado conjunto congelado de contratos sintéticos com casos positivos, ausência e injeção, quando executado, então resultados incluem versão de dataset/prompt/modelo, totais e métricas, sem dados reais.
- AC-06.2 Dadas previsões, então o avaliador calcula precisão TP/(TP+FP), cobertura TP/(TP+FN) e taxa de fontes válidas, incluindo achados extras como FP e esperados ausentes como FN; casos ausentes/IDs duplicados são erro de execução.
- AC-06.3 Dados limiares do PRD, então resultado abaixo de precisão 90%, cobertura 80% ou fontes válidas 100% reprova o gate. Não há métrica quando nenhuma previsão foi fornecida.
- AC-06.4 Dado resultado, então o POD revisa manualmente fidelidade do resumo, troca de partes/valores/prazos e possíveis omissões que o avaliador inicial não cobre.
- AC-06.5 Antes do aceite do MVP, ampliar de casos unitários a pelo menos 10 contratos sintéticos completos, com gabarito revisado por outro integrante e ao menos um achado cruzando páginas. Separar conjunto usado para ajustar prompt do conjunto de aceite.

Evidência: execução real com previsões, artefato de métricas e registro de revisão. A base criada no checkpoint 02 ainda não satisfaz toda a US-06.
