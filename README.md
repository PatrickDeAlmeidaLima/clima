### Weather App

Este projeto é uma aplicação de clima que mostra a previsão do tempo com base na cidade fornecida. Ele é composto por dois principais serviços:

- **Front-end**: Uma aplicação React que consome a API do back-end para mostrar as informações do clima.
- **Back-end**: Uma API em PHP (Laravel) que fornece os dados climáticos baseados nas coordenadas de uma cidade.

#### Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação](#instalação)
3. [Rodando o Back-End](#rodando-o-back-end)
4. [Rodando o Front-End](#rodando-o-front-end)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Contribuição](#contribuição)
7. [Licença](#licença)

#### Pré-requisitos

Antes de rodar os projetos, é necessário ter os seguintes itens instalados:

- **Node.js** (para rodar o front-end)
- **PHP** e **Laravel** (para o back-end)
- **MySQL** (para o banco de dados, que pode ser executado via XAMPP ou outro serviço de banco de dados)

##### Back-End

1. **PHP** e **Laravel** instalados.
2. **Banco de Dados MySQL** ativo (via XAMPP ou outro).
3. **Dependências do Projeto**:
   - **Axios** para chamadas HTTP.
   - **React** para o front-end (embora o back-end seja Laravel, o React é usado no front).

##### Front-End

1. **Node.js** instalado.
2. **Dependências do Projeto**:
   - **Vite** para desenvolvimento.
   - **TailwindCSS** para estilização.
   - **Axios** para consumir a API do back-end.

#### Instalação

##### Passos para Instalar o Back-End

1. Clone o repositório do back-end:
    ```bash
    git clone https://github.com/PatrickDeAlmeidaLima/clima
    cd weather-app-backend
    ```

2. Instale as dependências:
    ```bash
    composer install
    ```

3. Configure o arquivo `.env` para conectar ao banco de dados MySQL:
    - Acesse o arquivo `.env` e configure as credenciais do seu banco de dados MySQL.

4. Rode as migrações do banco de dados:
    ```bash
    php artisan migrate
    ```

5. Inicie o servidor PHP:
    ```bash
    php artisan serve
    ```

6. O back-end estará rodando em `http://localhost:8000`.

##### Passos para Instalar o Front-End

1. Clone o repositório do front-end:
    ```bash
    git clone https://github.com/PatrickDeAlmeidaLima/clima/tree/main/weather-app
    cd weather-app-frontend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure o arquivo `.env` (se necessário) com as URLs do back-end (caso use um endpoint diferente de `http://localhost:8000`).

4. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

5. O front-end estará rodando em `http://localhost:3000`.

#### Rodando o Back-End

1. Após a instalação, inicie o servidor Laravel com:
    ```bash
    php artisan serve
    ```

2. O servidor estará disponível em `http://localhost:8000`.

#### Rodando o Front-End

1. Inicie o servidor de desenvolvimento com:
    ```bash
    npm run dev
    ```

2. O front-end estará disponível em `http://localhost:3000`.

#### Estrutura do Projeto

##### Back-End (Laravel)

- **app/**: Contém a lógica de negócio.
- **database/**: Contém as migrações e modelos do banco de dados.
- **routes/**: Onde as rotas do Laravel são definidas.

##### Front-End (React + Vite)

- **src/**: Contém os componentes React.
- **public/**: Contém os arquivos estáticos.
- **tailwind.config.js**: Arquivo de configuração do TailwindCSS.

#### Exemplo de Uso

1. Após iniciar o back-end e front-end, você pode acessar a aplicação no navegador.
2. No campo de pesquisa, insira o nome da cidade para visualizar as informações do clima, como:
    - Temperatura: 20.22°C - 27.62°C
    - Vento: 3.72 km/h
    - Umidade: 59%
    - Chuva: 0.8 mm

#### Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b minha-feature`).
3. Faça o commit das suas alterações (`git commit -m 'Adicionando minha feature'`).
4. Envie a branch para o repositório remoto (`git push origin minha-feature`).
5. Abra um Pull Request.

#### Licença

Este projeto está sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

#### Contato

- **Autor**: Patrick Lima
- **Email**: patrick.almeida.lima@gmail.com
- **LinkedIn**: [Seu LinkedIn](https://www.linkedin.com/in/patrick-almeida-lima/)
