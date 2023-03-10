
<h1 align="center">Teste-Técnico-Sharenergy</h1>
                             
Projeto fullstack realizado em Node.js com NestJS, banco de dados não relacional MongoDB e React com Typescript. Projeto construido com o intuito de finalizar o desafio proposto pela SHARENERGY, onde foi desafiado fazer um dashboard Full-Stack feito em React + Node. </br>

![](https://github.com/biixin/sharenergy-image/blob/main/20230125_085656.gif)


<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,tailwind,nodejs,nestjs,mongodb" />
  </a>
</p>

<h1 align="center">Tutorial para Rodar a Aplicação</h1>

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
  OBS: Caso queira inicializar com docker basta criar as váriaveis de ambiente abaixo e rodar no terminal 'docker compose up'
```

criar um arquivo .env com os paramêtros de banco de dados e URL do MONGO.

```shell

  APP_PORT=
  // Exemplo: APP_PORT=3000 (Caso não seja preenchido a porta como padrão estará como 3000)
  
  MONGO_URL= mongodb+srv://<user>:<password>@cluster0.<yznzesm>.mongodb.net/<database>?retryWrites=true&w=majority
  // Exemplo: mongodb+srv://admin:admin@cluster0.yznzesm.mongodb.net/sharenergy?retryWrites=true&w=majority

  JWT_SECRET_KEY=
  DATABASE_NAME=
  
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

_O gerenciador de arquivos para o front foi utilizado o YARN._

```shell
  cd Front-End
```

```shell
  yarn install
```

Para inicializar o Frontend:


```shell
  yarn install
  Aplicacão estará rodando em http://localhost:3000/
```


<h1 align="center">Testes</h1>

<h2 align="center">Back-End</h3>

Para o back-end foi utilizado testes unitários, ainda não esta com cobertura de 100%, porem todas as regras de negócios, casos e controller estão cobertos
(Total de 60% da aplicacão) <br />

![](https://user-images.githubusercontent.com/113357477/213822947-906cfc79-ea9f-423d-979b-8a12d364e4e0.png)

<h2 align="center">Front-End</h3>

<p align="center">
  **EM DESENVOLVIMENTO**
</p>


<h1 align="center">Endpoints - API</h1>

Toda a API foi documentada no swagger-ui, basta acessar o endpoint: /api

![](https://user-images.githubusercontent.com/113357477/213822168-75a465b1-8954-443f-8951-947279121a55.png)

## Video explicando o projeto
https://youtu.be/Ewym-YfPT3w


