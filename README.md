# CaseItau

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.1.\

Esse projeto foi feito por Claudio Manuel Andrade da Silva com o objetivo de criar um case de uma listagem de produtos com criação, edição e exclusão. Permitindo que o usuário tenho controle total sobre os produtos para fazer tudo o que for preciso no cadastro deles

## Como executar a aplicação
Primeiramente para executar a aplicação é necessário ter instalado na máquina a versão 18.17.0 ou similares do Node.js, um editor de código(preferencialmente o VSCODE) e a versão do Angular 17.\
Após essas instalações executar no console dentro da pasta do repositório o comando `npm install`, esse comando baixará todas as dependências necessárias conseguir executar a aplicação
E por fim execute o comando `ng serve` no mesmo console dentro do repositório para rodar o codigo localmente. Vá até a url `http://localhost:4200/`. A aplicação estará funcionando e pronta para ser usada

## Build
Caso queira buildar a aplicação, execute o comando `ng build`. Os arquivos após executado se encontrarão na pasta `dist/` 
## Solução adotada para esse case
### Experiência do usuário
Para o desenvolvimento desse case de listagem de produtos, comecei pensando no layout e como gostaria que fosse a experiência do usuário usando a aplicação. Usei o conceito de estar tudo na mesma tela para que o usuário não tenha que ficar navegando entre as paginas de listagem e criação/edição, então a listagem já aparece assim que o usuário entra na aplicação e temos botões que abrem modais para criação/edição e confirmação de exclusão do produto. \
Outro ponto escolhido foi a utilização de cards para exibir os produtos ao invés de uma tabela com os items para ter uma exibição mais agradável ao usuário.
Além disso essa aplicação foi desenvolvida pensando tanto em ser utilizada nos desktops como em versão mobile com total responsividade para seu uso em qualquer plataforma, ela também tem acessibilidade e o seu uso pode ser feito apenas com o teclado não precisando de um mouse.\
### Parte técnica
Foi utilizado o angular na versão 17 para se utilizar de várias funcionalidades mais recentes que deixam a aplicação mais enxuta, performática e mais simples para novos desenvolvedores trabalharem. As principais funcionalidades utilizadas foram: \
-Standalone Component: para que os todos os componentes não precisem ter módulos criados para serem utilizados;\
-Signals: valores reativos que são usados pela aplicação que fazem a renderização muito mais fácil e com menos riscos de memory leak que podem deixar a aplicação com menos performance, escolhi usar o signals ao inves do BehaviorSubject justamente para usar algo que a comunidade do angular está usando como tendencia nas novas versões, ser mais performático, usar o DOM de maneira mais eficaz e não precisar usar o RxJs que tem a mesma função só que com mais código e complexidade(as vezes desnecessária);\
-Pipes: Para os valores recebidos serem tranformados e utilzados na aplicação, usado para criar as iniciais nos cards e também para fazer a filtragem por nome e categoria;\
-Custom Validators: usado para verificar se já existe algum código de produto para não deixar criar com o mesmo código, invalidando o formulário caso já tenha o código\
-Lazy Loading: usado para a tela de produtos, fazendo com que o bundle dele só carregue for preciso\
Aplicação sempre começa com nenhum produto criado e você consegue ir criando, editando e excluindo do jeito que precisar e ela vai persistir até fechar a aplicação ou quando der um f5

## Testes Unitários
Esse projeto foi desenvolvido pensando em ter uma ótima cobertura de testes unitarios, atualmente ele se encontra com cobertura integral de 100% do código incluindo branches
Para executar os testes unitários basta executar o comando `ng test` para rodar via [Karma](https://karma-runner.github.io).\
Rodando os testes vai ser possivel verificar a cobertura e o número de testes executados
