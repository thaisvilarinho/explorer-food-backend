# 🍜🌐 Food Explorer

> 🇧🇷
</br>
O Food Explorer é uma aplicação web excepcional que oferece uma experiência verdadeiramente singular, ao simular um menu interativo para um restaurante fictício. Esta plataforma mergulha os usuários em uma jornada imersiva e informativa, permitindo-lhes explorar pratos, bebidas e opções de cardápio de maneira envolvente e visualmente deslumbrante. Com o Food Explorer, os clientes podem navegar pelos pratos, apreciar imagens, ler descrições e obter informações detalhadas sobre cada item, criando assim uma experiência gastronômica virtual que certamente despertará seu apetite.
</br>

> 🇺🇸

</br>
Food Explorer is an extraordinary web application that provides a truly unique experience by simulating an interactive menu for a fictional restaurant. This platform immerses users in an informative and engaging journey, allowing them to explore dishes, beverages, and menu options in an interactive and visually stunning manner. With Food Explorer, customers can browse through dishes, view images, read descriptions, and access detailed information about each item, creating a virtual culinary experience that will undoubtedly leave them craving for more

##  Demonstração do Projeto 💻
![Preview do projeto](https://cdn.discordapp.com/attachments/1135990801948745979/1154859433684381716/Mockups.png)

## 📱 Preview da Aplicação 

Você pode experimentar a aplicação no ar através do seguinte link:

[**Acessar frontend do Food Explorer**](https://explorer-food-frontend-app.netlify.app/)
</br>
[**Acessar backend do Food Explorer**](https://explorer-food-backend-api.onrender.com/)

## Index

- [Recursos](#recursos)
- [Instalação](#⚙Instalação)
- [Rode Localmente](#rode-localmente)
- [Licença](#licença)

## Recursos

- ✨ Navegação interativa pelo menu
- ✨ Interface de usuário envolvente e atrativa
- ✨ Descrições detalhadas de pratos e bebidas
- ✨ O Administrador é capaz de criar, editar e deletar pratos livremente
- ✨ Pesquisa de pratos por nome e/ou ingredientes na Home page
- ✨ Aplicação responsiva tendo melhor usabilidade em dispositivos móveis
- ✨ Criação de novos usuários a partir da tela de Login -> registrar 
> Recursos Extras:
- ✨ Autenticação e Authorização de rotas mediante à cargos específicos para cada tipo de usuário
- ✨ Proteção de dados através de Cookies


## ⚙Instalação
Siga os passos abaixo para instalar e configurar a aplicação em um ambiente local:

1. 📩 Clone o repositório: `git clone https://github.com/thaisvilarinho/explorer-food-backend.git`
2. 📦Instale as dependências: `npm install`
3. ▶Inicie a aplicação: `npm start`

## Rode Localmente
Clone o projeto do frontend
```
git clone https://github.com/thaisvilarinho/food-explorer-frontend.git
```
#### Instale a dependências 
```bash
  $ npm install
```
#### Crie um arquivo de configuração:
Crie um arquivo `.env` como mostra no arquivo `.env.example` na raiz do projeto e configure as variáveis de ambiente necessárias. Por exemplo:
```dotenv
AUTH_SECRET=
PORT=
BASE_URL=
``` 

#### Efetue a criação do banco de dados e rode o servidor com: 
```bash
$ npm run migrate
$ npm run dev
```

## 💻 Tecnologias Utilizadas

Liste as principais tecnologias e bibliotecas que você usou no projeto, como:

- [**sqlite**](https://www.sqlite.org/index.html)
- [**bcryptjs**](https://www.npmjs.com/package/bcrypt/)
- [**cors**](https://www.npmjs.com/package/cors)
- [**express**](https://www.npmjs.com/package/express)
- [**express-async-errors**](https://www.npmjs.com/package/express-async-errors)
- [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken)
- [**knex**](https://www.npmjs.com/package/knex)
- [**pm2**](https://www.npmjs.com/package/pm2)


### 📄Licença

<!--START_SECTION:footer-->

<br />

O **Food Explorer** é distribuída sob a licença MIT. Isso significa que você pode usar, modificar e distribuir o código deste projeto livremente, desde que inclua a declaração de direitos autorais e a licença MIT em qualquer cópia ou parte dela.
<p align="center">
  <img alt="Rocketseat Education" src="https://avatars.githubusercontent.com/u/69590972?s=200&v=4" width="100px" />
</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Rocketseat&message=Education&color=8257e5&labelColor=202024" alt="Rocketseat Project" />
</p>

<!--END_SECTION:footer-->
