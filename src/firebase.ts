import 'zone.js/dist/zone-node';

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import 'firebase/firestore';

import { enableProdMode } from '@angular/core';

import { getServer } from './server.app';

enableProdMode();

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

const server = getServer(firestore as any);

server.listen(4300, (err) => {
  // tslint:disable-next-line:no-console
  console.log('Server has started: http://localhost:4300');
});

exports.server = functions.https.onRequest(server);

exports.accountCreation = functions.auth.user().onCreate(event => {
  const user = event.data;

  firestore.collection('users').doc(user.uid).set({
    role: 'member'
  });
});

exports.accountDeletion = functions.auth.user().onDelete(event => {
  const user = event.data;

  firestore.collection('users').doc(user.uid).delete();
});
