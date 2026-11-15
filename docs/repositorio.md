# Configuração do repositório remoto

Remoto criado: https://github.com/StrikerNCV/contract-analyzer. Base enviada e primeira CI concluída com sucesso em 2026-11-15. Visibilidade pública autorizada expressamente pelo usuário para permitir proteção de branch no plano disponível. Não armazenar tokens neste projeto.

## GitHub

O repositório foi criado inicialmente privado. A interface informou que a proteção não seria aplicada nesse plano; o usuário autorizou torná-lo público. Não há contratos reais ou credenciais no projeto. Novos documentos devem respeitar a visibilidade pública.

Para clonar em outro computador:

```sh
git clone https://github.com/StrikerNCV/contract-analyzer.git
cd contract-analyzer
node scripts/check.mjs
```

O checkout criado nesta preparação já possui `origin` configurado.

## Proteção da main

Em Settings → Branches ou Rulesets, criar regra para `main`:

- Exigir pull request e pelo menos uma aprovação de outro integrante.
- Descartar aprovações após novos commits e exigir resolução de conversas.
- Exigir o status check `quality` após a primeira execução do workflow CI.
- Bloquear force push e exclusão da branch; aplicar também a administradores quando disponível.
- Adicionar integrantes e professor somente depois de receber os respectivos usuários e autorização de convite.

Verificar o resultado na interface e registrar no diário. CI configurada em YAML não significa execução remota concluída; proteção descrita não significa proteção ativada.

## Tags

```sh
git tag -a checkpoint-02 -m "Checkpoint 02: preparacao de produto v1; discovery e aceite do POD pendentes"
git push origin checkpoint-02
```

A tag registra um snapshot e não atesta entrevistas ou revisão humana. Na preparação, seu conteúdo é a v1 e suas pendências explícitas. Depois de atualizações, preservar a tag original e combinar com o professor uma nova versão de entrega em vez de reescrever a evidência. `checkpoint-01` não deve ser criada retroativamente como evidência de uma aula anterior. Confirmar o prazo real no Classroom.
