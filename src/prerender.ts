import 'zone.js/dist/zone-node';

import { enableProdMode } from '@angular/core';

enableProdMode();

import * as fs from 'fs';
import * as path from 'path';

import { renderModuleFactory } from '@angular/platform-server';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist-server/main.bundle');

(async () => {
  const root = path.resolve(__dirname, '..');
  const distPath = path.resolve(root, 'dist');
  const indexPath = path.resolve(distPath, 'index.html');
  const outputPath = path.resolve(distPath, 'index.prerendered.html');
  const document = `${fs.readFileSync(indexPath)}`;
  const html = await renderModuleFactory(AppServerModuleNgFactory, {
    document,
    url: '/_appshell',
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  });
  fs.writeFileSync(outputPath, html);
})();
