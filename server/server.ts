const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/create', (req: any, res: any) => {
    res.send({
      characters: req.body
    });
    db.characters.push(req.body);
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
