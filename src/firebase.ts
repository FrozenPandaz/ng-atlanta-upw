import 'zone.js/dist/zone-node';

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
// import * as https from 'https';
// import * as sharp from 'sharp';

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

// async function getImage(profile: string): Promise<Buffer> {
//   return new Promise<Buffer>((resolve, reject) => {
//     https.get(profile, (res) => {
//       const data: Buffer[] = [];

//       res.on('data', (chunk: Buffer) => {
//         data.push(chunk);
//       });

//       res.once('end', () => {
//         resolve(Buffer.concat(data));
//       });
//     });
//   });
// }

// async function resizeImage(imageUrl: string, width: number, height: number) {
//   const input = await getImage(imageUrl);
//   return sharp(input)
//     .crop(sharp.strategy.attention)
//     .resize(width, height)
//     .max()
//     .toFormat('png')
//     .toBuffer();
// }

// exports.images = functions.https.onRequest(async (req, res) => {
//   try {
//     const [, profile] = req.path.split('/images/');
//     const [ width, height ] = req.query.size
//       .split('x')
//       .map(str => +str)
//       .map(num => {
//         if (num <= 0) {
//           return null;
//         } else {
//           return num;
//         }
//       });
//     const image = await resizeImage(profile, width, height);
//     const year = 60 * 60 * 24 * 365.25;

//     res.setHeader('Cache-Control', `public, max-age=${year}, s-maxage=${year}`);
//     res.setHeader('Content-type', 'image/png');
//     res.send(image);
//   } catch (e) {
//     console.error(e);
//     res.send(e);
//   }
// });
