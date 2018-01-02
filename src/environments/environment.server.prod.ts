import { EnvironmentProperties } from './environment-properties';

export const environment: EnvironmentProperties = {
    production: true,
    apiBase: 'http://localhost:4300/',
    firebaseConfig: {
        apiKey: 'AIzaSyAtG7lYuTEcts9B2BwxmU7uhspnMDm6NkA',
        authDomain: 'ng-forbes-atlanta.firebaseapp.com',
        databaseURL: 'https://ng-forbes-atlanta.firebaseio.com',
        projectId: 'ng-forbes-atlanta',
        storageBucket: 'ng-forbes-atlanta.appspot.com',
        messagingSenderId: '310641491986'
    }
};
