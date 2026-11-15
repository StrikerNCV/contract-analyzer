# Arquitetura — checkpoint 04

Reservado para modelo LikeC4 C1 e C2 versionado. Nenhum modelo final foi criado na fase de Produto.

Direção proposta: usuário → aplicação web → API de processamento → provedor de IA; API extrai texto por página, valida fontes e encerra dados da sessão. Revisar fronteiras, protocolos, isolamento e implantação no spike. Ver `docs/adr/0001-recorte-e-arquitetura.md`.

Aceite futuro: C1 mostra pessoas e sistemas externos; C2 mostra containers, responsabilidades e relações; modelo compila e corresponde ao walking skeleton em URL pública. Tecnologia e versão do LikeC4 devem ser fixadas na implementação.
