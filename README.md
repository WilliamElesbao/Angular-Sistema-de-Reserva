<h1 align="center">💻 Sistema de Reserva 🖥️</h1>

Um sistema de reserva para gerenciar o agendamento de mesas em um ambiente de trabalho.

## 💡Ideias para desenvolvimento🔬

As ideias/template/layout estão na pasta [.ideas](https://github.com/WilliamElesbao/Angular-Sistema-de-Reserva/tree/main/.ideas)

## ⚙️Recursos/Features a serem Desenvolvidos 🛠️


- [x] 🔓 Layout da disposição dos setores e s stations;
- [x] 🔓 Header(nav) - Disposição dos Setores e Stations | Available Stations | All Reservations;
- [x] 🔓 Modal/Form para realizar a reserva;
- [x] 🔓 Botão "Reservar" - Modal/Form para realizar;
- [x] 🔓 Agendamento dinâmico (default, daily, weekly, monthly), permitindo ao usuário marcar dias específicos da semana (weekly e monthly);
- [x] 🔓 Validação dos campos do formulário(reservar) no front-end e back-end;
- [x] 🔓 Persistir os dados no LocalStorage do navegador(Solução temporária);
- [x] 🔓 All Reservations - ordernar de forma crescente (setores e stations);
- [x] 🔓 Visualizar todas as reservas agendadas (Header/Menu > "All Reservations");
- [x] 🔓 Layout dos Sectors responsivos;
- [x] 🔓 Criar um banco de dados para armazenar os usuarios, setores/stations/reservations;
- [x] 🔓 Estabelecer conexão com o banco de dados;
- [x] 🔓 Desenvolver uma API: Operação - Read - sectors/stations do db;
- [ ] 🔒 Desenvolver uma API para operações CRUD no banco de dados;
- [ ] 🔒 Visualizar todas os setores/stations disponíveis para reserva;
- [ ] 🔒 Implementar consulta automática no modal de reserva: o usuário informa o id e o sistema busca automaticamente o nome associado;
- [ ] 🔒 Botão "Visualizar" - modal com as reservas por stations;
- [ ] 🔒 Criar página de login para acesso ao sistema;
- [ ] 🔒 Visualizar reservas por id do usuário;
- [ ] 🔒 Implementar níveis de usuário para restrições de acesso;
- [x] 🔓 Sessão About (me) Developer;

## 📝Requisitos📋

Para desenvolver ou utilizar este projeto, você precisará ter instalado:

- [x] [Node.js](https://nodejs.org/en)
- [x] npm
- [x] Angular CLI (comando para instalar: `npm install -g @angular/cli`) ou visite o site oficial do [Angular.io](https://angular.io/guide/setup-local#install-the-angular-cli)
- [x] Conhecimento em JavaScript, TypeScript, HTML, CSS, SQL
- [x] [MySQL](https://dev.mysql.com/downloads/installer/)

## ▶️Executando o Projeto

1. Clone este repositório ou de um Fork no projeto: `git clone https://github.com/WilliamElesbao/Angular-Sistema-de-Reserva.git`
2. Instale as dependências necessárias:
3. `npm install`
4. `npm install express mysql body-parser cors`
5. As Query para criação do database, tables e inserção dos dados nas tables estão localizados: `src > assets > data > SQL_scripts`
6. No diretório do projeto: `cd src/app/api`
7. Rodar o server da API: `node server.js`
8. Inicie o servidor de desenvolvimento usando `ng serve`.
9. Acesse o sistema no navegador através de `http://localhost:4200`.

## 📝Contribuição💪

> Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📫Contato📱

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-000?style=for-the-badge&logo=linkedin&logoColor=126BC4&color:FFF)](https://www.linkedin.com/in/william-elesbao/) [![GitHub](https://img.shields.io/badge/-Github-000?style=for-the-badge&logo=github&logoColor=FFF&color:FFF)](https://github.com/WilliamElesbao) [![Gmail](https://img.shields.io/badge/-Gmail-000?style=for-the-badge&logo=gmail&logoColor=EA4335&color:FFF)](mailto:william.elesbao.2000@gmail.com) [![Instagram](https://img.shields.io/badge/-Instagram-000?style=for-the-badge&logo=instagram&logoColor=D33B58&color:FFF)](https://www.instagram.com/willtubetech/) [![YouTube](https://img.shields.io/badge/-YouTube-000?style=for-the-badge&logo=youtube&logoColor=FE0000&color:FFF)](https://www.youtube.com/@willtubetech) 

