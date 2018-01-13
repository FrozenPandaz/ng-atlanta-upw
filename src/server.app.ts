import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import * as expressWinston from 'express-winston';
import * as path from 'path';
import * as winston from 'winston';
import { ListsController } from './api/lists/lists.controller';
import { ProfilesController } from './api/profiles/profiles.controller';
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist-server/main.bundle');

import * as firebase from 'firebase/app';
import 'firebase/firestore';

export function getServer(firestore: firebase.firestore.Firestore) {
  const server = express();

  const listController = new ListsController(firestore);
  const profileController = new ProfilesController(firestore);

  const root = path.resolve(__dirname, '..');
  const distPath = path.resolve(root, 'dist');
  const indexPath = path.resolve(distPath, 'index.html');

  server.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        colorize: true
      })
    ],
    meta: false,
    msg: `[{{req.method}}] <- {{req.url}} ({{res.statusCode}} in {{res.responseTime}})`
  }));

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
      res.setHeader('Cache-Control', `public, s-maxage=${60 * 60}`);

      res.render(indexPath, {
        req,
        res
      });
    });
  });

  server.get('/api/list/:listName', async (req, res) => {
    res.setHeader('Cache-Control', `public, max-age=${60 * 60}, s-maxage=${10 * 60}`);

    const list = await listController.getList(req.params.listName);
    res.json(list);
  });

  server.get('/api/profile/:profileSlug', async (req, res) => {
    res.setHeader('Cache-Control', `public, max-age=${60 * 60}, s-maxage=${10 * 60}`);

    const profile = await profileController.getProfile(req.params.profileSlug);
    res.json(profile);
  });

  server.get('/fpw', (req, res) => {
    res.redirect('/fictional-power-women', 301);
  });

  server.get('/', (req, res) => {
    res.redirect('/fictional-power-women');
  });

  return server;
}
