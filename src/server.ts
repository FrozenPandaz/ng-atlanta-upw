import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import 'zone.js/dist/zone-node';

import * as path from 'path';
import * as express from 'express';
import { ListsController } from './api/lists/lists.controller';
import { ProfilesController } from './api/profiles/profiles.controller';
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist-server/main.bundle');

const server = express();

import * as firebase from 'firebase';

import 'firebase/firestore';
import { environment } from './environments/environment';

firebase.initializeApp(environment.firebaseConfig);

const firestore: firebase.firestore.Firestore = firebase.firestore();

const listController = new ListsController(firestore);
const profileController = new ProfilesController(firestore);

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
  '/edit/:listName',
  '/profile/:profileSlug',
  '/edit/profile/:profileSlug'
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

server.get('/api/profile/:profileSlug', async (req, res) => {
  const profile = await profileController.getProfile(req.params.profileSlug);
  res.json(profile);
});

server.get('/api/reset', async (req, res) => {
  // const deletedProfiles = [];
  // const deletedLists = [];
  // const profiles = await firestore.collection('profiles').get();
  // profiles.forEach(profileRef => {
  //   deletedProfiles.push(profileRef.data().name);
  //   profileRef.ref.delete();
  // });
  // const lists = await firestore.collection('lists').get();
  // lists.forEach(list => {
  //   deletedProfiles.push(list.data().name);
  //   list.ref.delete();
  // });
  res.json({
    deletedLists,
    deletedProfiles
  });
});

server.listen(4300, (err) => {
  console.log('Server has started: http://localhost:4300');
});
