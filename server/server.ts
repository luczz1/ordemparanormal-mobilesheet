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
  ability.id = db.abilities[0].abilityList.length > 0 ? Number(Math.max(...ids)) + 1 : 1

  db.abilities[0].abilityList.push(ability);
  saveDataToJSON(db);
  res.send({200: 'sucesso'})
});

server.post('/powers/:id', (req: any, res: any) => {
  const power = req.body;
  const ids = db.powers[0].powersList.map((attr: any) => (attr).id);
  power.id = db.powers[0].powersList.length > 0 ? Number(Math.max(...ids)) + 1 : 1

  db.powers[0].powersList.push(power);
  saveDataToJSON(db);
  res.send({200: 'sucesso'})
});

server.delete('/abilities/:id/:itemid', (req: any, res: any) => {
  const itemId = req.params.itemid;

  const idIndex = db.abilities[0].abilityList.findIndex((attr: any) => String(attr.id) === itemId);
  if (idIndex !== -1) {
    db.abilities[0].abilityList.splice(idIndex, 1);
    saveDataToJSON(db);
    res.send({ '200': 'sucesso' });
  } else {
    res.status(404).send({ 'error': 'Item não encontrado' });
  }
});

server.delete('/powers/:id/:itemid', (req: any, res: any) => {
  const itemId = req.params.itemid;

  const idIndex = db.powers[0].powersList.findIndex((attr: any) => String(attr.id) === itemId);
  if (idIndex !== -1) {
    db.powers[0].powersList.splice(idIndex, 1);
    saveDataToJSON(db);
    res.send({ '200': 'sucesso' });
  } else {
    res.status(404).send({ 'error': 'Item não encontrado' });
  }
});

server.put('/skills/:id/:skillId/:newValue', (req: any, res: any) => {
  const skillID = req.params.skillId;
  const newSkillValue = req.params.newValue;

  db.skills[0].skills.find((attr) => attr.id == skillID).value = Number(newSkillValue)

  saveDataToJSON(db);
  res.send({200: 'sucesso'})
});



function saveDataToJSON(data: any) {
  fs.writeFileSync('./server/db.json', JSON.stringify(data, null, 2));
}

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
