import 'zone.js/dist/zone-node';

import { enableProdMode } from '@angular/core';

enableProdMode();

import { getServer } from './server.app';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { environment } from './environments/environment';

const server = getServer();

server.listen(4300, (err) => {
  // tslint:disable-next-line:no-console
  console.log('Server has started: http://localhost:4300');
});
