# converta e veja o video
Aplicação web para converter vídeos para formatos aceitos pela web, utilizando React.js, redux, s3, node.js, zencoder e heroku


A aplicação foi feita com react e redux para o front, onde o redux é utilizado para controle de estados.

O backend foi feito em node. Para rodar a aplicação local, entre na pasta raiz do projeto então execute os seguintes:

Na pasta raiz : npm install e depois npm run dev para rodar o servidor

Na pasta client: npm instal e depois npm start para rodar o front

Para alterar o visual está sendo utilizado o sass para rola-lo na pasta client, execute npm run sass

Para se realizar testes, execute npm run test, na pasta client, então ele irá testar todos os arquivos  xxx.test.js

O upload do arquivo é feito com react-s3 atravês do front, e a partir do momento em que o usuario insiri algum arquivo de vídeos o redux trata seu status, o video é convertido através do zencoder pela que busca o busca na aws s3, e aposto convertido a aplicação retorna ele em uma lista.


PARA TESTAR A APLICAÇÃO

Entre no link https://conversor-jonathan.herokuapp.com/ 

Faça upload do arquivo e aguarde atê aparecer o nome do arquivo em uma lista como um link, ao clicar no link o video podera
ser assistido.


