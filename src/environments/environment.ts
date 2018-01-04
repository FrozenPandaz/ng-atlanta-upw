import { EnvironmentProperties } from './environment-properties';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment: EnvironmentProperties = {
  production: false,
  apiBase: '/',
  firebaseConfig: {
    apiKey: 'AIzaSyCmO-cLUrs9iGfYpJJma4W-hv5bjozW-to',
    authDomain: 'ng-atlanta-upw.firebaseapp.com',
    databaseURL: 'https://ng-atlanta-upw.firebaseio.com',
    projectId: 'ng-atlanta-upw',
    storageBucket: 'ng-atlanta-upw.appspot.com',
    messagingSenderId: '548938096315'
  }
};
