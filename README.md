# Flowit CRM Profissionais

A proposta é um “mini CRM”, ou seja, uma forma de o profissional organizar seus clientes, seu faturamento e agenda.

Um dos grandes problemas é que muitos ainda usam agenda de papel, seja pela opção em não usar a agenda no sistema do salão que trabalham, ou porque o salão é pequeno e não possui um sistema de gestão. Porém, a maioria possui um smartphone e já usam o dispositivo como ferramenta de trabalho (divulgação no Instagram e Facebook, por exemplo), então existe oportunidade para um app.

Por exemplo, um profissional nunca tem uma resposta clara, baseada em dados, sobre seus clientes. Ele não vai saber quantos clientes atendeu no último mês, quantos eram novos, ou quantos clientes fiéis ele perdeu no período. Normalmente, esse conhecimento é empírico.

Mesmo com adaptações disponíveis (usar uma planilha no celular, ou até mesmo alguns aplicativos simples de registros de dados), existe a resistência também no controle. São várias barreiras: tempo para o gerenciamento das informações, falta de confiabilidade no sistema escolhido, dificuldade de uso, limitações em visualizar os benefícios a longo prazo na utilização de uma aplicação de gestão.

Por isso, a disposição das informações e funções que o app pode desempenhar devem ser visíveis e sem jargões administrativos. O objetivo é que o profissional se sinta confortável em manter um controle sistemático da sua base de clientes e faturamento.

## Estrutura

O repositório está dividido em três módulos: servidor web (Django), frontend (React) e app (React Native). O ideal seria criar uma biblioteca de componentes e estilos que possa ser compartilhada entre o frontend e o app, já que ambos usam React.

### Docker

A ideia é usar o Docker tanto no servidor web quanto para servir o frontend (usando como base uma imagem do Nginx). Cada módulo deve ficar em seu próprio container!
Sobre a elevação de segurança no Docker, o ideal é sempre usar com `sudo`:

[Post-installation steps for Linux](https://docs.docker.com/install/linux/linux-postinstall/)

[Docker security](https://docs.docker.com/engine/security/security/#/docker-daemon-attack-surface)

### Servidor Web (Django)

O projeto em Django usa um boilerplate com várias configurações padrão, incluindo suporte ao Docker no ambiente de desenvolvimento e produção.

É possível criar um ambiente virtual para trabalhar durante o desenvolvimento, mas para ficar o mais próximo possível de um ambiente de produção, os serviços podem ser iniciados através do `docker-compose`.

Os serviços disponíveis (e respectivos endereços locais) estão na [documentação do Cookiecutter Django](https://cookiecutter-django.readthedocs.io/en/latest/developing-locally-docker.html). De forma prática, dentro da pasta `/server`, basta rodar o comando:

```sh
cd server
sudo docker-compose -f local.yml up
```

O comando acima vai instanciar containers nos seguintes endereços:

- Django: http://localhost:8000
- Postgres
- Celery (worker e beat)
- Flower (monitoramento do Celery): http://localhost:5555
- Redis
- Mailhog (ambiente de desenvolvimento para emails): http://127.0.0.1:8025

O Flower tem proteção por usuário e senha, que estão disponíveis em `server/.envs/.local/.django`.

O usuário e senha do Postgres também são gerados automaticamente, e podem ser acessados em `server/.envs/.local/.postgres`.

Outras informações adicionais estão disponíveis no [arquivo README](https://github.com/alexismayfire/crm_profissionais/tree/master/server) no Github.

### Frontend (React)

### App (React Native)

Para iniciar a aplicação em React, é necessário ter o [node](https://nodejs.org/en/) instalado. O `npm` será instalado junto, porém, é recomendado atualizar após a instalação do `node`:

```sh
npm install npm@latest -g
```

Vamos usar o [Expo](https://expo.io/learn) para facilitar o desenvolvimento, já que usamos iOS e não temos acesso ao XCode. Assim evitamos a necessidade de usar um emulador (embora seja possível com o Expo):

```sh
npm install expo-cli -g
```

No iPhone, é preciso instalar o [app do Expo](https://apps.apple.com/br/app/expo-client/id982107779), que vai se encarregar de rodar o código do app.

Depois disso, basta ir até o diretório `mobile/` e usar o comando:

```sh
npm run start
```
