const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/create', (req: any, res: any) => {
  db.characters.push(req.body);
  saveDataToJSON(db);
  res.send({
    characters: req.body
  });
});

server.post('/abilities/:id', (req: any, res: any) => {
  const ability = req.body;
  const ids = db.abilities[0].abilityList.map((attr: any) => (attr).id);
  ability.id = Number(Math.max(...ids)) + 1

  db.abilities[0].abilityList.push(ability);
  saveDataToJSON(db);
  res.send(ability);
});

server.post('/powers/:id', (req: any, res: any) => {
  const power = req.body;
  const ids = db.powers[0].powersList.map((attr: any) => (attr).id);
  power.id = Number(Math.max(...ids)) + 1

  db.powers[0].powersList.push(power);
  saveDataToJSON(db);
  res.send(power);
});

function saveDataToJSON(data: any) {
  fs.writeFileSync('./server/db.json', JSON.stringify(data, null, 2));
}

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
