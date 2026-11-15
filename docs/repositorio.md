# Configuração do repositório remoto

Estado inicial: repositório local preparado; criação remota, push e proteção devem ser verificados separadamente. Não armazenar tokens neste projeto.

## GitHub

Criar `contract-analyzer` na conta ou organização do POD, inicialmente privado. Caso a conta não permita proteção em repositório privado, discutir visibilidade/plano com o POD; não publicar dados privados para contornar a limitação.

Após autenticar e criar o remoto vazio:

```sh
git remote add origin https://github.com/SEU_USUARIO/contract-analyzer.git
git push -u origin main
```

Substitua o endereço pelo remoto real. Se já existir `origin`, confira antes de alterar.

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
git tag -a checkpoint-02 -m "Checkpoint 02: produto revisado pelo POD"
git push origin checkpoint-02
```

Executar somente no commit efetivamente aceito para entrega. `checkpoint-01` não deve ser criada retroativamente como evidência de uma aula anterior. A data/horário dos slides é referência da disciplina; confirmar o prazo real no Classroom.
