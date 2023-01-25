<p align="center">
  Teste-Técnico-Sharenergy
</p>
                                                                                                                 
Projeto fullstack realizado em Node.js com NestJS, banco de dados não relacional MongoDB e React com Typescript. Projeto construido com o intuito de finalizar o desafio proposto pela SHARENERGY, onde foi desafiado fazer um dashboard Full-Stack feito em React + Node. </br>

![](https://github.com/biixin/sharenergy-image/blob/main/20230125_085656.gif)

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,tailwind,nodejs,nestjs,mongodb" />
  </a>
</p>

## Tutorial de como Rodar a Aplicação

**Vale pontuar que o NODE deve estar instalado na máquina**

_O gerenciador de arquivos usado foi o yarn mais pode ser usado o npm_

### Início

Realizar o clone do repositório e executar os seguintes comandos:

Para inicializar o Backend:

```shell
  cd Back-End
```

```shell
  yarn install
```

criar um arquivo .env com os paramêtros de banco de dados e URL do MONGO.

```shell

  APP_PORT=
  // Exemplo: APP_PORT=3000 (Caso não seja preenchido a porta como padrão estará como 3000)
  
  MONGO_URL=
  // Exemplo: MONGO_URL=mongodb://localhost:27017

  JWT_SECRET_KEY=
  
```



Abrir o servidor

```shell
  yarn start:dev
	OU
  yarn start
```

**Ao inicializar o back-end automaticamente é criado um usuário ADMIN com os seguintes dados**
```shell
  username/email = desafiosharenergy
  password = sh@r3n3rgy
```

Com o servidor do backend funcionando, deve-se abrir um novo terminal na raiz do projeto e executar os seguintes comandos, para inicializar o Front-End:
_O gerenciador de arquivos para o front foi utilizado o NPM._

```shell
  cd Front-End
```

```shell
  npm install --force
```

Para inicializar o Frontend:


```shell
  yarn install
  Aplicacão estará rodando em http://localhost:3000/
```

## TESTES

### Testes Backend

Para o back-end foi utilizado testes unitários, ainda não esta com cobertura de 100%, porem todas as regras de negócios, casos e controller estão cobertos
(Total de 60% da aplicacão) <br />

![](https://user-images.githubusercontent.com/113357477/213822947-906cfc79-ea9f-423d-979b-8a12d364e4e0.png)

### Testes Frontend

**EM DESENVOLVIMENTO**

## Endpoints - API

#toda a API foi documentada no swagger-ui, basta acessar o endpoint: /api

![](https://user-images.githubusercontent.com/113357477/213822168-75a465b1-8954-443f-8951-947279121a55.png)

## Video explicando o projeto
https://youtu.be/Ewym-YfPT3w



