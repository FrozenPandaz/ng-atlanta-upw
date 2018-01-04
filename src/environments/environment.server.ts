import { EnvironmentProperties } from './environment-properties';

export const environment: EnvironmentProperties = {
  production: false,
  apiBase: 'http://localhost:4300/',
  firebaseConfig: {
    apiKey: 'AIzaSyCmO-cLUrs9iGfYpJJma4W-hv5bjozW-to',
    authDomain: 'ng-atlanta-upw.firebaseapp.com',
    databaseURL: 'https://ng-atlanta-upw.firebaseio.com',
    projectId: 'ng-atlanta-upw',
    storageBucket: 'ng-atlanta-upw.appspot.com',
    messagingSenderId: '548938096315'
  }
};
