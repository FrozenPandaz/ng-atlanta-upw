import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import 'zone.js/dist/zone-node';

import * as path from 'path';
import * as express from 'express';
import { ListsController } from './api/lists.controller';

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist-server/main.bundle');

const server = express();

const listController = new ListsController();

const root = path.resolve(__dirname, '..');
const distPath = path.resolve(root, 'dist');
const indexPath = path.resolve(distPath, 'index.html');

enableProdMode();

server.use(express.static(distPath, {
  index: false
}));

server.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

const routes = [
  '/:listName',
  '/profile/:profile-slug'
];

routes.forEach((route) => {
  server.get(route, (req, res) => {
    res.render(indexPath, {
      req,
      res
    });
  });
});

server.get('/api/list/:listName', async (req, res) => {
  const list = await listController.getList(req.params.listName);
  res.json(list);
});

server.listen(4300, (err) => {
  console.log('Server has started: http://localhost:4300');
});
