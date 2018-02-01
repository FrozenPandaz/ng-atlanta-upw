import 'zone.js/dist/zone-node';

import * as functions from 'firebase-functions';


import { enableProdMode } from '@angular/core';

import { getServer } from './server.app';

enableProdMode();

const server = getServer();

server.listen(4300, (err) => {
  // tslint:disable-next-line:no-console
  console.log('Server has started: http://localhost:4300');
});

exports.server = functions.https.onRequest(server);
