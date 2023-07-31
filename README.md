# Carteira de Despesas
## Sobre
Este projeto foi desenvolvido a partir da continuação de um outro projeto, chamado Trybewallet, desenvolvido durante o módulo de front-end da Trybe.
A idéia inicial era de fazer uma carteira de controle de gastos com conversor de moedas, onde o usuário é capaz de adicionar, remover e editar um gasto; visualizar uma tabelas com seus gastos; visualizar o total de gastos convertidos para uma moeda de escolha.

Ao concluir e ser aprovado no projeto inicial, percebi algumas limitações de uso para o usuário, como a impossibilidade de escolher uma moeda base, pois esta estava restrita somente ao Real Brasileiro (BRL); a impossibilidade de se criar múltiplos usuários, editá-los e salvá-los no armazenamento local (localStorage), bem como a de salvar as despesas localmente.

Por isto, implementei as funcionalidades de:
- Criar um novo usuário, com dados de email, nome e moeda base, editar e salvar estas informações localmente.
- Adicionar e salvar localmente despesas com a seleção de moeda personalizada, baseado nas opções de pares da moeda base disponíveis na [API utilizada](https://docs.awesomeapi.com.br/api-de-moedas).

🚧 Testes em desenvolvimento!

## Habilidades Utilizadas
- React JS
- React Router
- Redux 
- Componentes de classe
- Lógica de programação para tratar a maneira como os dados da API chegam e são armazenados
- Estilização CSS

## Instalação e Uso

1. Faça o clone do repositório: ```git clone git@github.com:matheusfgb2/carteira-de-despesas.git```

2. Navegue até o diretório do projeto: ```cd carteira-de-despesas```

3. Execute o comando `npm i` para fazer as instalações necessárias 

4. Execute o comando `npm start` para rodar o projeto localmente ```(http://localhost:3000)```
